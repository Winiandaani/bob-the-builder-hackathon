'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '@/lib/auth';

const navLinks = [
  { label: 'Idea Planner', href: '/' },
  { label: 'Code Explorer', href: '/explore' },
  { label: 'History', href: '/history' },
];

export default function NavBar() {
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      style={{
        background: 'rgba(15,27,46,0.92)',
        borderBottom: '1px solid #263a52',
        padding: '0 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '56px',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backdropFilter: 'blur(8px)',
      }}
    >
      {/* Brand */}
      <Link
        href="/"
        style={{
          fontFamily: "'Cabinet Grotesk', system-ui, sans-serif",
          fontWeight: 800,
          fontSize: '1.1rem',
          color: '#5fa8a0',
          textDecoration: 'none',
          letterSpacing: '0.03em',
          flexShrink: 0,
        }}
      >
        Mission Control
      </Link>

      {/* Desktop nav links */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem',
        }}
        className="nav-desktop"
      >
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          // Idea Planner → teal active; Code Explorer → orange active; others → teal
          const activeColor = link.href === '/explore' ? '#c97b56' : '#5fa8a0';
          return (
            <Link
              key={link.href}
              href={link.href}
              style={{
                color: isActive ? activeColor : '#7d8ba0',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: isActive ? 700 : 600,
                borderBottom: isActive ? `2px solid ${activeColor}` : '2px solid transparent',
                paddingBottom: '2px',
                transition: 'color 0.15s',
              }}
            >
              {link.label}
            </Link>
          );
        })}
      </div>

      {/* Auth controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        {user ? (
          <>
            <span
              style={{
                color: '#7d8ba0',
                fontSize: '0.85rem',
                maxWidth: '140px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
              title={user.email ?? ''}
            >
              {(user.email ?? '').slice(0, 20)}
            </span>
            <button
              onClick={signOut}
              style={{
                background: 'transparent',
                border: '1px solid #263a52',
                color: '#7d8ba0',
                borderRadius: '6px',
                padding: '4px 12px',
                fontSize: '0.85rem',
                cursor: 'pointer',
              }}
            >
              Sign Out
            </button>
          </>
        ) : (
          <Link
            href="/login"
            style={{
              background: '#5fa8a0',
              color: '#0f1b2e',
              borderRadius: '6px',
              padding: '4px 14px',
              fontSize: '0.85rem',
              fontWeight: 700,
              textDecoration: 'none',
            }}
          >
            Sign In
          </Link>
        )}

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          className="nav-hamburger"
          style={{
            background: 'transparent',
            border: 'none',
            color: '#7d8ba0',
            cursor: 'pointer',
            fontSize: '1.4rem',
            lineHeight: 1,
            display: 'none',
          }}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Inline styles for responsive */}
      <style>{`
        @media (max-width: 640px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
