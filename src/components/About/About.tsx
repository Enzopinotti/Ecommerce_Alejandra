import { motion } from "framer-motion";
import { Heart, Sparkles, Palette, Award } from "lucide-react";
import styles from "./About.module.scss";

const PILLARS = [
  { icon: Award, label: "Calidad" },
  { icon: Palette, label: "Diseño" },
  { icon: Sparkles, label: "Sabor" },
  { icon: Heart, label: "Experiencia" },
];

function About() {
  return (
    <section className={styles.about} id="nosotros">
      <div className={styles.about__inner}>
        {/* Editorial Layout: Image at the top with fine glass borders */}
        <div className={styles.about__showcase}>
          <motion.div
            className={styles['about__image-wrapper']}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.2, ease: [0.23, 0.86, 0.39, 0.96] }}
          >
            <img
              src="/cupcake-gift.png"
              alt="Alejandra Cakes & Events - Tazas decoradas tipo Cupcake en caja de regalo"
              className={styles.about__image}
              loading="lazy"
            />
            <div className={styles['about__image-glow']} />
          </motion.div>
        </div>

        {/* Hero-like styled text content at the bottom */}
        <div className={styles.about__content}>
          <motion.div
            className={styles.about__text}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, delay: 0.2, ease: [0.23, 0.86, 0.39, 0.96] }}
          >
            <div className={styles.about__header}>
              <div className={styles['about__header-subtitle']}>
                <Heart size={13} />
                Nuestra Historia
              </div>
              <h2 className={styles['about__header-title']}>
                Hola, Soy Alejandra
              </h2>
              <div className={styles['about__header-divider']}>
                <span className={styles['about__header-line']} />
                <Heart size={11} className={styles['about__header-heart']} />
                <span className={styles['about__header-line']} />
              </div>
            </div>

            <div className={styles['about__text-block']}>
              <h3 className={styles['about__text-title']}>
                Una marca creada para acompañar celebraciones con{" "}
                <span className={styles['about__text-highlight']}>
                  sabor, detalle y presentación delicada
                </span>
              </h3>
              <p className={styles['about__text-body']}>
                Soy Alejandra Cakes & Events, una firma culinaria de autor dedicada a
                transformar fechas especiales en experiencias memorables. Cada receta es elaborada
                con insumos premium y una dedicación artesanal absoluta.
              </p>
              <p className={styles['about__text-body']}>
                Nos especializamos en alta pastelería de diseño, bocaditos salados gourmet y packs 
                temáticos sumamente cuidados que elevan cumpleaños, reuniones corporativas y celebraciones
                familiares al siguiente nivel de sofisticación.
              </p>
            </div>

            {/* Pillars */}
            <div className={styles.about__pillars}>
              {PILLARS.map(({ icon: Icon, label }, i) => (
                <motion.div
                  key={label}
                  className={styles.about__pillar}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.15, duration: 0.6, ease: "easeOut" }}
                >
                  <Icon />
                  <span>{label}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Button to Catalog */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.6 }}
              style={{ marginTop: '2.5rem' }}
            >
              <a href="#/catalogo" className={styles['about__cta-btn']}>
                Ver Catálogo Completo
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default About;
