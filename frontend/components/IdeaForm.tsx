'use client';

import { useState, FormEvent } from 'react';
import ScanningAnimation from '@/components/ScanningAnimation';
import { createRipple } from '@/lib/ripple';

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
        style={{ color: '#9a8bb0', fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif' }}
      >
        Describe your project idea
      </label>

      {/* Static border — no rotation animation on this element */}
      <textarea
        id="idea"
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
        placeholder="e.g. A to-do app for university students that lets them group tasks by subject"
        rows={4}
        className="w-full rounded-lg p-3 focus:outline-none resize-none transition-colors"
        style={{
          background: '#241640',
          border: '1px solid #6b21a8',
          color: '#ede9f5',
          display: 'block',
        }}
        disabled={isLoading}
      />

      {validationError && (
        <p className="text-sm font-medium" style={{ color: '#f87171' }}>{validationError}</p>
      )}

      {isLoading && <ScanningAnimation />}

      <button
        type="submit"
        disabled={isLoading}
        onMouseDown={(e) => createRipple(e, 'rgba(107,33,168,0.35)')}
        className="self-end rounded-lg px-6 py-2.5 text-sm font-bold transition-colors active:scale-[0.95] disabled:cursor-not-allowed disabled:opacity-60 btn-glow-purple"
        style={{
          background: '#6b21a8',
          color: '#ede9f5',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {isLoading ? 'Generating…' : 'Generate Plan'}
      </button>
    </form>
  );
}
