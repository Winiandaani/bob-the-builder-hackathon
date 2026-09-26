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
      badgeColor: '#c97b56',
      badgeBg: 'rgba(201,123,86,0.15)',
      badgeBorder: 'rgba(201,123,86,0.35)',
      content: <p className="text-sm font-medium leading-relaxed" style={{ color: '#dce4ec' }}>{explanation}</p>,
    },
    {
      badge: 'Tech Stack',
      badgeColor: '#dce4ec',
      badgeBg: 'rgba(125,80,145,0.2)',
      badgeBorder: 'rgba(125,80,145,0.45)',
      content: <p className="text-sm font-medium leading-relaxed" style={{ color: '#dce4ec' }}>{techStack}</p>,
    },
    {
      badge: 'Good First Tasks',
      badgeColor: '#c97b56',
      badgeBg: 'rgba(201,123,86,0.12)',
      badgeBorder: 'rgba(201,123,86,0.3)',
      content: (
        <ol className="flex flex-col gap-2">
          {suggestedTasks.map((task, i) => (
            <li key={i} className="flex gap-3 items-start stagger-item" style={{ animationDelay: `${0.45 + i * 0.1}s` }}>
              <span
                className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                style={{
                  background: 'rgba(201,123,86,0.18)',
                  color: '#c97b56',
                  border: '1px solid rgba(201,123,86,0.4)',
                }}
              >
                {i + 1}
              </span>
              <span className="text-sm font-medium leading-relaxed" style={{ color: '#dce4ec' }}>{task}</span>
            </li>
          ))}
        </ol>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Repo title — orange dominant on Code Explorer */}
      <h2
        className="text-2xl font-bold flex items-center gap-2"
        style={{ color: '#c97b56', fontFamily: "'Cabinet Grotesk', system-ui, sans-serif" }}
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
            style={{ background: 'rgba(22,36,58,0.92)' }}
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
