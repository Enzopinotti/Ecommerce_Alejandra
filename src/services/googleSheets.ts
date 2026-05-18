// ============================================
// Google Sheets API service layer
// Ready for future Google Apps Script integration
// ============================================

const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL || '';

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  categoryType: 'Dulce' | 'Salado';
  price100: number | null;
  price50: number | null;
  price25: number | null;
  priceUnit: number | null;
  image?: string;
}

export interface Category {
  name: string;
  type: 'Dulce' | 'Salado';
  usage: string;
}

export interface Client {
  id: string;
  name: string;
  phone: string;
  email?: string;
  channel: string;
}

export interface Order {
  id: string;
  clientId: string;
  products: { productId: string; quantity: number; price: number }[];
  total: number;
  paymentMethod: string;
  channel: string;
  status: string;
  date: string;
}

// Catalog constants (will be fetched from Google Sheets later)
export const CATEGORIES: Category[] = [
  { name: 'Alfajores', type: 'Dulce', usage: 'Dropdown / dashboard' },
  { name: 'Brochetas', type: 'Salado', usage: 'Dropdown / dashboard' },
  { name: 'Causitas', type: 'Salado', usage: 'Dropdown / dashboard' },
  { name: 'Chocolatería', type: 'Dulce', usage: 'Dropdown / dashboard' },
  { name: 'Cupcakes', type: 'Dulce', usage: 'Dropdown / dashboard' },
  { name: 'Dulces varios', type: 'Dulce', usage: 'Dropdown / dashboard' },
  { name: 'Empanaditas', type: 'Salado', usage: 'Dropdown / dashboard' },
  { name: 'Fritos y carnes', type: 'Salado', usage: 'Dropdown / dashboard' },
  { name: 'Frutas bañadas', type: 'Dulce', usage: 'Dropdown / dashboard' },
  { name: 'Mini postres', type: 'Dulce', usage: 'Dropdown / dashboard' },
  { name: 'Profiteroles dulces', type: 'Dulce', usage: 'Dropdown / dashboard' },
  { name: 'Profiteroles salados', type: 'Salado', usage: 'Dropdown / dashboard' },
  { name: 'Rollitos', type: 'Salado', usage: 'Dropdown / dashboard' },
  { name: 'Sándwiches y triples', type: 'Salado', usage: 'Dropdown / dashboard' },
  { name: 'Tamalitos', type: 'Salado', usage: 'Dropdown / dashboard' },
  { name: 'Tartaletas', type: 'Dulce', usage: 'Dropdown / dashboard' },
  { name: 'Tequeños', type: 'Salado', usage: 'Dropdown / dashboard' },
  { name: 'Voulevant', type: 'Salado', usage: 'Dropdown / dashboard' },
];

export const PAYMENT_METHODS = [
  'Efectivo', 'Yape', 'Plin', 'Transferencia', 'Tarjeta', 'Mixto',
] as const;

export const CHANNELS = [
  'WhatsApp', 'Instagram', 'DM', 'Local', 'Referido', 'Otro',
] as const;

export const ORDER_STATUSES = [
  'Cotizado', 'Reservado', 'Pagado', 'Entregado', 'Cancelado',
] as const;

// API functions (will connect to Google Apps Script)
export async function fetchProducts(): Promise<Product[]> {
  if (!GOOGLE_SCRIPT_URL) {
    console.warn('VITE_GOOGLE_SCRIPT_URL not configured. Using static data.');
    return [];
  }

  const response = await fetch(`${GOOGLE_SCRIPT_URL}?action=getProducts`);
  const data = await response.json();
  return data.products || [];
}

export async function fetchCategories(): Promise<Category[]> {
  if (!GOOGLE_SCRIPT_URL) {
    return CATEGORIES;
  }

  const response = await fetch(`${GOOGLE_SCRIPT_URL}?action=getCategories`);
  const data = await response.json();
  return data.categories || CATEGORIES;
}

export async function fetchClients(): Promise<Client[]> {
  if (!GOOGLE_SCRIPT_URL) {
    return [];
  }

  const response = await fetch(`${GOOGLE_SCRIPT_URL}?action=getClients`);
  const data = await response.json();
  return data.clients || [];
}

export async function submitOrder(order: Omit<Order, 'id'>): Promise<{ success: boolean; orderId?: string }> {
  if (!GOOGLE_SCRIPT_URL) {
    console.warn('VITE_GOOGLE_SCRIPT_URL not configured.');
    return { success: false };
  }

  const response = await fetch(GOOGLE_SCRIPT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'createOrder', ...order }),
  });
  return response.json();
}
