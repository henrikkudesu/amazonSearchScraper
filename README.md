# Amazon Search Scraper

This project is a full-stack web application that scrapes Amazon search results and displays them in a modern, user-friendly frontend. It includes a Node.js (Bun) backend using Express for scraping and a lightweight frontend built with Vite and Vanilla JS.

## Project Structure

```
api/: Backend - Bun + Express server for scraping
    routes/: Route handlers (currently just /scrape)
    services/: Core scraping logic using axios + jsdom
    utils/: Constants like base URLs and headers
    index.js: Server entry point

frontend/: Frontend - Vite + Vanilla JS
    src/: Main app logic (JS, CSS)
    index.html: Entry HTML

README.md: You're here!
```

## Features

- Search Amazon products using a keyword
- Paginated scraping support
- Product info includes title, image, rating, and review count
- Responsive, clean frontend UI
- Load more results dynamically
- Built with Bun and Vite for ultra-fast dev experience

## Technologies Used

### Backend (`/api`):

- Bun
- Express
- Axios
- jsdom
- CORS

### Frontend (`/frontend`):

- Vite
- Vanilla JavaScript
- CSS
- HTML

## Installation & Usage

1. **Clone the repository**:

   ```bash
   git clone https://github.com/henrikkudesu/amazonSearchScraper
   cd amazonSearchScraper
   ```

2. **Setup the Backend (API)**:

   - The backend is built with Bun — make sure you have Bun installed.

   ```bash
   cd api
   bun install
   bun run index.js
   ```

   - Server runs at `http://localhost:3001`.

3. **Setup the Frontend**:
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```
   - Frontend runs at `http://localhost:5173` (or another available port).

## How It Works

1. User inputs a keyword in the frontend.
2. The frontend sends a GET request to `/api/scrape?keyword=...`.
3. The backend constructs an Amazon search URL and uses `axios` + `jsdom` to fetch and parse the results.
4. Extracted product data is returned to the frontend and displayed as cards.
5. The "Load More" button uses the next page URL for paginated results.

## Notes

- This project scrapes Amazon for **educational purposes only**. Be mindful of their Terms of Service.
- Rate limiting or CAPTCHAs may affect scraping reliability.
- You may need to rotate headers or use proxies for more robust scraping.

## Example

Search for "wireless headphones" and see:

- Product image
- Title (truncated)
- Rating with stars
- Number of reviews
- Load more products dynamically

## Additional Documentation

For more detailed information about the frontend, refer to the [Frontend README](frontend/README.md).  
It includes setup instructions and project-specific details for the frontend.

For backend-specific details, refer to the [API README](api/README.md).  
It provides information about the API structure, endpoints, and scraping logic.
