import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Shield, Zap, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Logo } from '../components/Logo';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.55, ease: 'easeOut' as const },
});

const rightPanelStats = [
  { label: 'Günlük Kazanç', value: '+₺3.240', positive: true },
  { label: 'Toplam Getiri', value: '+₺42.180', positive: true },
  { label: 'Aktif Varlık', value: '12 adet', positive: null },
  { label: 'Risk Skoru', value: '7/10', positive: null },
];

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const inputStyle = (field: string) => ({
    background: focused === field ? 'rgba(108,108,232,0.1)' : 'rgba(255,255,255,0.04)',
    border: `1px solid ${focused === field ? 'rgba(108,108,232,0.55)' : 'rgba(255,255,255,0.09)'}`,
    boxShadow: focused === field ? '0 0 0 3px rgba(108,108,232,0.12)' : 'none',
  });

  return (
    <div
      className="min-h-screen flex"
      style={{ background: 'var(--bg-primary)', fontFamily: 'DM Sans, sans-serif' }}
    >
      {/* ── Left: Form ── */}
      <div className="w-full lg:w-[46%] flex flex-col justify-center px-8 md:px-16 xl:px-20 py-12 relative z-10">
        {/* Subtle left glow */}
        <div
          className="absolute top-0 left-0 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-10"
          style={{ background: 'var(--brand)' }}
        />

        <motion.div {...fadeUp(0)} className="mb-10">
          <Link to="/">
            <Logo size={36} showText />
          </Link>
        </motion.div>

        <div className="max-w-[360px]">
          <motion.div {...fadeUp(0.05)}>
            <h1
              className="font-bold text-white mb-1"
              style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.75rem', letterSpacing: '-0.02em' }}
            >
              Hoş Geldiniz
            </h1>
            <p className="text-sm mb-7" style={{ color: 'var(--text-secondary)' }}>
              Hesabınıza giriş yapın ve yatırımlarınızı yönetin.
            </p>
          </motion.div>

          {/* Social buttons */}
          <motion.div {...fadeUp(0.1)} className="flex gap-3 mb-5">
            <button
              className="flex-1 flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl text-sm font-medium transition-all duration-200"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-primary)' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.09)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
            >
              <svg width="17" height="17" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Google ile devam et
            </button>
            <button
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-medium transition-all duration-200"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-primary)' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.09)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              Apple
            </button>
          </motion.div>

          <motion.div {...fadeUp(0.12)} className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.07)' }} />
            <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>ya da e-posta ile</span>
            <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.07)' }} />
          </motion.div>

          <motion.form {...fadeUp(0.15)} className="flex flex-col gap-4" onSubmit={e => e.preventDefault()}>
            {/* Email */}
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                E-posta
              </label>
              <div className="relative">
                <Mail
                  size={15}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-200"
                  style={{ color: focused === 'email' ? 'var(--brand-light)' : 'var(--text-secondary)' }}
                />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused(null)}
                  placeholder="ornek@fineria.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white outline-none transition-all duration-200"
                  style={{
                    ...inputStyle('email'),
                    fontFamily: 'DM Sans, sans-serif',
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>Şifre</label>
                <Link to="#" className="text-xs font-medium transition-colors" style={{ color: 'var(--brand-light)' }}>
                  Şifremi unuttum
                </Link>
              </div>
              <div className="relative">
                <Lock
                  size={15}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-200"
                  style={{ color: focused === 'password' ? 'var(--brand-light)' : 'var(--text-secondary)' }}
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  onFocus={() => setFocused('password')}
                  onBlur={() => setFocused(null)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-11 py-3 rounded-xl text-sm text-white outline-none transition-all duration-200"
                  style={inputStyle('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors duration-200"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <motion.button
              type="submit"
              className="btn-primary w-full flex items-center justify-center gap-2 mt-1"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              style={{ fontSize: '15px', padding: '13px 24px' }}
            >
              Giriş Yap
              <ArrowRight size={17} />
            </motion.button>
          </motion.form>

          <motion.p {...fadeUp(0.35)} className="text-center text-sm mt-6" style={{ color: 'var(--text-secondary)' }}>
            Hesabın yok mu?{' '}
            <Link to="/kayit" className="font-semibold transition-colors" style={{ color: 'var(--brand-light)' }}>
              Üye ol →
            </Link>
          </motion.p>
        </div>
      </div>

      {/* ── Right: Decorative ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9 }}
        className="hidden lg:flex flex-1 relative overflow-hidden items-center justify-center"
        style={{
          background: 'linear-gradient(140deg, rgba(108,108,232,0.1) 0%, rgba(8,8,18,0) 60%)',
          borderLeft: '1px solid rgba(108,108,232,0.14)',
        }}
      >
        {/* Ambient glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-3xl opacity-[0.13]"
          style={{ background: 'var(--brand)' }}
        />
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)`,
            backgroundSize: '52px 52px',
          }}
        />

        <div className="relative z-10 w-full max-w-[360px] px-6">
          {/* Portfolio card */}
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.35, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="glass rounded-2xl p-5 mb-3"
            style={{ border: '1px solid rgba(108,108,232,0.22)' }}
          >
            <p className="text-xs mb-0.5" style={{ color: 'var(--text-secondary)' }}>Toplam Portföy</p>
            <div className="flex items-end justify-between mb-4">
              <p className="text-3xl font-bold text-white font-mono">₺284.750</p>
              <span
                className="text-xs font-bold px-2.5 py-1 rounded-full mb-0.5"
                style={{ background: 'rgba(34,216,122,0.15)', color: 'var(--success)' }}
              >
                +18.4%
              </span>
            </div>
            {/* Inline sparkline SVG */}
            <svg width="100%" height="48" viewBox="0 0 260 48" preserveAspectRatio="none">
              <defs>
                <linearGradient id="lg1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6C6CE8" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#6C6CE8" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0,42 C15,38 28,30 42,28 C56,26 68,34 82,26 C96,18 108,12 122,10 C136,8 148,14 162,10 C176,6 190,4 210,7 C225,9 242,5 260,6"
                fill="none"
                stroke="#6C6CE8"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M0,42 C15,38 28,30 42,28 C56,26 68,34 82,26 C96,18 108,12 122,10 C136,8 148,14 162,10 C176,6 190,4 210,7 C225,9 242,5 260,6 L260,48 L0,48 Z"
                fill="url(#lg1)"
              />
            </svg>
          </motion.div>

          {/* Stat grid */}
          <div className="grid grid-cols-2 gap-2.5 mb-4">
            {rightPanelStats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.45 + i * 0.07, duration: 0.4 }}
                className="glass rounded-xl p-3"
                style={{ border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <p className="text-xs mb-1" style={{ color: 'var(--text-secondary)' }}>{s.label}</p>
                <p
                  className="text-sm font-bold"
                  style={{ color: s.positive === true ? 'var(--success)' : s.positive === false ? 'var(--danger)' : 'white' }}
                >
                  {s.value}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Trust row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85, duration: 0.5 }}
            className="flex items-center justify-center gap-5"
          >
            {([
              [Shield, 'BDDK Lisanslı'],
              [Zap, '256-bit SSL'],
              [TrendingUp, 'Gerçek Zamanlı'],
            ] as const).map(([Icon, label], i) => (
              <div key={i} className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--text-secondary)' }}>
                <Icon size={12} style={{ color: 'var(--brand-light)' }} />
                {label}
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
