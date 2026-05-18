import { MessageCircle } from 'lucide-react';
import type { Producto } from '@/types/api';
import { whatsappProductUrl } from '@/utils/whatsapp';
import ProductPriceOptions from './ProductPriceOptions';
import styles from './ProductCard.module.scss';

interface ProductCardProps {
  product: Producto;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { nombre, descripcion, etiqueta, imagen_url } = product;

  // Placeholder premium si no hay imagen
  const imageUrl =
    imagen_url ||
    'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=375&fit=crop&q=80';

  const waUrl = whatsappProductUrl(product);

  return (
    <article className={styles.productCard}>
      {/* Imagen */}
      <div className={styles.productCard__media}>
        <img
          src={imageUrl}
          alt={nombre}
          className={styles.productCard__image}
          loading="lazy"
        />
        {etiqueta && <span className={styles.productCard__badge}>{etiqueta}</span>}
      </div>

      {/* Info */}
      <div className={styles.productCard__info}>
        <h3 className={styles.productCard__title}>{nombre}</h3>
        {descripcion && <p className={styles.productCard__description}>{descripcion}</p>}

        <div className={styles.productCard__pricing}>
          <ProductPriceOptions product={product} />
        </div>
      </div>

      {/* CTA Footer */}
      <div className={styles.productCard__footer}>
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.productCard__button}
          id={`product-cta-${product.producto_id}`}
        >
          <MessageCircle />
          Consultar
        </a>
      </div>
    </article>
  );
}
