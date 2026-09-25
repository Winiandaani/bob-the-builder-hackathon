interface PlanDisplayProps {
  plan: string;
}

export default function PlanDisplay({ plan }: PlanDisplayProps) {
  if (!plan) return null;

  const steps = plan.split('\n').filter((line) => line.trim() !== '');

  return (
    <div
      className="w-full rounded-xl border p-6 animate-fade-slide-in"
      style={{ background: '#0d1f35', borderColor: '#1a3a5c' }}
    >
      <h2
        className="mb-4 text-xl font-bold"
        style={{ color: '#e2e8f0', fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif' }}
      >
        Your Build Plan
      </h2>
      <ol className="flex flex-col gap-3">
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
            {/* Strip any leading "Step N:" prefix from the placeholder text */}
            <span className="text-sm" style={{ color: '#e2e8f0' }}>
              {step.replace(/^Step\s+\d+:\s*/i, '')}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
