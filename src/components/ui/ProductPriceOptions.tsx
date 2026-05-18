import type { Producto } from '@/types/api';
import { formatPEN } from '@/utils/formatCurrency';
import styles from './ProductPriceOptions.module.scss';

interface ProductPriceOptionsProps {
  product: Producto;
}

export default function ProductPriceOptions({ product }: ProductPriceOptionsProps) {
  const {
    unidad_base,
    precio_unidad_pen,
    precio_desde_50_pen,
    precio_25_pen,
    precio_50_pen,
    precio_100_pen,
    disponible_25,
    disponible_50,
    disponible_100,
  } = product;

  // 1. Cotización obligatoria (si no hay ningún precio definido en la planilla)
  const requiere_cotizacion =
    precio_unidad_pen === null &&
    precio_25_pen === null &&
    precio_50_pen === null &&
    precio_100_pen === null;

  if (requiere_cotizacion) {
    return <div className={styles.priceOptions__quote}>Consultar precio</div>;
  }

  // 2. Producto por Unidad
  if (unidad_base === 'unidad' || precio_unidad_pen !== null) {
    const formattedUnit = formatPEN(precio_unidad_pen);
    const formattedDiscount = formatPEN(precio_desde_50_pen);

    return (
      <div className={styles.priceOptions}>
        {formattedUnit ? (
          <div className={styles.priceOptions__main}>
            {formattedUnit} <span className={styles.priceOptions__suffix}>/ unidad</span>
          </div>
        ) : (
          <div className={styles.priceOptions__quote}>Consultar precio</div>
        )}

        {formattedDiscount && (
          <div className={styles.priceOptions__discount}>
            Desde 50 unidades: {formattedDiscount} c/u
          </div>
        )}
      </div>
    );
  }

  // 3. Producto por Cantidad (Bocaditos en lotes de 25, 50, 100)
  const show25 = precio_25_pen !== null && disponible_25 !== false;
  const show50 = precio_50_pen !== null && disponible_50 !== false;
  const show100 = precio_100_pen !== null && disponible_100 !== false;

  if (show25 || show50 || show100) {
    // Definimos el precio principal (el de menor cantidad disponible)
    let mainPrice: number | null = null;
    let mainQty = '';

    if (show25) {
      mainPrice = precio_25_pen;
      mainQty = '25 unidades';
    } else if (show50) {
      mainPrice = precio_50_pen;
      mainQty = '50 unidades';
    } else if (show100) {
      mainPrice = precio_100_pen;
      mainQty = '100 unidades';
    }

    return (
      <div className={styles.priceOptions}>
        {mainPrice !== null && (
          <div className={styles.priceOptions__main}>
            {formatPEN(mainPrice)}{' '}
            <span className={styles.priceOptions__suffix}>desde {mainQty}</span>
          </div>
        )}

        <div className={styles.priceOptions__list}>
          {show25 && (
            <div className={styles.priceOptions__item}>
              <span>25 unidades:</span>
              <span className={styles['priceOptions__item-val']}>
                {formatPEN(precio_25_pen)}
              </span>
            </div>
          )}
          {show50 && (
            <div className={styles.priceOptions__item}>
              <span>50 unidades:</span>
              <span className={styles['priceOptions__item-val']}>
                {formatPEN(precio_50_pen)}
              </span>
            </div>
          )}
          {show100 && (
            <div className={styles.priceOptions__item}>
              <span>100 unidades:</span>
              <span className={styles['priceOptions__item-val']}>
                {formatPEN(precio_100_pen)}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Fallback si no tiene precios cargados
  return <div className={styles.priceOptions__quote}>Consultar precio</div>;
}
