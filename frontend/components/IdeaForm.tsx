'use client';

import { useState, FormEvent } from 'react';

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
      <label htmlFor="idea" className="text-sm font-medium text-gray-700">
        Describe your project idea
      </label>

      <textarea
        id="idea"
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
        placeholder="e.g. A to-do app for university students that lets them group tasks by subject"
        rows={4}
        className="w-full rounded-lg border border-gray-300 p-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        disabled={isLoading}
      />

      {validationError && (
        <p className="text-sm text-red-600">{validationError}</p>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="self-end rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading ? 'Generating…' : 'Generate Plan'}
      </button>
    </form>
  );
}
