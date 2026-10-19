import React, { useState, useEffect } from 'react';
import { X, Mail, Lock, AlertCircle, CheckCircle2, ArrowRight, RefreshCw, Key, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { saveManualAnonKey } from '../../lib/supabase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login',
}) => {
  const { signIn, signUp, resendVerification, isConfigured } = useAuth();

  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);
  const [unverifiedEmail, setUnverifiedEmail] = useState<string | null>(null);
  const [resendStatus, setResendStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  // Manual key configuration state if env var is missing
  const [manualKeyInput, setManualKeyInput] = useState('');
  const [showKeyConfig, setShowKeyConfig] = useState(false);

  // Sync mode if initialMode changes
  useEffect(() => {
    setMode(initialMode);
    setErrorMessage(null);
    setSuccessNotice(null);
    setUnverifiedEmail(null);
    setResendStatus('idle');
  }, [initialMode, isOpen]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock background scroll when open
  useEffect(() => {
    if (isOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const validateEmail = (val: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(val);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessNotice(null);
    setUnverifiedEmail(null);
    setResendStatus('idle');

    // Basic client-side validation
    if (!email.trim()) {
      setErrorMessage('Please enter your email address.');
      return;
    }

    if (!validateEmail(email.trim())) {
      setErrorMessage('Please enter a valid email address format (e.g. doctor@example.com).');
      return;
    }

    if (!password) {
      setErrorMessage('Please enter your password.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    if (mode === 'signup') {
      if (password !== confirmPassword) {
        setErrorMessage('Passwords do not match. Please re-enter your password confirmation.');
        return;
      }
    }

    setIsSubmitting(true);

    try {
      if (mode === 'login') {
        const result = await signIn(email, password);
        if (result.success) {
          onClose();
        } else {
          setErrorMessage(result.error || 'Failed to sign in. Please verify your credentials.');
          if (result.requiresVerification) {
            setUnverifiedEmail(email.trim());
          }
        }
      } else {
        // Sign up
        const result = await signUp(email, password);
        if (result.success) {
          if (result.requiresVerification) {
            setSuccessNotice(
              `We have sent a verification email to ${email.trim()}. Please check your inbox (and spam/junk folder) and click the confirmation link to activate your account.`
            );
            setUnverifiedEmail(email.trim());
          } else {
            setSuccessNotice('Account created successfully! You are now logged in.');
            setTimeout(() => {
              onClose();
            }, 1500);
          }
        } else {
          setErrorMessage(result.error || 'Registration failed. Please check your information and try again.');
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendVerification = async () => {
    if (!unverifiedEmail) return;
    setResendStatus('sending');
    const res = await resendVerification(unverifiedEmail);
    if (res.success) {
      setResendStatus('sent');
    } else {
      setResendStatus('idle');
      setErrorMessage(res.error || 'Unable to resend confirmation email right now.');
    }
  };

  const handleSaveManualKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualKeyInput.trim()) return;
    saveManualAnonKey(manualKeyInput.trim());
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0A1A24]/75 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-md bg-[#102C3A] text-slate-100 rounded-2xl shadow-2xl border border-[#183C4F] overflow-hidden z-10 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-[#183C4F] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#176B65] border border-[#A8E6CF]/30 flex items-center justify-center text-[#A8E6CF] font-bold text-lg shadow-xs">
              M
            </div>
            <div>
              <h2 id="auth-modal-title" className="text-lg font-bold text-white tracking-tight">
                {mode === 'login' ? 'Log in to MedRise' : 'Create a MedRise Account'}
              </h2>
              <p className="text-xs text-slate-300">
                {mode === 'login'
                  ? 'Access your saved medical resources and bookmarks'
                  : 'Join fellow Egyptian medical students'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-300 hover:text-white hover:bg-[#183C4F] rounded-lg transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A8E6CF]"
            aria-label="Close modal and return to website"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Missing Config Notification */}
        {!isConfigured && (
          <div className="bg-amber-950/50 border-b border-amber-800/40 p-4 text-xs text-amber-200">
            <div className="flex items-start gap-2.5">
              <Key className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
              <div className="space-y-1.5 flex-1">
                <p className="font-semibold text-amber-100">Supabase Publishable Key Required</p>
                <p className="text-[11px] text-amber-200/90 leading-relaxed">
                  To authenticate users, add <code className="bg-black/30 px-1 py-0.5 rounded text-white">VITE_SUPABASE_ANON_KEY</code> to your project's <code className="bg-black/30 px-1 py-0.5 rounded text-white">.env</code> or Vercel environment variables.
                </p>
                <button
                  type="button"
                  onClick={() => setShowKeyConfig(!showKeyConfig)}
                  className="text-xs text-[#A8E6CF] hover:underline font-medium inline-block mt-1 cursor-pointer"
                >
                  {showKeyConfig ? 'Hide manual test input' : 'Paste key here to test now in preview →'}
                </button>
              </div>
            </div>

            {showKeyConfig && (
              <form onSubmit={handleSaveManualKey} className="mt-3 pt-2.5 border-t border-amber-800/30 flex gap-2">
                <input
                  type="password"
                  placeholder="Paste anon key here..."
                  value={manualKeyInput}
                  onChange={(e) => setManualKeyInput(e.target.value)}
                  className="flex-1 bg-[#0A1A24] border border-amber-700/50 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#A8E6CF]"
                />
                <button
                  type="submit"
                  disabled={!manualKeyInput.trim()}
                  className="px-3 py-1.5 bg-[#176B65] hover:bg-[#1F8880] disabled:opacity-50 text-white rounded-lg text-xs font-semibold cursor-pointer transition-colors"
                >
                  Save & Apply
                </button>
              </form>
            )}
          </div>
        )}

        {/* Tab switch: Log In / Sign Up */}
        <div className="flex border-b border-[#183C4F] bg-[#0E2430]">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setErrorMessage(null);
              setSuccessNotice(null);
            }}
            className={`flex-1 py-3 text-xs sm:text-sm font-semibold transition-colors border-b-2 min-h-[44px] flex items-center justify-center cursor-pointer ${
              mode === 'login'
                ? 'border-[#A8E6CF] text-[#A8E6CF] bg-[#102C3A]'
                : 'border-transparent text-slate-300 hover:text-white hover:bg-[#102C3A]/50'
            }`}
          >
            Log In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('signup');
              setErrorMessage(null);
              setSuccessNotice(null);
            }}
            className={`flex-1 py-3 text-xs sm:text-sm font-semibold transition-colors border-b-2 min-h-[44px] flex items-center justify-center cursor-pointer ${
              mode === 'signup'
                ? 'border-[#A8E6CF] text-[#A8E6CF] bg-[#102C3A]'
                : 'border-transparent text-slate-300 hover:text-white hover:bg-[#102C3A]/50'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-4">
          {/* Error Message */}
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-800/60 text-red-200 text-xs flex items-start gap-2.5 animate-fadeIn">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <div className="flex-1 leading-relaxed">
                <span className="font-medium">{errorMessage}</span>
                {unverifiedEmail && (
                  <div className="mt-2 pt-2 border-t border-red-800/40">
                    <button
                      type="button"
                      onClick={handleResendVerification}
                      disabled={resendStatus === 'sending' || resendStatus === 'sent'}
                      className="inline-flex items-center gap-1.5 text-xs text-[#A8E6CF] hover:underline font-semibold cursor-pointer disabled:opacity-50"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${resendStatus === 'sending' ? 'animate-spin' : ''}`} />
                      {resendStatus === 'sent' ? 'Verification email resent!' : 'Resend verification email'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Success / Verification Required Notice */}
          {successNotice && (
            <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-800/60 text-emerald-200 text-xs flex items-start gap-2.5 animate-fadeIn">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div className="flex-1 space-y-2 leading-relaxed">
                <p className="font-semibold text-emerald-100 text-sm">Verify your email address</p>
                <p className="text-emerald-200/90">{successNotice}</p>
                <div className="pt-2 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handleResendVerification}
                    disabled={resendStatus === 'sending' || resendStatus === 'sent'}
                    className="inline-flex items-center gap-1.5 text-xs text-[#A8E6CF] hover:underline font-medium cursor-pointer disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3 h-3 ${resendStatus === 'sending' ? 'animate-spin' : ''}`} />
                    {resendStatus === 'sent' ? 'Verification email resent!' : 'Didn’t receive it? Resend link'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMode('login');
                      setSuccessNotice(null);
                    }}
                    className="text-xs text-white hover:text-[#A8E6CF] font-medium"
                  >
                    Go to Log In →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Auth Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email field */}
            <div className="space-y-1.5">
              <label htmlFor="auth-email-input" className="block text-xs font-semibold text-slate-200">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="auth-email-input"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@med.edu.eg"
                  className="w-full pl-9 pr-3 py-2.5 bg-[#0D222D] border border-[#183C4F] rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#A8E6CF] focus:border-transparent transition-all min-h-[44px]"
                />
              </div>
            </div>

            {/* Password field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="auth-password-input" className="block text-xs font-semibold text-slate-200">
                  Password
                </label>
                {mode === 'signup' && (
                  <span className="text-[11px] text-slate-300">Min. 6 characters</span>
                )}
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="auth-password-input"
                  type="password"
                  autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 bg-[#0D222D] border border-[#183C4F] rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#A8E6CF] focus:border-transparent transition-all min-h-[44px]"
                />
              </div>
            </div>

            {/* Confirm Password field (Sign Up only) */}
            {mode === 'signup' && (
              <div className="space-y-1.5 animate-fadeIn">
                <label htmlFor="auth-confirm-password-input" className="block text-xs font-semibold text-slate-200">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    id="auth-confirm-password-input"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2.5 bg-[#0D222D] border border-[#183C4F] rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#A8E6CF] focus:border-transparent transition-all min-h-[44px]"
                  />
                </div>
              </div>
            )}

            {/* Verification reminder hint for sign up */}
            {mode === 'signup' && (
              <div className="p-2.5 bg-[#176B65]/15 border border-[#176B65]/30 rounded-lg text-[11px] text-slate-300 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#A8E6CF] shrink-0" />
                <span>
                  Supabase email confirmation is enabled. You will receive a verification link immediately upon registration.
                </span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 bg-[#176B65] hover:bg-[#1F8880] active:bg-[#12534E] disabled:opacity-60 text-white font-semibold rounded-xl text-sm shadow-sm transition-colors flex items-center justify-center gap-2 min-h-[44px] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A8E6CF]"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>{mode === 'login' ? 'Signing in...' : 'Creating account...'}</span>
                </>
              ) : (
                <>
                  <span>{mode === 'login' ? 'Log In' : 'Create Account'}</span>
                  <ArrowRight className="w-4 h-4 text-[#A8E6CF]" />
                </>
              )}
            </button>
          </form>

          {/* Mode Switcher text */}
          <div className="pt-2 text-center text-xs text-slate-300">
            {mode === 'login' ? (
              <p>
                Don't have an account yet?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('signup');
                    setErrorMessage(null);
                    setSuccessNotice(null);
                  }}
                  className="text-[#A8E6CF] hover:underline font-semibold cursor-pointer"
                >
                  Sign Up now
                </button>
              </p>
            ) : (
              <p>
                Already registered?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('login');
                    setErrorMessage(null);
                    setSuccessNotice(null);
                  }}
                  className="text-[#A8E6CF] hover:underline font-semibold cursor-pointer"
                >
                  Log In instead
                </button>
              </p>
            )}
          </div>
        </div>

        {/* Footer with return link */}
        <div className="px-6 py-3 bg-[#0A1A24]/60 border-t border-[#183C4F] flex items-center justify-between text-xs text-slate-400">
          <span>Protected with Supabase Auth</span>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-300 hover:text-white hover:underline cursor-pointer py-1 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#A8E6CF] rounded"
          >
            ← Return to MedRise
          </button>
        </div>
      </div>
    </div>
  );
};
