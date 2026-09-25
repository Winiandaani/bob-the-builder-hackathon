export default function ScanningAnimation() {
  return (
    <div className="flex flex-col items-center gap-4 py-2">
      {/* Rings container */}
      <div className="relative flex items-center justify-center" style={{ width: 120, height: 120 }}>
        {/* Ring 1 — delay 0s */}
        <span
          className="animate-ping-ring absolute rounded-full border border-[#00e5ff]"
          style={{ width: 120, height: 120, animationDelay: '0s' }}
        />
        {/* Ring 2 — delay 0.6s */}
        <span
          className="animate-ping-ring absolute rounded-full border border-[#00e5ff]"
          style={{ width: 120, height: 120, animationDelay: '0.6s' }}
        />
        {/* Ring 3 — delay 1.2s */}
        <span
          className="animate-ping-ring absolute rounded-full border border-[#00e5ff]"
          style={{ width: 120, height: 120, animationDelay: '1.2s' }}
        />
        {/* Center dot with crosshair */}
        <span
          className="relative flex items-center justify-center rounded-full"
          style={{ width: 16, height: 16, background: 'rgba(0,229,255,0.2)', border: '1.5px solid #00e5ff' }}
        >
          {/* Crosshair lines */}
          <span style={{ position: 'absolute', width: 1, height: 8, background: '#00e5ff', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
          <span style={{ position: 'absolute', height: 1, width: 8, background: '#00e5ff', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
        </span>
      </div>

      {/* Label */}
      <span className="text-sm tracking-widest uppercase" style={{ color: '#00e5ff' }}>
        Scanning…
      </span>
    </div>
  );
}
