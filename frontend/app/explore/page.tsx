'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import ScanningAnimation from '@/components/ScanningAnimation';
import RepoResultCards from '@/components/RepoResultCards';
import { fetchRepoAnalysis, RepoAnalysis } from '@/lib/repoApi';
import { useAuth } from '@/lib/auth';
import { supabase } from '@/lib/supabaseClient';

export default function ExplorePage() {
  const { user } = useAuth();

  const [repoUrl, setRepoUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<RepoAnalysis | null>(null);
  const [saved, setSaved] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!repoUrl.startsWith('https://github.com/')) {
      setError('Please enter a valid public GitHub URL (https://github.com/...)');
      return;
    }

    setError('');
    setResult(null);
    setSaved(false);
    setIsLoading(true);

    try {
      const data = await fetchRepoAnalysis(repoUrl);
      setResult(data);

      if (user) {
        try {
          await supabase.from('repos_history').insert({
            user_id: user.id,
            repo_url: repoUrl,
            repo_name: data.repoName,
            analysis: JSON.stringify({
              explanation: data.explanation,
              techStack: data.techStack,
              suggestedTasks: data.suggestedTasks,
            }),
          });
          setSaved(true);
        } catch {
          // Silently ignore save failures — results are still shown
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  }

  function handleReset() {
    setResult(null);
    setError('');
    setSaved(false);
  }

  return (
    <main className="min-h-screen px-4 py-16" style={{ background: '#050d1a' }}>
      <div className="animate-fade-slide-in max-w-2xl mx-auto flex flex-col gap-8">

        {/* Heading */}
        <div className="flex flex-col gap-2">
          <h1
            className="text-3xl font-bold"
            style={{
              color: '#00e5ff',
              fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
            }}
          >
            Code Explorer
          </h1>
          <p className="text-sm" style={{ color: '#64748b' }}>
            Paste a public GitHub repo URL to scan its architecture and get AI insights.
          </p>
        </div>

        {/* Input form — hidden while loading */}
        {!isLoading && !result && (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <label
              htmlFor="repoUrl"
              className="text-sm font-medium tracking-wide"
              style={{ color: '#64748b', fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif' }}
            >
              GitHub repository URL
            </label>
            <input
              id="repoUrl"
              type="text"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              placeholder="https://github.com/owner/repo"
              className="w-full rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#00e5ff] transition-colors"
              style={{
                background: '#0d1f35',
                border: '1px solid #1a3a5c',
                color: '#e2e8f0',
              }}
            />

            {error && (
              <div
                className="rounded-lg border px-4 py-3 text-sm"
                style={{
                  background: 'rgba(248,113,113,0.1)',
                  borderColor: '#f87171',
                  color: '#f87171',
                }}
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              className="self-end rounded-lg px-6 py-2.5 text-sm font-bold transition-all hover:brightness-110 active:scale-[0.97]"
              style={{ background: '#00e5ff', color: '#050d1a' }}
            >
              Scan Repo
            </button>
          </form>
        )}

        {/* Loading state */}
        {isLoading && (
          <div className="flex flex-col items-center gap-4 py-12">
            <ScanningAnimation />
            <p className="text-sm" style={{ color: '#64748b' }}>
              Fetching repo data and running AI analysis...
            </p>
          </div>
        )}

        {/* Error shown outside form (e.g. after a previous attempt was reset) */}
        {!isLoading && result === null && error && !repoUrl && (
          <div
            className="rounded-lg border px-4 py-3 text-sm"
            style={{
              background: 'rgba(248,113,113,0.1)',
              borderColor: '#f87171',
              color: '#f87171',
            }}
          >
            {error}
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="flex flex-col gap-6">
            <RepoResultCards
              repoName={result.repoName}
              explanation={result.explanation}
              techStack={result.techStack}
              suggestedTasks={result.suggestedTasks}
            />

            {/* Save status */}
            {user && saved && (
              <p className="text-sm font-medium" style={{ color: '#34d399' }}>
                ✓ Saved to your history
              </p>
            )}
            {user && !saved && (
              <p className="text-sm" style={{ color: '#64748b' }}>
                Saving to your history…
              </p>
            )}
            {!user && (
              <div
                className="rounded-xl border px-5 py-4 text-sm"
                style={{ background: '#0d1f35', borderColor: '#1a3a5c', color: '#e2e8f0' }}
              >
                Sign in to save this to your history.{' '}
                <Link href="/login" className="font-semibold hover:underline" style={{ color: '#00e5ff' }}>
                  Sign in
                </Link>
              </div>
            )}

            {/* Scan another repo */}
            <button
              onClick={handleReset}
              className="self-start rounded-lg px-5 py-2 text-sm font-medium border transition-all hover:brightness-110"
              style={{
                background: 'transparent',
                borderColor: '#1a3a5c',
                color: '#e2e8f0',
              }}
            >
              ← Scan another repo
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
