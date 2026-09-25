'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

type Mode = 'signin' | 'signup';

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setIsLoading(true);

    try {
      if (mode === 'signin') {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) {
          setError(signInError.message);
        } else {
          router.push('/');
        }
      } else {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });
        if (signUpError) {
          setError(signUpError.message);
        } else {
          setMessage('Check your email to confirm your account.');
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setMode((m) => (m === 'signin' ? 'signup' : 'signin'));
    setError('');
    setMessage('');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1rem',
      }}
    >
      <div
        style={{
          background: '#0d1f35',
          border: '1px solid #1a3a5c',
          borderRadius: '12px',
          padding: '2.5rem 2rem',
          width: '100%',
          maxWidth: '400px',
          boxShadow: '0 0 0 1px #1a3a5c, 0 -3px 0 0 #00e5ff',
        }}
      >
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1
            style={{
              fontFamily: 'var(--font-space-grotesk), "Space Grotesk", system-ui, sans-serif',
              fontSize: '1.75rem',
              fontWeight: 700,
              color: '#00e5ff',
              margin: '0 0 0.5rem',
              letterSpacing: '0.02em',
            }}
          >
            Mission Control
          </h1>
          <p style={{ color: '#64748b', margin: 0, fontSize: '0.95rem' }}>
            {mode === 'signin' ? 'Sign in to your account' : 'Create your account'}
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Email */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <label style={{ color: '#94a3b8', fontSize: '0.85rem' }} htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                background: '#050d1a',
                border: '1px solid #1a3a5c',
                borderRadius: '6px',
                padding: '0.6rem 0.75rem',
                color: '#e2e8f0',
                fontSize: '0.95rem',
                outline: 'none',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#00e5ff')}
              onBlur={(e) => (e.target.style.borderColor = '#1a3a5c')}
            />
          </div>

          {/* Password */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <label style={{ color: '#94a3b8', fontSize: '0.85rem' }} htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                background: '#050d1a',
                border: '1px solid #1a3a5c',
                borderRadius: '6px',
                padding: '0.6rem 0.75rem',
                color: '#e2e8f0',
                fontSize: '0.95rem',
                outline: 'none',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#00e5ff')}
              onBlur={(e) => (e.target.style.borderColor = '#1a3a5c')}
            />
          </div>

          {/* Error */}
          {error && (
            <div
              style={{
                background: 'rgba(248, 113, 113, 0.1)',
                border: '1px solid #f87171',
                borderRadius: '6px',
                padding: '0.6rem 0.75rem',
                color: '#f87171',
                fontSize: '0.875rem',
              }}
            >
              {error}
            </div>
          )}

          {/* Success message */}
          {message && (
            <div
              style={{
                background: 'rgba(0, 229, 255, 0.08)',
                border: '1px solid #00e5ff',
                borderRadius: '6px',
                padding: '0.6rem 0.75rem',
                color: '#00e5ff',
                fontSize: '0.875rem',
              }}
            >
              {message}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            style={{
              background: '#00e5ff',
              color: '#050d1a',
              border: 'none',
              borderRadius: '6px',
              padding: '0.7rem 1rem',
              fontWeight: 700,
              fontSize: '0.95rem',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              opacity: isLoading ? 0.7 : 1,
              width: '100%',
              transition: 'filter 0.15s',
            }}
          >
            {isLoading ? 'Please wait…' : mode === 'signin' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        {/* Toggle */}
        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem', color: '#64748b' }}>
          {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
          <button
            onClick={toggleMode}
            style={{
              background: 'none',
              border: 'none',
              color: '#00e5ff',
              cursor: 'pointer',
              fontSize: 'inherit',
              padding: 0,
              textDecoration: 'underline',
            }}
          >
            {mode === 'signin' ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  );
}
