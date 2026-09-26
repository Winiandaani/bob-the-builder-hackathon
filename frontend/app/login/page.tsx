'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import TypingText from '@/components/TypingText';

type Mode = 'signin' | 'signup';

export default function LoginPage() {
  const router = useRouter();
  const pathname = usePathname();
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

  const subtitle = mode === 'signin' ? 'Sign in to your account' : 'Create your account';

  return (
    <div
      className="animate-fade-slide-in"
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
          background: 'rgba(22,36,58,0.92)',
          border: '1px solid #263a52',
          borderRadius: '12px',
          padding: '2.5rem 2rem',
          width: '100%',
          maxWidth: '400px',
          boxShadow: '0 0 0 1px #263a52, 0 -3px 0 0 #5fa8a0',
        }}
      >
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1
            style={{
              fontFamily: "'Cabinet Grotesk', system-ui, sans-serif",
              fontSize: '1.75rem',
              fontWeight: 800,
              color: '#5fa8a0',
              margin: '0 0 0.5rem',
              letterSpacing: '0.02em',
            }}
          >
            Mission Control
          </h1>
          {/* Typing effect — key changes when mode switches so it replays */}
          <p style={{ color: '#7d8ba0', margin: 0, fontSize: '0.95rem' }}>
            <TypingText key={`${pathname}-${mode}`} text={subtitle} />
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Email */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <label style={{ color: '#7d8ba0', fontSize: '0.85rem', fontWeight: 500 }} htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                background: 'rgba(15,27,46,0.9)',
                border: '1px solid #263a52',
                borderRadius: '6px',
                padding: '0.6rem 0.75rem',
                color: '#dce4ec',
                fontSize: '0.95rem',
                outline: 'none',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#5fa8a0')}
              onBlur={(e) => (e.target.style.borderColor = '#263a52')}
            />
          </div>

          {/* Password */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <label style={{ color: '#7d8ba0', fontSize: '0.85rem', fontWeight: 500 }} htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                background: 'rgba(15,27,46,0.9)',
                border: '1px solid #263a52',
                borderRadius: '6px',
                padding: '0.6rem 0.75rem',
                color: '#dce4ec',
                fontSize: '0.95rem',
                outline: 'none',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#5fa8a0')}
              onBlur={(e) => (e.target.style.borderColor = '#263a52')}
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
                background: 'rgba(95,168,160,0.1)',
                border: '1px solid #5fa8a0',
                borderRadius: '6px',
                padding: '0.6rem 0.75rem',
                color: '#dce4ec',
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
              background: '#5fa8a0',
              color: '#0f1b2e',
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
        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem', color: '#7d8ba0' }}>
          {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
          <button
            onClick={toggleMode}
            style={{
              background: 'none',
              border: 'none',
              color: '#5fa8a0',
              cursor: 'pointer',
              fontSize: 'inherit',
              fontWeight: 600,
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
