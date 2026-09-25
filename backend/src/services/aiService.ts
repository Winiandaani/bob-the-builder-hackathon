import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.AI_API_KEY ?? '' });

const SYSTEM_PROMPT = `You are a helpful software project planner for beginners.
When given a project idea, respond with a clear, numbered, step-by-step build plan.
Each step should be on its own line, prefixed with "Step N:" (e.g. "Step 1: ...").
Keep each step concise and beginner-friendly. Return between 5 and 8 steps.`;

export async function generatePlan(idea: string): Promise<string> {
  const completion = await groq.chat.completions.create({
    model: 'qwen/qwen3.8-27b',
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: `Give me a step-by-step build plan for: ${idea}` },
    ],
    temperature: 0.7,
  });

  return completion.choices[0].message.content ?? '';
}
