import { MessageCircle } from 'lucide-react';
import type { Pack } from '@/types/api';
import { formatPEN } from '@/utils/formatCurrency';
import { parseItemsIncluidos } from '@/utils/parseItemsIncluidos';
import { whatsappPackUrl } from '@/utils/whatsapp';
import styles from './PackCard.module.scss';

interface PackCardProps {
  pack: Pack;
}

export default function PackCard({ pack }: PackCardProps) {
  const {
    nombre,
    descripcion,
    items_incluidos,
    porciones,
    pisos,
    tipo_torta,
    precio_buttercream_pen,
    precio_chantilly_pen,
    destacado,
    imagen_url,
  } = pack;

  // Placeholder premium para packs
  const imageUrl =
    imagen_url ||
    'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=500&h=375&fit=crop&q=80';

  const items = parseItemsIncluidos(items_incluidos);
  const waUrl = whatsappPackUrl(pack);

  const hasButtercream = precio_buttercream_pen !== null;
  const hasChantilly = precio_chantilly_pen !== null;

  return (
    <article className={styles.packCard}>
      {/* Imagen */}
      <div className={styles.packCard__media}>
        <img
          src={imageUrl}
          alt={nombre}
          className={styles.packCard__image}
          loading="lazy"
        />
        {destacado && <span className={styles.packCard__badge}>Destacado</span>}
      </div>

      {/* Info */}
      <div className={styles.packCard__info}>
        <h3 className={styles.packCard__title}>{nombre}</h3>
        {descripcion && <p className={styles.packCard__description}>{descripcion}</p>}

        {/* Especificaciones */}
        {(porciones || pisos || tipo_torta) && (
          <div className={styles.packCard__specs}>
            {porciones && <span className={styles.packCard__spec}>{porciones}</span>}
            {pisos && (
              <span className={styles.packCard__spec}>
                {pisos} {pisos === 1 ? 'piso' : 'pisos'}
              </span>
            )}
            {tipo_torta && <span className={styles.packCard__spec}>{tipo_torta}</span>}
          </div>
        )}

        {/* Ítems incluidos */}
        {items.length > 0 && (
          <div className={styles.packCard__items}>
            <h4 className={styles['packCard__items-title']}>Incluye:</h4>
            <ul className={styles['packCard__items-list']}>
              {items.map((item, idx) => (
                <li key={idx} className={styles['packCard__items-item']}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Precios Buttercream y Chantilly */}
        {(hasButtercream || hasChantilly) && (
          <div className={styles.packCard__pricing}>
            {hasButtercream && (
              <div className={styles['packCard__pricing-row']}>
                <span>Buttercream:</span>
                <span className={styles['packCard__pricing-val']}>
                  {formatPEN(precio_buttercream_pen)}
                </span>
              </div>
            )}
            {hasChantilly && (
              <div className={styles['packCard__pricing-row']}>
                <span>Chantilly:</span>
                <span className={styles['packCard__pricing-val']}>
                  {formatPEN(precio_chantilly_pen)}
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* CTA Footer */}
      <div className={styles.packCard__footer}>
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.packCard__button}
          id={`pack-cta-${pack.pack_id}`}
        >
          <MessageCircle />
          Consultar Pack
        </a>
      </div>
    </article>
  );
}
