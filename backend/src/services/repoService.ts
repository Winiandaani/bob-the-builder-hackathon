const GITHUB_HEADERS = {
  'User-Agent': 'project-idea-planner',
  'Accept': 'application/vnd.github+json',
};

export interface RepoData {
  repoName: string;
  primaryLanguage: string | null;
  rootFiles: string[];
  readmeExcerpt: string;
}

function parseOwnerRepo(repoUrl: string): { owner: string; repo: string } {
  const cleaned = repoUrl.replace(/\.git$/, '').replace(/\/$/, '');
  const match = cleaned.match(/^https:\/\/github\.com\/([^/]+)\/([^/]+)$/);
  if (!match) {
    throw new Error('Invalid GitHub repository URL');
  }
  return { owner: match[1], repo: match[2] };
}

async function githubFetch(url: string): Promise<Response> {
  const res = await fetch(url, { headers: GITHUB_HEADERS });
  if (res.status === 404) {
    throw new Error('Repository not found');
  }
  if (res.status === 403) {
    throw new Error('GitHub rate limit exceeded. Please try again later.');
  }
  return res;
}

export async function fetchRepoData(repoUrl: string): Promise<RepoData> {
  const { owner, repo } = parseOwnerRepo(repoUrl);
  const base = `https://api.github.com/repos/${owner}/${repo}`;

  // 1. Repo metadata
  const metaRes = await githubFetch(base);
  const meta = await metaRes.json() as {
    name: string;
    full_name: string;
    language: string | null;
    description: string | null;
  };

  // 2. Root file tree
  const contentsRes = await githubFetch(`${base}/contents/`);
  const contents = await contentsRes.json() as Array<{ name: string; type: string }>;
  const rootFiles = contents.map((entry) => entry.name);

  // 3. README
  let readmeExcerpt = '';
  try {
    const readmeRes = await githubFetch(`${base}/readme`);
    const readmeData = await readmeRes.json() as { content: string };
    const decoded = Buffer.from(readmeData.content, 'base64').toString('utf-8');
    readmeExcerpt = decoded.slice(0, 3000);
  } catch (err: unknown) {
    // README is optional — if not found, leave excerpt empty
    if (err instanceof Error && err.message !== 'Repository not found') {
      throw err;
    }
  }

  return {
    repoName: meta.name,
    primaryLanguage: meta.language,
    rootFiles,
    readmeExcerpt,
  };
}
