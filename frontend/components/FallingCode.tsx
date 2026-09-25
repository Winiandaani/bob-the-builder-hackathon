'use client';

import { useEffect, useState } from 'react';

// Fixed-position background layer with falling "code" columns.
// pointer-events: none so it never blocks clicks on content above it.
//
// Characters are rendered only after mount (client-only) to completely avoid
// any server/client hydration mismatch. The server renders empty spans;
// the client fills them in once React has hydrated.

// 18 columns: left position (%), animation duration (s), delay (s)
const COLUMNS = [
  { left: 3,  duration: 8,  delay: 0   },
  { left: 8,  duration: 11, delay: 1.3 },
  { left: 13, duration: 9,  delay: 2.7 },
  { left: 19, duration: 13, delay: 0.5 },
  { left: 25, duration: 10, delay: 3.8 },
  { left: 31, duration: 7,  delay: 1.9 },
  { left: 37, duration: 12, delay: 4.2 },
  { left: 43, duration: 9,  delay: 0.8 },
  { left: 48, duration: 14, delay: 2.1 },
  { left: 54, duration: 8,  delay: 5.0 },
  { left: 60, duration: 11, delay: 1.5 },
  { left: 65, duration: 10, delay: 3.3 },
  { left: 71, duration: 7,  delay: 0.3 },
  { left: 76, duration: 13, delay: 4.7 },
  { left: 81, duration: 9,  delay: 2.5 },
  { left: 86, duration: 12, delay: 1.1 },
  { left: 91, duration: 8,  delay: 3.6 },
  { left: 96, duration: 10, delay: 0.6 },
];

// Fixed character columns — hardcoded literals, zero computation.
// Server and client always agree on empty string before mount.
const COLUMN_CHARS = [
  '0\n1\n{\n}\n[\n]\n(\n)\n<\n>\n/\n;\n:\n=\n+\n*\n#\n@',
  '!\n?\na\nb\nc\nd\ne\nf\nA\nB\nC\nD\nE\nF',
  '0\n1\n{\n}\n[\n]\n(\n)\n<\n>\n/\n;\n:\n=\n+\n*\n#\n@\n!\n?',
  'a\nb\nc\nd\ne\nf\nA\nB\nC\nD\nE\nF',
  '0\n1\n{\n}\n[\n]\n(\n)\n<\n>\n/\n;\n:\n=\n+\n*',
  '!\n?\na\nb\nc\nd\ne\nf\nA\nB\nC\nD\nE\nF\n0\n1\n{\n}\n[\n]\n(\n)',
  '<\n>\n/\n;\n:\n=\n+\n*\n#\n@\n!\n?\na\nb\nc',
  '0\n1\n{\n}\n[\n]\n(\n)\n<\n>\n/\n;\n:\n=\n+\n*\n#\n@\n!',
  'A\nB\nC\nD\nE\nF\na\nb\nc\nd\ne',
  '0\n1\n{\n}\n[\n]\n(\n)\n<\n>\n/\n;\n:\n=\n+\n*\n#',
  '!\n?\na\nb\nc\nd\ne\nf\nA\nB\nC\nD\nE\nF\n0\n1\n{\n}\n[\n]\n(',
  ')\n<\n>\n/\n;\n:\n=\n+\n*\n#\n@\n!\n?',
  '0\n1\n{\n}\n[\n]\n(\n)\n<\n>\n/\n;\n:\n=\n+\n*\n#\n@',
  '!\n?\na\nb\nc\nd\ne\nf\nA\nB\nC\nD\nE\nF',
  '0\n1\n{\n}\n[\n]\n(\n)\n<\n>\n/\n;\n:\n=\n+\n*\n#\n@\n!\n?',
  'a\nb\nc\nd\ne\nf\nA\nB\nC\nD\nE\nF\n0\n1\n{\n}',
  '[\n]\n(\n)\n<\n>\n/\n;\n:\n=\n+\n*',
  '0\n1\n{\n}\n[\n]\n(\n)\n<\n>\n/\n;\n:\n=\n+\n*\n#\n@\n!',
];

export default function FallingCode() {
  // mounted tracks whether we're on the client after hydration.
  // Server renders empty spans; client fills in characters after mount.
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: -1,
      }}
    >
      {COLUMNS.map((col, i) => (
        <span
          key={i}
          className="falling-col"
          style={{
            left: `${col.left}%`,
            animationDuration: `${col.duration}s`,
            animationDelay: `${col.delay}s`,
          }}
        >
          {/* Empty on server/before hydration; filled after mount */}
          {mounted ? COLUMN_CHARS[i] : ''}
        </span>
      ))}
    </div>
  );
}
