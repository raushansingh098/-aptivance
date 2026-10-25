import React, { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { GraduationCap, X } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    authMode,
    setAuthMode,
    loginUser,
    registerUser,
    isBackendConfigured,
    isAuthenticated
  } = useApp();

  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!isAuthModalOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !isAuthenticated) {
        setIsAuthModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAuthModalOpen, isAuthenticated, setIsAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (authMode === 'register' && password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    setBusy(true);
    try {
      if (authMode === 'register') {
        await registerUser(displayName, email, password);
      } else {
        await loginUser(email, password);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div
      className="aptivance-auth-backdrop fixed inset-0 z-50 flex items-center justify-center p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isAuthenticated) {
          setIsAuthModalOpen(false);
        }
      }}
    >
      <div
        className="aptivance-auth-dialog relative w-full max-w-md rounded-3xl p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-title"
      >
        {!isAuthenticated && (
          <button
            type="button"
            onClick={() => setIsAuthModalOpen(false)}
            aria-label="Close account dialog"
            className="absolute right-5 top-5 rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
          >
            <X className="h-4 w-4" />
          </button>
        )}

        <div className="mb-7 flex items-center gap-2.5 text-[#123d35]">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#d9edbd]">
            <GraduationCap className="h-5 w-5" />
          </div>
          <span className="font-extrabold text-xl tracking-tight">Aptivance</span>
        </div>

        <h2 id="auth-title" className="mb-2 pr-8 text-2xl font-black tracking-tight text-slate-900">
          {authMode === 'register' ? 'Create your account' : 'Welcome back'}
        </h2>
        <p className="mb-6 text-sm leading-6 text-slate-600">
          {authMode === 'register'
            ? 'Start turning your career goals into a clear, personal learning plan.'
            : 'Sign in to pick up where your learning plan left off.'}
        </p>

        {!isBackendConfigured && (
          <p className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
            Account sign-in is temporarily unavailable because the site owner has not connected the account service yet.
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="auth-email" className="mb-1.5 block text-xs font-bold text-slate-900">
              Email
            </label>
            <input
              id="auth-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full rounded-xl border border-slate-200 bg-[#f8fafc] px-4 py-3 text-sm text-slate-800 transition placeholder:text-slate-400 focus:border-[#176b54] focus:bg-white focus:outline-none focus:ring-3 focus:ring-emerald-900/10"
              required
              disabled={!isBackendConfigured || busy}
            />
          </div>

          {authMode === 'register' && (
            <div>
              <label htmlFor="auth-name" className="mb-1.5 block text-xs font-bold text-slate-900">
                Display Name
              </label>
              <input
                id="auth-name"
                type="text"
                autoComplete="name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Your Name"
                className="w-full rounded-xl border border-slate-200 bg-[#f8fafc] px-4 py-3 text-sm text-slate-800 transition placeholder:text-slate-400 focus:border-[#176b54] focus:bg-white focus:outline-none focus:ring-3 focus:ring-emerald-900/10"
                required
                disabled={!isBackendConfigured || busy}
              />
              <p className="mt-1 text-[11px] text-slate-500">
                Spaces, emojis, and special characters are all allowed
              </p>
            </div>
          )}

          <div>
            <label htmlFor="auth-password" className="mb-1.5 block text-xs font-bold text-slate-900">
              Password
            </label>
            <input
              id="auth-password"
              type="password"
              autoComplete={authMode === 'register' ? 'new-password' : 'current-password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl border border-slate-200 bg-[#f8fafc] px-4 py-3 text-sm text-slate-800 transition placeholder:text-slate-400 focus:border-[#176b54] focus:bg-white focus:outline-none focus:ring-3 focus:ring-emerald-900/10"
              required
              disabled={!isBackendConfigured || busy}
            />
            {authMode === 'register' && (
              <p className="mt-1 text-[11px] text-slate-500">
                Use at least 8 characters.
              </p>
            )}
          </div>

          {error && (
            <p role="alert" aria-live="polite" className="rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-xs text-red-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={busy || !isBackendConfigured}
            className="mt-2 w-full rounded-xl bg-[#123d35] px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#0c302a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {busy ? 'Please wait…' : authMode === 'register' ? 'Create free account' : 'Sign in'}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-600">
          {authMode === 'register' ? (
            <p>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setAuthMode('login')}
                className="font-bold text-[#176b54] underline-offset-4 hover:underline focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
              >
                Log in
              </button>
            </p>
          ) : (
            <p>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => setAuthMode('register')}
                className="font-bold text-[#176b54] underline-offset-4 hover:underline focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
              >
                Create one
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
