import express from 'express';
import { scrapeAmazonProducts } from '../services/amazonScraper.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { keyword, page = 1 } = req.query; // Add page parameter with default value 1

    if (!keyword) {
      return res.status(400).json({
        error: "Missing required parameter: keyword"
      });
    }

    const products = await scrapeAmazonProducts(keyword, parseInt(page));

    return res.json({ products });

  } catch (error) {
    console.error('Scraping error:', error.message);
    return res.status(500).json({
      error: error.message || 'Failed to scrape products'
    });
  }
});

export default router;