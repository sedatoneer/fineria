import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from './Logo';

const navItems = [
  { label: 'Özellikler', href: '/ozellikler' },
  { label: 'Piyasalar', href: '/piyasalar' },
  { label: 'Tahminleme', href: '/tahminleme' },
  { label: 'Fiyatlar', href: '/fiyatlar' },
  { label: 'Hakkımızda', href: '/hakkimizda' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'py-3' : 'py-5'
        }`}
        style={scrolled ? {
          background: 'rgba(8, 8, 18, 0.88)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
        } : { background: 'transparent' }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link to="/">
            <Logo size={38} showText={true} />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className="relative px-4 py-2 text-sm font-medium transition-colors duration-200"
                  style={{ color: isActive ? 'var(--brand-light)' : 'var(--text-secondary)' }}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                      style={{ background: 'var(--brand)' }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link to="/giris" className="btn-secondary text-sm !py-2.5 !px-5">
              Giriş Yap
            </Link>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/kayit"
                className="btn-primary text-sm !py-2.5 !px-5 flex items-center gap-2"
              >
                Ücretsiz Başla
                <ChevronRight size={16} />
              </Link>
            </motion.div>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg glass text-white"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-16 z-40 lg:hidden glass border-b border-white/10"
          >
            <div className="px-6 py-6 flex flex-col gap-2">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={item.href}
                    className={`block py-3 px-4 rounded-xl text-sm font-medium transition-colors hover:bg-white/5 ${
                      location.pathname === item.href ? 'text-brand-300' : ''
                    }`}
                    style={{ color: location.pathname === item.href ? 'var(--brand-light)' : 'var(--text-secondary)' }}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <div className="mt-4 pt-4 border-t border-white/10 flex flex-col gap-3">
                <Link to="/giris" className="btn-secondary text-sm text-center">Giriş Yap</Link>
                <Link to="/kayit" className="btn-primary text-sm text-center">Ücretsiz Başla</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
