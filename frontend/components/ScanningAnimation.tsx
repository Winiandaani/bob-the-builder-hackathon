interface ScanningAnimationProps {
  /** Optional cycling status text shown below the rings */
  statusText?: string;
}

export default function ScanningAnimation({ statusText }: ScanningAnimationProps) {
  return (
    <div className="flex flex-col items-center gap-4 py-2">
      {/* Rings container */}
      <div className="relative flex items-center justify-center" style={{ width: 120, height: 120 }}>
        {/* Ring 1 — purple, delay 0s */}
        <span
          className="animate-ping-ring absolute rounded-full"
          style={{
            width: 120, height: 120,
            border: '1.5px solid #6b21a8',
            animationDelay: '0s',
          }}
        />
        {/* Ring 2 — pink, delay 0.6s */}
        <span
          className="animate-ping-ring absolute rounded-full"
          style={{
            width: 120, height: 120,
            border: '1.5px solid #ff2d95',
            animationDelay: '0.6s',
          }}
        />
        {/* Ring 3 — mid purple-pink, delay 1.2s */}
        <span
          className="animate-ping-ring absolute rounded-full"
          style={{
            width: 120, height: 120,
            border: '1.5px solid #b830c8',
            animationDelay: '1.2s',
          }}
        />
        {/* Center dot with crosshair */}
        <span
          className="relative flex items-center justify-center rounded-full"
          style={{ width: 16, height: 16, background: 'rgba(255,45,149,0.2)', border: '1.5px solid #ff2d95' }}
        >
          <span style={{ position: 'absolute', width: 1, height: 8, background: '#ff2d95', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
          <span style={{ position: 'absolute', height: 1, width: 8, background: '#ff2d95', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
        </span>
      </div>

      {/* Status label */}
      <span className="text-sm tracking-widest uppercase font-medium" style={{ color: '#ff2d95', minHeight: '1.25em' }}>
        {statusText ?? 'Scanning…'}
      </span>
    </div>
  );
}
