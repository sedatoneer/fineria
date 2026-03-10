import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Brain, BarChart3, Shield, Zap, Bell, Globe,
  PieChart, Smartphone, HeartHandshake,
} from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI Portföy Yöneticisi',
    description: 'Yapay zeka algoritmalarımız piyasayı 7/24 analiz ederek portföyünüzü otomatik olarak optimize eder.',
    gradient: 'from-brand-500/20 to-brand-700/5',
    border: 'rgba(108,108,232,0.25)',
    iconColor: '#9D9EFF',
    badge: 'YENİ',
  },
  {
    icon: BarChart3,
    title: 'Gelişmiş Analitik',
    description: 'Profesyonel düzeyde teknik göstergeler, korelasyon matrisleri ve risk-getiri analizleri.',
    gradient: 'from-purple-500/20 to-indigo-700/5',
    border: 'rgba(108,108,232,0.2)',
    iconColor: '#8484FF',
  },
  {
    icon: Shield,
    title: 'Kurumsal Güvenlik',
    description: 'BDDK lisanslı, 256-bit AES şifreleme ve çift faktörlü kimlik doğrulama ile paranız her zaman güvende.',
    gradient: 'from-emerald-500/15 to-green-700/5',
    border: 'rgba(34,216,122,0.2)',
    iconColor: '#22D87A',
    badge: 'BDDK',
  },
  {
    icon: Zap,
    title: 'Anında İşlem',
    description: 'Ortalama 0.3 saniyede gerçekleşen işlemlerle en iyi fiyatları kaçırmazsınız.',
    gradient: 'from-yellow-500/15 to-amber-700/5',
    border: 'rgba(245,197,24,0.2)',
    iconColor: '#F5C518',
  },
  {
    icon: Bell,
    title: 'Akıllı Bildirimler',
    description: 'Fiyat alarmları, portföy uyarıları ve kişiselleştirilmiş yatırım fırsatı bildirimleri.',
    gradient: 'from-rose-500/15 to-pink-700/5',
    border: 'rgba(255,77,106,0.2)',
    iconColor: '#FF4D6A',
  },
  {
    icon: Globe,
    title: 'Global Piyasalar',
    description: '50+ ülke borsasına, 1000+ kripto para ve binlerce hisse senedine tek platformdan erişin.',
    gradient: 'from-sky-500/15 to-blue-700/5',
    border: 'rgba(14,165,233,0.2)',
    iconColor: '#38BDF8',
  },
  {
    icon: PieChart,
    title: 'Otomatik Yeniden Dağılım',
    description: 'Portföyünüz hedef ağırlıklardan saptığında otomatik yeniden denge algoritması devreye girer.',
    gradient: 'from-violet-500/15 to-purple-700/5',
    border: 'rgba(139,92,246,0.2)',
    iconColor: '#A78BFA',
  },
  {
    icon: Smartphone,
    title: 'Mobil Öncelikli',
    description: 'iOS ve Android uygulamalarımızla yatırımlarınızı dilediğiniz yerden kontrol edin.',
    gradient: 'from-brand-500/20 to-brand-700/5',
    border: 'rgba(108,108,232,0.2)',
    iconColor: '#9D9EFF',
  },
  {
    icon: HeartHandshake,
    title: '7/24 Uzman Destek',
    description: 'Türkçe konuşan finansal danışmanlarımız ve AI destekli chatbot ile her zaman yanınızdayız.',
    gradient: 'from-orange-500/15 to-red-700/5',
    border: 'rgba(249,115,22,0.2)',
    iconColor: '#FB923C',
  },
];

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="card-hover relative rounded-2xl p-6 group cursor-default"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: `1px solid ${feature.border}`,
      }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(circle at 50% 0%, rgba(108,108,232,0.08) 0%, transparent 70%)` }}
      />

      {/* Icon */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 relative"
        style={{
          background: `rgba(${feature.iconColor === '#22D87A' ? '34,216,122' :
            feature.iconColor === '#F5C518' ? '245,197,24' :
            feature.iconColor === '#FF4D6A' ? '255,77,106' :
            feature.iconColor === '#38BDF8' ? '56,189,248' :
            feature.iconColor === '#A78BFA' ? '167,139,250' :
            feature.iconColor === '#FB923C' ? '251,146,60' :
            '108,108,232'},0.15)`,
          border: `1px solid ${feature.border}`,
        }}
      >
        <feature.icon size={22} style={{ color: feature.iconColor }} />
      </div>

      {/* Badge */}
      {feature.badge && (
        <span
          className="absolute top-4 right-4 text-xs font-bold px-2 py-0.5 rounded-full"
          style={{
            background: feature.badge === 'BDDK' ? 'rgba(34,216,122,0.15)' : 'rgba(108,108,232,0.15)',
            color: feature.badge === 'BDDK' ? '#22D87A' : '#9D9EFF',
            border: `1px solid ${feature.badge === 'BDDK' ? 'rgba(34,216,122,0.3)' : 'rgba(108,108,232,0.3)'}`,
          }}
        >
          {feature.badge}
        </span>
      )}

      <h3 className="font-display font-semibold text-lg mb-2 text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
        {feature.title}
      </h3>
      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
        {feature.description}
      </p>
    </motion.div>
  );
}

export function Features() {
  const titleRef = useRef(null);
  const isInView = useInView(titleRef, { once: true });

  return (
    <section id="ozellikler" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="badge badge-brand mb-4 mx-auto w-fit">
            <Zap size={12} />
            Özellikler
          </div>
          <h2 className="text-responsive-section font-display font-bold mb-4 text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
            Her İhtiyacınız İçin
            <br />
            <span className="gradient-text">Mükemmel Araçlar</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Kurumsal yatırımcıların kullandığı profesyonel araçları artık herkes kullanabilir.
            Fineria ile finansal dünyayı yeniden keşfedin.
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
