import { motion } from 'framer-motion';
import { MessageCircle, AtSign, Phone, Mail, Send, Heart } from 'lucide-react';
import { brandConfig } from '@/data/brandConfig';
import { whatsappGenericUrl } from '@/utils/whatsapp';
import styles from './Contact.module.scss';

const CHANNELS = [
  {
    icon: MessageCircle,
    iconClass: 'whatsapp',
    label: 'WhatsApp',
    value: brandConfig.whatsappDisplay,
    href: brandConfig.whatsappUrl,
  },
  {
    icon: AtSign,
    iconClass: 'instagram',
    label: 'Instagram',
    value: brandConfig.instagram,
    href: brandConfig.instagramUrl,
  },
  {
    icon: Phone,
    iconClass: 'phone',
    label: 'Teléfono',
    value: brandConfig.phone,
    href: `tel:${brandConfig.whatsapp}`,
  },
  {
    icon: Mail,
    iconClass: 'email',
    label: 'Email',
    value: brandConfig.email,
    href: `mailto:${brandConfig.email}`,
  },
];

export default function Contact() {
  const genericWa = whatsappGenericUrl();

  return (
    <section className={styles.contact} id="contacto">
      <div className={styles.contact__inner}>
        {/* Header */}
        <div className={styles.contact__header}>
          <div className={styles['contact__header-subtitle']}>
            <Heart size={13} />
            Contacto
          </div>
          <h2 className={styles['contact__header-title']}>
            ¿Lista para tu próximo evento?
          </h2>
          <div className={styles['contact__header-divider']}>
            <span className={styles['contact__header-line']} />
            <Heart size={11} className={styles['contact__header-heart']} />
            <span className={styles['contact__header-line']} />
          </div>
        </div>

        <div className={styles['contact__text-block']}>
          <h3 className={styles['contact__text-title']}>
            Conversemos y armemos la{" "}
            <span className={styles['contact__text-highlight']}>
              propuesta perfecta para tu celebración
            </span>
          </h3>
        </div>

        <div className={styles.contact__content}>
          {/* Info Side */}
          <motion.div
            className={styles.contact__info}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className={styles['contact__info-text']}>
              Escríbenos por cualquiera de nuestros canales y te responderemos
              lo antes posible. ¡Nos encanta ayudarte a planificar tu evento!
            </p>

            <div className={styles.contact__channels}>
              {CHANNELS.map(({ icon: Icon, iconClass, label, value, href }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.contact__channel}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  id={`contact-${iconClass}`}
                >
                  <div
                    className={`${styles['contact__channel-icon']} ${
                      styles[`contact__channel-icon--${iconClass}`]
                    }`}
                  >
                    <Icon />
                  </div>
                  <div className={styles['contact__channel-info']}>
                    <p className={styles['contact__channel-label']}>{label}</p>
                    <p className={styles['contact__channel-value']}>{value}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* CTA Card & Brand Conditions */}
          <motion.div
            className={styles['contact__cta-card']}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className={styles['contact__cta-title']}>{brandConfig.name}</h3>
            <p className={styles['contact__cta-tagline']}>{brandConfig.slogan}</p>

            {/* Condiciones de venta/servicio */}
            <div
              style={{
                textAlign: 'left',
                width: '100%',
                fontSize: '11px',
                color: 'rgba(255, 255, 255, 0.85)',
                margin: '16px 0 8px 0',
                borderLeft: '2px solid rgba(255, 255, 255, 0.3)',
                paddingLeft: '12px',
              }}
            >
              <p style={{ fontWeight: '600', color: '#ffffff', marginBottom: '6px' }}>
                Condiciones Generales:
              </p>
              <ul style={{ padding: 0, margin: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '3px' }}>
                {brandConfig.condiciones.map((c, i) => (
                  <li key={i}>• {c}</li>
                ))}
              </ul>
            </div>

            <a
              href={genericWa}
              target="_blank"
              rel="noopener noreferrer"
              className={styles['contact__cta-button']}
              id="contact-cta-whatsapp"
            >
              <MessageCircle />
              Cotizar por WhatsApp
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
