import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { UserPlus, Settings, TrendingUp, Trophy } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: UserPlus,
    title: 'Hesabınızı Açın',
    description: '2 dakikada hesap oluşturun. Kimlik doğrulama sürecimiz tamamen dijital ve güvenli.',
    detail: 'TC Kimlik + Selfie yeterli',
    color: '#6C6CE8',
  },
  {
    number: '02',
    icon: Settings,
    title: 'Profilinizi Oluşturun',
    description: 'Risk toleransınızı ve yatırım hedeflerinizi belirleyin. AI size özel strateji hazırlasın.',
    detail: '5 dakikalık anket',
    color: '#9D9EFF',
  },
  {
    number: '03',
    icon: TrendingUp,
    title: 'Yatırım Yapın',
    description: 'Önerilen portföyünüze tek tıkla yatırım yapın ya da kendiniz seçim yapın.',
    detail: 'Minimum ₺100 ile başlayın',
    color: '#22D87A',
  },
  {
    number: '04',
    icon: Trophy,
    title: 'Kazancınızı İzleyin',
    description: 'Gerçek zamanlı takip, otomatik yeniden denge ve aylık raporlarla büyüyün.',
    detail: 'Hedeflerinize ulaşın',
    color: '#F5C518',
  },
];

export function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="nasil-calisir" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(108,108,232,0.08) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="badge badge-brand mb-4 mx-auto w-fit">
            <TrendingUp size={12} />
            Süreç
          </div>
          <h2
            className="text-responsive-section font-display font-bold mb-4 text-white"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            4 Adımda <span className="gradient-text">Yatırıma Başlayın</span>
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Finansal geleceğinizi şekillendirmek hiç bu kadar kolay olmamıştı.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line */}
          <div
            className="absolute top-16 left-0 right-0 h-0.5 hidden lg:block"
            style={{
              background: 'linear-gradient(90deg, transparent 5%, rgba(108,108,232,0.3) 20%, rgba(108,108,232,0.3) 80%, transparent 95%)',
            }}
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center text-center relative"
              >
                {/* Step number bubble */}
                <motion.div
                  className="relative w-16 h-16 rounded-2xl flex items-center justify-center mb-6 z-10"
                  style={{
                    background: `rgba(${step.color === '#6C6CE8' ? '108,108,232' :
                      step.color === '#9D9EFF' ? '157,158,255' :
                      step.color === '#22D87A' ? '34,216,122' :
                      '245,197,24'},0.15)`,
                    border: `1px solid ${step.color}40`,
                  }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                  <step.icon size={26} style={{ color: step.color }} />

                  {/* Step number badge */}
                  <div
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ background: step.color, color: 'white' }}
                  >
                    {i + 1}
                  </div>
                </motion.div>

                <h3 className="font-display font-semibold text-lg text-white mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>
                  {step.description}
                </p>
                <span
                  className="text-xs font-medium px-3 py-1 rounded-full"
                  style={{
                    background: `rgba(${step.color === '#6C6CE8' ? '108,108,232' :
                      step.color === '#9D9EFF' ? '157,158,255' :
                      step.color === '#22D87A' ? '34,216,122' :
                      '245,197,24'},0.12)`,
                    color: step.color,
                    border: `1px solid ${step.color}30`,
                  }}
                >
                  {step.detail}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA after steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex justify-center mt-16"
        >
          <motion.a
            href="#kayit"
            className="btn-primary flex items-center gap-2 text-base"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Hemen Başla — Ücretsiz
            <TrendingUp size={18} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
