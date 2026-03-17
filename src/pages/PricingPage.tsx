import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import {
  Zap, Rocket, Crown, CheckCircle2, HelpCircle,
  Building2, ArrowRight, X,
} from 'lucide-react';
import { CTA } from '@/components/CTA';

interface PricingTier {
  id: string;
  name: string;
  icon: React.ReactNode;
  price: number | string;
  period?: string;
  description: string;
  features: string[];
  excluded?: string[];
  popular?: boolean;
  cta: string;
  accentColor: string;
}

const tiers: PricingTier[] = [
  {
    id: 'free',
    name: 'Başlangıç',
    icon: <Zap size={20} />,
    price: 0,
    description: 'Finansal okuryazarlığa ilk adım',
    accentColor: 'rgba(157,158,255,0.6)',
    features: [
      'Gelir-gider takibi',
      'Temel portföy yönetimi',
      '10 hisse senedi takibi',
      'Temel sosyal etkileşim',
      '7/24 bildirimler',
      'Mobil uygulama erişimi',
    ],
    excluded: [
      'AI fiyat tahmin motoru',
      'Davranışsal risk profili',
      'API erişimi',
    ],
    cta: 'Ücretsiz Başla',
  },
  {
    id: 'pro',
    name: 'Pro Yatırımcı',
    icon: <Rocket size={20} />,
    price: 149,
    period: '/ay',
    description: 'Aktif yatırımcı için tam güç',
    popular: true,
    accentColor: '#6C6CE8',
    features: [
      'AI fiyat tahmin motoru',
      'FinBERT duygu analizi',
      'Sınırsız portföy takibi',
      'Davranışsal risk profili',
      '22 teknik gösterge',
      'Gerçek zamanlı veriler',
      'API erişimi',
      'Öncelikli destek',
    ],
    cta: "Pro'ya Geçin",
  },
  {
    id: 'enterprise',
    name: 'Kurumsal',
    icon: <Crown size={20} />,
    price: 'Özel',
    description: 'Kurumlar ve robo-advisory için',
    accentColor: 'rgba(245,197,24,0.7)',
    features: [
      'B2B API entegrasyonu',
      'Özel model eğitimi',
      'Çoklu hesap yönetimi',
      'Kurumsal raporlama',
      'SLA garantisi (%99.9)',
      'Risk profil modülü',
      'Kişisel teknik destek',
      'Vergi optimizasyonu',
    ],
    cta: 'Teklif Alın',
  },
];

const tableRows = [
  { feat: 'Gelir-Gider Takibi', vals: [true, true, true] },
  { feat: 'Portföy Yönetimi', vals: ['Temel', 'Sınırsız', 'Sınırsız'] },
  { feat: 'AI Fiyat Tahmini', vals: [false, true, true] },
  { feat: 'FinBERT Duygu Analizi', vals: [false, true, true] },
  { feat: 'Davranışsal Risk Profili', vals: [false, true, true] },
  { feat: '22 Teknik Gösterge', vals: [false, true, true] },
  { feat: 'Sosyal Ağ', vals: ['Temel', 'Tam', 'Tam'] },
  { feat: 'API Erişimi', vals: [false, true, 'Özel'] },
  { feat: 'Kurumsal Raporlama', vals: [false, false, true] },
  { feat: 'SLA Garantisi', vals: [false, false, '%99.9'] },
  { feat: 'Destek', vals: ['E-posta', 'Öncelikli', 'Kişisel'] },
];

const faqs = [
  {
    q: 'Ücretsiz plan ne kadar süre geçerli?',
    a: 'Ücretsiz plan süresiz olarak kullanılabilir. Temel özellikler her zaman ücretsiz kalacaktır.',
  },
  {
    q: 'AI tahmin motoru nasıl çalışır?',
    a: 'Multi-Head Attention LSTM + XGBoost hibrit modelimiz, 30 günlük geçmiş veri penceresi ve 22 teknik gösterge kullanarak sonraki gün fiyat yönünü tahmin eder.',
  },
  {
    q: 'Verilerim güvende mi?',
    a: 'JWT tabanlı kimlik doğrulama, rol tabanlı erişim kontrolü ve Docker/Kubernetes altyapısı ile kurumsal düzeyde güvenlik sağlıyoruz.',
  },
  {
    q: 'B2B API nasıl çalışır?',
    a: "FastAPI ile geliştirilmiş OpenAPI (Swagger) uyumlu REST API'mizi bankalara, aracı kurumlara ve robo-advisory platformlarına entegre ediyoruz.",
  },
  {
    q: '30 günlük deneme sonrası ne olur?',
    a: 'Pro plan 30 gün ücretsiz deneme sonunda ücretli hale geçer. İstediğiniz zaman iptal edebilirsiniz.',
  },
];

function TableCell({ val }: { val: boolean | string }) {
  if (val === true) {
    return <CheckCircle2 size={16} className="mx-auto" style={{ color: 'var(--success)' }} />;
  }
  if (val === false) {
    return <span className="text-base" style={{ color: 'rgba(255,255,255,0.15)' }}>—</span>;
  }
  return <span className="text-xs font-semibold" style={{ color: 'var(--brand-light)' }}>{val}</span>;
}

function PricingCard({ tier, i }: { tier: PricingTier; i: number }) {
  const isPopular = tier.popular === true;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.1, duration: 0.55 }}
      viewport={{ once: true }}
      className="relative flex flex-col"
      style={{
        borderRadius: 20,
        background: isPopular
          ? 'linear-gradient(145deg, rgba(108,108,232,0.14) 0%, rgba(108,108,232,0.06) 100%)'
          : 'rgba(255,255,255,0.04)',
        border: isPopular
          ? '1px solid rgba(108,108,232,0.55)'
          : '1px solid rgba(255,255,255,0.08)',
        boxShadow: isPopular
          ? '0 0 60px rgba(108,108,232,0.18), 0 20px 60px rgba(0,0,0,0.4)'
          : '0 8px 40px rgba(0,0,0,0.25)',
        transform: isPopular ? 'scale(1.03)' : 'scale(1)',
      }}
    >
      {/* Top accent bar */}
      <div
        style={{
          height: 2,
          borderRadius: '20px 20px 0 0',
          background: isPopular
            ? 'linear-gradient(90deg, #6C6CE8, #9D9EFF)'
            : `linear-gradient(90deg, ${tier.accentColor}, transparent)`,
        }}
      />

      {isPopular && (
        <div
          className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 text-xs font-bold tracking-wider uppercase text-white rounded-full"
          style={{
            background: 'linear-gradient(135deg, #6C6CE8 0%, #5555CC 100%)',
            border: '1px solid rgba(157,158,255,0.4)',
            boxShadow: '0 4px 20px rgba(108,108,232,0.5)',
            letterSpacing: '0.08em',
          }}
        >
          En Popüler
        </div>
      )}

      <div className="flex flex-col flex-1 p-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              background: isPopular ? 'rgba(108,108,232,0.2)' : 'rgba(255,255,255,0.06)',
              border: isPopular ? '1px solid rgba(108,108,232,0.4)' : '1px solid rgba(255,255,255,0.1)',
              color: isPopular ? '#9D9EFF' : 'var(--text-secondary)',
            }}
          >
            {tier.icon}
          </div>
          <div>
            <div className="font-semibold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
              {tier.name}
            </div>
            <div className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
              {tier.description}
            </div>
          </div>
        </div>

        {/* Price */}
        <div className="mb-7">
          {typeof tier.price === 'number' ? (
            tier.price === 0 ? (
              <div
                className="text-4xl font-bold"
                style={{
                  fontFamily: 'Syne, sans-serif',
                  color: 'white',
                }}
              >
                Ücretsiz
              </div>
            ) : (
              <div className="flex items-end gap-1">
                <span
                  className="text-4xl font-bold"
                  style={{
                    fontFamily: 'Syne, sans-serif',
                    ...(isPopular
                      ? {
                          background: 'linear-gradient(135deg, #9D9EFF 0%, #6C6CE8 60%, #B3B3FF 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }
                      : { color: 'white' }),
                  }}
                >
                  ₺{tier.price}
                </span>
                <span className="text-base pb-1" style={{ color: 'var(--text-secondary)' }}>
                  {tier.period}
                </span>
              </div>
            )
          ) : (
            <div
              className="text-4xl font-bold"
              style={{ fontFamily: 'Syne, sans-serif', color: 'white' }}
            >
              {tier.price}
            </div>
          )}
          {typeof tier.price === 'number' && tier.price > 0 && (
            <div className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
              30 gün ücretsiz dene
            </div>
          )}
        </div>

        {/* Features */}
        <div className="flex flex-col gap-3 flex-1 mb-8">
          {tier.features.map((feat) => (
            <div key={feat} className="flex items-center gap-2.5">
              <CheckCircle2
                size={15}
                className="flex-shrink-0"
                style={{ color: isPopular ? '#9D9EFF' : 'var(--success)' }}
              />
              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                {feat}
              </span>
            </div>
          ))}
          {tier.excluded?.map((feat) => (
            <div key={feat} className="flex items-center gap-2.5 opacity-35">
              <X size={15} className="flex-shrink-0" style={{ color: 'var(--text-secondary)' }} />
              <span className="text-sm" style={{ color: 'var(--text-secondary)', textDecoration: 'line-through' }}>
                {feat}
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2"
          style={
            isPopular
              ? {
                  background: 'linear-gradient(135deg, #6C6CE8 0%, #5555CC 100%)',
                  color: 'white',
                  boxShadow: '0 4px 24px rgba(108,108,232,0.45)',
                  border: 'none',
                }
              : {
                  background: 'transparent',
                  color: 'var(--text-primary)',
                  border: '1px solid rgba(255,255,255,0.15)',
                }
          }
        >
          {tier.cta}
          <ArrowRight size={15} />
        </motion.button>
      </div>
    </motion.div>
  );
}

export function PricingPage() {
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });
  const faqRef = useRef(null);
  const isFaqInView = useInView(faqRef, { once: true });

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="py-20 relative mesh-bg">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full blur-3xl opacity-15 animate-float-slow"
            style={{ background: 'var(--brand)' }}
          />
          <div
            className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full blur-3xl opacity-8 animate-float"
            style={{ background: '#9D9EFF' }}
          />
        </div>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            ref={heroRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="badge badge-brand mb-5 mx-auto w-fit">
              <Zap size={12} />
              Fiyatlandırma
            </div>
            <h1
              className="text-responsive-hero font-display font-bold text-white mb-5"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              Hedeflerinize Uygun
              <br />
              <span className="gradient-text">Esnek Planlar</span>
            </h1>
            <p className="text-xl leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Gizli ücret yok · İstediğinde iptal et · 30 gün ücretsiz dene
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing cards */}
      <section className="py-20 relative">
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(108,108,232,0.3), transparent)' }}
        />
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6 items-stretch">
            {tiers.map((tier, i) => (
              <PricingCard key={tier.id} tier={tier} i={i} />
            ))}
          </div>

          {/* B2B note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-12 glass rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6"
            style={{ border: '1px solid rgba(245,197,24,0.15)' }}
          >
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(245,197,24,0.1)', border: '1px solid rgba(245,197,24,0.2)' }}
              >
                <Building2 size={22} style={{ color: '#F5C518' }} />
              </div>
              <div>
                <div className="font-semibold text-white mb-1" style={{ fontFamily: 'Syne, sans-serif' }}>
                  Kurumsal API Ortaklığı
                </div>
                <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  Bankalar ve aracı kurumlar için B2B entegrasyon — ₺200K–500K yıllık gelir potansiyeli
                </div>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="btn-secondary flex items-center gap-2 whitespace-nowrap text-sm py-3 px-6"
            >
              Teklif Al
              <ArrowRight size={15} />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="py-20 relative" style={{ background: 'rgba(0,0,0,0.15)' }}>
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(108,108,232,0.3), transparent)' }}
        />
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2
              className="text-responsive-section font-display font-bold text-white"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              Plan <span className="gradient-text">Karşılaştırması</span>
            </h2>
          </div>

          <div
            className="rounded-2xl overflow-hidden"
            style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}
          >
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                  <th
                    className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider"
                    style={{ color: 'var(--text-secondary)', width: '40%' }}
                  >
                    Özellik
                  </th>
                  {tiers.map((t) => (
                    <th
                      key={t.id}
                      className="px-4 py-4 text-center"
                      style={{ background: t.popular ? 'rgba(108,108,232,0.06)' : 'transparent' }}
                    >
                      <div
                        className="text-sm font-semibold text-white"
                        style={{ fontFamily: 'Syne, sans-serif' }}
                      >
                        {t.name}
                      </div>
                      {t.popular && (
                        <div
                          className="text-xs mt-1 font-medium"
                          style={{ color: 'var(--brand-light)' }}
                        >
                          En Popüler
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row, i) => (
                  <tr
                    key={row.feat}
                    style={{
                      borderBottom: i < tableRows.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                    }}
                  >
                    <td className="px-6 py-3.5 text-sm" style={{ color: 'var(--text-secondary)' }}>
                      {row.feat}
                    </td>
                    {row.vals.map((val, vi) => (
                      <td
                        key={vi}
                        className="px-4 py-3.5 text-center"
                        style={{ background: vi === 1 ? 'rgba(108,108,232,0.04)' : 'transparent' }}
                      >
                        <TableCell val={val} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 relative">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            ref={faqRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isFaqInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2
              className="text-responsive-section font-display font-bold text-white"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              Sık Sorulan <span className="gradient-text">Sorular</span>
            </h2>
          </motion.div>

          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 20 }}
                animate={isFaqInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.07, duration: 0.4 }}
                className="rounded-2xl p-5"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
              >
                <div className="flex items-start gap-3">
                  <HelpCircle
                    size={16}
                    className="flex-shrink-0 mt-0.5"
                    style={{ color: 'var(--brand-light)' }}
                  />
                  <div>
                    <div className="text-sm font-semibold text-white mb-1.5">{faq.q}</div>
                    <div className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {faq.a}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </div>
  );
}
