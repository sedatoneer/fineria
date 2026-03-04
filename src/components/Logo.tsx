interface LogoProps {
  size?: number;
  showText?: boolean;
  className?: string;
}

export function Logo({ size = 40, showText = true, className = '' }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg width={size} height={size} viewBox="0 0 580 580" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="580" height="580" rx="120" fill="#6C6CE8"/>
        {/* F letterform - thick white stroke path */}
        <path
          d="M 175 130 L 175 450
             M 175 130 Q 175 130 360 130 Q 405 130 420 150 Q 435 170 420 195 Q 405 215 360 215 L 225 215
             M 175 290 L 310 290"
          stroke="white"
          strokeWidth="52"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Trending up circle badge */}
        <circle cx="365" cy="365" r="58" fill="white"/>
        <path
          d="M 330 385 L 350 360 L 368 375 L 395 345"
          stroke="#6C6CE8"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <polyline
          points="388,345 395,345 395,352"
          stroke="#6C6CE8"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
      {showText && (
        <span
          className="text-white font-display font-bold tracking-tight"
          style={{ fontSize: size * 0.6, fontFamily: 'Syne, sans-serif' }}
        >
          Fineria
        </span>
      )}
    </div>
  );
}
