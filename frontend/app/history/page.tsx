'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { supabase } from '@/lib/supabaseClient';
import HistoryCard from '@/components/HistoryCard';
import TypingText from '@/components/TypingText';

interface PlanRecord {
  id: string;
  idea: string;
  plan: string;
  created_at: string;
}

interface RepoRecord {
  id: string;
  repo_url: string;
  repo_name: string;
  analysis: string;
  created_at: string;
}

export default function HistoryPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const [plans, setPlans] = useState<PlanRecord[]>([]);
  const [repos, setRepos] = useState<RepoRecord[]>([]);
  const [plansLoading, setPlansLoading] = useState(true);
  const [reposLoading, setReposLoading] = useState(true);

  // Auth guard
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [loading, user, router]);

  // Fetch data once user is known
  useEffect(() => {
    if (!user) return;

    async function fetchPlans() {
      setPlansLoading(true);
      const { data } = await supabase
        .from('plans_history')
        .select('id, idea, plan, created_at')
        .order('created_at', { ascending: false });
      setPlans((data as PlanRecord[]) ?? []);
      setPlansLoading(false);
    }

    async function fetchRepos() {
      setReposLoading(true);
      const { data } = await supabase
        .from('repos_history')
        .select('id, repo_url, repo_name, analysis, created_at')
        .order('created_at', { ascending: false });
      setRepos((data as RepoRecord[]) ?? []);
      setReposLoading(false);
    }

    fetchPlans();
    fetchRepos();
  }, [user]);

  // While auth is resolving, show nothing to avoid a redirect flash
  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p style={{ color: '#7d8ba0' }}>Loading…</p>
      </main>
    );
  }

  // If not logged in, rendering will be skipped by the redirect above,
  // but guard here to avoid a content flash.
  if (!user) return null;

  return (
    <main className="min-h-screen px-4 py-16">
      <div className="max-w-3xl mx-auto flex flex-col gap-12 animate-fade-slide-in">
        {/* Page heading */}
        <div className="flex flex-col gap-2">
          <h1
            className="text-4xl font-bold"
            style={{
              color: '#5fa8a0',
              fontFamily: "'Cabinet Grotesk', system-ui, sans-serif",
            }}
          >
            Mission History
          </h1>
          <p className="text-base" style={{ color: '#7d8ba0', fontWeight: 500 }}>
            <TypingText key={pathname} text="Your saved plans and explored repos." />
          </p>
        </div>

        {/* Section 1 — Idea Plans */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <h2
              className="text-xl font-semibold"
              style={{ color: '#dce4ec', fontFamily: "'Cabinet Grotesk', system-ui, sans-serif" }}
            >
              Idea Plans
            </h2>
            <span
              className="px-2 py-0.5 rounded-full text-xs font-bold"
              style={{
                background: 'rgba(95,168,160,0.15)',
                color: '#5fa8a0',
                border: '1px solid rgba(95,168,160,0.35)',
              }}
            >
              {plans.length}
            </span>
          </div>

          {plansLoading ? (
            <p style={{ color: '#7d8ba0' }}>Loading…</p>
          ) : plans.length === 0 ? (
            <div
              className="rounded-xl p-6 text-center"
              style={{ background: 'rgba(22,36,58,0.92)', border: '1px solid #263a52' }}
            >
              <p className="text-sm mb-2" style={{ color: '#7d8ba0' }}>
                No plans saved yet.
              </p>
              <a href="/" style={{ color: '#5fa8a0' }} className="text-sm font-medium">
                → Try Idea Planner
              </a>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {plans.map((p) => (
                <HistoryCard
                  key={p.id}
                  type="plan"
                  idea={p.idea}
                  plan={p.plan}
                  createdAt={p.created_at}
                />
              ))}
            </div>
          )}
        </section>

        {/* Section 2 — Repo Explorations */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <h2
              className="text-xl font-semibold"
              style={{ color: '#dce4ec', fontFamily: "'Cabinet Grotesk', system-ui, sans-serif" }}
            >
              Repo Explorations
            </h2>
            <span
              className="px-2 py-0.5 rounded-full text-xs font-bold"
              style={{
                background: 'rgba(201,123,86,0.12)',
                color: '#c97b56',
                border: '1px solid rgba(201,123,86,0.3)',
              }}
            >
              {repos.length}
            </span>
          </div>

          {reposLoading ? (
            <p style={{ color: '#7d8ba0' }}>Loading…</p>
          ) : repos.length === 0 ? (
            <div
              className="rounded-xl p-6 text-center"
              style={{ background: 'rgba(22,36,58,0.92)', border: '1px solid #263a52' }}
            >
              <p className="text-sm mb-2" style={{ color: '#7d8ba0' }}>
                No repos explored yet.
              </p>
              <a href="/explore" style={{ color: '#c97b56' }} className="text-sm font-medium">
                → Try Code Explorer
              </a>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {repos.map((r) => {
                let explanation = r.analysis;
                try {
                  const parsed = JSON.parse(r.analysis) as { explanation?: string };
                  if (parsed.explanation) explanation = parsed.explanation;
                } catch {
                  // fallback: use raw analysis string
                }
                return (
                  <HistoryCard
                    key={r.id}
                    type="repo"
                    repoName={r.repo_name}
                    repoUrl={r.repo_url}
                    explanation={explanation}
                    createdAt={r.created_at}
                  />
                );
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
