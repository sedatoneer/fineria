import { motion } from 'framer-motion';
import { Logo } from './Logo';
import { MessageCircle, Briefcase, Camera, Play, Send } from 'lucide-react';

const footerLinks = {
  Ürün: [
    'Özellikler', 'Fiyatlandırma', 'Güvenlik',
    'API Erişimi', 'Mobil Uygulama', "Yenilikler",
  ],
  Şirket: [
    'Hakkımızda', 'Kariyer', 'Basın',
    'Yatırımcılar', 'Blog', 'İletişim',
  ],
  Kaynaklar: [
    'Dokümantasyon', 'Yardım Merkezi', 'Topluluk',
    'Eğitim Videoları', 'Webinarlar', 'Sistem Durumu',
  ],
  Yasal: [
    'Gizlilik Politikası', 'Kullanım Şartları', 'KVKK',
    'Çerez Politikası', 'Risk Bildirimi', 'AML Politikası',
  ],
};

const socials = [
  { icon: MessageCircle, label: 'X (Twitter)', href: '#' },
  { icon: Briefcase, label: 'LinkedIn', href: '#' },
  { icon: Camera, label: 'Instagram', href: '#' },
  { icon: Play, label: 'YouTube', href: '#' },
  { icon: Send, label: 'Telegram', href: '#' },
];

export function Footer() {
  return (
    <footer className="relative pt-20 pb-10 overflow-hidden" style={{ background: 'rgba(0,0,0,0.4)' }}>

      <div className="max-w-7xl mx-auto px-6">
        {/* Top row */}
        <div className="grid lg:grid-cols-6 gap-12 mb-16">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Logo size={38} showText={true} className="mb-4" />
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
              Türkiye'nin en akıllı fintech platformu. Yapay zeka ile portföy yönetimi,
              anlık piyasa analizi ve kişiselleştirilmiş yatırım tavsiyeleri.
            </p>

            {/* Social links */}
            <div className="flex gap-3">
              {socials.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg glass flex items-center justify-center transition-colors"
                  style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                  whileHover={{ scale: 1.1, borderColor: 'rgba(108,108,232,0.4)' }}
                  whileTap={{ scale: 0.9 }}
                >
                  <s.icon size={16} style={{ color: 'var(--text-secondary)' }} />
                </motion.a>
              ))}
            </div>

            {/* Newsletter */}
            <div className="mt-8">
              <p className="text-sm font-semibold text-white mb-3">Haftalık Bülten</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="E-posta adresiniz"
                  className="flex-1 px-4 py-2.5 rounded-xl text-sm outline-none"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'var(--text-primary)',
                  }}
                />
                <motion.button
                  className="btn-primary text-sm !py-2.5 !px-4"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Abone Ol
                </motion.button>
              </div>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold text-white mb-4">{category}</h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm transition-colors hover:text-white"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="section-divider mb-8" />

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            © 2026 Fineria Finansal Teknolojiler A.Ş. Tüm hakları saklıdır.
          </p>
          <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
            <div
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: 'var(--success)' }}
            />
            Tüm sistemler çalışıyor — %99.97 uptime
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-sm hover:text-white transition-colors" style={{ color: 'var(--text-secondary)' }}>
              Gizlilik
            </a>
            <a href="#" className="text-sm hover:text-white transition-colors" style={{ color: 'var(--text-secondary)' }}>
              Şartlar
            </a>
            <a href="#" className="text-sm hover:text-white transition-colors" style={{ color: 'var(--text-secondary)' }}>
              Çerezler
            </a>
          </div>
        </div>

        {/* BDDK notice */}
        <p className="mt-6 text-xs text-center leading-relaxed" style={{ color: 'rgba(255,255,255,0.25)' }}>
          Fineria Finansal Teknolojiler A.Ş., Bankacılık Düzenleme ve Denetleme Kurumu (BDDK) tarafından
          lisanslandırılmış olup sermaye piyasası faaliyetleri SPK denetimi altındadır.
          Yatırımlar risk içerir; geçmiş performans geleceği garanti etmez.
        </p>
      </div>
    </footer>
  );
}
