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
        style={{ background: '#241640', border: '1px solid #3d2a5c' }}
      >
        {/* Top row */}
        <div className="flex items-center justify-between gap-2">
          <span
            className="px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider"
            style={{
              background: 'rgba(107,33,168,0.2)',
              color: '#ff2d95',
              border: '1px solid rgba(255,45,149,0.35)',
            }}
          >
            Plan
          </span>
          <span className="text-sm" style={{ color: '#9a8bb0' }}>
            {formatDate(props.createdAt)}
          </span>
        </div>

        {/* Idea */}
        <p className="font-semibold text-base" style={{ color: '#ede9f5' }}>
          {props.idea}
        </p>

        {/* Toggle */}
        <button
          onClick={() => setIsExpanded((prev) => !prev)}
          className="self-start text-sm font-medium"
          style={{ color: '#ff2d95', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
        >
          {isExpanded ? 'Hide steps' : 'Show steps'}
        </button>

        {/* Steps */}
        {isExpanded && (
          <ol className="flex flex-col gap-2 mt-1">
            {steps.map((step, index) => (
              <li
                key={index}
                className="flex gap-3 leading-relaxed rounded-lg p-3 border-l-2 stagger-item"
                style={{
                  background: 'rgba(107,33,168,0.08)',
                  borderLeftColor: '#6b21a8',
                  borderTopColor: 'transparent',
                  borderRightColor: 'transparent',
                  borderBottomColor: 'transparent',
                  animationDelay: `${index * 0.07}s`,
                }}
              >
                <span
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                  style={{
                    background: 'rgba(107,33,168,0.2)',
                    color: '#ff2d95',
                    border: '1px solid rgba(255,45,149,0.4)',
                  }}
                >
                  {index + 1}
                </span>
                <span className="text-sm font-medium" style={{ color: '#ede9f5' }}>
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
      style={{ background: '#241640', border: '1px solid #3d2a5c' }}
    >
      {/* Top row */}
      <div className="flex items-center justify-between gap-2">
        <span
          className="px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider"
          style={{
            background: 'rgba(255,45,149,0.12)',
            color: '#ff2d95',
            border: '1px solid rgba(255,45,149,0.3)',
          }}
        >
          Repo
        </span>
        <span className="text-sm" style={{ color: '#9a8bb0' }}>
          {formatDate(props.createdAt)}
        </span>
      </div>

      {/* Repo name */}
      <p className="font-semibold text-base" style={{ color: '#ede9f5' }}>
        <span style={{ color: '#6b21a8' }}>⬡ </span>
        {props.repoName}
      </p>

      {/* Explanation truncated */}
      <p
        className="text-sm font-medium"
        style={{
          color: '#9a8bb0',
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
        className="self-start text-sm font-medium"
        style={{ color: '#ff2d95' }}
      >
        View on GitHub →
      </a>
    </div>
  );
}
