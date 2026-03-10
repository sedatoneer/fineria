import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Ahmet Yılmaz',
    title: 'Yazılım Mühendisi',
    location: 'İstanbul',
    avatar: 'AY',
    color: '#6C6CE8',
    rating: 5,
    text: 'Fineria sayesinde yatırım yapmak çok kolaylaştı. AI tavsiyeleri gerçekten işe yarıyor — 6 ayda portföyüm %34 büyüdü. Başka hiçbir platformda bu kadar güvende hissetmemiştim.',
    return: '+34%',
    period: '6 ayda',
  },
  {
    name: 'Selin Kaya',
    title: 'Öğretim Üyesi',
    location: 'Ankara',
    avatar: 'SK',
    color: '#22D87A',
    rating: 5,
    text: 'Fintech konusunda hiç bilgim yoktu ama Fineria\'nın rehberli portföy özelliği sayesinde artık aktif bir yatırımcıyım. Arayüz harika, Türkçe destek muhteşem.',
    return: '+22%',
    period: '4 ayda',
  },
  {
    name: 'Murat Demir',
    title: 'Girişimci',
    location: 'İzmir',
    avatar: 'MD',
    color: '#F5C518',
    rating: 5,
    text: 'İş hayatımda çok yoğun olduğum için otomatik yeniden denge özelliği hayat kurtarıcı. Portföyüm yönetiliyor, ben de işime odaklanıyorum. Kurumsal müşteri desteği mükemmel.',
    return: '+41%',
    period: '8 ayda',
  },
  {
    name: 'Zeynep Arslan',
    title: 'Doktor',
    location: 'Bursa',
    avatar: 'ZA',
    color: '#9D9EFF',
    rating: 5,
    text: 'Güvenlik konusundaki şüphelerim vardı ama BDDK lisansı ve iki faktörlü doğrulama sistemi beni ikna etti. Şimdi tüm tasarruflarımı Fineria\'da tutuyorum.',
    return: '+18%',
    period: '3 ayda',
  },
  {
    name: 'Can Öztürk',
    title: 'Fotoğrafçı',
    location: 'Bodrum',
    avatar: 'CÖ',
    color: '#FB923C',
    rating: 5,
    text: 'Kripto ve hisse senedini aynı anda takip edebilmek inanılmaz. Bildirim sistemi çok iyi — fırsatları hiç kaçırmıyorum. Kesinlikle tavsiye ederim.',
    return: '+56%',
    period: '10 ayda',
  },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  const visible = [
    testimonials[(current - 1 + testimonials.length) % testimonials.length],
    testimonials[current],
    testimonials[(current + 1) % testimonials.length],
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(108,108,232,0.06) 0%, transparent 70%)',
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
            <Star size={12} />
            Kullanıcı Yorumları
          </div>
          <h2
            className="text-responsive-section font-display font-bold mb-4 text-white"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            Kullanıcılarımız <span className="gradient-text">Söylüyor</span>
          </h2>
          <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
            32.000+ mutlu kullanıcının gerçek deneyimleri
          </p>
        </motion.div>

        {/* Testimonial cards */}
        <div className="relative">
          <div className="grid md:grid-cols-3 gap-6 items-center">
            {visible.map((t, i) => {
              const isCenter = i === 1;
              return (
                <motion.div
                  key={t.name}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{
                    opacity: isCenter ? 1 : 0.6,
                    scale: isCenter ? 1 : 0.92,
                  }}
                  transition={{ duration: 0.4 }}
                  className="glass rounded-3xl p-6 relative"
                  style={{
                    border: isCenter ? '1px solid rgba(108,108,232,0.35)' : '1px solid rgba(255,255,255,0.06)',
                    boxShadow: isCenter ? '0 20px 60px rgba(0,0,0,0.3), 0 0 40px rgba(108,108,232,0.1)' : 'none',
                  }}
                >
                  <Quote
                    size={32}
                    className="mb-4 opacity-30"
                    style={{ color: t.color }}
                  />

                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, si) => (
                      <Star key={si} size={14} fill={t.color} style={{ color: t.color }} />
                    ))}
                  </div>

                  <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
                    "{t.text}"
                  </p>

                  {/* Return badge */}
                  <div
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold mb-4"
                    style={{
                      background: `rgba(${t.color === '#22D87A' ? '34,216,122' :
                        t.color === '#F5C518' ? '245,197,24' :
                        t.color === '#9D9EFF' ? '157,158,255' :
                        t.color === '#FB923C' ? '251,146,60' :
                        '108,108,232'},0.15)`,
                      color: t.color,
                      border: `1px solid ${t.color}30`,
                    }}
                  >
                    {t.return} {t.period}
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white"
                      style={{ background: t.color }}
                    >
                      {t.avatar}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">{t.name}</div>
                      <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                        {t.title} · {t.location}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <motion.button
              onClick={prev}
              className="w-11 h-11 rounded-xl glass flex items-center justify-center transition-colors"
              style={{ border: '1px solid rgba(255,255,255,0.1)' }}
              whileHover={{ scale: 1.05, borderColor: 'rgba(108,108,232,0.4)' }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft size={20} style={{ color: 'var(--text-secondary)' }} />
            </motion.button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className="h-2 rounded-full transition-all duration-300"
                  style={{
                    width: i === current ? '24px' : '8px',
                    background: i === current ? 'var(--brand)' : 'rgba(255,255,255,0.2)',
                  }}
                />
              ))}
            </div>

            <motion.button
              onClick={next}
              className="w-11 h-11 rounded-xl glass flex items-center justify-center"
              style={{ border: '1px solid rgba(255,255,255,0.1)' }}
              whileHover={{ scale: 1.05, borderColor: 'rgba(108,108,232,0.4)' }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight size={20} style={{ color: 'var(--text-secondary)' }} />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
