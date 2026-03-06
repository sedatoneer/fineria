import { motion } from 'framer-motion';
import { ArrowRight, Shield, Zap, Star, TrendingUp, Wallet, BarChart3 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';

const chartData = [
  { v: 4200 }, { v: 3800 }, { v: 5100 }, { v: 4600 }, { v: 5800 },
  { v: 5200 }, { v: 6300 }, { v: 5900 }, { v: 7100 }, { v: 6800 },
  { v: 7500 }, { v: 8200 }, { v: 7900 }, { v: 8700 }, { v: 9100 },
];

function AnimatedNumber({ target, prefix = '', suffix = '', duration = 2000 }: {
  target: number; prefix?: string; suffix?: string; duration?: number;
}) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.floor(eased * target));
      if (progress >= 1) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);

  return (
    <span className="font-mono">
      {prefix}{current.toLocaleString('tr-TR')}{suffix}
    </span>
  );
}

const floatingCards = [
  {
    icon: TrendingUp,
    label: 'Portföy Değeri',
    value: '₺284.750',
    sub: '+18.4% bu ay',
    color: '#22D87A',
    delay: 0,
    position: 'top-16 right-0',
  },
  {
    icon: Wallet,
    label: 'Günlük Kazanç',
    value: '₺3.240',
    sub: '12 işlem',
    color: '#6C6CE8',
    delay: 0.5,
    position: 'bottom-32 -left-4',
  },
  {
    icon: BarChart3,
    label: 'Risk Skoru',
    value: '7/10',
    sub: 'Orta-Yüksek',
    color: '#F5C518',
    delay: 1,
    position: 'bottom-8 right-8',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
} as const;

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-24 pb-16 overflow-hidden mesh-bg">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20 animate-float-slow"
          style={{ background: 'var(--brand)' }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-10 animate-float"
          style={{ background: '#9D9EFF', animationDelay: '-2s' }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-3xl opacity-5"
          style={{ background: 'radial-gradient(circle, #6C6CE8 0%, transparent 70%)' }}
        />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(rgba(108,108,232,0.5) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(108,108,232,0.5) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-8"
          >
            {/* Badge */}
            <motion.div variants={itemVariants}>
              <div className="badge badge-brand w-fit">
                <Zap size={12} />
                Türkiye'nin En Akıllı Fintech Platformu
              </div>
            </motion.div>

            {/* Headline */}
            <motion.div variants={itemVariants} className="flex flex-col gap-4">
              <h1
                className="text-responsive-hero font-display font-bold leading-none"
                style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text-primary)' }}
              >
                Paranızı
                <br />
                <span className="gradient-text">Akıllıca</span>
                <br />
                Yönetin
              </h1>
              <p className="text-lg leading-relaxed max-w-lg" style={{ color: 'var(--text-secondary)' }}>
                Yapay zeka destekli portföy yönetimi, anlık piyasa analizleri ve
                kişiselleştirilmiş yatırım tavsiyeleriyle finansal özgürlüğünüze kavuşun.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <motion.a
                href="#kayit"
                className="btn-primary flex items-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Ücretsiz Başla
                <ArrowRight size={18} />
              </motion.a>
              <motion.a
                href="#demo"
                className="btn-secondary flex items-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Demo İzle
              </motion.a>
            </motion.div>

            {/* Trust indicators */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-6 pt-4">
              <div className="flex items-center gap-2">
                <Shield size={16} style={{ color: 'var(--success)' }} />
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  BDDK Lisanslı
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Star size={16} style={{ color: 'var(--gold)' }} />
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  4.9/5 Kullanıcı Puanı
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Zap size={16} style={{ color: 'var(--brand-light)' }} />
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  256-bit Şifreleme
                </span>
              </div>
            </motion.div>

            {/* Stats row */}
            <motion.div variants={itemVariants} className="flex gap-8 pt-2">
              {[
                { label: 'Aktif Kullanıcı', value: 125000, suffix: '+' },
                { label: 'İşlem Hacmi', value: 2, suffix: 'B₺' },
                { label: 'Günlük İşlem', value: 48000, suffix: '+' },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1">
                  <span className="text-2xl font-bold gradient-text">
                    <AnimatedNumber target={stat.value} suffix={stat.suffix} />
                  </span>
                  <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right - Dashboard mockup */}
          <motion.div
            initial={{ opacity: 0, x: 60, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex justify-center items-center"
          >
            {/* Main dashboard card */}
            <motion.div
              className="relative w-full max-w-md animate-float"
              style={{ animationDuration: '7s' }}
            >
              <div
                className="glass rounded-3xl p-6 glow-brand"
                style={{ border: '1px solid rgba(108,108,232,0.25)' }}
              >
                {/* Card header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-xs mb-1" style={{ color: 'var(--text-secondary)' }}>
                      Toplam Portföy
                    </p>
                    <h3 className="text-3xl font-bold font-display text-white">
                      ₺284.750
                    </h3>
                    <div className="flex items-center gap-1 mt-1">
                      <TrendingUp size={14} style={{ color: 'var(--success)' }} />
                      <span className="text-sm font-semibold" style={{ color: 'var(--success)' }}>
                        +₺24.180 (9.28%)
                      </span>
                    </div>
                  </div>
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center"
                    style={{ background: 'rgba(108,108,232,0.2)', border: '1px solid rgba(108,108,232,0.3)' }}
                  >
                    <BarChart3 size={22} style={{ color: 'var(--brand-light)' }} />
                  </div>
                </div>

                {/* Chart */}
                <div className="h-32 mb-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="heroGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6C6CE8" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#6C6CE8" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload?.[0]) {
                            return (
                              <div className="glass rounded-lg px-3 py-2 text-xs text-white">
                                ₺{payload[0].value?.toLocaleString('tr-TR')}
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="v"
                        stroke="#6C6CE8"
                        strokeWidth={2.5}
                        fill="url(#heroGrad)"
                        dot={false}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* Asset breakdown */}
                <div className="flex flex-col gap-3">
                  {[
                    { name: 'Bitcoin', alloc: '42%', value: '₺119.595', color: '#F7931A', change: '+5.2%' },
                    { name: 'Hisse Senetleri', alloc: '35%', value: '₺99.662', color: '#6C6CE8', change: '+2.1%' },
                    { name: 'Altın', alloc: '23%', value: '₺65.492', color: '#F5C518', change: '+0.8%' },
                  ].map((asset) => (
                    <div key={asset.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ background: asset.color }} />
                        <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                          {asset.name}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-full" style={{
                          background: 'rgba(255,255,255,0.06)',
                          color: 'var(--text-secondary)',
                        }}>
                          {asset.alloc}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-white">{asset.value}</div>
                        <div className="text-xs" style={{ color: 'var(--success)' }}>{asset.change}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating cards */}
              {floatingCards.map((card, i) => (
                <motion.div
                  key={i}
                  className={`absolute ${card.position} glass rounded-2xl px-4 py-3 min-w-[160px]`}
                  style={{ border: `1px solid rgba(${card.color === '#6C6CE8' ? '108,108,232' : card.color === '#22D87A' ? '34,216,122' : '245,197,24'},0.3)` }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + card.delay * 0.2, duration: 0.5 }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <card.icon size={14} style={{ color: card.color }} />
                    <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                      {card.label}
                    </span>
                  </div>
                  <div className="text-sm font-bold text-white">{card.value}</div>
                  <div className="text-xs mt-0.5" style={{ color: card.color }}>{card.sub}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
