export interface RepoAnalysis {
  repoName: string;
  explanation: string;
  techStack: string;
  suggestedTasks: string[];
}

export async function fetchRepoAnalysis(repoUrl: string): Promise<RepoAnalysis> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

  const response = await fetch(`${apiUrl}/api/explore-repo`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ repoUrl }),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error((data as { error?: string }).error ?? 'Failed to analyse repository.');
  }

  return response.json() as Promise<RepoAnalysis>;
}
