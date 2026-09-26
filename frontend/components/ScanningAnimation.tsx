interface ScanningAnimationProps {
  /** Optional cycling status text shown below the rings */
  statusText?: string;
}

export default function ScanningAnimation({ statusText }: ScanningAnimationProps) {
  return (
    <div className="flex flex-col items-center gap-4 py-2">
      {/* Rings container */}
      <div className="relative flex items-center justify-center" style={{ width: 120, height: 120 }}>
        {/* Ring 1 — teal, delay 0s */}
        <span
          className="animate-ping-ring absolute rounded-full"
          style={{
            width: 120, height: 120,
            border: '1.5px solid #5fa8a0',
            animationDelay: '0s',
          }}
        />
        {/* Ring 2 — orange, delay 0.6s */}
        <span
          className="animate-ping-ring absolute rounded-full"
          style={{
            width: 120, height: 120,
            border: '1.5px solid #c97b56',
            animationDelay: '0.6s',
          }}
        />
        {/* Ring 3 — lilac, delay 1.2s */}
        <span
          className="animate-ping-ring absolute rounded-full"
          style={{
            width: 120, height: 120,
            border: '1.5px solid #7D5091',
            animationDelay: '1.2s',
          }}
        />
        {/* Center dot with crosshair */}
        <span
          className="relative flex items-center justify-center rounded-full"
          style={{ width: 16, height: 16, background: 'rgba(95,168,160,0.2)', border: '1.5px solid #5fa8a0' }}
        >
          <span style={{ position: 'absolute', width: 1, height: 8, background: '#5fa8a0', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
          <span style={{ position: 'absolute', height: 1, width: 8, background: '#5fa8a0', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
        </span>
      </div>

      {/* Status label */}
      <span className="text-sm tracking-widest uppercase font-medium" style={{ color: '#5fa8a0', minHeight: '1.25em' }}>
        {statusText ?? 'Scanning…'}
      </span>
    </div>
  );
}
