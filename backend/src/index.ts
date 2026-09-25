import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 3001;

// Allow requests from the Next.js dev server
app.use(cors({ origin: 'http://localhost:3000' }));

// Parse incoming JSON request bodies
app.use(express.json());

// Health check — visit http://localhost:3001 to confirm the server is running
app.get('/', (_req, res) => {
  res.send('Project Idea Planner API is running ✓');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
