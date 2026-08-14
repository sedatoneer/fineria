import { useEffect, useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, Loader2 } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Logo } from '../components/Logo';
import { DeviceShowcase } from '../components/DeviceShowcase';
import { LanguageToggle } from '@/components/LanguageToggle';
import { isApiError } from '@/lib/api';
import { authService, validateEmail, validateLoginPassword } from '@/services/authService';
import { useAuthStore } from '@/stores/authStore';
import { useTranslation } from '@/i18n';

const AUTH_FORMS_ENABLED = false;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.5, ease: 'easeOut' as const },
});

function isSafeInternalPath(path: string): boolean {
  return path.startsWith('/') && !path.startsWith('//') && !path.includes('://');
}

function getPostLoginPath(state: unknown): string {
  if (!state || typeof state !== 'object') return '/hesabim';

  const from = (state as { from?: unknown }).from;

  if (typeof from === 'string' && isSafeInternalPath(from)) {
    return from;
  }

  if (from && typeof from === 'object' && 'pathname' in from) {
    const pathname = (from as { pathname: unknown }).pathname;
    if (typeof pathname === 'string' && isSafeInternalPath(pathname)) {
      return pathname;
    }
  }

  return '/hesabim';
}

export function LoginPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const setSession = useAuthStore((s) => s.setSession);

  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const state = location.state as { registered?: boolean; message?: string } | null;
    if (state?.registered) {
      setSuccessMessage(state.message ?? t.login.registeredSuccess);
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [location.pathname, location.state, navigate, t.login.registeredSuccess]);

  const inputStyle = (field: string, hasError?: boolean) => ({
    background: focused === field ? 'rgba(99,102,241,0.10)' : 'rgba(255,255,255,0.04)',
    border: `1px solid ${hasError ? 'rgba(248,113,113,0.65)' : focused === field ? 'rgba(129,140,248,0.65)' : 'rgba(255,255,255,0.10)'}`,
    color: '#F1F5F9',
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!AUTH_FORMS_ENABLED) return;
    setFormError(null);
    setSuccessMessage(null);

    const emailError = validateEmail(email);
    const passwordError = validateLoginPassword(password);
    setFieldErrors({
      email: emailError ?? undefined,
      password: passwordError ?? undefined,
    });
    if (emailError || passwordError) return;

    setLoading(true);
    try {
      const response = await authService.login({ email, password });
      setSession({
        accessToken: response.data.accessToken,
        expiresAtUtc: response.data.expiresAtUtc,
        user: {
          id: response.data.userId,
          handle: response.data.handle,
          email: response.data.email,
        },
      });
      navigate(getPostLoginPath(location.state), { replace: true });
    } catch (error) {
      if (isApiError(error)) {
        if (error.code === 'INVALID_CREDENTIALS' || error.status === 401) {
          setFormError(error.message || t.login.errors.invalidCredentials);
        } else if (error.code === 'TOO_MANY_REQUESTS' || error.status === 429) {
          setFormError(error.message || t.login.errors.tooManyRequests);
        } else if (error.code === 'VALIDATION_ERROR' || error.status === 400) {
          setFormError(error.message || t.login.errors.validation);
        } else if (error.code === 'NETWORK_ERROR') {
          setFormError(error.message);
        } else {
          setFormError(error.message || t.login.errors.generic);
        }
      } else {
        setFormError(t.login.errors.unexpected);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#050508]">
      <div className="relative z-10 flex w-full flex-col justify-center px-6 py-10 sm:px-8 sm:py-12 md:px-16 lg:w-[46%] xl:px-20">
        <motion.div {...fadeUp(0)} className="mb-10 flex items-center justify-between gap-4">
          <Link to="/">
            <Logo size={34} showText textColor="#F8FAFC" variant="onDark" />
          </Link>
          <LanguageToggle variant="dark" layoutId="login-lang-pill" compact />
        </motion.div>

        <div className="w-full max-w-[360px]">
          <motion.div {...fadeUp(0.05)}>
            <h1 className="font-extrabold mb-1 text-white" style={{ fontSize: '1.75rem', letterSpacing: '-0.02em' }}>
              {t.login.title}
            </h1>
            <p className="mb-5 text-sm text-gray-400">
              {t.login.subtitle}
            </p>
          </motion.div>

          <motion.div
            {...fadeUp(0.08)}
            className="mb-5 flex items-start gap-3 rounded-xl border border-indigo-400/20 bg-indigo-400/[0.08] px-4 py-3.5"
            role="status"
          >
            <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-indigo-400/10 text-indigo-300">
              <Lock size={14} />
            </div>
            <div>
              <p className="text-sm font-semibold text-indigo-200">{t.login.bannerTitle}</p>
              <p className="mt-0.5 text-xs leading-relaxed text-gray-400">
                {t.login.bannerBody}
              </p>
            </div>
          </motion.div>

          <motion.div {...fadeUp(0.1)} className="flex gap-3 mb-5">
            <button
              type="button"
              disabled
              title={t.login.soon}
              className="flex-1 flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl text-sm font-medium border border-white/10 text-gray-300 opacity-50 cursor-not-allowed"
            >
              <svg width="17" height="17" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              {t.login.googleSoon}
            </button>
            <button
              type="button"
              disabled
              title={t.login.soon}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-medium border border-white/10 text-gray-300 opacity-50 cursor-not-allowed"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              {t.login.appleSoon}
            </button>
          </motion.div>

          <motion.div {...fadeUp(0.12)} className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-gray-500">{t.login.orEmail}</span>
            <div className="flex-1 h-px bg-white/10" />
          </motion.div>

          {successMessage && (
            <div
              className="mb-4 rounded-xl px-3.5 py-3 text-sm"
              style={{ background: 'rgba(16,185,129,0.12)', color: '#6EE7B7' }}
              role="status"
            >
              {successMessage}
            </div>
          )}

          {formError && (
            <div
              className="mb-4 rounded-xl px-3.5 py-3 text-sm"
              style={{ background: 'rgba(248,113,113,0.12)', color: '#FCA5A5' }}
              role="alert"
            >
              {formError}
            </div>
          )}

          <motion.form
            {...fadeUp(0.15)}
            className="pointer-events-none flex cursor-not-allowed select-none flex-col gap-4 opacity-45 grayscale-[0.2]"
            onSubmit={handleSubmit}
            aria-disabled="true"
            noValidate
          >
            <div>
              <label className="block text-xs font-medium mb-1.5 text-gray-400">{t.login.email}</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: focused === 'email' ? '#A5B4FC' : '#64748B' }} />
                <input
                  type="email"
                  value={email}
                  onChange={e => {
                    setEmail(e.target.value);
                    if (fieldErrors.email) setFieldErrors((prev) => ({ ...prev, email: undefined }));
                  }}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused(null)}
                  placeholder={t.login.emailPlaceholder}
                  autoComplete="email"
                  disabled={!AUTH_FORMS_ENABLED || loading}
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 placeholder:text-gray-600"
                  style={inputStyle('email', !!fieldErrors.email)}
                />
              </div>
              {fieldErrors.email && (
                <p className="mt-1.5 text-xs" style={{ color: '#FCA5A5' }}>{fieldErrors.email}</p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium text-gray-400">{t.login.password}</label>
                <span className="text-xs font-medium opacity-60 cursor-not-allowed text-indigo-300" title={t.login.soon}>
                  {t.login.forgot}
                </span>
              </div>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: focused === 'password' ? '#A5B4FC' : '#64748B' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => {
                    setPassword(e.target.value);
                    if (fieldErrors.password) setFieldErrors((prev) => ({ ...prev, password: undefined }));
                  }}
                  onFocus={() => setFocused('password')}
                  onBlur={() => setFocused(null)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  disabled={!AUTH_FORMS_ENABLED || loading}
                  className="w-full pl-10 pr-11 py-3 rounded-xl text-sm outline-none transition-all duration-200 placeholder:text-gray-600"
                  style={inputStyle('password', !!fieldErrors.password)}
                />
                <button
                  type="button"
                  disabled={!AUTH_FORMS_ENABLED}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 cursor-not-allowed text-gray-500"
                  aria-label={showPassword ? t.login.hidePassword : t.login.showPassword}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {fieldErrors.password && (
                <p className="mt-1.5 text-xs" style={{ color: '#FCA5A5' }}>{fieldErrors.password}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={!AUTH_FORMS_ENABLED || loading}
              className="btn-primary mt-1 flex w-full cursor-not-allowed items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 size={17} className="animate-spin" />
                  {t.login.submitting}
                </>
              ) : (
                <>
                  {t.login.submit}
                  <Lock size={15} />
                </>
              )}
            </button>
          </motion.form>

          <motion.p {...fadeUp(0.3)} className="text-center text-sm mt-6 text-gray-400">
            {t.login.noAccount}{' '}
            <Link to="/kayit" className="font-semibold text-indigo-300">{t.login.signUp}</Link>
          </motion.p>
        </div>
      </div>

      <div className="hidden lg:flex flex-1 border-l border-white/10">
        <DeviceShowcase />
      </div>
    </div>
  );
}
