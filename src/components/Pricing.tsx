import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { CheckCircle2, Zap, Crown, Rocket, Star } from 'lucide-react';

const plans = [
  {
    name: 'Başlangıç',
    icon: Zap,
    price: { monthly: 0, yearly: 0 },
    description: 'Yatırım dünyasını keşfetmek için ideal başlangıç noktanız.',
    color: '#6C6CE8',
    features: [
      'Temel portföy takibi',
      '3 varlık kategorisi',
      'Aylık 10 işlem',
      'Temel piyasa verileri',
      'Mobil uygulama erişimi',
      'E-posta destek',
    ],
    cta: 'Ücretsiz Başla',
    popular: false,
  },
  {
    name: 'Pro',
    icon: Rocket,
    price: { monthly: 149, yearly: 99 },
    description: 'Aktif yatırımcılar için güçlü araçlar ve sınırsız erişim.',
    color: '#9D9EFF',
    features: [
      'Sınırsız portföy takibi',
      '50+ varlık kategorisi',
      'Sınırsız işlem',
      'Gerçek zamanlı veriler',
      'AI portföy önerileri',
      'Teknik analiz araçları',
      'Öncelikli destek',
      'API erişimi',
    ],
    cta: 'Pro\'ya Geç',
    popular: true,
  },
  {
    name: 'Kurumsal',
    icon: Crown,
    price: { monthly: 499, yearly: 349 },
    description: 'Profesyonel yatırımcılar ve kurumlar için tam güç.',
    color: '#F5C518',
    features: [
      'Pro\'daki her şey',
      'Çok hesap yönetimi',
      'Özel API entegrasyonu',
      'Hedge fon araçları',
      'Kurumsal raporlama',
      'Vergi optimizasyonu',
      'Kişisel finans danışmanı',
      'SLA garantisi',
    ],
    cta: 'İletişime Geç',
    popular: false,
  },
];

export function Pricing() {
  const [yearly, setYearly] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="fiyatlar" className="py-24 relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 40% at 50% 0%, rgba(108,108,232,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="badge badge-brand mb-4 mx-auto w-fit">
            <Star size={12} />
            Fiyatlandırma
          </div>
          <h2
            className="text-responsive-section font-display font-bold mb-4 text-white"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            Şeffaf ve <span className="gradient-text">Adil Fiyatlar</span>
          </h2>
          <p className="text-lg mb-8" style={{ color: 'var(--text-secondary)' }}>
            Gizli ücret yok. İstediğiniz zaman iptal edin.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-4 p-1.5 rounded-2xl glass">
            <button
              onClick={() => setYearly(false)}
              className="px-6 py-2 rounded-xl text-sm font-semibold transition-all duration-300"
              style={{
                background: !yearly ? 'var(--brand)' : 'transparent',
                color: !yearly ? 'white' : 'var(--text-secondary)',
              }}
            >
              Aylık
            </button>
            <button
              onClick={() => setYearly(true)}
              className="px-6 py-2 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2"
              style={{
                background: yearly ? 'var(--brand)' : 'transparent',
                color: yearly ? 'white' : 'var(--text-secondary)',
              }}
            >
              Yıllık
              <span
                className="text-xs px-2 py-0.5 rounded-full font-bold"
                style={{ background: 'rgba(34,216,122,0.2)', color: 'var(--success)' }}
              >
                -33%
              </span>
            </button>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 items-start">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className={`relative rounded-3xl p-8 card-hover ${plan.popular ? 'scale-105' : ''}`}
              style={{
                background: plan.popular
                  ? 'linear-gradient(135deg, rgba(108,108,232,0.15) 0%, rgba(108,108,232,0.05) 100%)'
                  : 'rgba(255,255,255,0.03)',
                border: plan.popular ? '1px solid rgba(108,108,232,0.4)' : '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {plan.popular && (
                <div
                  className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-xs font-bold text-white"
                  style={{ background: 'linear-gradient(135deg, #6C6CE8 0%, #9D9EFF 100%)' }}
                >
                  En Popüler
                </div>
              )}

              {/* Plan icon */}
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
                style={{
                  background: `rgba(${plan.color === '#6C6CE8' ? '108,108,232' :
                    plan.color === '#9D9EFF' ? '157,158,255' :
                    '245,197,24'},0.15)`,
                  border: `1px solid ${plan.color}30`,
                }}
              >
                <plan.icon size={22} style={{ color: plan.color }} />
              </div>

              <h3 className="text-xl font-bold text-white mb-1" style={{ fontFamily: 'Syne, sans-serif' }}>
                {plan.name}
              </h3>
              <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
                {plan.description}
              </p>

              {/* Price */}
              <div className="mb-8">
                <div className="flex items-end gap-1">
                  <span className="text-5xl font-bold text-white font-display" style={{ fontFamily: 'Syne, sans-serif' }}>
                    {plan.price.monthly === 0 ? (
                      'Ücretsiz'
                    ) : (
                      <>
                        ₺{yearly ? plan.price.yearly : plan.price.monthly}
                      </>
                    )}
                  </span>
                  {plan.price.monthly > 0 && (
                    <span className="text-sm pb-2" style={{ color: 'var(--text-secondary)' }}>/ay</span>
                  )}
                </div>
                {yearly && plan.price.monthly > 0 && (
                  <div className="mt-1 text-sm" style={{ color: 'var(--success)' }}>
                    Yıllık ₺{plan.price.yearly * 12} — ₺{(plan.price.monthly - plan.price.yearly) * 12} tasarruf
                  </div>
                )}
              </div>

              {/* CTA */}
              <motion.a
                href="#kayit"
                className={`block text-center mb-8 rounded-xl py-3 font-semibold text-sm transition-all duration-300 ${
                  plan.popular ? 'btn-primary' : 'btn-secondary'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {plan.cta}
              </motion.a>

              {/* Features */}
              <div className="flex flex-col gap-3">
                {plan.features.map((feat) => (
                  <div key={feat} className="flex items-center gap-2">
                    <CheckCircle2 size={15} style={{ color: plan.color, flexShrink: 0 }} />
                    <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{feat}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
