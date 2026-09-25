import { Router, Request, Response } from 'express';
import { generatePlan } from '../services/aiService';

const router = Router();

/**
 * POST /api/generate-plan
 * Body: { idea: string }
 * Response: { plan: string }
 */
router.post('/generate-plan', async (req: Request, res: Response) => {
  const { idea } = req.body as { idea?: string };

  if (!idea || idea.trim() === '') {
    res.status(400).json({ error: 'The "idea" field is required and cannot be empty.' });
    return;
  }

  try {
    const plan = await generatePlan(idea.trim());
    res.json({ plan });
  } catch (err) {
    console.error('Error generating plan:', err);
    res.status(500).json({ error: 'Something went wrong while generating the plan. Please try again.' });
  }
});

export default router;
