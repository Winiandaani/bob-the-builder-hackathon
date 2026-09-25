'use client';

import { useState, FormEvent } from 'react';
import ScanningAnimation from '@/components/ScanningAnimation';

interface IdeaFormProps {
  onSubmit: (idea: string) => void;
  isLoading: boolean;
}

export default function IdeaForm({ onSubmit, isLoading }: IdeaFormProps) {
  const [idea, setIdea] = useState('');
  const [validationError, setValidationError] = useState('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (idea.trim() === '') {
      setValidationError('Please enter a project idea before submitting.');
      return;
    }
    setValidationError('');
    onSubmit(idea.trim());
  }

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
      <label
        htmlFor="idea"
        className="text-sm font-medium tracking-wide"
        style={{ color: '#64748b', fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif' }}
      >
        Describe your project idea
      </label>

      <textarea
        id="idea"
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
        placeholder="e.g. A to-do app for university students that lets them group tasks by subject"
        rows={4}
        className="w-full rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#00e5ff] resize-none transition-colors"
        style={{
          background: '#0d1f35',
          border: '1px solid #1a3a5c',
          color: '#e2e8f0',
        }}
        disabled={isLoading}
      />

      {validationError && (
        <p className="text-sm" style={{ color: '#f87171' }}>{validationError}</p>
      )}

      {isLoading && <ScanningAnimation />}

      <button
        type="submit"
        disabled={isLoading}
        className="self-end rounded-lg px-6 py-2.5 text-sm font-bold transition-all hover:brightness-110 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60"
        style={{ background: '#00e5ff', color: '#050d1a' }}
      >
        {isLoading ? 'Generating…' : 'Generate Plan'}
      </button>
    </form>
  );
}
