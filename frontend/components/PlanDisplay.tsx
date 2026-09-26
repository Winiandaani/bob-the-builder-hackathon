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
        style={{ background: 'rgba(22,36,58,0.92)' }}
      >
        <h2
          className="mb-4 text-xl font-bold"
          style={{ color: '#dce4ec', fontFamily: "'Cabinet Grotesk', system-ui, sans-serif" }}
        >
          Your Build Plan
        </h2>
        <ol className="flex flex-col gap-3">
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
                animationDelay: `${index * 0.1}s`,
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
              {/* Strip any leading "Step N:" prefix */}
              <span className="text-sm font-medium" style={{ color: '#dce4ec' }}>
                {step.replace(/^Step\s+\d+:\s*/i, '')}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
