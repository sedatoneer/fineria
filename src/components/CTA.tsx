import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export function CTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl overflow-hidden text-center py-20 px-8"
          style={{
            background: 'linear-gradient(135deg, rgba(108,108,232,0.2) 0%, rgba(64,64,168,0.1) 50%, rgba(157,158,255,0.15) 100%)',
            border: '1px solid rgba(108,108,232,0.3)',
          }}
        >
          {/* Background effects */}
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute -top-20 -left-20 w-80 h-80 rounded-full blur-3xl opacity-30 animate-float"
              style={{ background: 'var(--brand)' }}
            />
            <div
              className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full blur-3xl opacity-20 animate-float-slow"
              style={{ background: '#9D9EFF' }}
            />
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px),
                                  linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`,
                backgroundSize: '40px 40px',
              }}
            />
          </div>

          {/* Content */}
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-semibold"
              style={{
                background: 'rgba(108,108,232,0.2)',
                border: '1px solid rgba(108,108,232,0.4)',
                color: 'var(--brand-light)',
              }}
            >
              <Sparkles size={14} />
              Ücretsiz 30 Gün Deneme
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="font-display font-bold text-white mb-4"
              style={{
                fontFamily: 'Syne, sans-serif',
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                lineHeight: '1.1',
              }}
            >
              Finansal Geleceğinizi
              <br />
              <span className="gradient-text">Bugün Şekillendirin</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-lg mb-10 max-w-xl mx-auto"
              style={{ color: 'var(--text-secondary)' }}
            >
              Kredi kartı gerekmez. Kurulum yok. Dakikalar içinde yatırıma başlayın.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              <motion.a
                href="#kayit"
                className="btn-primary text-base flex items-center gap-2 py-4 px-8"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{ boxShadow: '0 8px 40px rgba(108,108,232,0.4)' }}
              >
                Hemen Üye Ol
                <ArrowRight size={20} />
              </motion.a>
              <motion.a
                href="#demo"
                className="btn-secondary text-base py-4 px-8"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Demo Talep Et
              </motion.a>
            </motion.div>

            {/* Trust row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm"
              style={{ color: 'var(--text-secondary)' }}
            >
              {['BDDK Lisanslı', '30 gün ücretsiz', 'İstediğinde iptal et', 'Türkçe destek'].map((item, i) => (
                <span key={item} className="flex items-center gap-4">
                  {i > 0 && <span className="opacity-30 -mx-3">|</span>}
                  <span className="flex items-center gap-1">
                    <CheckCircle2 size={13} style={{ color: 'var(--success)' }} />
                    {item}
                  </span>
                </span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
