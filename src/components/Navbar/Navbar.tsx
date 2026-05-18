import { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { whatsappGenericUrl } from '@/utils/whatsapp';
import { cn } from '@/lib/utils';
import styles from './Navbar.module.scss';

// Definición de ítems con sus respectivas rutas físicas en la app
const NAV_ITEMS = [
  { label: 'Inicio', href: '#hero', route: 'landing' },
  { label: 'Nosotros', href: '#nosotros', route: 'landing' },
  { label: 'Servicios', href: '#servicios', route: 'landing' },
  { label: 'Contacto', href: '#contacto', route: 'landing' },
  { label: 'Catálogo', href: '#/catalogo', route: 'catalogo' }, // Al extremo derecho
];

interface NavbarProps {
  activeRoute: 'landing' | 'catalogo';
}

export default function Navbar({ activeRoute }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  // Si el usuario hace clic en los links, sincronizamos el hash en la URL
  const handleNavClick = (item: typeof NAV_ITEMS[0]) => {
    setMobileOpen(false);
    
    // Asignar el hash directamente para forzar el enrutador en App.tsx
    window.location.hash = item.href;

    // Si ya estamos en la landing, hacemos scroll suave de inmediato
    if (item.route === 'landing' && activeRoute === 'landing') {
      const el = document.querySelector(item.href);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Escuchar cambios de hash para hacer scroll automático en la Landing tras venir del catálogo
  useEffect(() => {
    if (activeRoute === 'landing') {
      const hash = window.location.hash;
      if (hash && hash !== '#/' && hash !== '#/catalogo') {
        const timer = setTimeout(() => {
          const el = document.querySelector(hash);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 150);
        return () => clearTimeout(timer);
      }
    }
  }, [activeRoute]);

  const genericWa = whatsappGenericUrl('Hola, me gustaría cotizar servicios para un evento.');

  return (
    <nav
      className={cn(styles.navbar, scrolled && styles['navbar--scrolled'])}
      id="navbar"
      role="navigation"
      aria-label="Navegación principal"
    >
      <div className={styles.navbar__inner}>
        {/* Logo */}
        <a
          href="#hero"
          className={styles.navbar__logo}
          onClick={(e) => {
            e.preventDefault();
            if (activeRoute === 'catalogo') {
              window.location.hash = '#hero';
            } else {
              handleNavClick({ label: 'Inicio', href: '#hero', route: 'landing' });
            }
          }}
          id="navbar-logo"
        >
          <span className={styles['navbar__logo-name']}>Alejandra</span>
          <span className={styles['navbar__logo-sub']}>Cakes & Events</span>
        </a>

        {/* Desktop Links */}
        <div className={styles.navbar__links}>
          {NAV_ITEMS.map((item) => {
            const isCatalogo = item.route === 'catalogo';
            return (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  styles.navbar__link,
                  isCatalogo && styles['navbar__link--diferenciado'],
                  isCatalogo && activeRoute === 'catalogo' && styles['navbar__link--diferenciado--active']
                )}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item);
                }}
                id={`nav-link-${item.label.toLowerCase()}`}
              >
                {item.label}
              </a>
            );
          })}
        </div>

        {/* Desktop CTA */}
        <a
          href={genericWa}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.navbar__cta}
          id="navbar-cta-whatsapp"
        >
          <MessageCircle />
          Cotizar
        </a>

        {/* Mobile Toggle */}
        <button
          className={cn(styles.navbar__toggle, mobileOpen && styles['navbar__toggle--open'])}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={mobileOpen}
          id="navbar-mobile-toggle"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(styles.navbar__mobile, mobileOpen && styles['navbar__mobile--open'])}
        role="dialog"
        aria-label="Menú de navegación"
      >
        {NAV_ITEMS.map((item) => {
          const isCatalogo = item.route === 'catalogo';
          return (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                styles['navbar__mobile-link'],
                isCatalogo && styles['navbar__link--diferenciado'],
                isCatalogo && activeRoute === 'catalogo' && styles['navbar__link--diferenciado--active']
              )}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item);
              }}
            >
              {item.label}
            </a>
          );
        })}
        <a
          href={genericWa}
          target="_blank"
          rel="noopener noreferrer"
          className={styles['navbar__mobile-cta']}
        >
          <MessageCircle size={16} />
          Cotizar por WhatsApp
        </a>
      </div>
    </nav>
  );
}
