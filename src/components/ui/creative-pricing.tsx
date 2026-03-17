import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface PricingTier {
  name: string;
  icon: React.ReactNode;
  price: number | string;
  description: string;
  features: string[];
  popular?: boolean;
  color: string;
  cta?: string;
}

function CreativePricing({
  tag = 'Basit Fiyatlandırma',
  title = 'Hedeflerinize Uygun Plan',
  description = 'Gizli ücret yok. İstediğiniz zaman iptal edin.',
  tiers,
}: {
  tag?: string;
  title?: string;
  description?: string;
  tiers: PricingTier[];
}) {
  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="text-center space-y-6 mb-16">
        <div
          className="text-xl font-bold"
          style={{ fontFamily: "'Caveat', cursive", color: '#6C6CE8', transform: 'rotate(-1deg)', display: 'inline-block' }}
        >
          {tag}
        </div>
        <div className="relative">
          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{
              fontFamily: "'Caveat', cursive",
              color: '#0D0D1E',
              transform: 'rotate(-1deg)',
              display: 'inline-block',
              lineHeight: 1.15,
            }}
          >
            {title}
            <div
              className="absolute -right-10 top-0"
              style={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                background: '#FBBF24',
                opacity: 0.7,
                transform: 'rotate(12deg)',
              }}
            />
            <div
              className="absolute -left-8 bottom-0"
              style={{
                width: 18,
                height: 18,
                borderRadius: 2,
                background: '#6C6CE8',
                opacity: 0.5,
                transform: 'rotate(-12deg)',
              }}
            />
          </h2>
          <div
            className="absolute -bottom-4 left-1/2 -translate-x-1/2 h-3 rounded-full blur-sm"
            style={{ width: '180px', background: 'rgba(108,108,232,0.25)', transform: 'translateX(-50%) rotate(-1deg)' }}
          />
        </div>
        <p
          className="text-xl"
          style={{ fontFamily: "'Caveat', cursive", color: '#555', transform: 'rotate(-0.5deg)', display: 'inline-block' }}
        >
          {description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8">
        {tiers.map((tier, index) => (
          <div
            key={tier.name}
            className={cn(
              'relative group',
              'transition-all duration-300',
              index === 0 && '-rotate-1',
              index === 1 && 'rotate-1',
              index === 2 && '-rotate-2'
            )}
          >
            {/* Shadow card */}
            <div
              className={cn(
                'absolute inset-0 bg-white rounded-2xl',
                'border-2 border-zinc-900',
                'shadow-[4px_4px_0px_0px_#18181b]',
                'transition-all duration-300',
                'group-hover:shadow-[8px_8px_0px_0px_#18181b]',
                'group-hover:-translate-x-1 group-hover:-translate-y-1'
              )}
            />

            <div className="relative p-7">
              {tier.popular && (
                <div
                  className="absolute -top-3 -right-3 text-zinc-900 text-sm font-bold px-3 py-1 rounded-full border-2 border-zinc-900"
                  style={{
                    fontFamily: "'Caveat', cursive",
                    fontSize: '15px',
                    background: '#FBBF24',
                    transform: 'rotate(8deg)',
                  }}
                >
                  Popüler!
                </div>
              )}

              <div className="mb-6">
                <div
                  className="w-14 h-14 rounded-full mb-4 flex items-center justify-center border-2 border-zinc-900"
                  style={{ color: tier.color === 'amber' ? '#F59E0B' : tier.color === 'blue' ? '#6C6CE8' : '#7C3AED' }}
                >
                  {tier.icon}
                </div>
                <h3
                  className="text-2xl text-zinc-900"
                  style={{ fontFamily: "'Caveat', cursive", fontSize: '26px', fontWeight: 700 }}
                >
                  {tier.name}
                </h3>
                <p className="text-zinc-500 text-sm mt-1" style={{ fontFamily: "'Caveat', cursive", fontSize: '17px' }}>
                  {tier.description}
                </p>
              </div>

              {/* Price */}
              <div className="mb-6" style={{ fontFamily: "'Caveat', cursive" }}>
                <span className="text-5xl font-bold text-zinc-900">
                  {typeof tier.price === 'number' ? (tier.price === 0 ? 'Ücretsiz' : `₺${tier.price}`) : tier.price}
                </span>
                {typeof tier.price === 'number' && tier.price > 0 && (
                  <span className="text-zinc-500 text-lg">/ay</span>
                )}
              </div>

              {/* Features */}
              <div className="space-y-3 mb-7">
                {tier.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full border-2 border-zinc-900 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3" />
                    </div>
                    <span className="text-zinc-800 text-lg" style={{ fontFamily: "'Caveat', cursive" }}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <Button
                className={cn(
                  'w-full h-12 text-lg border-2 border-zinc-900 transition-all duration-300',
                  'shadow-[4px_4px_0px_0px_#18181b] hover:shadow-[6px_6px_0px_0px_#18181b]',
                  'hover:-translate-x-0.5 hover:-translate-y-0.5',
                  'rounded-xl',
                  tier.popular
                    ? 'bg-amber-400 text-zinc-900 hover:bg-amber-300'
                    : 'bg-white text-zinc-900 hover:bg-zinc-50'
                )}
                style={{ fontFamily: "'Caveat', cursive", fontSize: '18px' }}
              >
                {tier.cta || (tier.price === 0 ? 'Ücretsiz Başla' : 'Hemen Başla')}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export { CreativePricing };
