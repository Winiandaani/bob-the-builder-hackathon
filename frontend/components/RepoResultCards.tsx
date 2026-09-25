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
  // Three cards — each staggered 150ms apart
  const cards = [
    {
      badge: 'What it does',
      badgeColor: '#ff2d95',
      badgeBg: 'rgba(255,45,149,0.15)',
      badgeBorder: 'rgba(255,45,149,0.35)',
      content: <p className="text-sm font-medium leading-relaxed" style={{ color: '#ede9f5' }}>{explanation}</p>,
    },
    {
      badge: 'Tech Stack',
      badgeColor: '#ede9f5',
      badgeBg: 'rgba(107,33,168,0.25)',
      badgeBorder: 'rgba(107,33,168,0.5)',
      content: <p className="text-sm font-medium leading-relaxed" style={{ color: '#ede9f5' }}>{techStack}</p>,
    },
    {
      badge: 'Good First Tasks',
      badgeColor: '#ff2d95',
      badgeBg: 'rgba(255,45,149,0.12)',
      badgeBorder: 'rgba(255,45,149,0.3)',
      content: (
        <ol className="flex flex-col gap-2">
          {suggestedTasks.map((task, i) => (
            <li key={i} className="flex gap-3 items-start stagger-item" style={{ animationDelay: `${0.45 + i * 0.1}s` }}>
              <span
                className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                style={{
                  background: 'rgba(107,33,168,0.25)',
                  color: '#ff2d95',
                  border: '1px solid rgba(255,45,149,0.4)',
                }}
              >
                {i + 1}
              </span>
              <span className="text-sm font-medium leading-relaxed" style={{ color: '#ede9f5' }}>{task}</span>
            </li>
          ))}
        </ol>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Repo title — pink dominant on Code Explorer */}
      <h2
        className="text-2xl font-bold flex items-center gap-2"
        style={{ color: '#ff2d95', fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif' }}
      >
        <span style={{ fontSize: '1.4rem' }}>⬡</span>
        <span>{repoName}</span>
      </h2>

      {cards.map((card, idx) => (
        <div
          key={idx}
          className="card-scan-border rounded-xl stagger-item"
          style={{ animationDelay: `${idx * 0.15}s` }}
        >
          <div
            className="rounded-xl p-5 flex flex-col gap-3"
            style={{ background: '#241640' }}
          >
            <span
              className="text-xs font-bold tracking-widest uppercase"
              style={{
                color: card.badgeColor,
                background: card.badgeBg,
                border: `1px solid ${card.badgeBorder}`,
                borderRadius: '4px',
                padding: '2px 8px',
                alignSelf: 'flex-start',
              }}
            >
              {card.badge}
            </span>
            {card.content}
          </div>
        </div>
      ))}
    </div>
  );
}
