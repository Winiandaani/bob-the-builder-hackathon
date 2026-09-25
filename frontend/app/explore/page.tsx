'use client';

import { useState, useEffect, FormEvent } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ScanningAnimation from '@/components/ScanningAnimation';
import RepoResultCards from '@/components/RepoResultCards';
import TypingText from '@/components/TypingText';
import { fetchRepoAnalysis, RepoAnalysis } from '@/lib/repoApi';
import { useAuth } from '@/lib/auth';
import { supabase } from '@/lib/supabaseClient';
import { createRipple } from '@/lib/ripple';

const STATUS_MESSAGES = [
  'Fetching repository...',
  'Analyzing structure...',
  'Generating insights...',
];

const SUBTITLE = 'Paste a public GitHub repo URL to scan its architecture and get AI insights.';

export default function ExplorePage() {
  const { user } = useAuth();
  const pathname = usePathname();

  const [repoUrl, setRepoUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<RepoAnalysis | null>(null);
  const [saved, setSaved] = useState(false);
  const [statusIndex, setStatusIndex] = useState(0);

  // Cycle status text every 1.5s while loading
  useEffect(() => {
    if (!isLoading) {
      setStatusIndex(0);
      return;
    }
    const id = setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % STATUS_MESSAGES.length);
    }, 1500);
    return () => clearInterval(id);
  }, [isLoading]);

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
    <main className="min-h-screen px-4 py-16">
      <div className="animate-fade-slide-in max-w-2xl mx-auto flex flex-col gap-8">

        {/* Heading — pink dominant */}
        <div className="flex flex-col gap-2">
          <h1
            className="text-3xl font-bold"
            style={{
              color: '#ff2d95',
              fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
            }}
          >
            Code Explorer
          </h1>
          {/* Typing effect — key on pathname so it replays on every navigation */}
          <p className="text-sm" style={{ color: '#9a8bb0' }}>
            <TypingText key={pathname} text={SUBTITLE} />
          </p>
        </div>

        {/* Input form — hidden while loading or showing results */}
        {!isLoading && !result && (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <label
              htmlFor="repoUrl"
              className="text-sm font-medium tracking-wide"
              style={{ color: '#9a8bb0', fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif' }}
            >
              GitHub repository URL
            </label>

            {/* card-scan-border on the input wrapper */}
            {/* Static border on the input — matches Idea Planner textarea treatment */}
            <input
              id="repoUrl"
              type="text"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              placeholder="https://github.com/owner/repo"
              className="w-full rounded-lg p-3 focus:outline-none transition-colors"
              style={{
                background: '#241640',
                border: '1px solid #ff2d95',
                color: '#ede9f5',
                display: 'block',
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

            {/* Scan Repo button — pink dominant */}
            <button
              type="submit"
              onMouseDown={(e) => createRipple(e, 'rgba(255,45,149,0.35)')}
              className="self-end rounded-lg px-6 py-2.5 text-sm font-bold transition-colors active:scale-[0.95] btn-glow-pink"
              style={{
                background: '#ff2d95',
                color: '#fff',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              Scan Repo
            </button>
          </form>
        )}

        {/* Loading state with cycling status */}
        {isLoading && (
          <div className="flex flex-col items-center gap-4 py-12">
            <ScanningAnimation statusText={STATUS_MESSAGES[statusIndex]} />
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
              <p className="text-sm" style={{ color: '#9a8bb0' }}>
                Saving to your history…
              </p>
            )}
            {!user && (
              <div
                className="rounded-xl border px-5 py-4 text-sm"
                style={{ background: '#241640', borderColor: '#ff2d95', color: '#ede9f5' }}
              >
                Sign in to save this to your history.{' '}
                <Link href="/login" className="font-semibold hover:underline" style={{ color: '#ff2d95' }}>
                  Sign in
                </Link>
              </div>
            )}

            {/* Scan another repo */}
            <button
              onClick={handleReset}
              onMouseDown={(e) => createRipple(e, 'rgba(255,45,149,0.2)')}
              className="self-start rounded-lg px-5 py-2 text-sm font-medium border transition-all hover:brightness-110 btn-glow-pink"
              style={{
                background: 'transparent',
                borderColor: '#ff2d95',
                color: '#ff2d95',
                position: 'relative',
                overflow: 'hidden',
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
