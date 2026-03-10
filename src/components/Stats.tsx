import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { Users, TrendingUp, Globe, Award } from 'lucide-react';

interface StatItem {
  icon: React.ElementType;
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  sublabel: string;
  color: string;
  decimals?: number;
}

const stats: StatItem[] = [
  {
    icon: Users,
    value: 125000,
    suffix: '+',
    label: 'Aktif Kullanıcı',
    sublabel: 'Türkiye genelinde',
    color: '#6C6CE8',
  },
  {
    icon: TrendingUp,
    value: 2.4,
    prefix: '₺',
    suffix: 'B',
    label: 'Yönetilen Varlık',
    sublabel: 'Toplam AUM',
    color: '#22D87A',
    decimals: 1,
  },
  {
    icon: Globe,
    value: 99.97,
    suffix: '%',
    label: 'Platform Uptime',
    sublabel: 'Son 12 ayda',
    color: '#F5C518',
    decimals: 2,
  },
  {
    icon: Award,
    value: 4.9,
    suffix: '/5',
    label: 'Kullanıcı Puanı',
    sublabel: '32.000+ değerlendirme',
    color: '#9D9EFF',
    decimals: 1,
  },
];

function CounterNumber({
  target, prefix = '', suffix = '', decimals = 0, active,
}: {
  target: number; prefix?: string; suffix?: string; decimals?: number; active: boolean;
}) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!active) return;
    const startTime = Date.now();
    const duration = 2200;
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCurrent(parseFloat((eased * target).toFixed(decimals)));
      if (progress >= 1) {
        setCurrent(target);
        clearInterval(timer);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [active, target, decimals]);

  return (
    <span className="font-mono">
      {prefix}{current.toLocaleString('tr-TR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}{suffix}
    </span>
  );
}

export function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-24 relative">
      {/* Section divider top */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(108,108,232,0.4), transparent)' }}
      />

      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 40% at 50% 50%, rgba(108,108,232,0.06) 0%, transparent 100%)',
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
          <h2
            className="text-responsive-section font-display font-bold text-white"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            Rakamlarla <span className="gradient-text">Fineria</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="glass rounded-3xl p-8 text-center card-hover"
              style={{ border: `1px solid rgba(${stat.color === '#6C6CE8' ? '108,108,232' :
                stat.color === '#22D87A' ? '34,216,122' :
                stat.color === '#F5C518' ? '245,197,24' :
                '157,158,255'},0.2)` }}
            >
              {/* Icon */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 mx-auto"
                style={{
                  background: `rgba(${stat.color === '#6C6CE8' ? '108,108,232' :
                    stat.color === '#22D87A' ? '34,216,122' :
                    stat.color === '#F5C518' ? '245,197,24' :
                    '157,158,255'},0.15)`,
                }}
              >
                <stat.icon size={26} style={{ color: stat.color }} />
              </div>

              {/* Number */}
              <div
                className="text-4xl font-bold mb-2"
                style={{ color: stat.color }}
              >
                <CounterNumber
                  target={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  decimals={stat.decimals}
                  active={isInView}
                />
              </div>

              <div className="font-semibold text-white mb-1">{stat.label}</div>
              <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>{stat.sublabel}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
