'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import IdeaForm from '@/components/IdeaForm';
import PlanDisplay from '@/components/PlanDisplay';
import TypingText from '@/components/TypingText';
import { fetchPlan } from '@/lib/api';

const SUBTITLE = 'Describe your idea. Get a mission-ready build plan.';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [plan, setPlan] = useState('');
  const [error, setError] = useState('');
  const pathname = usePathname();

  async function handleSubmit(idea: string) {
    setIsLoading(true);
    setError('');
    setPlan('');

    try {
      const result = await fetchPlan(idea);
      setPlan(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center px-4 py-16">
      <div className="w-full max-w-2xl flex flex-col gap-8 animate-fade-slide-in">

        {/* Header */}
        <div className="text-center">
          <h1
            className="text-3xl font-bold"
            style={{ color: '#5fa8a0', fontFamily: "'Cabinet Grotesk', system-ui, sans-serif" }}
          >
            Idea Planner
          </h1>
          {/* Typing effect — key on pathname so it replays on every navigation */}
          <p className="mt-2" style={{ color: '#7d8ba0', fontWeight: 500 }}>
            <TypingText key={pathname} text={SUBTITLE} />
          </p>
        </div>

        {/* Form */}
        <IdeaForm onSubmit={handleSubmit} isLoading={isLoading} />

        {/* API error */}
        {error && (
          <div
            className="rounded-lg border p-4 text-sm"
            style={{
              borderColor: '#f87171',
              background: 'rgba(248,113,113,0.1)',
              color: '#f87171',
            }}
          >
            {error}
          </div>
        )}

        {/* Plan result */}
        <PlanDisplay plan={plan} />

      </div>
    </main>
  );
}
