import React, { useState } from 'react';
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

  if (!isAuthModalOpen && isAuthenticated) return null;

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200/80 p-8 animate-in fade-in zoom-in-95 duration-150">
        {isAuthenticated && (
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="absolute top-5 right-5 p-1 text-slate-400 hover:text-slate-600 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        <div className="flex items-center gap-2 mb-6 text-[#00875a]">
          <GraduationCap className="w-6 h-6" />
          <span className="font-extrabold text-xl text-slate-900 tracking-tight">Aptivance</span>
        </div>

        <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-6">
          {authMode === 'register' ? 'Create your account' : 'Welcome back'}
        </h2>

        {!isBackendConfigured && (
          <p className="mb-4 text-xs text-amber-800 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2">
            Account sign-in is temporarily unavailable because the site owner has not connected the account service yet.
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-900 mb-1.5">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-[#f8fafc] text-sm text-slate-800 focus:outline-hidden focus:border-blue-600 focus:bg-white transition"
              required
              disabled={!isBackendConfigured || busy}
            />
          </div>

          {authMode === 'register' && (
            <div>
              <label className="block text-xs font-bold text-slate-900 mb-1.5">
                Display Name
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Your Name"
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-[#f8fafc] text-sm text-slate-800 focus:outline-hidden focus:border-blue-600 focus:bg-white transition"
                required
                disabled={!isBackendConfigured || busy}
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Spaces, emojis, and special characters are all allowed
              </p>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-900 mb-1.5">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-[#f8fafc] text-sm text-slate-800 focus:outline-hidden focus:border-blue-600 focus:bg-white transition"
              required
              disabled={!isBackendConfigured || busy}
            />
            {authMode === 'register' && (
              <p className="text-[11px] text-slate-400 mt-1">
                At least 8 characters with uppercase, lowercase, and number
              </p>
            )}
          </div>

          {error && (
            <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-xl px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={busy || !isBackendConfigured}
            className="w-full mt-2 py-3 px-4 bg-[#1d4ed8] text-white font-bold rounded-2xl hover:bg-blue-700 shadow-md shadow-blue-500/20 transition disabled:opacity-60"
          >
            {busy ? 'Please wait…' : authMode === 'register' ? 'Create Account' : 'Log In'}
          </button>
        </form>

        <div className="text-center mt-6 text-xs text-slate-500">
          {authMode === 'register' ? (
            <p>
              Already registered?{' '}
              <button
                type="button"
                onClick={() => setAuthMode('login')}
                className="font-bold text-[#1d4ed8] hover:underline"
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
                className="font-bold text-[#1d4ed8] hover:underline"
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
