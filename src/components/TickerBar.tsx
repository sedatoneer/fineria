import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface TickerItem {
  symbol: string;
  name: string;
  price: string;
  change: number;
}

const initialTickers: TickerItem[] = [
  { symbol: 'BTC', name: 'Bitcoin', price: '₺2.187.450', change: 3.24 },
  { symbol: 'ETH', name: 'Ethereum', price: '₺118.320', change: 1.87 },
  { symbol: 'BIST100', name: 'BIST 100', price: '9.847', change: -0.43 },
  { symbol: 'DOLAR', name: 'Dolar/TL', price: '₺32,45', change: 0.12 },
  { symbol: 'EURO', name: 'Euro/TL', price: '₺35,18', change: 0.08 },
  { symbol: 'ALTIN', name: 'Altın/Gram', price: '₺3.247', change: 1.52 },
  { symbol: 'SOL', name: 'Solana', price: '₺6.840', change: 5.71 },
  { symbol: 'THYAO', name: 'Türk Hava Yolları', price: '₺287,40', change: 2.18 },
  { symbol: 'AKBNK', name: 'Akbank', price: '₺54,25', change: -1.32 },
  { symbol: 'BNBNK', name: 'BNB', price: '₺20.450', change: 0.95 },
];

export function TickerBar() {
  const [tickers, setTickers] = useState(initialTickers);

  useEffect(() => {
    const interval = setInterval(() => {
      setTickers(prev =>
        prev.map(t => ({
          ...t,
          change: parseFloat((t.change + (Math.random() - 0.5) * 0.3).toFixed(2)),
        }))
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const doubled = [...tickers, ...tickers];

  return (
    <div className="ticker-wrap border-y py-3" style={{ borderColor: 'var(--border-subtle)', background: 'rgba(0,0,0,0.3)' }}>
      <div className="ticker-content">
        {doubled.map((ticker, i) => (
          <div key={i} className="inline-flex items-center gap-2 mx-6">
            <span className="font-mono text-xs font-semibold" style={{ color: 'var(--brand-light)' }}>
              {ticker.symbol}
            </span>
            <span className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>
              {ticker.price}
            </span>
            <span
              className="flex items-center gap-0.5 text-xs font-semibold"
              style={{ color: ticker.change >= 0 ? 'var(--success)' : 'var(--danger)' }}
            >
              {ticker.change >= 0 ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
              {ticker.change >= 0 ? '+' : ''}{ticker.change}%
            </span>
            <span className="ml-4 opacity-20 text-white">•</span>
          </div>
        ))}
      </div>
    </div>
  );
}
