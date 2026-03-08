import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
} from 'recharts';
import { TrendingUp, TrendingDown, BarChart3, ArrowUpRight } from 'lucide-react';

const periods = ['1Sa', '1G', '1H', '1A', '3A', '1Y'];

const generateData = (days: number, start: number) => {
  const data = [];
  let val = start;
  for (let i = 0; i < days; i++) {
    val = val + (Math.random() - 0.42) * (start * 0.02);
    data.push({
      t: i,
      v: Math.max(val, start * 0.7),
    });
  }
  return data;
};

const datasets: Record<string, { v: number; t: number }[]> = {
  '1Sa': generateData(60, 9100),
  '1G': generateData(24, 9100),
  '1H': generateData(7, 8500),
  '1A': generateData(30, 7500),
  '3A': generateData(90, 6000),
  '1Y': generateData(365, 4000),
};

const portfolioData = [
  { name: 'BTC', value: 42, color: '#F7931A' },
  { name: 'Hisse', value: 35, color: '#6C6CE8' },
  { name: 'Altın', value: 13, color: '#F5C518' },
  { name: 'ETH', value: 10, color: '#627EEA' },
];

const recentTransactions = [
  { type: 'buy', asset: 'BTC', amount: '0.0234', value: '₺51.200', time: '2 dk önce', change: '+2.4%' },
  { type: 'sell', asset: 'THYAO', amount: '150 adet', value: '₺43.110', time: '18 dk önce', change: '-0.8%' },
  { type: 'buy', asset: 'ALTIN', amount: '10 gr', value: '₺32.470', time: '1 sa önce', change: '+1.2%' },
  { type: 'buy', asset: 'ETH', amount: '0.85', value: '₺100.572', time: '3 sa önce', change: '+3.7%' },
];

const barData = [
  { name: 'Oca', gelir: 12400, gider: 8200 },
  { name: 'Şub', gelir: 15800, gider: 9100 },
  { name: 'Mar', gelir: 11200, gider: 7800 },
  { name: 'Nis', gelir: 18900, gider: 10200 },
  { name: 'May', gelir: 22100, gider: 11500 },
  { name: 'Haz', gelir: 19800, gider: 9800 },
];

function CustomTooltip({ active, payload }: { active?: boolean; payload?: { value: number }[] }) {
  if (active && payload?.length) {
    return (
      <div className="glass rounded-xl px-4 py-2 text-sm" style={{ border: '1px solid rgba(108,108,232,0.3)' }}>
        <div className="font-semibold text-white">₺{payload[0].value.toLocaleString('tr-TR')}</div>
      </div>
    );
  }
  return null;
}

export function Dashboard() {
  const [activePeriod, setActivePeriod] = useState<string>('1A');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const data = datasets[activePeriod] || datasets['1A'];
  const lastVal = data[data.length - 1]?.v ?? 0;
  const firstVal = data[0]?.v ?? 1;
  const change = ((lastVal - firstVal) / firstVal) * 100;
  const isPositive = change >= 0;

  return (
    <section id="dashboard" className="py-24 relative" style={{ background: 'rgba(0,0,0,0.2)' }}>
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(108,108,232,0.4), transparent)' }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(108,108,232,0.4), transparent)' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="badge badge-brand mb-4 mx-auto w-fit">
            <BarChart3 size={12} />
            Platform Önizleme
          </div>
          <h2 className="text-responsive-section font-display font-bold mb-4 text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
            Profesyonel <span className="gradient-text">Dashboard</span>
          </h2>
          <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
            Tüm finansal verileriniz tek bir ekranda, gerçek zamanlı.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main chart */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 glass rounded-3xl p-6"
            style={{ border: '1px solid rgba(108,108,232,0.2)' }}
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>Portföy Değeri</p>
                <h3 className="text-4xl font-bold text-white font-mono">
                  ₺{lastVal.toLocaleString('tr-TR', { maximumFractionDigits: 0 })}
                </h3>
                <div className="flex items-center gap-2 mt-2">
                  {isPositive ? (
                    <TrendingUp size={16} style={{ color: 'var(--success)' }} />
                  ) : (
                    <TrendingDown size={16} style={{ color: 'var(--danger)' }} />
                  )}
                  <span
                    className="text-sm font-semibold"
                    style={{ color: isPositive ? 'var(--success)' : 'var(--danger)' }}
                  >
                    {isPositive ? '+' : ''}{change.toFixed(2)}%
                  </span>
                  <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    seçili dönemde
                  </span>
                </div>
              </div>

              {/* Period selector */}
              <div className="flex items-center gap-1 p-1 rounded-xl" style={{ background: 'rgba(255,255,255,0.05)' }}>
                {periods.map((p) => (
                  <button
                    key={p}
                    onClick={() => setActivePeriod(p)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200"
                    style={{
                      background: activePeriod === p ? 'var(--brand)' : 'transparent',
                      color: activePeriod === p ? 'white' : 'var(--text-secondary)',
                    }}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-56" style={{ overflow: 'hidden' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 16, right: 4, bottom: 4, left: 4 }}>
                  <defs>
                    <linearGradient id="dashGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={isPositive ? '#6C6CE8' : '#FF4D6A'} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={isPositive ? '#6C6CE8' : '#FF4D6A'} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="t" hide />
                  <YAxis hide domain={[(min: number) => min * 0.98, (max: number) => max * 1.02]} />
                  <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(108,108,232,0.25)', strokeWidth: 1, strokeDasharray: '4 4' }} wrapperStyle={{ background: 'transparent', border: 'none', boxShadow: 'none', outline: 'none' }} />
                  <Area
                    type="monotone"
                    dataKey="v"
                    stroke={isPositive ? '#6C6CE8' : '#FF4D6A'}
                    strokeWidth={2}
                    fill="url(#dashGrad)"
                    dot={false}
                    activeDot={{ r: 4, fill: isPositive ? '#6C6CE8' : '#FF4D6A', stroke: 'white', strokeWidth: 2 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Portfolio breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass rounded-3xl p-6"
            style={{ border: '1px solid rgba(108,108,232,0.2)' }}
          >
            <h4 className="font-semibold text-white mb-4">Dağılım</h4>
            <div style={{ width: '100%', height: 160, overflow: 'hidden' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                  <Pie
                    data={portfolioData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={72}
                    paddingAngle={3}
                    dataKey="value"
                    stroke="none"
                  >
                    {portfolioData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col gap-3 mt-2">
              {portfolioData.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: item.color }} />
                    <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{item.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-white">{item.value}%</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent transactions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass rounded-3xl p-6"
            style={{ border: '1px solid rgba(108,108,232,0.2)' }}
          >
            <div className="flex items-center justify-between mb-5">
              <h4 className="font-semibold text-white">Son İşlemler</h4>
              <button className="text-xs flex items-center gap-1" style={{ color: 'var(--brand-light)' }}>
                Tümü <ArrowUpRight size={12} />
              </button>
            </div>
            <div className="flex flex-col gap-3">
              {recentTransactions.map((tx, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
                      style={{
                        background: tx.type === 'buy' ? 'rgba(34,216,122,0.15)' : 'rgba(255,77,106,0.15)',
                        color: tx.type === 'buy' ? 'var(--success)' : 'var(--danger)',
                      }}
                    >
                      {tx.type === 'buy' ? 'AL' : 'SAT'}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">{tx.asset}</div>
                      <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>{tx.amount}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-white">{tx.value}</div>
                    <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>{tx.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Income chart */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2 glass rounded-3xl p-6"
            style={{ border: '1px solid rgba(108,108,232,0.2)' }}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h4 className="font-semibold text-white">Gelir & Gider Analizi</h4>
                <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Son 6 ay</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ background: 'var(--brand)' }} />
                  <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>Gelir</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ background: 'rgba(255,77,106,0.7)' }} />
                  <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>Gider</span>
                </div>
              </div>
            </div>
            <div className="h-44" style={{ overflow: 'hidden' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} barGap={4} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#9090B8', fontSize: 12 }}
                  />
                  <YAxis hide />
                  <Tooltip
                    cursor={{ fill: 'rgba(108,108,232,0.07)', stroke: 'none', strokeWidth: 0 }}
                    wrapperStyle={{ background: 'transparent', border: 'none', boxShadow: 'none', outline: 'none' }}
                    content={({ active, payload, label }) => {
                      if (active && payload?.length) {
                        return (
                          <div className="glass rounded-xl px-4 py-3 text-sm" style={{ border: '1px solid rgba(108,108,232,0.3)' }}>
                            <div className="font-semibold text-white mb-2">{label}</div>
                            <div style={{ color: 'var(--brand-light)' }}>
                              Gelir: ₺{payload[0]?.value?.toLocaleString('tr-TR')}
                            </div>
                            <div style={{ color: 'var(--danger)' }}>
                              Gider: ₺{payload[1]?.value?.toLocaleString('tr-TR')}
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="gelir" fill="#6C6CE8" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="gider" fill="rgba(255,77,106,0.6)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
