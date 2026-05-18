// ============================================
// Tipos TypeScript para la API de Google Sheets
// Coinciden con la estructura del Apps Script
// ============================================

// ── Categoría ─────────────────────────────────
export interface Categoria {
  categoria_id: string;
  nombre: string;
  slug: string;
  descripcion: string | null;
  tipo: string;
  orden: number;
  visible_landing: boolean;
  activo: boolean;
}

// ── Producto ──────────────────────────────────
export interface Producto {
  producto_id: string;
  categoria_id: string;
  nombre: string;
  slug: string;
  descripcion: string | null;
  tipo: string | null;
  unidad_base: 'unidad' | 'cantidad' | string | null;
  precio_unidad_pen: number | null;
  precio_25_pen: number | null;
  precio_50_pen: number | null;
  precio_100_pen: number | null;
  precio_desde_50_pen: number | null;
  disponible_25: boolean | null;
  disponible_50: boolean | null;
  disponible_100: boolean | null;
  destacado: boolean;
  imagen_url: string | null;
  orden: number;
  activo: boolean;
  visible_landing: boolean;
  notas: string | null;
}

// ── Pack ──────────────────────────────────────
export interface Pack {
  pack_id: string;
  categoria_id: string | null;
  nombre: string;
  slug: string;
  descripcion: string | null;
  porciones: string | null;
  pisos: number | null;
  precio_buttercream_pen: number | null;
  precio_chantilly_pen: number | null;
  items_incluidos: string[];
  destacado: boolean;
  imagen_url: string | null;
  orden: number;
  activo: boolean;
  visible_landing: boolean;
  notas: string | null;
}

// ── Catálogo (categoría + productos) ──────────
export interface CatalogoItem {
  categoria_id: string;
  nombre: string;
  slug: string;
  descripcion: string | null;
  tipo: string;
  orden: number;
  productos: Producto[];
  packs?: Pack[];
}

// ── Destacados ────────────────────────────────
export interface Destacados {
  productos: Producto[];
  packs: Pack[];
}

// ── Meta ──────────────────────────────────────
export interface ApiMeta {
  currency: string;
  currency_symbol: string;
  source: string;
  updated_at: string;
}

// ── Respuesta principal de la API ─────────────
export interface LandingData {
  categorias: Categoria[];
  productos: Producto[];
  packs: Pack[];
  destacados: Destacados;
  catalogo: CatalogoItem[];
  meta: ApiMeta;
}

// ── Respuesta genérica del API ────────────────
export interface ApiResponse<T = unknown> {
  ok: boolean;
  data?: T;
  error?: string;
  meta: ApiMeta;
}

// ── Estado del hook de datos ──────────────────
export interface DataState {
  loading: boolean;
  error: string | null;
  data: LandingData | null;
}
