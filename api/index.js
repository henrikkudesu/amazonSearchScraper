import express from 'express';
import cors from 'cors';
import scrapeRoute from './routes/scrape';

const app = express();
const PORT = process.env.PORT || 3001; // Use port 3001 or the one defined in the environment

app.use(cors());

app.use('/api/scrape', scrapeRoute);

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});