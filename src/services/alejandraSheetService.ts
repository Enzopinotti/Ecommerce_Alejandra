// ============================================
// Servicio centralizado para consumir el
// Web App de Google Apps Script
// ============================================

import type {
  LandingData,
  ApiResponse,
  Categoria,
  Producto,
  Pack,
  Destacados,
} from '@/types/api';

const API_URL = import.meta.env.VITE_ALEJANDRA_SHEETS_API_URL || '';

// ── Helpers ────────────────────────────────────

async function fetchApi<T>(params: Record<string, string> = {}): Promise<ApiResponse<T>> {
  if (!API_URL) {
    console.warn('[AlejandraAPI] VITE_ALEJANDRA_SHEETS_API_URL no configurada.');
    return {
      ok: false,
      error: 'API URL no configurada. Configurar VITE_ALEJANDRA_SHEETS_API_URL en .env',
      meta: { currency: 'PEN', currency_symbol: 'S/', source: 'not_configured', updated_at: new Date().toISOString() },
    };
  }

  const queryString = new URLSearchParams(params).toString();
  const url = queryString ? `${API_URL}?${queryString}` : API_URL;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    // Google Apps Script puede redirigir — seguir redirects
    const data: ApiResponse<T> = await response.json();
    return data;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error desconocido';
    console.error('[AlejandraAPI] Error fetching data:', message);
    return {
      ok: false,
      error: `No pudimos cargar el catálogo en este momento. ${message}`,
      meta: { currency: 'PEN', currency_symbol: 'S/', source: 'error', updated_at: new Date().toISOString() },
    };
  }
}

// ── Funciones públicas ─────────────────────────

/**
 * Trae TODO lo necesario para la landing en una sola llamada.
 * Esta es la función principal recomendada.
 */
export async function fetchLandingData(): Promise<ApiResponse<LandingData>> {
  return fetchApi<LandingData>({ action: 'landing' });
}

/**
 * Trae solo las categorías activas y visibles.
 */
export async function fetchCategories(): Promise<ApiResponse<Categoria[]>> {
  return fetchApi<Categoria[]>({ action: 'categories' });
}

/**
 * Trae solo los productos activos y visibles.
 */
export async function fetchProducts(): Promise<ApiResponse<Producto[]>> {
  return fetchApi<Producto[]>({ action: 'products' });
}

/**
 * Trae solo los packs activos y visibles.
 */
export async function fetchPacks(): Promise<ApiResponse<Pack[]>> {
  return fetchApi<Pack[]>({ action: 'packs' });
}

/**
 * Trae productos y packs destacados.
 */
export async function fetchFeatured(): Promise<ApiResponse<Destacados>> {
  return fetchApi<Destacados>({ action: 'featured' });
}

/**
 * Busca un producto por slug.
 */
export async function fetchProductBySlug(slug: string): Promise<ApiResponse<Producto>> {
  return fetchApi<Producto>({ action: 'productBySlug', slug });
}

/**
 * Busca un pack por slug.
 */
export async function fetchPackBySlug(slug: string): Promise<ApiResponse<Pack>> {
  return fetchApi<Pack>({ action: 'packBySlug', slug });
}

/**
 * Busca productos de una categoría por slug.
 */
export async function fetchProductsByCategory(slug: string): Promise<ApiResponse<{ categoria: Categoria; productos: Producto[] }>> {
  return fetchApi<{ categoria: Categoria; productos: Producto[] }>({ action: 'productsByCategory', slug });
}

/**
 * Verifica si la API está configurada.
 */
export function isApiConfigured(): boolean {
  return !!API_URL;
}
