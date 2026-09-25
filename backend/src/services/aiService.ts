/**
 * AI Service — generates a step-by-step build plan from a plain-English idea.
 *
 * v1: Returns a hardcoded placeholder so the full request/response cycle
 * works before a real AI provider is wired in.
 *
 * TODO: replace the placeholder block below with your AI provider SDK call.
 * Example (OpenAI):
 *
 *   import OpenAI from 'openai';
 *   const client = new OpenAI({ apiKey: process.env.AI_API_KEY });
 *
 *   const completion = await client.chat.completions.create({
 *     model: 'gpt-4o',
 *     messages: [
 *       { role: 'system', content: 'You are a helpful software project planner.' },
 *       { role: 'user', content: `Give me a step-by-step build plan for: ${idea}` },
 *     ],
 *   });
 *   return completion.choices[0].message.content ?? '';
 */
export async function generatePlan(idea: string): Promise<string> {
  // ─── PLACEHOLDER — replace this entire block with your AI SDK call ───
  return [
    `Step 1: Define the core goal of your project — "${idea}". Write one sentence describing what it does and who it is for.`,
    'Step 2: List the main features. Start with the smallest version that is still useful (this is your MVP).',
    'Step 3: Choose your tech stack. Pick a frontend framework (e.g. Next.js), a backend (e.g. Express), and a database (e.g. Supabase).',
    'Step 4: Scaffold the project. Create your folder structure, initialise package managers, and get a "Hello World" running.',
    'Step 5: Build the first feature end-to-end — from the UI down to the database — before moving on to the next feature.',
  ].join('\n');
  // ─────────────────────────────────────────────────────────────────────
}
