/**
 * fetchPlan — sends the user's idea to the Express backend and returns the
 * generated plan string.
 *
 * Throws a plain Error if the network request fails or the server returns
 * a non-OK status, so the caller can display a user-friendly message.
 */
export async function fetchPlan(idea: string): Promise<string> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

  const response = await fetch(`${apiUrl}/api/generate-plan`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idea }),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error((data as { error?: string }).error ?? 'Failed to generate plan.');
  }

  const data = await response.json() as { plan: string };
  return data.plan;
}
