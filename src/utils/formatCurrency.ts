// ============================================
// Formatea un valor numérico a moneda PEN
// ============================================

import { brandConfig } from '@/data/brandConfig';

/**
 * Formatea un número a moneda peruana.
 * formatPEN(25)     → "S/ 25.00"
 * formatPEN(3.8)    → "S/ 3.80"
 * formatPEN(null)   → null
 * formatPEN(0)      → "S/ 0.00"
 */
export function formatPEN(value: number | null | undefined): string | null {
  if (value === null || value === undefined) return null;
  if (typeof value !== 'number' || isNaN(value)) return null;

  return `${brandConfig.currencySymbol} ${value.toFixed(2)}`;
}

/**
 * Versión compacta sin decimales para precios enteros.
 * formatPENShort(25) → "S/ 25"
 * formatPENShort(3.8) → "S/ 3.80"
 */
export function formatPENShort(value: number | null | undefined): string | null {
  if (value === null || value === undefined) return null;
  if (typeof value !== 'number' || isNaN(value)) return null;

  if (Number.isInteger(value)) {
    return `${brandConfig.currencySymbol} ${value}`;
  }
  return `${brandConfig.currencySymbol} ${value.toFixed(2)}`;
}
