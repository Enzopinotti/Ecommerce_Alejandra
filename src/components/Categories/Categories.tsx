import { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, AlertCircle } from 'lucide-react';
import { useLandingData } from '@/hooks/useLandingData';
import { cn } from '@/lib/utils';
import ProductCard from '@/components/ui/ProductCard';
import PackCard from '@/components/ui/PackCard';
import LoadingState from '@/components/ui/LoadingState';
import ErrorState from '@/components/ui/ErrorState';
import type { Categoria } from '@/types/api';
import { gsap } from 'gsap';
import { PastryVector } from '@/components/ui/PastryVector';
import styles from './Categories.module.scss';

type MainFilter = 'Todos' | 'Dulce' | 'Salado' | 'Packs';

function getCategoryGroup(category: Categoria): 'Dulce' | 'Salado' | 'Packs' | 'Servicios' {
  const id = (category.categoria_id || '').toLowerCase();
  const slug = (category.slug || '').toLowerCase();
  const tipo = (category.tipo || '').toLowerCase();

  if (tipo === 'pack' || id.includes('pack') || slug.includes('pack')) {
    return 'Packs';
  }
  if (id.includes('salad') || slug.includes('salad') || id.includes('salte') || slug.includes('salte')) {
    return 'Salado';
  }
  return 'Dulce';
}

export default function Categories() {
  const { data, loading, error, refetch } = useLandingData();
  const [mainFilter, setMainFilter] = useState<MainFilter>('Todos');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);

  // GSAP animations for background shapes (active from the start, including loading!)
  useEffect(() => {
    if (!categoriesRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Entrada escalonada de textos y cabecera
      gsap.fromTo(
        ".catalog-animate",
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

      // 2. Entrada elástica inicial de los 8 vectores de repostería
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
            // 3. Flotado continuo e interactivo (Organic Drifting Loops)
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

      // 4. Parallax de mouse interactivo sobre los vectores
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

      // 5. Parallax por scroll sobre los vectores
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
    }, categoriesRef);

    return () => ctx.revert();
  }, []);

  // 1. Obtener categorías dinámicas
  const categoriesList = useMemo(() => {
    if (!data) return [];
    return data.categorias;
  }, [data]);

  // 2. Obtener productos filtrados
  const filteredProducts = useMemo(() => {
    if (!data) return [];
    
    if (selectedCategory) {
      return data.productos.filter((p) => p.categoria_id === selectedCategory);
    }

    return data.productos.filter((product) => {
      const category = categoriesList.find((c) => c.categoria_id === product.categoria_id);
      if (!category) return false;

      if (mainFilter === 'Todos') return true;
      if (mainFilter === 'Packs') return false;
      return getCategoryGroup(category) === mainFilter;
    });
  }, [data, selectedCategory, mainFilter, categoriesList]);

  // 3. Obtener packs filtrados
  const filteredPacks = useMemo(() => {
    if (!data) return [];
    if (mainFilter === 'Todos' || mainFilter === 'Packs') {
      return data.packs;
    }
    return [];
  }, [data, mainFilter]);

  // Cambiar pestaña principal y resetear filtros secundarios
  const handleMainFilterChange = (filter: MainFilter) => {
    setMainFilter(filter);
    setSelectedCategory(null);
  };

  // Filtrar categorías secundarias visibles
  const visibleCategories = useMemo(() => {
    if (mainFilter === 'Todos') return categoriesList;
    if (mainFilter === 'Packs') return [];
    return categoriesList.filter((c) => getCategoryGroup(c) === mainFilter);
  }, [categoriesList, mainFilter]);

  // Paginación a 6 items
  const ITEMS_PER_PAGE = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const allItems = useMemo(() => {
    const packsList = filteredPacks.map((pack) => ({ ...pack, isPack: true }));
    const productsList = filteredProducts.map((prod) => ({ ...prod, isPack: false }));
    return [...packsList, ...productsList];
  }, [filteredPacks, filteredProducts]);

  const totalItems = allItems.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return allItems.slice(start, start + ITEMS_PER_PAGE);
  }, [allItems, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [mainFilter, selectedCategory]);

  // Helper JSX para renderizar el fondo estético (Gradients + Floating Pastries)
  const renderElegantBackground = () => (
    <>
      <div className={styles.categories__bgGradient} />
      <div className={styles.categories__radialBlue} />
      <div className={styles.categories__shapes}>
        {/* LADO IZQUIERDO */}
        <PastryVector type="cake" width={140} height={140} rotate={12} gradient="from-rose" className={`elegant-shape ${styles.shape1}`} />
        <PastryVector type="cupcake" width={120} height={120} rotate={-8} gradient="from-gold-champagne" className={`elegant-shape ${styles.shape3}`} />
        <PastryVector type="slice" width={100} height={100} rotate={-25} gradient="from-rose-soft" className={`elegant-shape ${styles.shape5}`} />
        <PastryVector type="macaron" width={90} height={90} rotate={15} gradient="from-navy-soft" className={`elegant-shape ${styles.shape7}`} />
        {/* LADO DERECHO */}
        <PastryVector type="empanada" width={130} height={130} rotate={-15} gradient="from-navy-metallic" className={`elegant-shape ${styles.shape2}`} />
        <PastryVector type="macaron" width={110} height={110} rotate={20} gradient="from-navy-soft" className={`elegant-shape ${styles.shape4}`} />
        <PastryVector type="cake" width={110} height={110} rotate={18} gradient="from-rose" className={`elegant-shape ${styles.shape6}`} />
        <PastryVector type="slice" width={90} height={90} rotate={-12} gradient="from-rose-soft" className={`elegant-shape ${styles.shape8}`} />
      </div>
    </>
  );

  // Helper JSX para renderizar el header editorial uniforme
  const renderElegantHeader = (badgeText: string) => (
    <div className={styles.categories__header}>
      <div className="catalog-animate">
        <div className={styles.categories__cloudBadge}>
          <span className={styles["categories__cloudBadge-text"]}>
            {badgeText}
          </span>
        </div>
      </div>
      <h2 className={cn(styles.categories__title, "catalog-animate")}>
        <span className={styles["categories__title-line1"]}>Alejandra</span>
        <span className={styles["categories__title-line2"]}>Nuestra Carta</span>
      </h2>
      <div className={cn(styles['categories__header-divider'], "catalog-animate")}>
        <span className={styles['categories__header-line']} />
        <Heart size={11} className={styles['categories__header-heart']} />
        <span className={styles['categories__header-line']} />
      </div>
    </div>
  );

  // Estado: Cargando (¡Ahora con el mismo fondo animado espectacular!)
  if (loading) {
    return (
      <section className={styles.categories} id="categorias" ref={categoriesRef}>
        {renderElegantBackground()}
        <div className={styles.categories__inner}>
          {renderElegantHeader("Cargando Menú")}
          <div className="catalog-animate" style={{ marginTop: '40px', position: 'relative', zIndex: 20 }}>
            <LoadingState />
          </div>
        </div>
      </section>
    );
  }

  // Estado: Error (¡Con fondo estético uniforme!)
  if (error) {
    return (
      <section className={styles.categories} id="categorias" ref={categoriesRef}>
        {renderElegantBackground()}
        <div className={styles.categories__inner}>
          {renderElegantHeader("Error de Conexión")}
          <div className="catalog-animate" style={{ marginTop: '30px', position: 'relative', zIndex: 20 }}>
            <ErrorState message={error} onRetry={refetch} />
          </div>
        </div>
      </section>
    );
  }

  // Estado: Sin datos
  if (!data || (data.productos.length === 0 && data.packs.length === 0)) {
    return (
      <section className={styles.categories} id="categorias" ref={categoriesRef}>
        {renderElegantBackground()}
        <div className={styles.categories__inner}>
          {renderElegantHeader("Menú de Celebración")}
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--navy)', position: 'relative', zIndex: 20 }}>
            <AlertCircle style={{ marginBottom: '12px', color: '#cfa88b' }} size={32} />
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 500 }}>
              Catálogo digital interactivo en mantenimiento. Escríbenos directamente para cotizar.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.categories} id="categorias" ref={categoriesRef}>
      {renderElegantBackground()}

      <div className={styles.categories__inner}>
        {/* Header con Estilo Editorial Fino al estilo Hero */}
        <div className={styles.categories__header}>
          <div className="catalog-animate">
            <div className={styles.categories__cloudBadge}>
              <span className={styles["categories__cloudBadge-text"]}>
                Menú de Autor
              </span>
            </div>
          </div>
          <h2 className={cn(styles.categories__title, "catalog-animate")}>
            <span className={styles["categories__title-line1"]}>Alejandra</span>
            <span className={styles["categories__title-line2"]}>Nuestra Carta</span>
          </h2>
          <div className={cn(styles['categories__header-divider'], "catalog-animate")}>
            <span className={styles['categories__header-line']} />
            <Heart size={11} className={styles['categories__header-heart']} />
            <span className={styles['categories__header-line']} />
          </div>
          <p className={cn(styles.categories__description, "catalog-animate")}>
            Explora nuestras tortas personalizadas, bocaditos salados y gourmet, y packs temáticos diseñados artesanalmente para endulzar tus momentos inolvidables.
          </p>
        </div>

        {/* Pestañas Filtros Principales (¡SIN EMOJIS! Elegantes y limpios) */}
        <div className={styles.categories__filters}>
          {(['Todos', 'Dulce', 'Salado', 'Packs'] as MainFilter[]).map((tab) => (
            <button
              key={tab}
              className={cn(
                styles['categories__filter-btn'],
                mainFilter === tab && styles['categories__filter-btn--active']
              )}
              onClick={() => handleMainFilterChange(tab)}
              id={`tab-main-${tab.toLowerCase()}`}
            >
              {tab === 'Todos'
                ? 'Todo'
                : tab === 'Dulce'
                ? 'Dulces'
                : tab === 'Salado'
                ? 'Salados'
                : 'Packs'}
            </button>
          ))}
        </div>

        {/* Sub-categorías */}
        {visibleCategories.length > 0 && (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '8px',
              marginBottom: '32px',
              maxWidth: '800px',
              margin: '0 auto 32px',
              position: 'relative',
              zIndex: 20
            }}
          >
            <button
              className={cn(
                styles['categories__filter-btn'],
                selectedCategory === null && styles['categories__filter-btn--active']
              )}
              style={{
                fontSize: '11px',
                padding: '4px 12px',
                borderColor: 'rgba(207, 168, 139, 0.4)',
                background: selectedCategory === null ? 'var(--gold)' : 'transparent',
              }}
              onClick={() => setSelectedCategory(null)}
            >
              Ver Todos
            </button>
            {visibleCategories.map((cat) => (
              <button
                key={cat.categoria_id}
                className={cn(
                  styles['categories__filter-btn'],
                  selectedCategory === cat.categoria_id && styles['categories__filter-btn--active']
                )}
                style={{
                  fontSize: '11px',
                  padding: '4px 12px',
                  borderColor: 'rgba(207, 168, 139, 0.4)',
                  background: selectedCategory === cat.categoria_id ? 'var(--gold)' : 'transparent',
                }}
                onClick={() => setSelectedCategory(cat.categoria_id)}
                id={`subcat-${cat.slug}`}
              >
                {cat.nombre}
              </button>
            ))}
          </div>
        )}

        {/* Grid de Productos / Packs Paginado */}
        <motion.div
          layout
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '32px',
            minHeight: '200px',
            position: 'relative',
            zIndex: 20
          }}
        >
          <AnimatePresence mode="popLayout">
            {paginatedItems.map((item: any) => {
              if (item.isPack) {
                return (
                  <motion.div
                    key={`pack-${item.pack_id}`}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                  >
                    <PackCard pack={item as any} />
                  </motion.div>
                );
              } else {
                return (
                  <motion.div
                    key={`prod-${item.producto_id}`}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                  >
                    <ProductCard product={item as any} />
                  </motion.div>
                );
              }
            })}
          </AnimatePresence>
        </motion.div>

        {/* Estado vacío */}
        {totalItems === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--navy)', position: 'relative', zIndex: 20 }}>
            <Sparkles style={{ marginBottom: '12px', color: '#cfa88b' }} size={24} />
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 500 }}>
              No se encontraron delicias disponibles en esta categoría.
            </p>
          </div>
        )}

        {/* Paginador Premium */}
        {totalPages > 1 && (
          <div className={styles.categories__pagination}>
            <button
              onClick={() => {
                if (currentPage > 1) {
                  setCurrentPage(currentPage - 1);
                  document.getElementById('categorias')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              disabled={currentPage === 1}
              className={cn(
                styles['categories__page-btn'],
                currentPage === 1 && styles['categories__page-btn--disabled']
              )}
            >
              Anterior
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => {
                  setCurrentPage(page);
                  document.getElementById('categorias')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={cn(
                  styles['categories__page-btn'],
                  currentPage === page && styles['categories__page-btn--active']
                )}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => {
                if (currentPage < totalPages) {
                  setCurrentPage(currentPage + 1);
                  document.getElementById('categorias')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              disabled={currentPage === totalPages}
              className={cn(
                styles['categories__page-btn'],
                currentPage === totalPages && styles['categories__page-btn--disabled']
              )}
            >
              Siguiente
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
