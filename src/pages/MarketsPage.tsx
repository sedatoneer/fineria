import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import {
  AreaChart, Area, ComposedChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, ReferenceLine,
} from 'recharts';
import { TrendingUp, TrendingDown, Search, Star, Activity } from 'lucide-react';

// Generate realistic OHLCV data
function generateOHLCV(days: number, startPrice: number, volatility = 0.02) {
  const data = [];
  let price = startPrice;
  const now = new Date();
  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const change = (Math.random() - 0.48) * volatility;
    const open = price;
    const close = price * (1 + change);
    const high = Math.max(open, close) * (1 + Math.random() * 0.01);
    const low = Math.min(open, close) * (1 - Math.random() * 0.01);
    const volume = Math.floor(Math.random() * 15000000 + 3000000);
    data.push({
      date: date.toLocaleDateString('tr-TR', { month: 'short', day: 'numeric' }),
      open: parseFloat(open.toFixed(2)),
      high: parseFloat(high.toFixed(2)),
      low: parseFloat(low.toFixed(2)),
      close: parseFloat(close.toFixed(2)),
      volume,
      bull: close >= open,
    });
    price = close;
  }
  return data;
}

const stocks = [
  { symbol: 'AKBNK', name: 'Akbank T.A.Ş.', price: 52.40, change: 2.18, changeVal: 1.12, sector: 'Bankacılık', color: '#6C6CE8', data: generateOHLCV(60, 48, 0.022) },
  { symbol: 'THYAO', name: 'Türk Hava Yolları', price: 287.40, change: -0.83, changeVal: -2.40, sector: 'Havacılık', color: '#22D87A', data: generateOHLCV(60, 270, 0.025) },
  { symbol: 'CCOLA', name: 'Coca-Cola İçecek A.Ş.', price: 71.50, change: 0.21, changeVal: 0.15, sector: 'Gıda & İçecek', color: '#F5C518', data: generateOHLCV(60, 70, 0.015) },
  { symbol: 'EREGL', name: 'Ereğli Demir ve Çelik', price: 48.90, change: 1.45, changeVal: 0.70, sector: 'Metal', color: '#FB923C', data: generateOHLCV(60, 46, 0.02) },
  { symbol: 'TOASO', name: 'Tofaş Türk Otomobil', price: 168.50, change: -1.20, changeVal: -2.05, sector: 'Otomotiv', color: '#38BDF8', data: generateOHLCV(60, 172, 0.018) },
  { symbol: 'BIMAS', name: 'BİM Birleşik Mağazalar', price: 514.50, change: 0.68, changeVal: 3.50, sector: 'Perakende', color: '#A78BFA', data: generateOHLCV(60, 510, 0.012) },
];

const cryptos = [
  { symbol: 'BTC', name: 'Bitcoin', price: 2187450, change: 3.24, changeVal: 68650, sector: 'Kripto Para', color: '#F7931A', data: generateOHLCV(30, 2100000, 0.04) },
  { symbol: 'ETH', name: 'Ethereum', price: 118320, change: 1.87, changeVal: 2178, sector: 'Kripto Para', color: '#627EEA', data: generateOHLCV(30, 116000, 0.035) },
  { symbol: 'SOL', name: 'Solana', price: 6840, change: 5.71, changeVal: 369, sector: 'Kripto Para', color: '#9945FF', data: generateOHLCV(30, 6400, 0.05) },
  { symbol: 'BNB', name: 'BNB', price: 20450, change: 0.95, changeVal: 192, sector: 'Kripto Para', color: '#F3BA2F', data: generateOHLCV(30, 20200, 0.025) },
];

interface CustomCandleProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  payload?: { open: number; close: number; high: number; low: number; bull: boolean };
}

function CustomCandle(props: CustomCandleProps) {
  const { x = 0, y = 0, width = 0, height = 0, payload } = props;
  if (!payload) return null;
  const bull = payload.bull;
  const color = bull ? '#22D87A' : '#FF4D6A';
  const cx = x + width / 2;

  return (
    <g>
      {/* Wick */}
      <line x1={cx} y1={y} x2={cx} y2={y + height} stroke={color} strokeWidth={1} />
      {/* Body */}
      <rect
        x={x + 1}
        y={y + height * 0.2}
        width={Math.max(width - 2, 1)}
        height={Math.max(height * 0.6, 1)}
        fill={color}
        rx={1}
      />
    </g>
  );
}

export function MarketsPage() {
  const [selectedStock, setSelectedStock] = useState<typeof stocks[0]>(stocks[0]);
  const [activeTab, setActiveTab] = useState<'hisse' | 'kripto'>('hisse');
  const [searchQuery, setSearchQuery] = useState('');
  const [prices, setPrices] = useState(stocks.map(s => ({ symbol: s.symbol, price: s.price, change: s.change })));
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });

  // Simulate live prices
  useEffect(() => {
    const interval = setInterval(() => {
      setPrices(prev => prev.map(p => ({
        ...p,
        price: parseFloat((p.price * (1 + (Math.random() - 0.5) * 0.002)).toFixed(2)),
        change: parseFloat((p.change + (Math.random() - 0.5) * 0.1).toFixed(2)),
      })));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const currentList = activeTab === 'hisse' ? stocks : cryptos;
  const filteredList = currentList.filter(s =>
    s.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedData = selectedStock.data;
  const lastPrice = prices.find(p => p.symbol === selectedStock.symbol)?.price ?? selectedStock.price;
  const lastChange = prices.find(p => p.symbol === selectedStock.symbol)?.change ?? selectedStock.change;

  return (
    <div className="pt-24">
      {/* Hero */}
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
              <Activity size={12} />
              Canlı Piyasalar
            </div>
            <h1
              className="text-responsive-hero font-display font-bold text-white mb-4"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              Piyasaları <span className="gradient-text">Gerçek Zamanlı</span> Takip Et
            </h1>
            <p className="text-xl" style={{ color: 'var(--text-secondary)' }}>
              BIST hisse senetleri, kripto paralar ve teknik analiz araçları
            </p>
          </motion.div>

          {/* Main layout */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Stock list */}
            <div className="lg:col-span-1">
              {/* Tabs */}
              <div className="flex gap-2 mb-4">
                {(['hisse', 'kripto'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => { setActiveTab(tab); setSelectedStock(stocks[0]); }}
                    className="flex-1 py-2.5 rounded-xl text-sm font-semibold capitalize transition-all"
                    style={{
                      background: activeTab === tab ? 'var(--brand)' : 'rgba(255,255,255,0.05)',
                      color: activeTab === tab ? 'white' : 'var(--text-secondary)',
                    }}
                  >
                    {tab === 'hisse' ? 'BIST Hisseler' : 'Kripto Paralar'}
                  </button>
                ))}
              </div>

              {/* Search */}
              <div
                className="flex items-center gap-3 px-4 py-3 rounded-xl mb-4"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <Search size={16} style={{ color: 'var(--text-secondary)' }} />
                <input
                  type="text"
                  placeholder="Sembol veya şirket ara..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent text-sm outline-none text-white placeholder-gray-600"
                />
              </div>

              {/* List */}
              <div className="flex flex-col gap-2 max-h-[500px] overflow-y-auto pr-1">
                {filteredList.map(stock => {
                  const liveData = prices.find(p => p.symbol === stock.symbol);
                  const price = liveData?.price ?? stock.price;
                  const change = liveData?.change ?? stock.change;
                  const isPositive = change >= 0;
                  const isSelected = selectedStock.symbol === stock.symbol;

                  return (
                    <motion.button
                      key={stock.symbol}
                      onClick={() => setSelectedStock(stock)}
                      className="flex items-center justify-between p-4 rounded-2xl text-left transition-all"
                      style={{
                        background: isSelected ? 'rgba(108,108,232,0.12)' : 'rgba(255,255,255,0.03)',
                        border: isSelected ? '1px solid rgba(108,108,232,0.35)' : '1px solid rgba(255,255,255,0.06)',
                      }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold text-white"
                          style={{ background: stock.color + '30', border: `1px solid ${stock.color}50` }}
                        >
                          {stock.symbol.slice(0, 3)}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-white">{stock.symbol}</div>
                          <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                            {'sector' in stock ? (stock as typeof stocks[0]).sector : 'Kripto Para'}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-mono font-semibold text-white">
                          {price > 10000 ? `₺${(price / 1000).toFixed(1)}K` : `₺${price.toLocaleString('tr-TR')}`}
                        </div>
                        <div
                          className="text-xs flex items-center gap-0.5 justify-end font-semibold"
                          style={{ color: isPositive ? 'var(--success)' : 'var(--danger)' }}
                        >
                          {isPositive ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                          {isPositive ? '+' : ''}{change.toFixed(2)}%
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Chart panel */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              <div className="glass rounded-3xl p-6" style={{ border: '1px solid rgba(108,108,232,0.2)' }}>
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="text-2xl font-bold text-white">{selectedStock.symbol}</h2>
                      <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{selectedStock.name}</span>
                      <Star size={16} style={{ color: 'rgba(255,255,255,0.3)' }} />
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-3xl font-bold text-white font-mono">
                        ₺{lastPrice.toLocaleString('tr-TR')}
                      </span>
                      <span
                        className="text-sm font-semibold flex items-center gap-1"
                        style={{ color: lastChange >= 0 ? 'var(--success)' : 'var(--danger)' }}
                      >
                        {lastChange >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                        {lastChange >= 0 ? '+' : ''}{lastChange.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                  <div
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
                    style={{ background: 'rgba(34,216,122,0.1)', color: 'var(--success)', border: '1px solid rgba(34,216,122,0.2)' }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--success)' }} />
                    Canlı
                  </div>
                </div>

                {/* Candlestick chart */}
                <div style={{ height: 220 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={selectedData.slice(-40)} barCategoryGap={2}>
                      <XAxis
                        dataKey="date"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: 'var(--text-secondary)', fontSize: 10 }}
                        interval={7}
                      />
                      <YAxis
                        domain={['auto', 'auto']}
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: 'var(--text-secondary)', fontSize: 10 }}
                        tickFormatter={v => `₺${v}`}
                        width={60}
                      />
                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload?.[0]) {
                            const d = payload[0].payload as typeof selectedData[0];
                            return (
                              <div className="glass rounded-xl px-4 py-3 text-xs" style={{ border: '1px solid rgba(108,108,232,0.3)' }}>
                                <div className="font-semibold text-white mb-2">{d.date}</div>
                                <div className="grid grid-cols-2 gap-x-4 gap-y-1" style={{ color: 'var(--text-secondary)' }}>
                                  <span>Açılış: <span className="text-white">₺{d.open}</span></span>
                                  <span>Kapanış: <span className={d.bull ? 'text-green-400' : 'text-red-400'}>₺{d.close}</span></span>
                                  <span>Yüksek: <span className="text-white">₺{d.high}</span></span>
                                  <span>Düşük: <span className="text-white">₺{d.low}</span></span>
                                </div>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <ReferenceLine y={lastPrice} stroke="rgba(108,108,232,0.4)" strokeDasharray="4 4" />
                      <Bar dataKey="high" shape={<CustomCandle />} />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>

                {/* Volume chart */}
                <div style={{ height: 60 }} className="mt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={selectedData.slice(-40)}>
                      <defs>
                        <linearGradient id="volGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6C6CE8" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#6C6CE8" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <Area
                        type="monotone"
                        dataKey="volume"
                        stroke="#6C6CE8"
                        strokeWidth={1}
                        fill="url(#volGrad)"
                        dot={false}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                  <div className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>Hacim</div>
                </div>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-4 gap-3">
                {[
                  { label: '52H Yüksek', value: `₺${Math.max(...selectedData.map(d => d.high)).toFixed(2)}` },
                  { label: '52H Düşük', value: `₺${Math.min(...selectedData.map(d => d.low)).toFixed(2)}` },
                  { label: 'Ort. Hacim', value: `₺${(selectedData.reduce((a, d) => a + d.volume, 0) / selectedData.length / 1000000).toFixed(1)}M` },
                  { label: 'Değişim', value: `${lastChange >= 0 ? '+' : ''}${lastChange.toFixed(2)}%`, color: lastChange >= 0 ? 'var(--success)' : 'var(--danger)' },
                ].map(stat => (
                  <div
                    key={stat.label}
                    className="glass rounded-2xl p-4 text-center"
                    style={{ border: '1px solid rgba(255,255,255,0.07)' }}
                  >
                    <div className="text-xs mb-1" style={{ color: 'var(--text-secondary)' }}>{stat.label}</div>
                    <div className="text-sm font-bold" style={{ color: stat.color || 'white' }}>{stat.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
