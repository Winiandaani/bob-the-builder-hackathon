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
    <main className="flex min-h-screen flex-col items-center bg-gray-50 px-4 py-16">
      <div className="w-full max-w-2xl flex flex-col gap-8">

        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Project Idea Planner</h1>
          <p className="mt-2 text-gray-500">
            Describe your idea in plain English and get a step-by-step build plan.
          </p>
        </div>

        {/* Form */}
        <IdeaForm onSubmit={handleSubmit} isLoading={isLoading} />

        {/* API error */}
        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Plan result */}
        <PlanDisplay plan={plan} />

      </div>
    </main>
  );
}
