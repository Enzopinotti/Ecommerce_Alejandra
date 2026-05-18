import { motion } from "framer-motion";
import {
  Cake, UtensilsCrossed, Gift, PartyPopper,
  Cookie, ClipboardList, Heart
} from "lucide-react";
import styles from "./Services.module.scss";

const SERVICES = [
  {
    icon: Cake,
    title: "Tortas personalizadas",
    description: "Tortas en chantilly o butter cream, con temática, aplicaciones y toppers para tu celebración.",
  },
  {
    icon: UtensilsCrossed,
    title: "Bocaditos salados",
    description: "Opciones por unidad o por cantidad para reuniones y eventos. Empanaditas, tequeños, brochetas y más.",
  },
  {
    icon: Cookie,
    title: "Bocaditos dulces",
    description: "Mini postres, tartaletas, alfajores, fresas bañadas, cupcakes y bombones para endulzar tu mesa.",
  },
  {
    icon: Gift,
    title: "Packs temáticos",
    description: "Combinaciones listas para cumpleaños y celebraciones especiales con todo incluido.",
  },
  {
    icon: PartyPopper,
    title: "Eventos",
    description: "Propuestas a medida según cantidad, temática, fecha y tipo de celebración.",
  },
  {
    icon: ClipboardList,
    title: "Pedido personalizado",
    description: "Armamos una orden con productos, precios, condiciones y forma de entrega a tu medida.",
  },
];

function Services() {
  return (
    <section className={styles.services} id="servicios">
      <div className={styles.services__inner}>
        {/* Header */}
        <div className={styles.services__header}>
          <div className={styles['services__header-subtitle']}>
            <Heart size={13} />
            Nuestros Servicios
          </div>
          <h2 className={styles['services__header-title']}>
            Soluciones dulces y saladas para celebrar
          </h2>
          <div className={styles['services__header-divider']}>
            <span className={styles['services__header-line']} />
            <Heart size={11} className={styles['services__header-heart']} />
            <span className={styles['services__header-line']} />
          </div>
        </div>

        <div className={styles['services__text-block']}>
          <h3 className={styles['services__text-title']}>
            Todo lo que necesitas para que tu{" "}
            <span className={styles['services__text-highlight']}>
              evento sea inolvidable
            </span>
          </h3>
        </div>

        {/* Grid */}
        <div className={styles.services__grid}>
          {SERVICES.map(({ icon: Icon, title, description }, index) => (
            <motion.div
              key={title}
              className={styles.services__card}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.23, 0.86, 0.39, 0.96],
              }}
            >
              <div className={styles['services__card-icon']}>
                <Icon />
              </div>
              <h3 className={styles['services__card-title']}>{title}</h3>
              <p className={styles['services__card-description']}>{description}</p>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA to Catalog */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          style={{ display: 'flex', justifyContent: 'center', marginTop: '3.5rem' }}
        >
          <a href="#/catalogo" className={styles['services__cta-btn']}>
            Explorar Menú de Eventos
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default Services;
