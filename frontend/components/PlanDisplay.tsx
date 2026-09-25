interface PlanDisplayProps {
  plan: string;
}

export default function PlanDisplay({ plan }: PlanDisplayProps) {
  if (!plan) return null;

  const steps = plan.split('\n').filter((line) => line.trim() !== '');

  return (
    <div className="card-scan-border rounded-xl animate-fade-slide-in">
      <div
        className="w-full rounded-xl p-6"
        style={{ background: '#241640' }}
      >
        <h2
          className="mb-4 text-xl font-bold"
          style={{ color: '#ede9f5', fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif' }}
        >
          Your Build Plan
        </h2>
        <ol className="flex flex-col gap-3">
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
                animationDelay: `${index * 0.1}s`,
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
              {/* Strip any leading "Step N:" prefix */}
              <span className="text-sm font-medium" style={{ color: '#ede9f5' }}>
                {step.replace(/^Step\s+\d+:\s*/i, '')}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
