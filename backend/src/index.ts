import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import planRouter from './routes/plan';
import exploreRouter from './routes/explore';

const app = express();
const PORT = process.env.PORT ?? 3001;

// Allow requests from the Next.js dev server
app.use(cors({ 
  origin: ['http://localhost:3000', 'https://bob-the-builder-hackathon.vercel.app'] 
}));

// Parse incoming JSON request bodies
app.use(express.json());

// Health check — visit http://localhost:3001 to confirm the server is running
app.get('/', (_req, res) => {
  res.send('Project Idea Planner API is running ✓');
});

// Routes
app.use('/api', planRouter);
app.use('/api', exploreRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
