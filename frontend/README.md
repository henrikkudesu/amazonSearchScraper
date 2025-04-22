# Web Scraping Frontend

This is the frontend interface for the **Amazon Search Scraper** project. It allows users to search for Amazon products by keyword and view scraped results in a clean and responsive layout. The application communicates with the backend API to fetch product data in real-time.

## Features

- Simple and intuitive search interface
- Display of product title, image, rating, and number of reviews
- Load more products dynamically using pagination
- Responsive layout for desktop and mobile screens
- Visual feedback with loaders and error messages

## Technologies Used

- **Vite** for fast development and bundling
- **Vanilla JavaScript** for all application logic
- **HTML and CSS** for layout and styling
- **Fetch API** to interact with the backend

## Setup Instructions

1. Navigate to the `frontend` folder.
2. Run `npm install` to install dependencies.
3. Start the development server using `npm run dev`.
4. The application will be available at [http://localhost:5173](http://localhost:5173) or the next available port.

## API Dependency

This frontend expects the backend server to be running at [http://localhost:3001](http://localhost:3001). Ensure the API is started and accessible before using the interface.

## How It Works

1. User enters a product keyword and clicks the search button.
2. The app sends a request to `/api/scrape` with the keyword.
3. Results are displayed as product cards.
4. The user can click "Load More Products" to fetch the next page.

## Note

This app relies on live scraping from Amazon and may be affected by rate limits or page structure changes. It is intended for **educational or testing purposes only**.
