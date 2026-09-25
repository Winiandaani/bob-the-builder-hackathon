'use client';

import { useState } from 'react';

type HistoryCardProps =
  | { type: 'plan'; idea: string; plan: string; createdAt: string }
  | { type: 'repo'; repoName: string; repoUrl: string; explanation: string; createdAt: string };

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export default function HistoryCard(props: HistoryCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (props.type === 'plan') {
    const steps = props.plan
      .split('\n')
      .filter((line) => line.trim() !== '')
      .map((step) => step.replace(/^Step\s+\d+:\s*/i, ''));

    return (
      <div
        className="rounded-xl p-5 flex flex-col gap-3"
        style={{ background: '#0d1f35', border: '1px solid #1a3a5c' }}
      >
        {/* Top row */}
        <div className="flex items-center justify-between gap-2">
          <span
            className="px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider"
            style={{
              background: 'rgba(0,229,255,0.12)',
              color: '#00e5ff',
              border: '1px solid rgba(0,229,255,0.25)',
            }}
          >
            Plan
          </span>
          <span className="text-sm" style={{ color: '#64748b' }}>
            {formatDate(props.createdAt)}
          </span>
        </div>

        {/* Idea */}
        <p className="font-medium text-base" style={{ color: '#e2e8f0' }}>
          {props.idea}
        </p>

        {/* Toggle */}
        <button
          onClick={() => setIsExpanded((prev) => !prev)}
          className="self-start text-sm"
          style={{ color: '#00e5ff', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
        >
          {isExpanded ? 'Hide steps' : 'Show steps'}
        </button>

        {/* Steps */}
        {isExpanded && (
          <ol className="flex flex-col gap-2 mt-1">
            {steps.map((step, index) => (
              <li
                key={index}
                className="flex gap-3 leading-relaxed rounded-lg p-3 border-l-2"
                style={{
                  background: 'rgba(0,229,255,0.03)',
                  borderLeftColor: '#00e5ff',
                  borderTopColor: 'transparent',
                  borderRightColor: 'transparent',
                  borderBottomColor: 'transparent',
                }}
              >
                <span
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                  style={{
                    background: 'rgba(0, 229, 255, 0.15)',
                    color: '#00e5ff',
                    border: '1px solid rgba(0, 229, 255, 0.3)',
                  }}
                >
                  {index + 1}
                </span>
                <span className="text-sm" style={{ color: '#e2e8f0' }}>
                  {step}
                </span>
              </li>
            ))}
          </ol>
        )}
      </div>
    );
  }

  // type === 'repo'
  return (
    <div
      className="rounded-xl p-5 flex flex-col gap-3"
      style={{ background: '#0d1f35', border: '1px solid #1a3a5c' }}
    >
      {/* Top row */}
      <div className="flex items-center justify-between gap-2">
        <span
          className="px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider"
          style={{
            background: 'rgba(168,85,247,0.12)',
            color: '#a855f7',
            border: '1px solid rgba(168,85,247,0.25)',
          }}
        >
          Repo
        </span>
        <span className="text-sm" style={{ color: '#64748b' }}>
          {formatDate(props.createdAt)}
        </span>
      </div>

      {/* Repo name */}
      <p className="font-medium text-base" style={{ color: '#e2e8f0' }}>
        <span style={{ color: '#a855f7' }}>⬡ </span>
        {props.repoName}
      </p>

      {/* Explanation truncated */}
      <p
        className="text-sm"
        style={{
          color: '#64748b',
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
        } as React.CSSProperties}
      >
        {props.explanation}
      </p>

      {/* GitHub link */}
      <a
        href={props.repoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="self-start text-sm"
        style={{ color: '#00e5ff' }}
      >
        View on GitHub →
      </a>
    </div>
  );
}
