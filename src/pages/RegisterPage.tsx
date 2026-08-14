import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, CheckCircle2, Sparkles, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '../components/Logo';
import { DeviceShowcase } from '../components/DeviceShowcase';
import { LanguageToggle } from '@/components/LanguageToggle';
import { isApiError } from '@/lib/api';
import {
  authService,
  validateEmail,
  validateHandle,
  validatePassword,
  validatePasswordConfirmation,
} from '@/services/authService';
import { useTranslation } from '@/i18n';

const AUTH_FORMS_ENABLED = false;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.5, ease: 'easeOut' as const },
});

type FieldErrors = {
  handle?: string;
  email?: string;
  password?: string;
  confirm?: string;
  terms?: string;
};

export function RegisterPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const [accepted, setAccepted] = useState(false);
  const [form, setForm] = useState({ handle: '', email: '', password: '', confirm: '' });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const inputStyle = (field: string, hasError?: boolean) => ({
    background: focused === field ? 'rgba(99,102,241,0.10)' : 'rgba(255,255,255,0.04)',
    border: `1px solid ${hasError ? 'rgba(248,113,113,0.65)' : focused === field ? 'rgba(129,140,248,0.65)' : 'rgba(255,255,255,0.10)'}`,
    color: '#F1F5F9',
  });

  const clearFieldError = (field: keyof FieldErrors) => {
    setFieldErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!AUTH_FORMS_ENABLED) return;
    setFormError(null);

    const handleError = validateHandle(form.handle);
    const emailError = validateEmail(form.email);
    const passwordError = validatePassword(form.password);
    const confirmError = validatePasswordConfirmation(form.password, form.confirm);
    const termsError = accepted ? null : t.register.termsRequired;

    setFieldErrors({
      handle: handleError ?? undefined,
      email: emailError ?? undefined,
      password: passwordError ?? undefined,
      confirm: confirmError ?? undefined,
      terms: termsError ?? undefined,
    });

    if (handleError || emailError || passwordError || confirmError || termsError) return;

    setLoading(true);
    try {
      await authService.register({
        handle: form.handle,
        email: form.email,
        password: form.password,
      });
      navigate('/giris', {
        replace: true,
        state: {
          registered: true,
          message: t.login.registeredSuccess,
        },
      });
    } catch (error) {
      if (isApiError(error)) {
        if (error.code === 'EMAIL_ALREADY_EXISTS') {
          setFieldErrors((prev) => ({ ...prev, email: error.message || t.register.errors.emailExists }));
        } else if (error.code === 'HANDLE_ALREADY_EXISTS') {
          setFieldErrors((prev) => ({ ...prev, handle: error.message || t.register.errors.handleExists }));
        } else if (error.code === 'TOO_MANY_REQUESTS' || error.status === 429) {
          setFormError(error.message || t.register.errors.tooManyRequests);
        } else if (error.code === 'VALIDATION_ERROR' || error.status === 400) {
          setFormError(error.message || t.register.errors.validation);
        } else if (error.code === 'NETWORK_ERROR') {
          setFormError(error.message);
        } else {
          setFormError(error.message || t.register.errors.generic);
        }
      } else {
        setFormError(t.register.errors.unexpected);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#050508]">
      <div className="relative z-10 flex w-full flex-col justify-center px-6 py-10 sm:px-8 sm:py-12 md:px-14 lg:w-[50%] xl:px-20">
        <motion.div {...fadeUp(0)} className="mb-8 flex items-center justify-between gap-4">
          <Link to="/"><Logo size={34} showText textColor="#F8FAFC" variant="onDark" /></Link>
          <LanguageToggle variant="dark" layoutId="register-lang-pill" compact />
        </motion.div>

        <div className="w-full max-w-[400px]">
          <motion.div {...fadeUp(0.05)} className="mb-6">
            <div className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-indigo-300">
              <Sparkles size={12} />
              {t.register.badge}
            </div>
            <h1 className="font-extrabold mb-1.5 text-white" style={{ fontSize: '1.75rem', letterSpacing: '-0.02em' }}>
              {t.register.title}
            </h1>
            <p className="text-sm text-gray-400">
              {t.register.subtitle}
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
              <p className="text-sm font-semibold text-indigo-200">{t.register.bannerTitle}</p>
              <p className="mt-0.5 text-xs leading-relaxed text-gray-400">
                {t.register.bannerBody}
              </p>
            </div>
          </motion.div>

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
            {...fadeUp(0.12)}
            className="pointer-events-none flex cursor-not-allowed select-none flex-col gap-3.5 opacity-45 grayscale-[0.2]"
            onSubmit={handleSubmit}
            aria-disabled="true"
            noValidate
          >
            <div>
              <label className="block text-xs font-medium mb-1.5 text-gray-400">{t.register.handle}</label>
              <div className="relative">
                <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: focused === 'handle' ? '#A5B4FC' : '#64748B' }} />
                <input
                  type="text"
                  value={form.handle}
                  onChange={e => {
                    setForm({ ...form, handle: e.target.value });
                    clearFieldError('handle');
                  }}
                  onFocus={() => setFocused('handle')}
                  onBlur={() => setFocused(null)}
                  placeholder={t.register.handlePlaceholder}
                  autoComplete="username"
                  disabled={!AUTH_FORMS_ENABLED || loading}
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 placeholder:text-gray-600"
                  style={inputStyle('handle', !!fieldErrors.handle)}
                />
              </div>
              {fieldErrors.handle && (
                <p className="mt-1.5 text-xs" style={{ color: '#FCA5A5' }}>{fieldErrors.handle}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium mb-1.5 text-gray-400">{t.register.email}</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: focused === 'email' ? '#A5B4FC' : '#64748B' }} />
                <input
                  type="email"
                  value={form.email}
                  onChange={e => {
                    setForm({ ...form, email: e.target.value });
                    clearFieldError('email');
                  }}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused(null)}
                  placeholder={t.register.emailPlaceholder}
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

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-medium mb-1.5 text-gray-400">{t.register.password}</label>
                <div className="relative">
                  <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: focused === 'password' ? '#A5B4FC' : '#64748B' }} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={form.password}
                    onChange={e => {
                      setForm({ ...form, password: e.target.value });
                      clearFieldError('password');
                    }}
                    onFocus={() => setFocused('password')}
                    onBlur={() => setFocused(null)}
                    placeholder="••••••••"
                    autoComplete="new-password"
                    disabled={!AUTH_FORMS_ENABLED || loading}
                    className="w-full pl-10 pr-9 py-3 rounded-xl text-sm outline-none transition-all duration-200 placeholder:text-gray-600"
                    style={inputStyle('password', !!fieldErrors.password)}
                  />
                  <button
                    type="button"
                    disabled={!AUTH_FORMS_ENABLED}
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-not-allowed text-gray-500"
                    aria-label={showPassword ? t.register.hidePassword : t.register.showPassword}
                  >
                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
                {fieldErrors.password && (
                  <p className="mt-1.5 text-xs" style={{ color: '#FCA5A5' }}>{fieldErrors.password}</p>
                )}
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5 text-gray-400">{t.register.confirm}</label>
                <div className="relative">
                  <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: focused === 'confirm' ? '#A5B4FC' : '#64748B' }} />
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    value={form.confirm}
                    onChange={e => {
                      setForm({ ...form, confirm: e.target.value });
                      clearFieldError('confirm');
                    }}
                    onFocus={() => setFocused('confirm')}
                    onBlur={() => setFocused(null)}
                    placeholder="••••••••"
                    autoComplete="new-password"
                    disabled={!AUTH_FORMS_ENABLED || loading}
                    className="w-full pl-10 pr-9 py-3 rounded-xl text-sm outline-none transition-all duration-200 placeholder:text-gray-600"
                    style={inputStyle('confirm', !!fieldErrors.confirm)}
                  />
                  <button
                    type="button"
                    disabled={!AUTH_FORMS_ENABLED}
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-not-allowed text-gray-500"
                    aria-label={showConfirm ? t.register.hidePassword : t.register.showPassword}
                  >
                    {showConfirm ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
                {fieldErrors.confirm && (
                  <p className="mt-1.5 text-xs" style={{ color: '#FCA5A5' }}>{fieldErrors.confirm}</p>
                )}
              </div>
            </div>

            <label className="flex items-start gap-3 cursor-pointer select-none">
              <div
                onClick={() => {
                  if (loading) return;
                  setAccepted(!accepted);
                  clearFieldError('terms');
                }}
                className="mt-0.5 rounded flex items-center justify-center flex-shrink-0 transition-all duration-200"
                style={{
                  width: 18,
                  height: 18,
                  background: accepted ? 'var(--brand)' : 'transparent',
                  border: `1px solid ${fieldErrors.terms ? 'rgba(248,113,113,0.65)' : accepted ? 'var(--brand)' : 'rgba(255,255,255,0.25)'}`,
                }}
                role="checkbox"
                aria-checked={accepted}
              >
                {accepted && <CheckCircle2 size={11} color="white" />}
              </div>
              <span className="text-xs leading-relaxed text-gray-400">
                {t.register.termsPrefix}
                <span className="text-indigo-300">{t.register.termsOfUse}</span>
                {t.register.termsMid}
                <span className="text-indigo-300">{t.register.privacy}</span>
                {t.register.termsSuffix}
              </span>
            </label>
            {fieldErrors.terms && (
              <p className="-mt-2 text-xs" style={{ color: '#FCA5A5' }}>{fieldErrors.terms}</p>
            )}

            <button
              type="submit"
              disabled={!AUTH_FORMS_ENABLED || loading}
              className="btn-primary mt-1 flex w-full cursor-not-allowed items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 size={17} className="animate-spin" />
                  {t.register.submitting}
                </>
              ) : (
                <>
                  {t.register.submit}
                  <Lock size={15} />
                </>
              )}
            </button>
          </motion.form>

          <motion.p {...fadeUp(0.35)} className="text-center text-sm mt-5 text-gray-400">
            {t.register.hasAccount}{' '}
            <Link to="/giris" className="font-semibold text-indigo-300">{t.register.signIn}</Link>
          </motion.p>
        </div>
      </div>

      <div className="hidden lg:flex flex-1 border-l border-white/10">
        <DeviceShowcase
          title={t.register.showcaseTitle}
          description={t.register.showcaseDescription}
        />
      </div>
    </div>
  );
}
