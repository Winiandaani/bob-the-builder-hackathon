interface RepoResultCardsProps {
  repoName: string;
  explanation: string;
  techStack: string;
  suggestedTasks: string[];
}

export default function RepoResultCards({
  repoName,
  explanation,
  techStack,
  suggestedTasks,
}: RepoResultCardsProps) {
  return (
    <div className="animate-fade-slide-in flex flex-col gap-6">
      {/* Repo title */}
      <h2
        className="text-2xl font-bold flex items-center gap-2"
        style={{ color: '#00e5ff', fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif' }}
      >
        <span style={{ fontSize: '1.4rem' }}>⬡</span>
        <span>{repoName}</span>
      </h2>

      {/* Card 1 — What it does */}
      <div
        className="rounded-xl border p-5 flex flex-col gap-3"
        style={{ background: '#0d1f35', borderColor: '#1a3a5c' }}
      >
        <span
          className="text-xs font-bold tracking-widest uppercase"
          style={{ color: '#00e5ff' }}
        >
          What it does
        </span>
        <p className="text-sm leading-relaxed" style={{ color: '#e2e8f0' }}>
          {explanation}
        </p>
      </div>

      {/* Card 2 — Tech Stack */}
      <div
        className="rounded-xl border p-5 flex flex-col gap-3"
        style={{ background: '#0d1f35', borderColor: '#1a3a5c' }}
      >
        <span
          className="text-xs font-bold tracking-widest uppercase"
          style={{ color: '#a855f7' }}
        >
          Tech Stack
        </span>
        <p className="text-sm leading-relaxed" style={{ color: '#e2e8f0' }}>
          {techStack}
        </p>
      </div>

      {/* Card 3 — Suggested first tasks */}
      <div
        className="rounded-xl border p-5 flex flex-col gap-3"
        style={{ background: '#0d1f35', borderColor: '#1a3a5c' }}
      >
        <span
          className="text-xs font-bold tracking-widest uppercase"
          style={{ color: '#00e5ff' }}
        >
          Good First Tasks
        </span>
        <ol className="flex flex-col gap-2">
          {suggestedTasks.map((task, index) => (
            <li key={index} className="flex gap-3 items-start">
              <span
                className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                style={{
                  background: 'rgba(168,85,247,0.15)',
                  color: '#a855f7',
                  border: '1px solid rgba(168,85,247,0.3)',
                }}
              >
                {index + 1}
              </span>
              <span className="text-sm leading-relaxed" style={{ color: '#e2e8f0' }}>
                {task}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
