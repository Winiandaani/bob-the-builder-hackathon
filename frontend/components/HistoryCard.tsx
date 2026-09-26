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
        style={{ background: 'rgba(22,36,58,0.92)', border: '1px solid #263a52' }}
      >
        {/* Top row */}
        <div className="flex items-center justify-between gap-2">
          <span
            className="px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider"
            style={{
              background: 'rgba(95,168,160,0.15)',
              color: '#5fa8a0',
              border: '1px solid rgba(95,168,160,0.35)',
            }}
          >
            Plan
          </span>
          <span className="text-sm" style={{ color: '#7d8ba0' }}>
            {formatDate(props.createdAt)}
          </span>
        </div>

        {/* Idea */}
        <p className="font-semibold text-base" style={{ color: '#dce4ec' }}>
          {props.idea}
        </p>

        {/* Toggle */}
        <button
          onClick={() => setIsExpanded((prev) => !prev)}
          className="self-start text-sm font-medium"
          style={{ color: '#5fa8a0', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
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
                  background: 'rgba(95,168,160,0.07)',
                  borderLeftColor: '#5fa8a0',
                  borderTopColor: 'transparent',
                  borderRightColor: 'transparent',
                  borderBottomColor: 'transparent',
                  animationDelay: `${index * 0.07}s`,
                }}
              >
                <span
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                  style={{
                    background: 'rgba(95,168,160,0.18)',
                    color: '#5fa8a0',
                    border: '1px solid rgba(95,168,160,0.45)',
                  }}
                >
                  {index + 1}
                </span>
                <span className="text-sm font-medium" style={{ color: '#dce4ec' }}>
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
      style={{ background: 'rgba(22,36,58,0.92)', border: '1px solid #263a52' }}
    >
      {/* Top row */}
      <div className="flex items-center justify-between gap-2">
        <span
          className="px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider"
          style={{
            background: 'rgba(201,123,86,0.12)',
            color: '#c97b56',
            border: '1px solid rgba(201,123,86,0.3)',
          }}
        >
          Repo
        </span>
        <span className="text-sm" style={{ color: '#7d8ba0' }}>
          {formatDate(props.createdAt)}
        </span>
      </div>

      {/* Repo name */}
      <p className="font-semibold text-base" style={{ color: '#dce4ec' }}>
        <span style={{ color: '#c97b56' }}>⬡ </span>
        {props.repoName}
      </p>

      {/* Explanation truncated */}
      <p
        className="text-sm font-medium"
        style={{
          color: '#7d8ba0',
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
        style={{ color: '#c97b56' }}
      >
        View on GitHub →
      </a>
    </div>
  );
}
