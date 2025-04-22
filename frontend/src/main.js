import './style.css'

const searchBtn = document.getElementById("searchBtn");
const keywordInput = document.getElementById("keyword");
const resultsDiv = document.getElementById("results");
const loader = document.getElementById("loader");
const loadMoreBtn = document.getElementById("loadMoreBtn");
const loadMoreContainer = document.getElementById("load-more-container");

// Track current state
let currentKeyword = '';
let currentPage = 1;
let isLoading = false;
let allProductsLoaded = false;
let nextPageUrl = null;

// Hide load more button initially
loadMoreContainer.style.display = "none";

keywordInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    searchBtn.click();
  }
});

// Main search functionality
searchBtn.addEventListener("click", async () => {
  nextPageUrl = null;
  const keyword = keywordInput.value.trim();
  if (!keyword) {
    showError("Please enter a product keyword to search");
    return;
  }

  // Reset state for new search
  currentKeyword = keyword;
  currentPage = 1;
  allProductsLoaded = false;

  // Clear previous results
  resultsDiv.innerHTML = "";
  loadMoreContainer.style.display = "none";

  // Show loading state
  loader.style.display = "flex";

  try {
    await fetchProducts(keyword, 1, true);
  } catch (err) {
    console.error(err);
    showError(err.message || "Failed to fetch data. Please try again.");
  } finally {
    // Hide loader
    loader.style.display = "none";
  }
});

// Load more products button
loadMoreBtn.addEventListener("click", async () => {
  if (isLoading || allProductsLoaded) return;

  currentPage++;
  loadMoreBtn.disabled = true;
  loadMoreBtn.textContent = "Loading...";

  try {
    await fetchProducts(currentKeyword, currentPage, false);
  } catch (err) {
    console.error(err);
    currentPage--; // Revert page count on error
    showError("Failed to load more products. Please try again.");
  } finally {
    loadMoreBtn.disabled = false;
    loadMoreBtn.textContent = "Load More Products";
  }
});

/**
 * Fetches products from API
 * @param {string} keyword - Search keyword
 * @param {number} page - Page number
 * @param {boolean} newSearch - Whether this is a new search or loading more
 */
async function fetchProducts(keyword, page, newSearch) {
  isLoading = true;

  // Use nextPageUrl se disponível e não for uma nova pesquisa
  let url;
  if (!newSearch && nextPageUrl) {
    // Use a URL completa retornada pela API
    url = `http://localhost:3001/api/scrape?url=${encodeURIComponent(nextPageUrl)}`;
  } else {
    // Primeira página ou nova pesquisa
    url = `http://localhost:3001/api/scrape?keyword=${encodeURIComponent(keyword)}`;
  }

  loader.style.display = "flex";

  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Server responded with status: ${res.status}`);
    }

    const data = await res.json();

    if (!data.products || data.products.length === 0) {
      if (newSearch) {
        throw new Error("No products found for your search");
      } else {
        allProductsLoaded = true;
        loadMoreBtn.textContent = "No More Products";
        loadMoreBtn.disabled = true;
        return;
      }
    }

    // Armazene a URL da próxima página
    nextPageUrl = data.pagination?.nextPageUrl || null;

    // Atualize a página atual
    currentPage = data.pagination?.currentPage || (newSearch ? 1 : currentPage + 1);

    // Verifique se é a última página
    if (data.pagination?.isLastPage || !nextPageUrl) {
      allProductsLoaded = true;
      loadMoreBtn.textContent = "No More Products";
      loadMoreBtn.disabled = true;
    }

    // Display products (append if loading more, replace if new search)
    displayProducts(data.products, !newSearch);

    // Show load more button if we got products and not the last page
    if (data.products.length > 0 && !data.pagination?.isLastPage) {
      loadMoreContainer.style.display = "flex";
    }
  } catch (err) {
    console.error(err);
    showError(err.message || "Failed to fetch data");
  } finally {
    loader.style.display = "none";
    isLoading = false;
  }
}

/**
 * Displays product cards in the results container
 * @param {Array} products - Products to display
 * @param {boolean} append - Whether to append or replace existing products
 */
function displayProducts(products, append = false) {
  if (!append) {
    resultsDiv.innerHTML = "";
  }

  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "product";

    // Truncate long titles
    const title = product.title.length > 100
      ? product.title.substring(0, 100) + '...'
      : product.title;

    // Format rating display
    const stars = product.rating ? "★".repeat(Math.floor(product.rating)) + (product.rating % 1 ? "½" : "") : "";
    const emptyStars = product.rating ? "☆".repeat(5 - Math.ceil(product.rating)) : "";
    const rating = product.rating ? `${stars}${emptyStars} ${product.rating}` : "Not rated";

    // Create card content
    card.innerHTML = `
      <div class="product-image">
        <img src="${product.imageUrl}" alt="${escapeHtml(title)}" loading="lazy" />
      </div>
      <div class="product-info">
        <h3 class="product-title">${escapeHtml(title)}</h3>
        <div class="product-rating">
          <span class="stars">${rating}</span>
          <span>(${product.reviewCount || 0} reviews)</span>
        </div>
      </div>
    `;

    resultsDiv.appendChild(card);
  });
}

/**
 * Shows an error message to the user
 * @param {string} message - Error message to display
 */
function showError(message) {
  resultsDiv.innerHTML = `<div class="error-message">${message}</div>`;
  loader.style.display = "none";
}

/**
 * Prevents XSS by escaping HTML special characters
 * @param {string} text - Text to escape
 * @return {string} Escaped text
 */
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}