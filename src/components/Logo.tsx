import markDark from '@/assets/brand/fineria-mark-dark.png';
import markLight from '@/assets/brand/fineria-mark-light.png';

interface LogoProps {
  size?: number;
  showText?: boolean;
  className?: string;
  textColor?: string;
  /** `onLight` = koyu marka (açık zemin), `onDark` = beyaz marka (koyu zemin) */
  variant?: 'onLight' | 'onDark';
}

export function Logo({
  size = 36,
  showText = true,
  className = '',
  textColor,
  variant = 'onLight',
}: LogoProps) {
  const mark = variant === 'onDark' ? markLight : markDark;
  const titleSize = Math.max(14, size * 0.52);
  const ink =
    textColor ?? (variant === 'onDark' ? '#F8FAFC' : 'var(--ink-900)');
  const finance =
    variant === 'onDark' ? 'rgba(248, 250, 252, 0.62)' : 'var(--ink-500)';

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img
        src={mark}
        alt="Fineria Finance"
        width={size}
        height={size}
        style={{ width: size, height: size, objectFit: 'contain' }}
        className="flex-shrink-0"
      />
      {showText && (
        <span
          className="leading-none"
          style={{ fontSize: titleSize, whiteSpace: 'nowrap' }}
        >
          <span
            className="font-brand"
            style={{ color: ink }}
          >
            Fineria
          </span>
          <span
            style={{
              marginLeft: '0.35em',
              fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif",
              fontWeight: 500,
              letterSpacing: '0.1em',
              color: finance,
            }}
          >
            Finance
          </span>
        </span>
      )}
    </div>
  );
}
