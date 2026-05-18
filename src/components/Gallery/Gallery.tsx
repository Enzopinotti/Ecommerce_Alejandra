import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Heart, ChevronRight } from "lucide-react";
import styles from "./Gallery.module.scss";

// Registrar ScrollTrigger de GSAP
gsap.registerPlugin(ScrollTrigger);

// Banco de imágenes gourmet 100% funcionales en alta definición
const GALLERY_ITEMS = [
  {
    src: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&h=1000&q=80",
    alt: "Torta de celebración decorada",
    label: "Tortas de Bodas & XV Años",
  },
  {
    src: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=800&h=1000&q=80",
    alt: "Cupcakes decorados de diseño",
    label: "Cupcakes Gourmet de Diseño",
  },
  {
    src: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=800&h=1000&q=80",
    alt: "Macarons y alfajores finos",
    label: "Macarons & Alfajores Premium",
  },
  {
    src: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&h=1000&q=80",
    alt: "Bocaditos salados gourmet horneados artesanalmente",
    label: "Bocaditos Salados",
  },
  {
    src: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&h=1000&q=80",
    alt: "Torta boutique decorada con fresas frescas",
    label: "Torta de Fresas & Crema",
  },
  {
    src: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&h=1000&q=80",
    alt: "Mini postres variados de alta costura",
    label: "Mini Postres & Shots Dulces",
  },
  {
    src: "https://images.unsplash.com/photo-1511018556340-d16986a1c194?auto=format&fit=crop&w=800&h=1000&q=80",
    alt: "Plato de catering de lujo para eventos",
    label: "Mesas Temáticas & Coctelería",
  }
];

export default function Gallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const section = sectionRef.current;
    if (!container || !section) return;

    // Solo activar la animación de desplazamiento horizontal en desktop y tablet
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    
    // Crear el contexto de GSAP para un desmontado seguro
    const ctx = gsap.context(() => {
      if (mediaQuery.matches) {
        // Calcular la distancia total de desplazamiento horizontal
        const scrollDistance = container.scrollWidth - window.innerWidth;
        if (scrollDistance <= 0) return;

        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: () => `+=${scrollDistance}`,
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          animation: gsap.to(container, {
            x: -scrollDistance,
            ease: "none"
          })
        });
      }
    }, sectionRef);

    // Recalcular en cambio de resolución de pantalla
    const handleResize = () => {
      ctx.revert();
      ctx.add(() => {
        if (mediaQuery.matches) {
          const scrollDistance = container.scrollWidth - window.innerWidth;
          if (scrollDistance <= 0) return;

          ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: () => `+=${scrollDistance}`,
            scrub: 1.2,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            animation: gsap.to(container, {
              x: -scrollDistance,
              ease: "none"
            })
          });
        }
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      ctx.revert(); // ¡Revierte y desmonta de manera síncrona el pin-spacer de GSAP!
      ScrollTrigger.getAll().forEach(t => t.kill(true)); // ¡Muerte absoluta y forzada de todo spacer de ScrollTrigger de forma sincrónica!
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className={styles.gallery} ref={sectionRef} id="galeria">
      <div className={styles.gallery__sticky}>
        <div className={styles.gallery__inner}>
          
          {/* Header con Estilo Editorial Fino */}
          <div className={styles.gallery__header}>
            <div className={styles['gallery__header-subtitle']}>
              <Heart size={13} />
              Galería de Diseño
            </div>
            <h2 className={styles['gallery__header-title']}>
              Nuestro trabajo habla por nosotros
            </h2>
            <div className={styles['gallery__header-divider']}>
              <span className={styles['gallery__header-line']} />
              <Heart size={11} className={styles['gallery__header-heart']} />
              <span className={styles['gallery__header-line']} />
            </div>
          </div>

          <div className={styles['gallery__text-block']}>
            <h3 className={styles['gallery__text-title']}>
              Cada creación es una{" "}
              <span className={styles['gallery__text-highlight']}>
                obra de arte comestible
              </span>
            </h3>
          </div>

        </div>

        {/* Viewport para el Slider de Galería Horizontal */}
        <div className={styles.gallery__viewport}>
          <div className={styles.gallery__container} ref={containerRef}>
            {GALLERY_ITEMS.map((item) => (
              <div
                key={item.label}
                className={styles.gallery__item}
              >
                <div className={styles.gallery__imageWrapper}>
                  <img
                    src={item.src}
                    alt={item.alt}
                    className={styles.gallery__image}
                    loading="lazy"
                  />
                  <div className={styles.gallery__overlay}>
                    <span className={styles['gallery__item-label']}>{item.label}</span>
                    <span className={styles['gallery__item-sub']}>Ver detalles</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Indicador Guía de Desplazamiento Lateral */}
        <div className={styles.gallery__scrollHint}>
          <span>Desliza para explorar</span>
          <ChevronRight size={12} />
        </div>

      </div>
    </section>
  );
}
