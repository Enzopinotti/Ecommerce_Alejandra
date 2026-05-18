// ============================================
// Parsea items_incluidos de string a array
// ============================================

/**
 * Transforma un string de ítems incluidos en un array limpio.
 * Soporta saltos de línea, punto y coma, bullets, y guiones.
 * 
 * "1 torta\n6 paletas\n6 galletas" → ["1 torta", "6 paletas", "6 galletas"]
 * "• 1 torta; 6 paletas" → ["1 torta", "6 paletas"]
 */
export function parseItemsIncluidos(items: string | string[] | null | undefined): string[] {
  if (!items) return [];

  // Si ya es array, limpiar
  if (Array.isArray(items)) {
    return items
      .map((item) => String(item).replace(/^[\s•\-*·]+/, '').trim())
      .filter((item) => item.length > 0);
  }

  if (typeof items !== 'string') return [];

  const text = items.trim();
  if (!text) return [];

  // Intentar split por saltos de línea primero
  const lines = text.split(/[\n\r]+/);
  if (lines.length > 1) {
    return lines
      .map((l) => l.replace(/^[\s•\-*·]+/, '').trim())
      .filter((l) => l.length > 0);
  }

  // Split por pipe | (usado en Alejandra_Cakes_Simple_DB_READY)
  if (text.includes('|')) {
    return text
      .split('|')
      .map((l) => l.replace(/^[\s•\-*·]+/, '').trim())
      .filter((l) => l.length > 0);
  }

  // Luego por punto y coma
  if (text.includes(';')) {
    return text
      .split(';')
      .map((l) => l.trim())
      .filter((l) => l.length > 0);
  }

  // Luego por bullets/guiones
  if (/^[\s]*[•\-*·]/.test(text)) {
    return text
      .split(/[•\-*·]/)
      .map((l) => l.trim())
      .filter((l) => l.length > 0);
  }

  // Una sola línea
  return text ? [text] : [];
}
