import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';
import {
  TrendingUp, ChevronLeft, Bookmark, Clock, Share2, Smartphone,
  BarChart3, LineChart, BatteryMedium, LayoutGrid, Zap, Microscope,
} from 'lucide-react';

const PHONE_WIDTH = 280;
const PHONE_HEIGHT = 560;
const PHONE_RADIUS = 36;

const candleData = [
  { t: '12', o: 70.2, h: 72.1, l: 70.0, c: 71.8, bull: true },
  { t: '12', o: 71.8, h: 72.4, l: 71.2, c: 71.5, bull: false },
  { t: '12', o: 71.5, h: 72.0, l: 70.8, c: 71.9, bull: true },
  { t: '12', o: 71.9, h: 72.5, l: 71.4, c: 72.1, bull: true },
  { t: '12', o: 72.1, h: 72.3, l: 71.0, c: 71.2, bull: false },
  { t: '13', o: 71.2, h: 71.8, l: 70.5, c: 71.0, bull: false },
  { t: '13', o: 71.0, h: 71.5, l: 70.2, c: 70.8, bull: false },
  { t: '13', o: 70.8, h: 71.2, l: 70.0, c: 70.4, bull: false },
  { t: '14', o: 70.4, h: 71.0, l: 70.1, c: 70.7, bull: true },
  { t: '14', o: 70.7, h: 71.3, l: 70.5, c: 71.1, bull: true },
  { t: '15', o: 71.1, h: 71.5, l: 70.4, c: 70.6, bull: false },
  { t: '15', o: 70.6, h: 71.0, l: 70.0, c: 70.3, bull: false },
  { t: '15', o: 70.3, h: 70.8, l: 69.8, c: 70.5, bull: true },
  { t: '15', o: 70.5, h: 71.0, l: 70.2, c: 70.8, bull: true },
  { t: '15', o: 70.8, h: 71.6, l: 70.5, c: 71.5, bull: true },
];

const lineData = [
  { v: 70.2 }, { v: 71.5 }, { v: 72.1 }, { v: 71.8 }, { v: 71.2 },
  { v: 70.5 }, { v: 70.1 }, { v: 69.8 }, { v: 70.3 }, { v: 71.0 },
  { v: 70.6 }, { v: 70.0 }, { v: 70.5 }, { v: 71.1 }, { v: 71.5 },
];

const tabLabels = ['Genel', 'Haberler', 'Tahminleme', 'Analizler', 'Yorumlar'];
const periods = ['1G', '5G', '1A', '3A', 'YTD', '1Y', '5Y'];

const newsItems = [
  {
    title: 'Coca-Cola İçecek yıllık gelirini %14 artırdı',
    source: 'Dünya Gazetesi',
    time: '2sa önce',
    positive: true,
  },
  {
    title: 'BIST100 yeni rekor seviyesine yaklaştı',
    source: 'Borsa İstanbul',
    time: '4sa önce',
    positive: true,
  },
  {
    title: 'Enflasyon beklentileri piyasaları sıkıştırıyor',
    source: 'Bloomberg HT',
    time: '6sa önce',
    positive: false,
  },
];

const technicalIndicators = [
  { name: 'RSI (14)', value: '62.4', signal: 'Nötr', color: '#F5C518' },
  { name: 'MACD', value: '+0.18', signal: 'Al', color: '#22D87A' },
  { name: 'EMA 50', value: '₺69.8', signal: 'Al', color: '#22D87A' },
  { name: 'Bollinger', value: 'Üst: ₺73.2', signal: 'Dikkat', color: '#FB923C' },
];

const userComments = [
  { user: 'A.K.', text: 'Uzun vadede güçlü pozisyon. Sabırlı olmak gerekiyor.', time: '1g önce', likes: 12 },
  { user: 'M.Y.', text: 'Hacim artışı olumlu işaret. Teknik görünüm destekleyici.', time: '2g önce', likes: 8 },
];

function CandleStick({ candle, maxH, minL }: { candle: typeof candleData[0]; maxH: number; minL: number }) {
  const range = maxH - minL;
  const bodyTop = ((maxH - Math.max(candle.o, candle.c)) / range) * 100;
  const bodyHeight = (Math.abs(candle.o - candle.c) / range) * 100;
  const wickTop = ((maxH - candle.h) / range) * 100;
  const wickHeight = ((candle.h - candle.l) / range) * 100;
  const color = candle.bull ? '#22D87A' : '#FF4D6A';

  return (
    <div className="relative flex-1" style={{ height: '100%' }}>
      <div
        className="absolute left-1/2 -translate-x-px w-0.5"
        style={{ top: `${wickTop}%`, height: `${wickHeight}%`, background: color }}
      />
      <div
        className="absolute left-1/2 -translate-x-1.5 w-3 rounded-sm"
        style={{ top: `${bodyTop}%`, height: `${Math.max(bodyHeight, 1)}%`, background: color }}
      />
    </div>
  );
}

function TabContent({ activeTab }: { activeTab: number }) {
  if (activeTab === 1) {
    return (
      <div className="px-4 mt-3 flex flex-col gap-2.5" style={{ maxHeight: 180, overflowY: 'auto' }}>
        {newsItems.map((item) => (
          <div key={item.title} className="flex gap-2">
            <div
              className="w-1.5 flex-shrink-0 rounded-full mt-1"
              style={{ background: item.positive ? '#22D87A' : '#FF4D6A', minHeight: 8 }}
            />
            <div>
              <div className="text-xs text-white leading-tight">{item.title}</div>
              <div className="flex gap-2 mt-0.5">
                <span className="text-xs" style={{ color: '#555' }}>{item.source}</span>
                <span className="text-xs" style={{ color: '#444' }}>{item.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (activeTab === 2) {
    return (
      <div className="px-4 mt-3">
        <div
          className="rounded-xl p-3 mb-2"
          style={{ background: 'rgba(34,216,122,0.1)', border: '1px solid rgba(34,216,122,0.25)' }}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold" style={{ color: '#22D87A' }}>YUKARI YONLU</span>
            <span className="text-xs font-bold" style={{ color: '#22D87A' }}>%68.3</span>
          </div>
          <div className="text-xs" style={{ color: '#888' }}>
            Sonraki gün tahmini — LSTM + XGBoost
          </div>
        </div>
        <div className="flex gap-1.5">
          {[0.4, 0.6, 0.7, 0.9, 0.8, 1.0, 0.75].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm"
              style={{
                height: 24,
                background: `rgba(108,108,232,${0.2 + h * 0.6})`,
                alignSelf: 'flex-end',
              }}
            />
          ))}
        </div>
        <div className="text-xs mt-1 text-center" style={{ color: '#555' }}>Son 7 günlük dikkat ağırlığı</div>
      </div>
    );
  }

  if (activeTab === 3) {
    return (
      <div className="px-4 mt-2 flex flex-col gap-2" style={{ maxHeight: 180 }}>
        {technicalIndicators.map((ind) => (
          <div key={ind.name} className="flex items-center justify-between">
            <span className="text-xs" style={{ color: '#666' }}>{ind.name}</span>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-white">{ind.value}</span>
              <span
                className="text-xs px-1.5 py-0.5 rounded"
                style={{ background: `${ind.color}20`, color: ind.color }}
              >
                {ind.signal}
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (activeTab === 4) {
    return (
      <div className="px-4 mt-3 flex flex-col gap-3" style={{ maxHeight: 180 }}>
        {userComments.map((c) => (
          <div key={c.user} className="flex gap-2">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold"
              style={{ background: 'rgba(108,108,232,0.2)', color: '#9D9EFF' }}
            >
              {c.user[0]}
            </div>
            <div>
              <div className="text-xs text-white leading-snug">{c.text}</div>
              <div className="flex gap-2 mt-0.5 items-center">
                <span className="text-xs" style={{ color: '#444' }}>{c.time}</span>
                <span className="text-xs" style={{ color: '#444' }}>{c.likes} beğeni</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return null;
}

function PhoneFrame({ activeTab, chartType, activePeriod }: {
  activeTab: number;
  chartType: 'candle' | 'line';
  activePeriod: number;
}) {
  const maxH = Math.max(...candleData.map(c => c.h));
  const minL = Math.min(...candleData.map(c => c.l));
  const showChart = activeTab === 0;

  return (
    <div
      className="relative mx-auto"
      style={{
        width: PHONE_WIDTH,
        height: PHONE_HEIGHT,
        borderRadius: PHONE_RADIUS,
        background: '#0A0A0A',
        border: '2px solid #2A2A2A',
        boxShadow: '0 30px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.05), inset 0 0 0 1px rgba(255,255,255,0.03)',
        overflow: 'hidden',
        fontFamily: '"DM Sans", sans-serif',
      }}
    >
      <div
        className="absolute top-3 left-1/2 -translate-x-1/2 z-20"
        style={{ width: 80, height: 20, borderRadius: 10, background: '#0A0A0A', border: '1px solid #1A1A1A' }}
      />

      <div className="flex justify-between items-center px-5 pt-5 pb-1 text-white text-xs" style={{ opacity: 0.8 }}>
        <span>16:12</span>
        <div className="flex items-center gap-1 text-xs">
          <BatteryMedium size={12} />
          <span>64%</span>
        </div>
      </div>

      <div className="flex items-center justify-between px-4 py-2">
        <ChevronLeft size={20} color="white" />
        <div className="text-center">
          <div className="text-white font-bold text-base">CCOLA</div>
          <div className="text-xs" style={{ color: '#888' }}>Coca-Cola İçecek A.Ş.</div>
        </div>
        <div className="flex items-center gap-3">
          <Bookmark size={16} color="white" />
          <Clock size={16} color="white" />
          <Share2 size={16} color="white" />
        </div>
      </div>

      <div className="px-4 py-1">
        <div className="text-white font-bold" style={{ fontSize: 28 }}>₺71,50</div>
        <div className="flex items-center gap-1 mt-0.5">
          <TrendingUp size={12} style={{ color: '#22D87A' }} />
          <span className="text-xs font-semibold" style={{ color: '#22D87A' }}>
            +0.15 (+0.21%) Bugün
          </span>
        </div>
        <div className="text-xs mt-0.5" style={{ color: '#555' }}>CCOLA · BIST</div>
      </div>

      <div className="flex overflow-x-auto px-4 mt-1 gap-4 border-b" style={{ borderColor: '#1A1A1A' }}>
        {tabLabels.map((tab, i) => (
          <div
            key={tab}
            className="text-xs pb-2 whitespace-nowrap font-medium flex-shrink-0"
            style={{
              color: i === activeTab ? 'white' : '#555',
              borderBottom: i === activeTab ? '2px solid #6C6CE8' : '2px solid transparent',
              paddingBottom: '8px',
            }}
          >
            {tab}
          </div>
        ))}
      </div>

      {showChart && (
        <div className="px-2 mt-2" style={{ height: 160 }}>
          {chartType === 'candle' ? (
            <div className="relative w-full h-full flex items-stretch gap-0.5 px-1">
              <div className="absolute right-2 top-0 bottom-0 flex flex-col justify-between text-right">
                <span className="text-xs" style={{ color: '#555' }}>₺72</span>
                <span className="text-xs" style={{ color: '#555' }}>₺71</span>
                <span className="text-xs" style={{ color: '#555' }}>₺70</span>
              </div>
              <div className="flex items-stretch gap-0.5 flex-1 h-full pr-8">
                {candleData.map((c, i) => (
                  <CandleStick key={i} candle={c} maxH={maxH} minL={minL} />
                ))}
              </div>
              <div
                className="absolute right-8 left-1 h-px"
                style={{ top: '33%', borderTop: '1px dashed rgba(255,77,106,0.5)' }}
              />
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={lineData}>
                <defs>
                  <linearGradient id="mobileGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22D87A" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#22D87A" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Tooltip
                  content={({ active, payload }) =>
                    active && payload?.[0] ? (
                      <div className="text-xs text-white glass rounded px-2 py-1">
                        ₺{(payload[0].value as number).toFixed(2)}
                      </div>
                    ) : null
                  }
                />
                <Area
                  type="monotone"
                  dataKey="v"
                  stroke="#22D87A"
                  strokeWidth={2}
                  fill="url(#mobileGrad)"
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      )}

      {showChart && (
        <div className="flex justify-between items-center px-4 mt-1">
          {periods.map((p, i) => (
            <div
              key={p}
              className="text-xs font-semibold px-1 py-1 rounded"
              style={{
                color: i === activePeriod ? 'white' : '#444',
                background: i === activePeriod ? 'rgba(108,108,232,0.2)' : 'transparent',
              }}
            >
              {p}
            </div>
          ))}
          <LayoutGrid size={12} color="#444" />
        </div>
      )}

      {showChart && (
        <div className="px-4 mt-3">
          <div className="flex items-center justify-between mb-3">
            <div className="text-white text-sm font-semibold">Temel İstatistikler</div>
            <div className="text-xs" style={{ color: '#6C6CE8' }}>Daha fazla &rsaquo;</div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="text-xs mb-0.5" style={{ color: '#555' }}>Hacim</div>
              <div className="text-white text-sm font-medium">₺4.08M</div>
            </div>
            <div>
              <div className="text-xs mb-0.5" style={{ color: '#555' }}>Piyasa Değeri</div>
              <div className="text-white text-sm font-medium">₺200.06B</div>
            </div>
            <div>
              <div className="text-xs mb-0.5" style={{ color: '#555' }}>52H Yüksek</div>
              <div className="text-white text-sm font-medium">₺89.50</div>
            </div>
            <div>
              <div className="text-xs mb-0.5" style={{ color: '#555' }}>52H Düşük</div>
              <div className="text-white text-sm font-medium">₺54.20</div>
            </div>
          </div>
        </div>
      )}

      {!showChart && <TabContent activeTab={activeTab} />}

      <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: 'linear-gradient(90deg, #6C6CE8, #9D9EFF)' }} />
    </div>
  );
}

const appStats = [
  { label: 'BIST Hisse Senedi', value: '500+', icon: BarChart3 },
  { label: 'Kripto Para', value: '1000+', icon: Zap },
  { label: 'Gecikme', value: '<100ms', icon: LineChart },
  { label: 'Teknik Gösterge', value: '22+', icon: Microscope },
];

function AppStoreBadge() {
  return (
    <svg viewBox="0 0 119.66 40" xmlns="http://www.w3.org/2000/svg" width="110" height="36">
      <rect width="119.66" height="40" rx="5" fill="#000"/>
      <path d="M24.77 20a5.27 5.27 0 0 1 2.5-4.43 5.38 5.38 0 0 0-4.25-2.3c-1.79-.19-3.52 1.07-4.43 1.07-.93 0-2.32-1.05-3.83-1a5.66 5.66 0 0 0-4.76 2.91c-2.06 3.56-.52 8.8 1.45 11.69 1 1.41 2.14 3 3.65 2.91s2-.93 3.82-.93 2.28.93 3.83.9 2.6-1.42 3.56-2.84a12.31 12.31 0 0 0 1.62-3.28 5.1 5.1 0 0 1-3.16-4.7z" fill="#fff"/>
      <path d="M21.87 11.28a5.17 5.17 0 0 0 1.18-3.71 5.26 5.26 0 0 0-3.41 1.77 4.93 4.93 0 0 0-1.21 3.56 4.36 4.36 0 0 0 3.44-1.62z" fill="#fff"/>
      <text x="33" y="14" fontSize="7" fill="#fff" fontFamily="Arial" opacity="0.8">Download on the</text>
      <text x="32" y="26" fontSize="12" fill="#fff" fontFamily="Arial" fontWeight="bold">App Store</text>
    </svg>
  );
}

function PlayStoreBadge() {
  return (
    <svg viewBox="0 0 135 40" xmlns="http://www.w3.org/2000/svg" width="120" height="36">
      <rect width="135" height="40" rx="5" fill="#000"/>
      <path d="M9.5 7.5l14.5 8.4-3.3 3.3L9.5 7.5z" fill="#ea4335"/>
      <path d="M7 8.2v23.6l12.7-11.8L7 8.2z" fill="#4285f4"/>
      <path d="M24.2 24.1l-3.5-3.4L7 31.8l17.2-7.7z" fill="#fbbc05"/>
      <path d="M24.2 15.9L7 8.2l13.7 12.5 3.5-4.8z" fill="#34a853"/>
      <text x="33" y="14" fontSize="7" fill="#fff" fontFamily="Arial" opacity="0.8">GET IT ON</text>
      <text x="32" y="26" fontSize="12" fill="#fff" fontFamily="Arial" fontWeight="bold">Google Play</text>
    </svg>
  );
}

export function MobileShowcase() {
  const [activeTab, setActiveTab] = useState(0);
  const [chartType, setChartType] = useState<'candle' | 'line'>('candle');
  const [activePeriod] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className="py-24 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 80% at 80% 50%, rgba(108,108,232,0.08) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="flex justify-center relative"
          >
            <div
              className="absolute inset-0 rounded-full blur-3xl opacity-20"
              style={{ background: 'var(--brand)', transform: 'scale(0.5)' }}
            />

            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <PhoneFrame activeTab={activeTab} chartType={chartType} activePeriod={activePeriod} />
            </motion.div>

            <div className="absolute -right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3">
              <button
                onClick={() => setChartType(chartType === 'candle' ? 'line' : 'candle')}
                className="glass px-3 py-2 rounded-xl text-xs font-medium text-white border border-white/10 hover:border-brand-500/40 transition-colors flex items-center gap-1"
              >
                {chartType === 'candle' ? <BarChart3 size={12} /> : <LineChart size={12} />}
                <span>{chartType === 'candle' ? 'Mum' : 'Çizgi'}</span>
              </button>
              {tabLabels.slice(0, 4).map((t, i) => (
                <button
                  key={t}
                  onClick={() => setActiveTab(i)}
                  className="glass px-2 py-1.5 rounded-lg text-xs transition-colors"
                  style={{
                    color: activeTab === i ? 'var(--brand-light)' : 'var(--text-secondary)',
                    borderColor: activeTab === i ? 'rgba(108,108,232,0.4)' : 'rgba(255,255,255,0.08)',
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
          >
            <div className="badge badge-brand mb-5 w-fit">
              <Smartphone size={12} />
              Mobil Uygulama
            </div>
            <h2
              className="text-responsive-section font-display font-bold mb-5 text-white"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              Yatırım Artık
              <br />
              <span className="gradient-text">Cebinizde</span>
            </h2>
            <p className="text-lg mb-8 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Flutter ile geliştirilen native mobil uygulamamız ile BIST hisse senetleri,
              kripto paralar ve döviz piyasalarını gerçek zamanlı takip edin.
              Mum grafik veya çizgi grafik — istediğiniz görünümde analiz yapın.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {appStats.map((item) => (
                <div
                  key={item.label}
                  className="glass rounded-2xl p-4 flex items-start gap-3"
                  style={{ border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  <item.icon size={18} style={{ color: 'var(--brand-light)', flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <div className="text-xl font-bold gradient-text">{item.value}</div>
                    <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>{item.label}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4 flex-wrap">
              <motion.a
                href="#"
                className="glass flex items-center gap-3 px-4 py-2.5 rounded-2xl"
                style={{ border: '1px solid rgba(255,255,255,0.1)' }}
                whileHover={{ scale: 1.03, borderColor: 'rgba(108,108,232,0.4)' }}
              >
                <AppStoreBadge />
              </motion.a>
              <motion.a
                href="#"
                className="glass flex items-center gap-3 px-4 py-2.5 rounded-2xl"
                style={{ border: '1px solid rgba(255,255,255,0.1)' }}
                whileHover={{ scale: 1.03, borderColor: 'rgba(108,108,232,0.4)' }}
              >
                <PlayStoreBadge />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
