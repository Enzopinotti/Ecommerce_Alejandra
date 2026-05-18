import { useEffect, useRef } from "react";
import { MessageCircle, ChevronDown, BookOpen } from "lucide-react";
import { gsap } from "gsap";
import { PastryVector } from "@/components/ui/PastryVector";
import styles from "./Hero.module.scss";

function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Entrada escalonada de textos y botones
      gsap.fromTo(
        ".hero-animate",
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.4,
          stagger: 0.15,
          ease: "power3.out",
        }
      );

      // 2. Entrada elástica inicial de los 8 contenedores externos (.elegant-shape) con opacidad muy suave (0.45)
      gsap.fromTo(
        ".elegant-shape",
        {
          opacity: 0,
          scale: 0.3,
          y: -120,
        },
        {
          opacity: 0.45,
          scale: 1,
          y: 0,
          duration: 2.5,
          stagger: 0.1,
          ease: "elastic.out(1, 0.75)",
          onComplete: () => {
            // 3. Flotado continuo (Organic Drifting Loops) en la capa INTERNA (.elegant-shape__inner)
            const innerShapes = gsap.utils.toArray(".elegant-shape__inner");
            innerShapes.forEach((innerShape: any, i) => {
              const driftX = [35, -38, 30, -28, 25, -26, 30, -22][i % 8];
              const driftY = [28, 35, -30, 28, -22, 32, -25, 20][i % 8];
              const duration = [14, 16, 12, 15, 13, 17, 14, 15][i % 8];

              gsap.to(innerShape, {
                x: `+=${driftX}`,
                y: `+=${driftY}`,
                duration: duration,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: i * 0.15,
              });
            });
          },
        }
      );

      // 4. Parallax interactivo con el cursor (Mouse Parallax) sobre la capa MEDIA (.elegant-shape__mouse)
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const xPercent = (clientX / window.innerWidth - 0.5) * 2;
        const yPercent = (clientY / window.innerHeight - 0.5) * 2;

        const mouseWrappers = gsap.utils.toArray(".elegant-shape__mouse");
        mouseWrappers.forEach((wrapper: any, i) => {
          const factor = (i + 1) * 4;
          gsap.to(wrapper, {
            x: xPercent * factor,
            y: yPercent * factor,
            duration: 1.8,
            ease: "power2.out",
            overwrite: "auto",
          });
        });
      };

      // 5. Parallax interactivo con el Scroll sobre el contenedor EXTERNO (.elegant-shape)
      const handleScroll = () => {
        const scrollY = window.scrollY;
        const shapes = gsap.utils.toArray(".elegant-shape");
        shapes.forEach((shape: any, i) => {
          const factor = [0.06, 0.08, 0.04, 0.07, 0.03, 0.05, 0.04, 0.06][i % 8];
          gsap.to(shape, {
            y: scrollY * factor,
            duration: 0.8,
            ease: "power1.out",
            overwrite: "auto",
          });
        });
      };

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("scroll", handleScroll);
      };
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.hero} id="hero" ref={heroRef}>
      {/* Luces y Gradientes de Fondo */}
      <div className={styles.hero__bgGradient} />
      <div className={styles.hero__radialBlue} />

      {/* Constelación de 8 Vectores de Pastelería Glassmorphic */}
      <div className={styles.hero__shapes}>
        {/* LADO IZQUIERDO */}
        <PastryVector
          type="cake"
          width={140}
          height={140}
          rotate={12}
          gradient="from-rose"
          className={`elegant-shape ${styles.shape1}`}
        />
        <PastryVector
          type="cupcake"
          width={120}
          height={120}
          rotate={-8}
          gradient="from-gold-champagne"
          className={`elegant-shape ${styles.shape3}`}
        />
        <PastryVector
          type="slice"
          width={100}
          height={100}
          rotate={-25}
          gradient="from-rose-soft"
          className={`elegant-shape ${styles.shape5}`}
        />
        <PastryVector
          type="macaron"
          width={90}
          height={90}
          rotate={15}
          gradient="from-navy-soft"
          className={`elegant-shape ${styles.shape7}`}
        />

        {/* LADO DERECHO */}
        <PastryVector
          type="empanada"
          width={130}
          height={130}
          rotate={-15}
          gradient="from-navy-metallic"
          className={`elegant-shape ${styles.shape2}`}
        />
        <PastryVector
          type="macaron"
          width={110}
          height={110}
          rotate={20}
          gradient="from-navy-soft"
          className={`elegant-shape ${styles.shape4}`}
        />
        <PastryVector
          type="cake"
          width={110}
          height={110}
          rotate={18}
          gradient="from-rose"
          className={`elegant-shape ${styles.shape6}`}
        />
        <PastryVector
          type="slice"
          width={90}
          height={90}
          rotate={-12}
          gradient="from-rose-soft"
          className={`elegant-shape ${styles.shape8}`}
        />
      </div>

      {/* Contenido Principal */}
      <div className={styles.hero__content}>
        {/* Cloud Badge (Nube de alta gama) */}
        <div className="hero-animate">
          <div className={styles.hero__cloudBadge}>
            <span className={styles["hero__cloudBadge-text"]}>Exclusividad & Diseño</span>
          </div>
        </div>

        {/* Título Principal */}
        <div className="hero-animate">
          <h1 className={styles.hero__title}>
            <span className={styles["hero__title-line1"]}>Alejandra</span>
            <span className={styles["hero__title-line2"]}>Cakes & Events</span>
          </h1>
        </div>

        {/* Tagline */}
        <div className="hero-animate">
          <p className={styles.hero__tagline}>
            Dulces momentos, recuerdos inolvidables
          </p>
        </div>

        {/* Descripción de Marca */}
        <div className="hero-animate">
          <p className={styles.hero__description}>
            Tortas personalizadas, bocaditos dulces y salados, packs temáticos y
            propuestas para eventos de alta gama que transforman cada celebración en
            una obra de arte.
          </p>
        </div>

        {/* Grupo CTA */}
        <div className="hero-animate">
          <div className={styles["hero__cta-group"]}>
            <a
              href="https://wa.me/51934275159"
              target="_blank"
              rel="noopener noreferrer"
              className={styles["hero__cta-primary"]}
              id="hero-cta-whatsapp"
            >
              <MessageCircle />
              Cotizar ahora
            </a>
            <a
              href="#/catalogo"
              className={styles["hero__cta-secondary"]}
              id="hero-cta-services"
            >
              Explorar Carta
              <BookOpen className={styles["hero__cta-menu-icon"]} size={16} />
            </a>
          </div>

          {/* Luxury Bouncing Chevron placed naturally below the buttons to prevent absolute overlaps */}
          <div className={styles["hero__scroll-indicator-inline"]}>
            <ChevronDown className={styles["hero__scroll-indicator-arrow"]} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
