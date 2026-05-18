import { motion } from "framer-motion";
import { Award, Palette, Sparkles, HeartHandshake, Heart } from "lucide-react";
import styles from "./Values.module.scss";

const VALUES = [
  {
    icon: Award,
    title: "Calidad",
    accent: "",
    description: "Ingredientes seleccionados y presentaciones cuidadas para que cada bocado sea especial.",
  },
  {
    icon: Palette,
    title: "Diseño",
    accent: "",
    description: "Adaptamos colores, temática y estilo del evento para una experiencia visual impecable.",
  },
  {
    icon: Sparkles,
    title: "Sabor",
    accent: "",
    description: "Propuestas dulces y saladas pensadas para compartir y disfrutar en cada celebración.",
  },
  {
    icon: HeartHandshake,
    title: "Experiencia",
    accent: "",
    description: "Acompañamos desde la consulta hasta la entrega, cuidando cada detalle de tu evento.",
  },
];

function Values() {
  return (
    <section className={styles.values} id="valores">
      <div className={styles.values__inner}>
        <div className={styles.values__header}>
          <div className="section-subtitle">
            <Award size={14} />
            Nuestros Valores
          </div>
          <h2 className="section-title">Lo que nos define</h2>
          <p className="section-description">
            Calidad · Diseño · Sabor · Experiencia
          </p>
          <div className="section-divider">
            <Heart size={12} />
          </div>
        </div>

        <div className={styles.values__list}>
          {VALUES.map(({ icon: Icon, title, description }, index) => (
            <motion.div
              key={title}
              className={styles.values__item}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                ease: [0.23, 0.86, 0.39, 0.96],
              }}
            >
              <div className={styles['values__item-icon']}>
                <Icon />
              </div>
              <div className={styles['values__item-content']}>
                <h3 className={styles['values__item-title']}>
                  <span className={styles['values__item-title-accent']}>{title}:</span>{" "}
                </h3>
                <p className={styles['values__item-description']}>{description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Values;
