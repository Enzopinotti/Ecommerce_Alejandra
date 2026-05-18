import { AtSign, MessageCircle, Phone } from 'lucide-react';
import { brandConfig } from '@/data/brandConfig';
import { whatsappGenericUrl } from '@/utils/whatsapp';
import styles from './Footer.module.scss';

const NAV_ITEMS = [
  { label: 'Inicio', href: '#hero' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Contacto', href: '#contacto' },
  { label: 'Catálogo', href: '#/catalogo' },
];

export default function Footer() {
  const handleNavClick = (href: string) => {
    window.location.hash = href;
  };

  const genericWa = whatsappGenericUrl();

  return (
    <footer className={styles.footer} id="footer">
      <div className={styles.footer__inner}>
        {/* Top */}
        <div className={styles.footer__top}>
          <div>
            <p className={styles['footer__logo-name']}>Alejandra</p>
            <p className={styles['footer__logo-sub']}>Cakes & Events</p>
          </div>
          <p className={styles['footer__tagline']}>{brandConfig.slogan}</p>

          <nav className={styles.footer__links} aria-label="Footer navigation">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={styles.footer__link}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Bottom */}
        <div className={styles.footer__bottom}>
          <div className={styles.footer__meta}>
            <p className={styles.footer__copyright}>
              © {new Date().getFullYear()} {brandConfig.name}. Todos los derechos reservados.
            </p>
            <p className={styles.footer__developer}>
              Desarrollado por:{" "}
              <a
                href="https://enzopinotti.dev"
                target="_blank"
                rel="noopener noreferrer"
                className={styles['footer__developer-link']}
              >
                Enzo Pinotti
              </a>
            </p>
          </div>

          <div className={styles.footer__socials}>
            <a
              href={genericWa}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.footer__social}
              aria-label="WhatsApp"
            >
              <MessageCircle />
            </a>
            <a
              href={brandConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.footer__social}
              aria-label="Instagram"
            >
              <AtSign />
            </a>
            <a href={`tel:${brandConfig.whatsapp}`} className={styles.footer__social} aria-label="Teléfono">
              <Phone />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
