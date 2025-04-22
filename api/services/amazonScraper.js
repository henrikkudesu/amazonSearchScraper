import axios from 'axios';
import { JSDOM } from 'jsdom';
import { AMAZON_BASE_URL, AMAZON_HEADERS } from '../utils/constants.js';

/**
 * Scrapes Amazon product listings for a given search keyword or direct URL
 * @param {string} keyword - Search term to look for on Amazon
 * @param {number} page - Page number to scrape (defaults to 1)
 * @param {string} directUrl - Optional direct URL to scrape
 * @returns {Promise<Object>} - Object containing products array and pagination information
 */
const scrapeAmazonProducts = async (keyword, page = 1, directUrl = null) => {
    try {
        let searchUrl;

        if (directUrl) {
            // If we have a direct URL, use it
            searchUrl = directUrl;
            console.log(`Fetching next page: ${directUrl}`);
        } else {
            // Otherwise, construct URL with keyword and page
            if (!keyword || typeof keyword !== 'string' || keyword.trim() === '') {
                throw new Error('Invalid or empty search keyword');
            }

            const pageParam = page > 1 ? `&page=${page}` : '';
            searchUrl = `${AMAZON_BASE_URL}/s?k=${encodeURIComponent(keyword)}${pageParam}`;
            console.log(`Searching products for: ${keyword} (Page ${page})`);
        }

        const headers = AMAZON_HEADERS;
        const response = await axios.get(searchUrl, { headers });

        if (response.status !== 200) {
            throw new Error(`Request failed: ${response.status} ${response.statusText}`);
        }

        const dom = new JSDOM(response.data);
        const document = dom.window.document;

        // Extract products
        const productElements = document.querySelectorAll('.s-result-item[data-component-type="s-search-result"]');
        console.log(`Found ${productElements.length} products to process`);

        const products = [];

        productElements.forEach(productElement => {
            try {
                const product = {
                    title: extractProductTitle(productElement),
                    rating: extractRating(productElement),
                    reviewCount: extractReviewCount(productElement),
                    imageUrl: extractImageUrl(productElement),
                };

                if (product.title && product.imageUrl) {
                    products.push(product);
                }
            } catch (err) {
                console.error(`Error processing a specific product: ${err.message}`);
            }
        });

        console.log(`Successfully processed ${products.length} products`);

        // Extract pagination information
        const isLastPage = document.querySelector('.a-last.a-disabled, .s-pagination-next.s-pagination-disabled') !== null;
        let nextPageUrl = null;

        if (!isLastPage) {
            const nextPageElement = document.querySelector('.a-last a, .s-pagination-next');
            if (nextPageElement && nextPageElement.getAttribute('href')) {
                nextPageUrl = nextPageElement.getAttribute('href');

                // Complete URL if it's a relative path
                if (nextPageUrl && !nextPageUrl.startsWith('http')) {
                    nextPageUrl = `${AMAZON_BASE_URL}${nextPageUrl}`;
                }
            }
        }

        return {
            products,
            pagination: {
                isLastPage,
                nextPageUrl,
                currentPage: page
            }
        };

    } catch (error) {
        console.error(`Error scraping Amazon products: ${error.message}`);
        throw error;
    }
};

/**
 * Extracts product title from DOM element
 */
const extractProductTitle = (productElement) => {
    const titleElement = productElement.querySelector('h2 a span') ||
        productElement.querySelector('.a-size-medium.a-color-base.a-text-normal') ||
        productElement.querySelector('.a-link-normal .a-text-normal');

    return titleElement ? titleElement.textContent.trim() : null;
};

/**
 * Extracts product rating (stars)
 * Converts text like "4.5 out of 5 stars" to number 4.5
 */
const extractRating = (productElement) => {
    const ratingElement = productElement.querySelector('.a-icon-star-small .a-icon-alt') ||
        productElement.querySelector('.a-icon-star .a-icon-alt');

    if (!ratingElement) return null;

    const ratingText = ratingElement.textContent.trim();
    const ratingMatch = ratingText.match(/(\d+[.,]?\d*)/);

    if (ratingMatch && ratingMatch[1]) {
        return parseFloat(ratingMatch[1].replace(',', '.'));
    }
    return null;
};

/**
 * Extracts review count
 * Converts text like "1,234 reviews" to number 1234
 */
const extractReviewCount = (productElement) => {
    const reviewElement = productElement.querySelector('.a-size-small .a-link-normal') ||
        productElement.querySelector('.a-size-base .a-link-normal');

    if (!reviewElement) return null;

    const reviewText = reviewElement.textContent.trim();
    const reviewCount = reviewText.replace(/[^\d]/g, '');

    return reviewCount ? parseInt(reviewCount, 10) : null;
};

/**
 * Extracts product image URL
 */
const extractImageUrl = (productElement) => {
    const imageElement = productElement.querySelector('.s-image') ||
        productElement.querySelector('.a-link-normal img');

    if (imageElement && imageElement.src) {
        return imageElement.src;
    }

    if (imageElement && imageElement.getAttribute('data-src')) {
        return imageElement.getAttribute('data-src');
    }

    return null;
};

export { scrapeAmazonProducts };