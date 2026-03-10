import { Hero } from '@/components/Hero';
import { TickerBar } from '@/components/TickerBar';
import { Features } from '@/components/Features';
import { Dashboard } from '@/components/Dashboard';
import { MobileShowcase } from '@/components/MobileShowcase';
import { HowItWorks } from '@/components/HowItWorks';
import { Stats } from '@/components/Stats';
import { Testimonials } from '@/components/Testimonials';
import { CTA } from '@/components/CTA';

export function Home() {
  return (
    <>
      <Hero />
      <TickerBar />
      <Features />
      <Dashboard />
      <MobileShowcase />
      <HowItWorks />
      <Stats />
      <Testimonials />
      <CTA />
    </>
  );
}
