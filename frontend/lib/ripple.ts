import type { MouseEvent } from 'react';

/**
 * Attach to a button's onMouseDown.
 * The button must have `position: relative` and `overflow: hidden`.
 * rippleColor should be a semi-transparent rgba string.
 */
export function createRipple(
  e: MouseEvent<HTMLButtonElement>,
  rippleColor = 'rgba(255,255,255,0.25)',
) {
  const button = e.currentTarget;
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = e.clientX - rect.left - size / 2;
  const y = e.clientY - rect.top - size / 2;

  const circle = document.createElement('span');
  circle.className = 'ripple-circle';
  circle.style.cssText = `
    width: ${size}px;
    height: ${size}px;
    left: ${x}px;
    top: ${y}px;
    background: ${rippleColor};
  `;
  button.appendChild(circle);
  // Remove after animation ends (550ms + small buffer)
  setTimeout(() => circle.remove(), 650);
}
