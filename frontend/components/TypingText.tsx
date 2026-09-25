'use client';

import { useTypingEffect } from '@/hooks/useTypingEffect';

interface TypingTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  /** Pass a key prop on the parent to force re-type on navigation */
  speedMs?: number;
}

/**
 * Renders text typing in character-by-character with a blinking cursor.
 * Mount a fresh instance (or change `text`) to restart the animation.
 * The parent page should use `key={pathname}` to remount on navigation.
 */
export default function TypingText({ text, className, style, speedMs }: TypingTextProps) {
  const { displayed, done } = useTypingEffect(text, speedMs);

  return (
    <span className={className} style={style}>
      {displayed}
      {!done && <span className="typing-cursor" aria-hidden="true" />}
    </span>
  );
}
