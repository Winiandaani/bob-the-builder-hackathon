interface PlanDisplayProps {
  plan: string;
}

export default function PlanDisplay({ plan }: PlanDisplayProps) {
  if (!plan) return null;

  const steps = plan.split('\n').filter((line) => line.trim() !== '');

  return (
    <div className="w-full rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-gray-800">Your Build Plan</h2>
      <ol className="flex flex-col gap-3">
        {steps.map((step, index) => (
          <li key={index} className="flex gap-3 text-sm text-gray-700 leading-relaxed">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
              {index + 1}
            </span>
            {/* Strip any leading "Step N:" prefix from the placeholder text */}
            <span>{step.replace(/^Step\s+\d+:\s*/i, '')}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
