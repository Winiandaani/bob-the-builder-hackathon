'use client';

import { useState, useEffect, useRef } from 'react';

/**
 * Types `text` character-by-character.
 * Re-runs from scratch whenever `text` changes (e.g. on navigation via key prop).
 */
export function useTypingEffect(text: string, speedMs = 35) {
  const [displayed, setDisplayed] = useState('');
  const indexRef = useRef(0);

  useEffect(() => {
    // Reset when text changes
    indexRef.current = 0;
    setDisplayed('');

    const id = setInterval(() => {
      indexRef.current += 1;
      setDisplayed(text.slice(0, indexRef.current));
      if (indexRef.current >= text.length) clearInterval(id);
    }, speedMs);

    return () => clearInterval(id);
  }, [text, speedMs]);

  return { displayed, done: displayed.length >= text.length };
}
