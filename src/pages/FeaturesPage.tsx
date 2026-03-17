import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import {
  Brain, BarChart3, Zap, Globe,
  Users, Activity, BookOpen, Target,
} from 'lucide-react';
import { CTA } from '@/components/CTA';

const mainFeatures = [
  {
    icon: Brain,
    title: 'Multi-Head Attention LSTM + XGBoost',
    description: 'Hibrit derin öğrenme modelimiz 30 günlük pencere kullanarak sonraki gün fiyat yönünü tahmin eder. Attention mekanizması hangi günlerin kritik olduğunu otomatik tespit eder.',
    detail: '22 teknik gösterge · %68+ doğruluk · Günlük güncelleme',
    color: '#6C6CE8',
    badge: 'AI Çekirdeği',
  },
  {
    icon: Activity,
    title: 'FinBERT & BERTurk Duygu Analizi',
    description: 'Finansal haberler ve sosyal medya içerikleri üzerinde NLP tabanlı duygu analizi yaparak piyasa eğilimlerini erkenden tespit eder. Türkçe finansal metinlere özel eğitilmiş model.',
    detail: 'Twitter · Telegram · Finansal Haberler',
    color: '#9D9EFF',
    badge: 'NLP',
  },
  {
    icon: Target,
    title: 'Davranışsal Risk Profili',
    description: '3 katmanlı profil sistemi: kayıt anketi, uygulama içi davranış sinyalleri ve 30 günlük yenileme döngüsü. "Tepkisel", "sabırlı" veya "risk-duyarsız" etiketleri makine öğrenmesi ile belirlenir.',
    detail: '30 günlük yenileme · Kişiselleştirilmiş strateji',
    color: '#22D87A',
    badge: 'Davranışsal Finans',
  },
  {
    icon: BarChart3,
    title: 'RSI, MACD, Bollinger Bantları',
    description: '22 teknik gösterge ile kapsamlı piyasa analizi. EMA_50, EMA_200, Stokastik Osilatör, ATR, OBV ve MFI dahil tüm profesyonel araçlar tek ekranda.',
    detail: '22 gösterge · MinMaxScaler normalize · Gerçek zamanlı',
    color: '#F5C518',
    badge: 'Teknik Analiz',
  },
  {
    icon: Users,
    title: 'Doğrulanmış Sosyal Ağ',
    description: 'Manipülatif içeriklerin önüne geçen doğrulanmış yatırım topluluğu. Gerçek performans verilerine dayalı sıralama sistemi ile güvenilir tavsiyeler.',
    detail: 'Kimlik doğrulamalı · Performans bazlı sıralama',
    color: '#FB923C',
    badge: 'Sosyal',
  },
  {
    icon: Globe,
    title: 'Global Piyasalar & yFinance',
    description: 'Yahoo Finance API entegrasyonu ile BIST hisse senetleri (AKBNK.IS, CCOLA.IS), ABD piyasaları (AAPL, MSFT) ve kripto paralar (BTC-USD) için gerçek zamanlı OHLCV verisi.',
    detail: 'BIST · NYSE · NASDAQ · Kripto',
    color: '#38BDF8',
    badge: 'Veri',
  },
];

const technicalSpecs = [
  { label: 'Model Mimarisi', value: 'Multi-Head Attention LSTM + XGBoost Hibrit' },
  { label: 'Tahmin Penceresi', value: '30 günlük lookback window' },
  { label: 'Veri Kaynağı', value: 'yFinance API (OHLCV + Dividends + Splits)' },
  { label: 'Teknik Gösterge Sayısı', value: '22 özellik (ta kütüphanesi)' },
  { label: 'Normalizasyon', value: 'MinMaxScaler → [0, 1]' },
  { label: 'Eğitim / Doğrulama / Test', value: '%70 / %15 / %15' },
  { label: 'Metrikler', value: 'RMSE, F1-Score, Backtesting' },
  { label: 'NLP Modeli', value: 'FinBERT + BERTurk (Türkçe finansal)' },
  { label: 'Altyapı', value: 'Docker + Kubernetes + FastAPI + .NET 8' },
  { label: 'Güvenlik', value: 'JWT Auth + Role-based Access Control' },
];

const indicators = [
  { name: 'RSI', desc: '14 günlük Göreceli Güç Endeksi', color: '#6C6CE8' },
  { name: 'MACD', desc: '12-26-9 MACD ve sinyal hattı', color: '#22D87A' },
  { name: 'EMA_50', desc: '50 günlük Üstel Hareketli Ortalama', color: '#F5C518' },
  { name: 'EMA_200', desc: '200 günlük Üstel Hareketli Ortalama', color: '#F5C518' },
  { name: 'BB_High', desc: 'Bollinger Bandı üst çizgi (2σ)', color: '#9D9EFF' },
  { name: 'BB_Low', desc: 'Bollinger Bandı alt çizgi (2σ)', color: '#9D9EFF' },
  { name: 'ATR', desc: '14 günlük Ortalama Gerçek Aralık (volatilite)', color: '#FB923C' },
  { name: 'Stoch_K', desc: '14 günlük Stokastik Osilatör %K', color: '#38BDF8' },
  { name: 'OBV', desc: 'Bakiye Hacim (volume flow)', color: '#A78BFA' },
  { name: 'MFI', desc: '14 günlük Para Akışı Endeksi', color: '#34D399' },
  { name: 'Momentum', desc: '10 günlük Değişim Oranı (ROC)', color: '#F472B6' },
  { name: 'RSI_Diff', desc: 'RSI günlük fark (değişim hızı)', color: '#6C6CE8' },
];

function FeatureCard({ feat, i }: { feat: typeof mainFeatures[0]; i: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const colorMap: Record<string, string> = {
    '#6C6CE8': '108,108,232', '#9D9EFF': '157,158,255', '#22D87A': '34,216,122',
    '#F5C518': '245,197,24', '#FB923C': '251,146,60', '#38BDF8': '56,189,248',
  };
  const rgb = colorMap[feat.color] || '108,108,232';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}
      className="glass rounded-3xl p-8 card-hover"
      style={{ border: `1px solid rgba(${rgb},0.2)` }}
    >
      <div className="flex items-start gap-5">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{ background: `rgba(${rgb},0.12)`, border: `1px solid rgba(${rgb},0.25)` }}
        >
          <feat.icon size={26} style={{ color: feat.color }} />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-display font-bold text-white text-lg" style={{ fontFamily: 'Syne, sans-serif' }}>
              {feat.title}
            </h3>
            <span
              className="text-xs px-2 py-0.5 rounded-full font-semibold flex-shrink-0"
              style={{ background: `rgba(${rgb},0.15)`, color: feat.color, border: `1px solid rgba(${rgb},0.3)` }}
            >
              {feat.badge}
            </span>
          </div>
          <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>
            {feat.description}
          </p>
          <div
            className="text-xs px-3 py-1.5 rounded-lg inline-block"
            style={{ background: `rgba(${rgb},0.08)`, color: feat.color }}
          >
            {feat.detail}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function FeaturesPage() {
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });
  const techRef = useRef(null);
  const isTechInView = useInView(techRef, { once: true });

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="py-20 relative mesh-bg">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            ref={heroRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="badge badge-brand mb-5 mx-auto w-fit">
              <Brain size={12} />
              Yapay Zeka Destekli Platform
            </div>
            <h1
              className="text-responsive-hero font-display font-bold text-white mb-6"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              Geleceğin Fintech
              <br />
              <span className="gradient-text">Teknolojisi Burada</span>
            </h1>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              LSTM derin öğrenme, FinBERT duygu analizi ve davranışsal finans teorisini
              tek bir platformda birleştiren Fineria'nın teknik altyapısını keşfedin.
            </p>
          </motion.div>

          {/* Main features */}
          <div className="grid lg:grid-cols-2 gap-6">
            {mainFeatures.map((feat, i) => (
              <FeatureCard key={feat.title} feat={feat} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Technical specs */}
      <section className="py-20 relative" style={{ background: 'rgba(0,0,0,0.2)' }}>
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(108,108,232,0.4), transparent)' }}
        />
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            ref={techRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isTechInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="badge badge-brand mb-4 mx-auto w-fit">
              <Zap size={12} />
              Teknik Altyapı
            </div>
            <h2
              className="text-responsive-section font-display font-bold text-white"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              Kurumsal Kalite <span className="gradient-text">Mühendislik</span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Specs table */}
            <div className="glass rounded-3xl p-8" style={{ border: '1px solid rgba(108,108,232,0.2)' }}>
              <h3 className="font-display font-semibold text-white text-xl mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>
                Sistem Özellikleri
              </h3>
              <div className="flex flex-col gap-4">
                {technicalSpecs.map((spec, i) => (
                  <motion.div
                    key={spec.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isTechInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                    className="flex items-start justify-between gap-4 py-3 border-b"
                    style={{ borderColor: 'rgba(255,255,255,0.06)' }}
                  >
                    <span className="text-sm flex-shrink-0" style={{ color: 'var(--text-secondary)' }}>{spec.label}</span>
                    <span className="text-sm font-medium text-white text-right font-mono">{spec.value}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Indicators grid */}
            <div className="glass rounded-3xl p-8" style={{ border: '1px solid rgba(108,108,232,0.2)' }}>
              <h3 className="font-display font-semibold text-white text-xl mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>
                Teknik Göstergeler (22 Özellik)
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {indicators.map((ind, i) => (
                  <motion.div
                    key={ind.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isTechInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: i * 0.04, duration: 0.3 }}
                    className="p-3 rounded-xl"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    <div className="text-sm font-bold mb-0.5 font-mono" style={{ color: ind.color }}>{ind.name}</div>
                    <div className="text-xs leading-tight" style={{ color: 'var(--text-secondary)' }}>{ind.desc}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* API Docs preview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="badge badge-brand mb-4 mx-auto w-fit">
              <BookOpen size={12} />
              API Dokümantasyonu
            </div>
            <h2 className="text-responsive-section font-display font-bold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
              RESTful API <span className="gradient-text">Entegrasyonu</span>
            </h2>
            <p className="text-lg mt-4" style={{ color: 'var(--text-secondary)' }}>
              OpenAPI (Swagger) standardına uygun, FastAPI ile geliştirilmiş tahmin API'si
            </p>
          </div>

          <div className="glass rounded-3xl overflow-hidden" style={{ border: '1px solid rgba(108,108,232,0.2)' }}>
            {/* API header */}
            <div
              className="flex items-center gap-3 px-6 py-4 border-b"
              style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(0,0,0,0.3)' }}
            >
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full" style={{ background: '#FF4D6A' }} />
                <div className="w-3 h-3 rounded-full" style={{ background: '#F5C518' }} />
                <div className="w-3 h-3 rounded-full" style={{ background: '#22D87A' }} />
              </div>
              <span className="text-sm font-mono" style={{ color: 'var(--text-secondary)' }}>
                api.fineria.app:8000 — Swagger UI
              </span>
            </div>

            {/* Endpoints */}
            {[
              { method: 'GET', path: '/health', desc: 'Servis sağlık kontrolü', color: '#22D87A' },
              { method: 'GET', path: '/predict/{symbol}', desc: 'Hisse senedi fiyat yönü tahmini (UP/DOWN)', color: '#6C6CE8' },
              { method: 'POST', path: '/predict/batch', desc: 'Toplu sembol tahmini', color: '#F5C518' },
              { method: 'GET', path: '/visualize/{symbol}', desc: 'Attention ısı haritası (PNG)', color: '#9D9EFF' },
            ].map((ep) => (
              <div
                key={ep.path}
                className="flex items-center gap-4 px-6 py-4 border-b hover:bg-white/2 transition-colors"
                style={{ borderColor: 'rgba(255,255,255,0.05)' }}
              >
                <span
                  className="text-xs font-bold px-2.5 py-1 rounded-lg font-mono w-14 text-center flex-shrink-0"
                  style={{ background: `${ep.color}20`, color: ep.color, border: `1px solid ${ep.color}40` }}
                >
                  {ep.method}
                </span>
                <span className="font-mono text-sm text-white flex-shrink-0">{ep.path}</span>
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{ep.desc}</span>
              </div>
            ))}

            {/* JSON example */}
            <div className="p-6">
              <div className="text-xs font-semibold mb-3" style={{ color: 'var(--text-secondary)' }}>
                Örnek Yanıt — GET /predict/AKBNK.IS
              </div>
              <pre
                className="text-xs overflow-auto rounded-xl p-4 font-mono leading-relaxed"
                style={{
                  background: 'rgba(0,0,0,0.5)',
                  color: '#9D9EFF',
                  border: '1px solid rgba(108,108,232,0.2)',
                  maxHeight: 280,
                }}
              >
{`{
  "symbol": "AKBNK.IS",
  "prediction": 1,
  "prediction_label": "UP",
  "probability": 0.6832,
  "timestamp": "2026-03-25T09:15:43.221Z",
  "last_close": 52.40,
  "attention_weights": [
    0.021, 0.018, 0.031, 0.024, 0.019,
    ...
    0.096, 0.103, 0.112, 0.141
  ],
  "critical_days": [
    { "day_index": 29, "days_ago": 0, "date": "2026-03-24", "weight": 0.141 },
    { "day_index": 28, "days_ago": 1, "date": "2026-03-23", "weight": 0.112 }
  ]
}`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      <CTA />
    </div>
  );
}
