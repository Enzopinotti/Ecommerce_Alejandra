// ============================================
// Datos de marca hardcodeados
// No se traen de Google Sheets
// ============================================

export const brandConfig = {
  name: 'Alejandra Cakes & Events',
  slogan: 'Dulces momentos, recuerdos inolvidables',
  location: 'Arequipa / Samacolá',
  whatsapp: '51907618676',
  whatsappDisplay: '+51 907 618 676',
  whatsappUrl: 'https://wa.me/51907618676',
  instagram: '@hannita_cakes26',
  instagramUrl: 'https://instagram.com/hannita_cakes26',
  currency: 'PEN',
  currencySymbol: 'S/',
  email: 'hola@alejandracakes.pe',
  phone: '+51 907 618 676',

  // Condiciones generales
  condiciones: [
    'Pedidos sujetos a disponibilidad de fecha e insumos.',
    'Reserva con 50% de adelanto.',
    'El saldo se cancela antes o al momento de la entrega.',
    'Cambios de temática, cantidades o diseño deben solicitarse con anticipación.',
    'Delivery según zona y disponibilidad.',
    'Las imágenes son referenciales.',
    'Los diseños pueden variar según personalización, insumos y complejidad.',
  ],

  // Medios de pago aceptados
  mediosDePago: ['Efectivo', 'Yape', 'Plin', 'Transferencia', 'Tarjeta', 'Mixto'],

  // Canales de contacto
  canales: ['WhatsApp', 'Instagram', 'DM', 'Local', 'Referido', 'Otro'],
} as const;

export type BrandConfig = typeof brandConfig;
