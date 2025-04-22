# Amazon Scraper API

This backend service powers the Amazon Search Scraper project, enabling the extraction of product data from Amazon search results using a keyword or a direct URL. Built with Bun and Express, it provides data to the frontend application.

## Features

- Scrape Amazon search result pages.
- Extract product title, rating, review count, and image URL.
- Support pagination with next page URL detection.
- Accept both keywords and direct Amazon search URLs.
- Handle errors and invalid requests gracefully.

## Technologies Used

- **Bun**: For performance and development speed.
- **Express**: For routing and handling HTTP requests.
- **Axios**: For making HTTP requests to Amazon.
- **jsdom**: For parsing HTML and extracting data from the DOM.
- **CORS**: To allow cross-origin requests from the frontend.

## Setup Instructions

1. Navigate to the `api` directory.
2. Run `bun install` to install dependencies.
3. Start the server using `bun run index.js`.
4. Access the server at `http://localhost:3001`.

## Endpoints

### `GET /api/scrape`

#### Parameters:

- `keyword` (string): Product search term.
- `page` (number, optional): Result page to fetch (default is 1).
- `url` (string, optional): Full Amazon search results URL (overrides `keyword`).

#### Example Usage:

- `/api/scrape?keyword=headphones`
- `/api/scrape?url=https://www.amazon.com/s?k=headphones&page=2`

## Output

The response includes:

- An array of products with `title`, `rating`, `review count`, and `image URL`.
- A pagination object with `currentPage`, `isLastPage`, and `nextPageUrl`.

## Note

Amazon frequently updates its HTML structure, which may impact scraping accuracy. This service is intended for educational and non-commercial use only. To avoid request blocks, consider using proxies or rotating headers.
