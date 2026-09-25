import Groq from 'groq-sdk';
import type { RepoData } from './repoService';

const groq = new Groq({ apiKey: process.env.AI_API_KEY ?? '' });

const SYSTEM_PROMPT =
  'You are a senior engineer who helps developers understand unfamiliar codebases. ' +
  'Respond with valid JSON only, no markdown fences, no explanation outside the JSON.';

export interface RepoAnalysis {
  explanation: string;
  techStack: string;
  suggestedTasks: string[];
}

export async function analyzeRepo(data: RepoData): Promise<RepoAnalysis> {
  const userPrompt = `Analyze this GitHub repository and return a JSON object.

Repository name: ${data.repoName}
Primary language: ${data.primaryLanguage ?? 'unknown'}
Root files/folders: ${data.rootFiles.join(', ')}
README excerpt:
${data.readmeExcerpt || '(no README found)'}

Return ONLY this JSON shape — no markdown fences, no extra text:
{
  "explanation": "plain English description of what the project does",
  "techStack": "description of the architecture and tech stack",
  "suggestedTasks": ["task 1", "task 2", "task 3"]
}`;

  const completion = await groq.chat.completions.create({
    model: 'qwen/qwen3.8-27b',
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: userPrompt },
    ],
    temperature: 0.5,
  });

  const raw = (completion.choices[0].message.content ?? '').trim();

  // Strip markdown code fences if the model includes them despite instructions
  const stripped = raw.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim();

  try {
    const parsed = JSON.parse(stripped) as RepoAnalysis;
    return parsed;
  } catch {
    throw new Error('AI returned an unexpected response format');
  }
}
