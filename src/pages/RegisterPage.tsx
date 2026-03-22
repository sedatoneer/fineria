import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, CheckCircle2, BarChart3, BrainCircuit, ShieldCheck, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Logo } from '../components/Logo';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.55, ease: 'easeOut' as const },
});

const benefits = [
  { icon: BarChart3, title: 'Gerçek Zamanlı Piyasalar', desc: 'BIST, kripto ve emtia anlık takibi' },
  { icon: BrainCircuit, title: 'Yapay Zeka Tahminleri', desc: 'LSTM modelleri ile portföy önerileri' },
  { icon: ShieldCheck, title: 'BDDK Güvencesi', desc: 'Lisanslı ve denetlenen altyapı' },
  { icon: Sparkles, title: '30 Gün Ücretsiz', desc: 'Kredi kartı gerektirmeden deneyin' },
];

const freeFeatures = [
  'Sınırsız portföy takibi',
  'Anlık fiyat bildirimleri',
  'Temel analizler',
  'Mobil uygulama erişimi',
];

export function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const [accepted, setAccepted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });

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
      <div className="w-full lg:w-[50%] flex flex-col justify-center px-8 md:px-14 xl:px-20 py-12 relative z-10">
        <div
          className="absolute top-0 left-0 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-10"
          style={{ background: 'var(--brand)' }}
        />

        <motion.div {...fadeUp(0)} className="mb-8">
          <Link to="/"><Logo size={36} showText /></Link>
        </motion.div>

        <div className="max-w-[400px]">
          <motion.div {...fadeUp(0.05)} className="mb-6">
            <div
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold mb-3"
              style={{ background: 'rgba(108,108,232,0.15)', border: '1px solid rgba(108,108,232,0.3)', color: 'var(--brand-light)' }}
            >
              <Sparkles size={11} />
              30 gün ücretsiz deneyin
            </div>
            <h1
              className="font-bold text-white mb-1.5"
              style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.75rem', letterSpacing: '-0.02em' }}
            >
              Hesap Oluşturun
            </h1>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Dakikalar içinde başlayın. Kredi kartı gerekmez.
            </p>
          </motion.div>

          <motion.form {...fadeUp(0.12)} className="flex flex-col gap-3.5" onSubmit={e => e.preventDefault()}>
            {/* Name */}
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>Ad Soyad</label>
              <div className="relative">
                <User
                  size={15}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ color: focused === 'name' ? 'var(--brand-light)' : 'var(--text-secondary)' }}
                />
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  onFocus={() => setFocused('name')}
                  onBlur={() => setFocused(null)}
                  placeholder="Adınız Soyadınız"
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white outline-none transition-all duration-200"
                  style={inputStyle('name')}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>E-posta</label>
              <div className="relative">
                <Mail
                  size={15}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ color: focused === 'email' ? 'var(--brand-light)' : 'var(--text-secondary)' }}
                />
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused(null)}
                  placeholder="ornek@fineria.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white outline-none transition-all duration-200"
                  style={inputStyle('email')}
                />
              </div>
            </div>

            {/* Password row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>Şifre</label>
                <div className="relative">
                  <Lock
                    size={15}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                    style={{ color: focused === 'password' ? 'var(--brand-light)' : 'var(--text-secondary)' }}
                  />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={form.password}
                    onChange={e => setForm({ ...form, password: e.target.value })}
                    onFocus={() => setFocused('password')}
                    onBlur={() => setFocused(null)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-9 py-3 rounded-xl text-sm text-white outline-none transition-all duration-200"
                    style={inputStyle('password')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>Tekrar</label>
                <div className="relative">
                  <Lock
                    size={15}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                    style={{ color: focused === 'confirm' ? 'var(--brand-light)' : 'var(--text-secondary)' }}
                  />
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    value={form.confirm}
                    onChange={e => setForm({ ...form, confirm: e.target.value })}
                    onFocus={() => setFocused('confirm')}
                    onBlur={() => setFocused(null)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-9 py-3 rounded-xl text-sm text-white outline-none transition-all duration-200"
                    style={inputStyle('confirm')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {showConfirm ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Terms */}
            <label className="flex items-start gap-3 cursor-pointer select-none">
              <div
                onClick={() => setAccepted(!accepted)}
                className="mt-0.5 w-4.5 h-4.5 rounded flex items-center justify-center flex-shrink-0 transition-all duration-200"
                style={{
                  width: 18,
                  height: 18,
                  background: accepted ? 'var(--brand)' : 'rgba(255,255,255,0.06)',
                  border: `1px solid ${accepted ? 'var(--brand)' : 'rgba(255,255,255,0.15)'}`,
                }}
              >
                {accepted && <CheckCircle2 size={11} color="white" />}
              </div>
              <span className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                <Link to="#" style={{ color: 'var(--brand-light)' }}>Kullanım Koşulları</Link>'nı ve{' '}
                <Link to="#" style={{ color: 'var(--brand-light)' }}>Gizlilik Politikası</Link>'nı okudum, kabul ediyorum.
              </span>
            </label>

            <motion.button
              type="submit"
              className="btn-primary w-full flex items-center justify-center gap-2 mt-1"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              style={{ fontSize: '15px', padding: '13px 24px' }}
            >
              Ücretsiz Başla
              <ArrowRight size={17} />
            </motion.button>
          </motion.form>

          <motion.p {...fadeUp(0.4)} className="text-center text-sm mt-5" style={{ color: 'var(--text-secondary)' }}>
            Zaten hesabın var mı?{' '}
            <Link to="/giris" className="font-semibold" style={{ color: 'var(--brand-light)' }}>
              Giriş yap →
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
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full blur-3xl opacity-[0.12]"
          style={{ background: 'var(--brand)' }}
        />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)`,
            backgroundSize: '52px 52px',
          }}
        />

        <div className="relative z-10 w-full max-w-[360px] px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-5"
          >
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--brand-light)' }}>
              Ücretsiz planda neler var?
            </p>
          </motion.div>

          {/* Free features list */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="glass rounded-2xl p-5 mb-4"
            style={{ border: '1px solid rgba(108,108,232,0.2)' }}
          >
            <div className="flex flex-col gap-3">
              {freeFeatures.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.07, duration: 0.4 }}
                  className="flex items-center gap-3"
                >
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(34,216,122,0.15)' }}
                  >
                    <CheckCircle2 size={11} style={{ color: 'var(--success)' }} />
                  </div>
                  <span className="text-sm text-white">{f}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Benefit cards */}
          <div className="grid grid-cols-2 gap-2.5">
            {benefits.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + i * 0.07, duration: 0.4 }}
                className="glass rounded-xl p-3"
                style={{ border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <b.icon size={14} className="mb-2" style={{ color: 'var(--brand-light)' }} />
                <p className="text-xs font-semibold text-white leading-tight mb-0.5">{b.title}</p>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)', fontSize: '11px' }}>{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
