import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, Cell } from 'recharts';
import { Brain, TrendingUp, TrendingDown, Zap, AlertCircle, RefreshCw } from 'lucide-react';

const stocks = ['AKBNK.IS', 'THYAO.IS', 'CCOLA.IS', 'EREGL.IS', 'TOASO.IS', 'BTC-USD', 'ETH-USD'];

interface Prediction {
  symbol: string;
  prediction: 0 | 1;
  prediction_label: 'UP' | 'DOWN';
  probability: number;
  last_close: number;
  timestamp: string;
  attention_weights: number[];
  critical_days: { days_ago: number; date: string; weight: number }[];
}

function generatePrediction(symbol: string): Prediction {
  const isUp = Math.random() > 0.42;
  const prob = isUp ? 0.55 + Math.random() * 0.35 : 0.15 + Math.random() * 0.35;
  const prices: Record<string, number> = {
    'AKBNK.IS': 52.40, 'THYAO.IS': 287.40, 'CCOLA.IS': 71.50,
    'EREGL.IS': 48.90, 'TOASO.IS': 168.50, 'BTC-USD': 67500, 'ETH-USD': 3640,
  };

  // Generate 30 attention weights that sum to 1, with recent ones higher
  const rawWeights = Array.from({ length: 30 }, (_, i) => {
    const recencyBoost = Math.pow(i / 29, 2);
    return Math.random() * 0.03 + recencyBoost * 0.08;
  });
  const sum = rawWeights.reduce((a, b) => a + b, 0);
  const attention_weights = rawWeights.map(w => parseFloat((w / sum).toFixed(3)));

  // Top 5 critical days
  const indexed = attention_weights.map((w, i) => ({ i, w })).sort((a, b) => b.w - a.w).slice(0, 5);
  const now = new Date();
  const critical_days = indexed.map(({ i, w }) => {
    const daysAgo = 29 - i;
    const d = new Date(now);
    d.setDate(d.getDate() - daysAgo);
    return {
      days_ago: daysAgo,
      date: d.toISOString().split('T')[0],
      weight: w,
    };
  }).sort((a, b) => a.days_ago - b.days_ago);

  return {
    symbol,
    prediction: isUp ? 1 : 0,
    prediction_label: isUp ? 'UP' : 'DOWN',
    probability: parseFloat(prob.toFixed(4)),
    last_close: prices[symbol] ?? 100,
    timestamp: new Date().toISOString(),
    attention_weights,
    critical_days,
  };
}

function AttentionHeatmap({ weights }: { weights: number[] }) {
  const max = Math.max(...weights);
  return (
    <div className="flex gap-1 flex-wrap">
      {weights.map((w, i) => {
        const intensity = w / max;
        const daysAgo = 29 - i;
        return (
          <div
            key={i}
            className="relative group"
            title={`${daysAgo} gün önce: ${(w * 100).toFixed(1)}%`}
          >
            <div
              className="w-6 h-6 rounded-sm transition-all duration-300 cursor-pointer"
              style={{
                background: `rgba(108,108,232,${0.1 + intensity * 0.9})`,
                border: `1px solid rgba(108,108,232,${0.2 + intensity * 0.5})`,
              }}
            />
            <div
              className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-10"
              style={{ background: 'rgba(13,13,30,0.95)', border: '1px solid rgba(108,108,232,0.3)', color: 'white' }}
            >
              -{daysAgo}g: {(w * 100).toFixed(1)}%
            </div>
          </div>
        );
      })}
    </div>
  );
}

function RiskProfile() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [profile, setProfile] = useState<null | { type: string; color: string; desc: string }>(null);

  const questions = [
    { q: 'Yatırım deneyiminiz nedir?', opts: ['Hiç yok', '1-3 yıl', '3-7 yıl', '7+ yıl'] },
    { q: 'Portföyünüzün %20 değer kaybetmesi sizi nasıl etkiler?', opts: ['Hepsini satarım', 'Bir kısmını satarım', 'Beklerim', 'Daha fazla alırım'] },
    { q: 'Yatırım ufkunuz nedir?', opts: ['6 aydan az', '1-2 yıl', '3-5 yıl', '5+ yıl'] },
    { q: 'Risk toleransınızı nasıl tanımlarsınız?', opts: ['Çok düşük', 'Düşük', 'Orta', 'Yüksek'] },
  ];

  const profiles = [
    { min: 0, max: 4, type: 'Muhafazakâr', color: '#22D87A', desc: 'Düşük risk, istikrarlı getiri odaklısınız.' },
    { min: 5, max: 8, type: 'Dengeli', color: '#F5C518', desc: 'Risk ve getiriyi dengeli yönetiyorsunuz.' },
    { min: 9, max: 12, type: 'Büyüme Odaklı', color: '#6C6CE8', desc: 'Yüksek risk, yüksek getiri potansiyelini tercih ediyorsunuz.' },
    { min: 13, max: 16, type: 'Agresif', color: '#FF4D6A', desc: 'Maksimum getiri için yüksek risk alıyorsunuz.' },
  ];

  const handleAnswer = (i: number) => {
    const newAnswers = [...answers, i];
    setAnswers(newAnswers);
    if (step + 1 < questions.length) {
      setStep(step + 1);
    } else {
      const score = newAnswers.reduce((a, b) => a + b, 0);
      const p = profiles.find(p => score >= p.min && score <= p.max) ?? profiles[1];
      setProfile({ type: p.type, color: p.color, desc: p.desc });
    }
  };

  return (
    <div className="glass rounded-3xl p-8" style={{ border: '1px solid rgba(108,108,232,0.2)' }}>
      <h3 className="font-display font-bold text-white text-xl mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>
        Davranışsal Risk Profili
      </h3>
      <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
        3 katmanlı AI profil sistemi — anket + davranış + 30 günlük yenileme
      </p>

      <AnimatePresence mode="wait">
        {!profile ? (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Progress */}
            <div className="flex gap-2 mb-6">
              {questions.map((_, i) => (
                <div
                  key={i}
                  className="h-1.5 flex-1 rounded-full transition-all duration-500"
                  style={{ background: i <= step ? 'var(--brand)' : 'rgba(255,255,255,0.1)' }}
                />
              ))}
            </div>

            <p className="text-base font-medium text-white mb-5">{questions[step].q}</p>
            <div className="flex flex-col gap-3">
              {questions[step].opts.map((opt, i) => (
                <motion.button
                  key={opt}
                  onClick={() => handleAnswer(i)}
                  className="text-left px-5 py-3 rounded-xl text-sm font-medium transition-all"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: 'var(--text-secondary)',
                  }}
                  whileHover={{ scale: 1.02, borderColor: 'rgba(108,108,232,0.4)', color: 'white' }}
                  whileTap={{ scale: 0.98 }}
                >
                  {i + 1}. {opt}
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="text-center"
          >
            <div
              className="w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-5 text-4xl font-bold"
              style={{ background: `${profile.color}20`, border: `2px solid ${profile.color}50`, color: profile.color }}
            >
              {profile.type[0]}
            </div>
            <div className="text-2xl font-bold mb-2" style={{ color: profile.color, fontFamily: 'Syne, sans-serif' }}>
              {profile.type} Yatırımcı
            </div>
            <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>{profile.desc}</p>
            <button
              onClick={() => { setStep(0); setAnswers([]); setProfile(null); }}
              className="text-sm flex items-center gap-2 mx-auto"
              style={{ color: 'var(--brand-light)' }}
            >
              <RefreshCw size={14} /> Tekrar Dene
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function PredictionPage() {
  const [selectedSymbol, setSelectedSymbol] = useState('AKBNK.IS');
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [loading, setLoading] = useState(false);
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });

  const runPrediction = async () => {
    setLoading(true);
    setPrediction(null);
    await new Promise(r => setTimeout(r, 1800));
    setPrediction(generatePrediction(selectedSymbol));
    setLoading(false);
  };

  useEffect(() => {
    runPrediction();
  }, [selectedSymbol]);

  const isUp = prediction?.prediction_label === 'UP';
  const probPct = prediction ? Math.round(prediction.probability * 100) : 0;

  const attentionBarData = prediction?.attention_weights.map((w, i) => ({
    i: i + 1, w: parseFloat((w * 100).toFixed(2)),
    recent: i >= 24,
  })) ?? [];

  return (
    <div className="pt-24">
      <section className="py-16 mesh-bg">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            ref={heroRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="badge badge-brand mb-4 mx-auto w-fit">
              <Brain size={12} />
              AI Tahmin Motoru
            </div>
            <h1
              className="text-responsive-hero font-display font-bold text-white mb-4"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              Multi-Head Attention
              <br />
              <span className="gradient-text">LSTM + XGBoost</span>
            </h1>
            <p className="text-xl" style={{ color: 'var(--text-secondary)' }}>
              30 günlük pencerede 22 teknik gösterge ile sonraki gün fiyat yönü tahmini
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left panel */}
            <div className="flex flex-col gap-4">
              {/* Symbol selector */}
              <div className="glass rounded-3xl p-6" style={{ border: '1px solid rgba(108,108,232,0.2)' }}>
                <h3 className="font-semibold text-white mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>Sembol Seç</h3>
                <div className="flex flex-col gap-2">
                  {stocks.map(s => (
                    <button
                      key={s}
                      onClick={() => setSelectedSymbol(s)}
                      className="flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-all text-left"
                      style={{
                        background: selectedSymbol === s ? 'rgba(108,108,232,0.15)' : 'rgba(255,255,255,0.03)',
                        border: selectedSymbol === s ? '1px solid rgba(108,108,232,0.4)' : '1px solid rgba(255,255,255,0.06)',
                        color: selectedSymbol === s ? 'white' : 'var(--text-secondary)',
                      }}
                    >
                      <span className="font-mono font-semibold">{s}</span>
                      {selectedSymbol === s && <Zap size={14} style={{ color: 'var(--brand-light)' }} />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Risk Profile */}
              <RiskProfile />
            </div>

            {/* Main prediction panel */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              {/* Prediction result */}
              <div
                className="glass rounded-3xl p-8 relative overflow-hidden"
                style={{
                  border: prediction
                    ? `1px solid ${isUp ? 'rgba(34,216,122,0.3)' : 'rgba(255,77,106,0.3)'}`
                    : '1px solid rgba(108,108,232,0.2)',
                }}
              >
                {/* Background glow */}
                {prediction && (
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: `radial-gradient(ellipse at 50% 0%, ${isUp ? 'rgba(34,216,122,0.06)' : 'rgba(255,77,106,0.06)'} 0%, transparent 70%)`,
                    }}
                  />
                )}

                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>AI Tahmini</div>
                    <div className="font-mono text-xl font-bold text-white">{selectedSymbol}</div>
                  </div>
                  <button
                    onClick={runPrediction}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all"
                    style={{ background: 'rgba(108,108,232,0.15)', color: 'var(--brand-light)', border: '1px solid rgba(108,108,232,0.3)' }}
                  >
                    <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
                    Yenile
                  </button>
                </div>

                <AnimatePresence mode="wait">
                  {loading ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center gap-6 py-8"
                    >
                      <div className="relative w-24 h-24">
                        <div
                          className="absolute inset-0 rounded-full border-4 animate-spin"
                          style={{ borderColor: 'var(--brand) transparent transparent transparent' }}
                        />
                        <div className="absolute inset-3 rounded-full flex items-center justify-center" style={{ background: 'rgba(108,108,232,0.1)' }}>
                          <Brain size={28} style={{ color: 'var(--brand)' }} />
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-white font-medium mb-2">Model çalışıyor...</div>
                        <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                          22 gösterge · 30 günlük pencere · Attention analizi
                        </div>
                      </div>
                      {/* Progress bars */}
                      <div className="w-full max-w-xs flex flex-col gap-2">
                        {['OHLCV veri yükleniyor', 'Teknik göstergeler hesaplanıyor', 'LSTM ileri besleme', 'XGBoost ensemble'].map((step, i) => (
                          <div key={step} className="flex items-center gap-3">
                            <div className="h-1.5 flex-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
                              <motion.div
                                className="h-full rounded-full"
                                style={{ background: 'var(--brand)' }}
                                initial={{ width: '0%' }}
                                animate={{ width: '100%' }}
                                transition={{ duration: 0.8, delay: i * 0.3, ease: 'easeInOut' }}
                              />
                            </div>
                            <span className="text-xs w-8" style={{ color: 'var(--text-secondary)' }}>{i + 1}/4</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ) : prediction ? (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      {/* Main result */}
                      <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-5">
                          <motion.div
                            className="w-20 h-20 rounded-2xl flex items-center justify-center"
                            style={{
                              background: isUp ? 'rgba(34,216,122,0.15)' : 'rgba(255,77,106,0.15)',
                              border: `2px solid ${isUp ? 'rgba(34,216,122,0.4)' : 'rgba(255,77,106,0.4)'}`,
                            }}
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            {isUp
                              ? <TrendingUp size={36} style={{ color: 'var(--success)' }} />
                              : <TrendingDown size={36} style={{ color: 'var(--danger)' }} />
                            }
                          </motion.div>
                          <div>
                            <div
                              className="text-4xl font-bold font-display"
                              style={{
                                color: isUp ? 'var(--success)' : 'var(--danger)',
                                fontFamily: 'Syne, sans-serif',
                              }}
                            >
                              {prediction.prediction_label}
                            </div>
                            <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>Yarınki fiyat yönü</div>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>Güven Oranı</div>
                          <div
                            className="text-5xl font-bold font-mono"
                            style={{ color: isUp ? 'var(--success)' : 'var(--danger)' }}
                          >
                            %{probPct}
                          </div>
                          <div className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
                            Sigmoid çıktısı: {prediction.probability}
                          </div>
                        </div>
                      </div>

                      {/* Confidence bar */}
                      <div className="mb-6">
                        <div className="flex justify-between text-xs mb-2" style={{ color: 'var(--text-secondary)' }}>
                          <span>DOWN</span>
                          <span>UP</span>
                        </div>
                        <div className="h-3 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
                          <motion.div
                            className="h-full rounded-full"
                            style={{
                              background: `linear-gradient(90deg, rgba(255,77,106,0.6) 0%, ${isUp ? 'var(--success)' : 'var(--danger)'} ${probPct}%)`,
                            }}
                            initial={{ width: '50%' }}
                            animate={{ width: `${probPct}%` }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                          />
                        </div>
                        <div
                          className="text-center text-sm mt-2 font-medium"
                          style={{ color: 'var(--text-secondary)' }}
                        >
                          Son kapanış: <span className="text-white font-mono">₺{prediction.last_close}</span>
                        </div>
                      </div>

                      {/* Critical days */}
                      <div>
                        <div className="text-sm font-semibold text-white mb-3">
                          En Kritik 5 Gün (Attention Ağırlıkları)
                        </div>
                        <div className="flex flex-col gap-2">
                          {prediction.critical_days.slice(0, 5).sort((a, b) => b.weight - a.weight).map((day) => (
                            <div key={day.date} className="flex items-center gap-3">
                              <span className="text-xs font-mono w-24 text-right" style={{ color: 'var(--text-secondary)' }}>
                                -{day.days_ago}g ({day.date})
                              </span>
                              <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
                                <motion.div
                                  className="h-full rounded-full"
                                  style={{ background: 'var(--brand)' }}
                                  initial={{ width: 0 }}
                                  animate={{ width: `${(day.weight / Math.max(...prediction.critical_days.map(d => d.weight))) * 100}%` }}
                                  transition={{ duration: 0.8, delay: 0.1 }}
                                />
                              </div>
                              <span className="text-xs font-mono" style={{ color: 'var(--brand-light)' }}>
                                {(day.weight * 100).toFixed(1)}%
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Disclaimer */}
                      <div
                        className="mt-6 flex items-start gap-2 p-3 rounded-xl text-xs"
                        style={{ background: 'rgba(245,197,24,0.08)', border: '1px solid rgba(245,197,24,0.2)', color: '#F5C518' }}
                      >
                        <AlertCircle size={14} className="flex-shrink-0 mt-0.5" />
                        Bu tahminler yatırım tavsiyesi değildir. Geçmiş performans geleceği garanti etmez.
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>

              {/* Attention heatmap */}
              {prediction && !loading && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="glass rounded-3xl p-6"
                  style={{ border: '1px solid rgba(108,108,232,0.2)' }}
                >
                  <h3 className="font-semibold text-white mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>
                    30 Günlük Attention Ağırlık Haritası
                  </h3>
                  <p className="text-xs mb-4" style={{ color: 'var(--text-secondary)' }}>
                    Renk yoğunluğu modelin o güne verdiği önem ağırlığını gösterir. Sol = 30 gün önce, Sağ = dün.
                  </p>
                  <AttentionHeatmap weights={prediction.attention_weights} />
                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-sm" style={{ background: 'rgba(108,108,232,0.15)' }} />
                      <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>Düşük ağırlık</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-sm" style={{ background: 'rgba(108,108,232,0.9)' }} />
                      <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>Yüksek ağırlık</span>
                    </div>
                  </div>

                  {/* Bar chart of attention */}
                  <div style={{ height: 80 }} className="mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={attentionBarData} barSize={6}>
                        <XAxis dataKey="i" hide />
                        <Tooltip
                          content={({ active, payload }) =>
                            active && payload?.[0] ? (
                              <div className="glass rounded px-2 py-1 text-xs text-white">
                                Gün {(payload[0].payload as { i: number }).i}: {payload[0].value as number}%
                              </div>
                            ) : null
                          }
                        />
                        <Bar dataKey="w" radius={[2, 2, 0, 0]}>
                          {attentionBarData.map((entry, index) => (
                            <Cell
                              key={index}
                              fill={entry.recent ? '#6C6CE8' : 'rgba(108,108,232,0.4)'}
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
