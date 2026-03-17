import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { Target, TrendingUp, Users, Lightbulb, Globe2, Heart, CheckCircle2, XCircle } from 'lucide-react';
import { CTA } from '@/components/CTA';

const values = [
  { icon: Target, title: 'Şeffaflık', desc: 'Gizli ücret, gizli algoritma yok. Her kararın arkasında netlik var.', color: '#6C6CE8' },
  { icon: Lightbulb, title: 'İnovasyon', desc: 'LSTM, XGBoost, FinBERT — en güncel teknolojileri herkesin erişimine açıyoruz.', color: '#9D9EFF' },
  { icon: Heart, title: 'Kullanıcı Odaklılık', desc: 'Her özellik gerçek yatırımcı ihtiyaçlarından doğdu. Teknoloji değil, insan merkezi.', color: '#FF4D6A' },
  { icon: Globe2, title: 'Erişilebilirlik', desc: 'Kurumsal araçları bireysel yatırımcılara açmak — demokratik finans için çalışıyoruz.', color: '#22D87A' },
];

const timeline = [
  { phase: 'Faz 1', title: 'Temel Platform', desc: 'Gelir-gider takibi, portföy yönetimi, temel sosyal etkileşim ve kullanıcı kayıt sistemi.', color: '#6C6CE8', done: true },
  { phase: 'Faz 2', title: 'AI Entegrasyonu', desc: 'LSTM tahmin motoru, FinBERT duygu analizi ve davranışsal risk profili sistemi devreye girişi.', color: '#9D9EFF', done: true },
  { phase: 'Faz 3', title: 'Sosyal Ağ', desc: 'Doğrulanmış yatırımcı topluluğu, performans bazlı sıralama ve içerik doğrulama sistemi.', color: '#22D87A', done: false },
  { phase: 'Faz 4', title: 'B2B API', desc: 'Kurumsal API entegrasyonu, banka ve aracı kurum ortaklıkları, robo-advisory çözümleri.', color: '#F5C518', done: false },
];

const marketData = [
  { label: 'Global FinTech Kullanıcısı (2024)', value: '5.4 Milyar', sub: '2020\'ye kıyasla +%53 büyüme' },
  { label: 'Türkiye FinTech Hedefi (2030)', value: '$6 Milyar', sub: '2024\'ten yaklaşık 2x büyüme' },
  { label: 'Yıl 1 Tahmini Gelir', value: '₺4.3M', sub: '%6 dönüşüm oranıyla 3.000 premium kullanıcı' },
  { label: 'B2B API Gelir Potansiyeli', value: '₺200K–500K', sub: 'Kurum başına yıllık, 2–3 ortaklık hedefi' },
];

export function AboutPage() {
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });
  const missionRef = useRef(null);
  const isMissionInView = useInView(missionRef, { once: true });

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="py-20 mesh-bg relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-20 w-80 h-80 rounded-full blur-3xl opacity-15 animate-float" style={{ background: 'var(--brand)' }} />
          <div className="absolute bottom-20 right-20 w-64 h-64 rounded-full blur-3xl opacity-10 animate-float-slow" style={{ background: '#9D9EFF' }} />
        </div>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            ref={heroRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="badge badge-brand mb-5 mx-auto w-fit">
              <Heart size={12} />
              Hakkımızda
            </div>
            <h1
              className="text-responsive-hero font-display font-bold text-white mb-6"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              Finansal Okuryazarlığı
              <br />
              <span className="gradient-text">Demokratikleştiriyoruz</span>
            </h1>
            <p className="text-xl leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Bireysel yatırımcıların manipülatif içeriklere maruz kalmadan, kendi risk profillerine
              uygun kararlar verebileceği güvenilir bir ekosistem inşa ediyoruz.
              Yapay zeka ve etik bilgi paylaşımı bir arada.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Problem */}
      <section className="py-20" style={{ background: 'rgba(0,0,0,0.2)' }}>
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(108,108,232,0.4), transparent)' }}
        />
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              ref={missionRef}
              initial={{ opacity: 0, x: -30 }}
              animate={isMissionInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <div className="badge badge-brand mb-4 w-fit">
                <Target size={12} />
                Misyonumuz
              </div>
              <h2 className="text-responsive-section font-display font-bold text-white mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>
                Çözdüğümüz <span className="gradient-text">Gerçek Problem</span>
              </h2>
              <div className="flex flex-col gap-5">
                {[
                  { title: 'Finansal Okuryazarlık Eksikliği', desc: 'Bireysel yatırımcılar bütçe disiplini ve varlık yönetiminde ciddi güçlükler yaşıyor.', color: '#FF4D6A' },
                  { title: 'Manipülatif İçerik', desc: 'X (Twitter) ve Telegram\'daki doğrulanmamış tavsiyeler kullanıcıları ciddi kayıplara sürüklüyor.', color: '#F5C518' },
                  { title: 'Psikolojik Engeller', desc: 'Yatırımcılar panik satış ve aşırı güven gibi duygusal hatalara açık kalıyor.', color: '#6C6CE8' },
                  { title: 'Karmaşık Profesyonel Araçlar', desc: 'Matriks, TradingView gibi platformlar yeni yatırımcıları dışlıyor.', color: '#22D87A' },
                ].map(item => (
                  <div key={item.title} className="flex gap-4">
                    <div
                      className="w-1 flex-shrink-0 rounded-full"
                      style={{ background: item.color }}
                    />
                    <div>
                      <div className="text-sm font-semibold text-white mb-1">{item.title}</div>
                      <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isMissionInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="glass rounded-3xl p-8"
              style={{ border: '1px solid rgba(108,108,232,0.2)' }}
            >
              <h3 className="font-semibold text-white mb-6 text-xl" style={{ fontFamily: 'Syne, sans-serif' }}>
                Çözümümüz: 3 Katmanlı Yaklaşım
              </h3>
              {[
                {
                  num: '01',
                  title: 'AI Destekli Analiz',
                  desc: 'LSTM tahmin + FinBERT duygu analizi ile piyasa verilerini anlamlı içgörülere dönüştürme.',
                  color: '#6C6CE8',
                },
                {
                  num: '02',
                  title: 'Davranışsal Profil',
                  desc: 'Kullanıcının yatırım karakterini "tepkisel", "sabırlı" veya "risk-duyarsız" olarak etiketleyen ML sistemi.',
                  color: '#9D9EFF',
                },
                {
                  num: '03',
                  title: 'Doğrulanmış Sosyal Ağ',
                  desc: 'Manipülatif içeriklerin önüne geçen, performans bazlı güvenilirlik skorlu yatırım topluluğu.',
                  color: '#22D87A',
                },
              ].map(item => (
                <div
                  key={item.num}
                  className="flex gap-5 pb-6 mb-6 border-b"
                  style={{ borderColor: 'rgba(255,255,255,0.06)' }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0"
                    style={{ background: `${item.color}20`, color: item.color, border: `1px solid ${item.color}40` }}
                  >
                    {item.num}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white mb-1">{item.title}</div>
                    <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>{item.desc}</div>
                  </div>
                </div>
              ))}
              <div className="text-sm italic" style={{ color: 'var(--text-secondary)' }}>
                "Mevcut rakipler veri sunar; Fineria bu veriyi kullanıcının psikolojik karakteriyle
                eşleştirerek kişiselleştirilmiş karar destek deneyimine dönüştürür."
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Market Opportunity */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="badge badge-brand mb-4 mx-auto w-fit">
              <TrendingUp size={12} />
              Pazar Fırsatı
            </div>
            <h2 className="text-responsive-section font-display font-bold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
              Büyüyen Bir Pazarda
              <br />
              <span className="gradient-text">Stratejik Konumlama</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {marketData.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="glass rounded-3xl p-6 text-center card-hover"
                style={{ border: '1px solid rgba(108,108,232,0.15)' }}
              >
                <div className="text-3xl font-bold gradient-text mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>
                  {item.value}
                </div>
                <div className="text-sm font-medium text-white mb-1">{item.label}</div>
                <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>{item.sub}</div>
              </motion.div>
            ))}
          </div>

          {/* Competitor analysis */}
          <div className="glass rounded-3xl p-8" style={{ border: '1px solid rgba(108,108,232,0.2)' }}>
            <h3 className="font-semibold text-white mb-6 text-xl" style={{ fontFamily: 'Syne, sans-serif' }}>
              Rakip Analizi — Neden Fineria?
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[500px]">
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                    {['Platform', 'Teknik Analiz', 'AI Tahmin', 'Davranışsal Profil', 'Sosyal Ağ', 'Türkçe Destek'].map(h => (
                      <th key={h} className="text-left py-3 pr-4 text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'Matriks', vals: ['Güçlü', false, false, false, true], isFineria: false },
                    { name: 'TradingView', vals: ['Güçlü', false, false, 'Sınırlı', false], isFineria: false },
                    { name: 'Investing', vals: ['Orta', false, false, false, false], isFineria: false },
                    { name: 'Fineria', vals: ['Kapsamlı', 'LSTM+XGB', '3 Katman', 'Doğrulanmış', 'Native'], isFineria: true },
                  ].map((row) => (
                    <tr
                      key={row.name}
                      style={{
                        borderBottom: '1px solid rgba(255,255,255,0.05)',
                        background: row.isFineria ? 'rgba(108,108,232,0.08)' : 'transparent',
                      }}
                    >
                      <td
                        className="py-3 pr-4 text-sm font-semibold"
                        style={{ color: row.isFineria ? 'var(--brand-light)' : 'white' }}
                      >
                        {row.name}
                      </td>
                      {row.vals.map((cell, ci) => (
                        <td key={ci} className="py-3 pr-4 text-sm">
                          {cell === false ? (
                            <XCircle size={16} style={{ color: 'rgba(255,255,255,0.2)' }} />
                          ) : cell === true ? (
                            <CheckCircle2 size={16} style={{ color: 'var(--success)' }} />
                          ) : (
                            <span style={{ color: row.isFineria ? 'var(--success)' : 'var(--text-secondary)' }}>
                              {cell as string}
                            </span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20" style={{ background: 'rgba(0,0,0,0.2)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="badge badge-brand mb-4 mx-auto w-fit">
              <Heart size={12} />
              Değerlerimiz
            </div>
            <h2 className="text-responsive-section font-display font-bold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
              Neye İnandığımız,
              <br />
              <span className="gradient-text">Nasıl Çalıştığımız</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="glass rounded-3xl p-6 card-hover text-center"
                style={{ border: `1px solid ${v.color}25` }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  style={{ background: `${v.color}15`, border: `1px solid ${v.color}30` }}
                >
                  <v.icon size={24} style={{ color: v.color }} />
                </div>
                <h3 className="font-semibold text-white mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>{v.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="badge badge-brand mb-4 mx-auto w-fit">
              <Users size={12} />
              Yol Haritası
            </div>
            <h2 className="text-responsive-section font-display font-bold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
              Geliştirme <span className="gradient-text">Takvimi</span>
            </h2>
          </div>

          <div className="relative">
            <div
              className="absolute left-8 top-0 bottom-0 w-px"
              style={{ background: 'linear-gradient(180deg, var(--brand) 0%, rgba(108,108,232,0.1) 100%)' }}
            />
            <div className="flex flex-col gap-8 pl-20">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.phase}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  {/* Dot */}
                  <div
                    className="absolute -left-[52px] top-4 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{
                      background: item.done ? item.color : 'rgba(255,255,255,0.05)',
                      border: `2px solid ${item.done ? item.color : 'rgba(255,255,255,0.15)'}`,
                      color: item.done ? 'white' : 'rgba(255,255,255,0.3)',
                    }}
                  >
                    {item.done ? (
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2 7l4 4 6-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ) : i + 1}
                  </div>
                  <div
                    className="glass rounded-2xl p-6"
                    style={{ border: `1px solid ${item.done ? item.color + '40' : 'rgba(255,255,255,0.06)'}` }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className="text-xs font-bold px-2 py-0.5 rounded-full"
                        style={{
                          background: `${item.color}20`,
                          color: item.color,
                          border: `1px solid ${item.color}40`,
                        }}
                      >
                        {item.phase}
                      </span>
                      <h3 className="text-base font-semibold text-white">{item.title}</h3>
                      {item.done && (
                        <span className="text-xs font-medium ml-auto flex items-center gap-1" style={{ color: 'var(--success)' }}>
                          Tamamlandı
                          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                            <path d="M1.5 5.5l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </span>
                      )}
                    </div>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTA />
    </div>
  );
}
