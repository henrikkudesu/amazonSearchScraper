import express from 'express';
import { scrapeAmazonProducts } from '../services/amazonScraper.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { keyword, url, page = 1 } = req.query;

    // Se temos uma URL completa, usamos ela diretamente
    if (url) {
      const result = await scrapeAmazonProducts(null, 1, url);
      return res.json(result);
    }

    // Caso contrário, usamos o keyword e page
    if (!keyword) {
      return res.status(400).json({
        error: "Missing required parameter: keyword or url"
      });
    }

    const result = await scrapeAmazonProducts(keyword, parseInt(page));
    return res.json(result);

  } catch (error) {
    console.error('Scraping error:', error.message);
    return res.status(500).json({
      error: error.message || 'Failed to scrape products'
    });
  }
});

export default router;