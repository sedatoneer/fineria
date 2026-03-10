import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { Shield, Lock, Eye, Server, CheckCircle2, Fingerprint, Key, AlertTriangle } from 'lucide-react';

const securityFeatures = [
  { icon: Lock, title: '256-bit AES Şifreleme', desc: 'Verileriniz askeri düzeyde şifreleme ile korunur.' },
  { icon: Fingerprint, title: 'Biyometrik Doğrulama', desc: 'Parmak izi ve yüz tanıma ile gelişmiş güvenlik.' },
  { icon: Key, title: 'İki Faktörlü Kimlik', desc: 'Her girişte SMS veya authenticator kodu gerekli.' },
  { icon: Eye, title: 'Gerçek Zamanlı İzleme', desc: '7/24 anormal aktivite tespiti ve anlık uyarılar.' },
  { icon: Server, title: 'Yedekli Altyapı', desc: '%99.97 uptime garantisi ile kesintisiz hizmet.' },
  { icon: AlertTriangle, title: 'Fraud Koruması', desc: 'AI tabanlı dolandırıcılık tespiti sistemi.' },
];

const certifications = [
  { name: 'BDDK', label: 'Lisanslı', color: '#22D87A' },
  { name: 'ISO 27001', label: 'Sertifikalı', color: '#6C6CE8' },
  { name: 'PCI DSS', label: 'Uyumlu', color: '#F5C518' },
  { name: 'KVKK', label: 'Uyumlu', color: '#9D9EFF' },
];

export function Security() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="guvenlik" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 80% 50%, rgba(34,216,122,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Visual */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex justify-center"
          >
            {/* Shield graphic */}
            <div className="relative w-72 h-72">
              {/* Outer ring */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 opacity-20 animate-spin-slow"
                style={{ borderColor: 'var(--brand)', borderStyle: 'dashed' }}
              />

              {/* Middle ring */}
              <div
                className="absolute inset-8 rounded-full border animate-pulse"
                style={{ borderColor: 'rgba(34,216,122,0.3)' }}
              />

              {/* Center */}
              <div
                className="absolute inset-16 rounded-full flex items-center justify-center animate-pulse-glow"
                style={{ background: 'rgba(108,108,232,0.15)', border: '2px solid rgba(108,108,232,0.4)' }}
              >
                <Shield size={64} style={{ color: 'var(--brand)' }} />
              </div>

              {/* Orbiting dots */}
              {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 rounded-full"
                  style={{
                    background: i % 2 === 0 ? 'var(--brand)' : 'var(--success)',
                    top: '50%',
                    left: '50%',
                    transform: `rotate(${deg}deg) translateX(100px)`,
                    marginTop: '-6px',
                    marginLeft: '-6px',
                    boxShadow: `0 0 10px ${i % 2 === 0 ? 'rgba(108,108,232,0.8)' : 'rgba(34,216,122,0.8)'}`,
                  }}
                  animate={{ rotate: [deg, deg + 360] }}
                  transition={{ duration: 8 + i, repeat: Infinity, ease: 'linear' }}
                />
              ))}
            </div>

            {/* Certifications */}
            <div className="absolute bottom-0 left-0 right-0 flex flex-wrap justify-center gap-2">
              {certifications.map((cert) => (
                <div
                  key={cert.name}
                  className="glass px-4 py-2 rounded-xl flex items-center gap-2"
                  style={{ border: `1px solid ${cert.color}30` }}
                >
                  <CheckCircle2 size={14} style={{ color: cert.color }} />
                  <span className="text-xs font-semibold text-white">{cert.name}</span>
                  <span className="text-xs" style={{ color: cert.color }}>{cert.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="badge badge-brand mb-4 w-fit">
              <Shield size={12} />
              Güvenlik
            </div>
            <h2
              className="text-responsive-section font-display font-bold mb-4 text-white"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              Paranız <span className="gradient-text">Her Zaman Güvende</span>
            </h2>
            <p className="text-lg mb-10" style={{ color: 'var(--text-secondary)' }}>
              Kurumsal bankacılık düzeyinde güvenlik altyapısı, uluslararası standartlara
              uygunluk ve proaktif tehdit yönetimi.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {securityFeatures.map((feat, i) => (
                <motion.div
                  key={feat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
                  className="flex gap-3 p-4 rounded-xl"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(34,216,122,0.12)', border: '1px solid rgba(34,216,122,0.2)' }}
                  >
                    <feat.icon size={18} style={{ color: 'var(--success)' }} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white mb-0.5">{feat.title}</div>
                    <div className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{feat.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
