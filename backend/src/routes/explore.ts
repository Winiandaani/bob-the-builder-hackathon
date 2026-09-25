import { Router, Request, Response } from 'express';
import { fetchRepoData } from '../services/repoService';
import { analyzeRepo } from '../services/repoAiService';

const router = Router();

/**
 * POST /api/explore-repo
 * Body: { repoUrl: string }
 * Response: { repoName, explanation, techStack, suggestedTasks }
 */
router.post('/explore-repo', async (req: Request, res: Response) => {
  const { repoUrl } = req.body as { repoUrl?: string };

  if (!repoUrl || !repoUrl.startsWith('https://github.com/')) {
    res.status(400).json({ error: 'The "repoUrl" field must be a valid GitHub repository URL starting with https://github.com/' });
    return;
  }

  try {
    const repoData = await fetchRepoData(repoUrl);
    const analysis = await analyzeRepo(repoData);
    res.json({
      repoName: repoData.repoName,
      explanation: analysis.explanation,
      techStack: analysis.techStack,
      suggestedTasks: analysis.suggestedTasks,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('Error exploring repo:', err);

    if (message === 'Repository not found') {
      res.status(404).json({ error: message });
    } else if (message.startsWith('GitHub rate limit exceeded')) {
      res.status(502).json({ error: message });
    } else {
      res.status(500).json({ error: 'Something went wrong while exploring the repository. Please try again.' });
    }
  }
});

export default router;
