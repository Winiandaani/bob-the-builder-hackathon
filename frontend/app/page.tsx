'use client';

import { useState } from 'react';
import IdeaForm from '@/components/IdeaForm';
import PlanDisplay from '@/components/PlanDisplay';
import { fetchPlan } from '@/lib/api';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [plan, setPlan] = useState('');
  const [error, setError] = useState('');

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
            style={{ color: '#00e5ff', fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif' }}
          >
            Idea Planner
          </h1>
          <p className="mt-2" style={{ color: '#64748b' }}>
            Describe your idea. Get a mission-ready build plan.
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
              background: 'rgba(248, 113, 113, 0.1)',
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
