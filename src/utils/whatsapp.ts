// ============================================
// Generador de mensajes de WhatsApp
// ============================================

import { brandConfig } from '@/data/brandConfig';
import type { Producto, Pack } from '@/types/api';

/**
 * Genera URL de WhatsApp con mensaje pre-armado para un producto.
 */
export function whatsappProductUrl(product: Producto, quantity?: number): string {
  let message: string;

  const requiere_cotizacion =
    product.precio_unidad_pen === null &&
    product.precio_25_pen === null &&
    product.precio_50_pen === null &&
    product.precio_100_pen === null;

  if (quantity) {
    message = `Hola, quisiera consultar por ${quantity} unidades de *${product.nombre}*. ¿Me confirman disponibilidad?`;
  } else if (requiere_cotizacion) {
    message = `Hola, quisiera cotizar *${product.nombre}*. ¿Me pueden dar más información sobre precios y disponibilidad?`;
  } else {
    message = `Hola, quisiera consultar por *${product.nombre}*. ¿Me pueden confirmar disponibilidad y precios?`;
  }

  return `${brandConfig.whatsappUrl}?text=${encodeURIComponent(message)}`;
}

/**
 * Genera URL de WhatsApp con mensaje pre-armado para un pack.
 */
export function whatsappPackUrl(pack: Pack): string {
  const message = `Hola, quisiera consultar por el *${pack.nombre}*. Me interesa saber disponibilidad, temática y forma de entrega.`;
  return `${brandConfig.whatsappUrl}?text=${encodeURIComponent(message)}`;
}

/**
 * Genera URL de WhatsApp con mensaje genérico.
 */
export function whatsappGenericUrl(message?: string): string {
  const msg = message || 'Hola, quisiera hacer una consulta sobre sus productos y servicios.';
  return `${brandConfig.whatsappUrl}?text=${encodeURIComponent(msg)}`;
}
