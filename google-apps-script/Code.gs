// ============================================
// ALEJANDRA CAKES & EVENTS
// Google Apps Script — API para Landing Page
//
// Instrucciones:
// 1. Abrir Google Sheet → Extensiones → Apps Script
// 2. Copiar/pegar TODO este código en el editor
// 3. Deploy → New deployment → Web app
//    - Execute as: Me
//    - Who has access: Anyone
// 4. Copiar la URL generada y pegarla en .env
//    como VITE_ALEJANDRA_SHEETS_API_URL
//
// IMPORTANTE: Usa getActiveSpreadsheet() — no necesita ID
// ============================================

// ── ENTRY POINT ────────────────────────────────

function doGet(e) {
  try {
    var action = (e && e.parameter && e.parameter.action) || 'landing';
    var slug = (e && e.parameter && e.parameter.slug) || '';

    switch (action) {
      case 'landing':
        return jsonResponse({ ok: true, data: getLandingData() });

      case 'categories':
        return jsonResponse({ ok: true, data: getCategories() });

      case 'products':
        return jsonResponse({ ok: true, data: getProducts() });

      case 'packs':
        return jsonResponse({ ok: true, data: getPacks() });

      case 'featured':
        return jsonResponse({
          ok: true,
          data: {
            productos: getFeaturedProducts(),
            packs: getFeaturedPacks()
          }
        });

      case 'productBySlug':
        var product = getProductBySlug(slug);
        if (!product) {
          return jsonResponse({ ok: false, error: 'Producto no encontrado: ' + slug });
        }
        return jsonResponse({ ok: true, data: product });

      case 'packBySlug':
        var pack = getPackBySlug(slug);
        if (!pack) {
          return jsonResponse({ ok: false, error: 'Pack no encontrado: ' + slug });
        }
        return jsonResponse({ ok: true, data: pack });

      case 'productsByCategory':
        var result = getProductsByCategory(slug);
        if (!result) {
          return jsonResponse({ ok: false, error: 'Categoría no encontrada: ' + slug });
        }
        return jsonResponse({ ok: true, data: result });

      default:
        return jsonResponse({ ok: false, error: 'Acción no reconocida: ' + action });
    }
  } catch (err) {
    return jsonResponse({
      ok: false,
      error: err.message || 'Error interno del servidor'
    });
  }
}

// ── FUNCIONES PRINCIPALES ──────────────────────

/**
 * Devuelve todo lo necesario para renderizar la landing en una sola llamada.
 */
function getLandingData() {
  var categorias = getCategories();
  var productos = getProducts();
  var packs = getPacks();

  // Construir catálogo: categorías con sus productos asociados
  var catalogo = categorias.map(function(cat) {
    var productosCategoria = productos.filter(function(p) {
      return p.categoria_id === cat.categoria_id;
    });
    return {
      categoria_id: cat.categoria_id,
      nombre: cat.nombre,
      slug: cat.slug,
      descripcion: cat.descripcion,
      tipo: cat.tipo,
      orden: cat.orden,
      productos: productosCategoria
    };
  });

  // Agregar packs como categoría si corresponde
  var catPacks = categorias.filter(function(c) {
    return c.tipo === 'pack' || c.slug === 'packs-tematicos' || c.categoria_id === 'cat_packs_tematicos';
  });
  if (catPacks.length > 0 && packs.length > 0) {
    catalogo.forEach(function(item) {
      if (item.tipo === 'pack' || item.slug === 'packs-tematicos' || item.categoria_id === 'cat_packs_tematicos') {
        item.packs = packs;
      }
    });
  }

  return {
    categorias: categorias,
    productos: productos,
    packs: packs,
    destacados: {
      productos: getFeaturedProducts(),
      packs: getFeaturedPacks()
    },
    catalogo: catalogo,
    meta: buildMeta()
  };
}

/**
 * Devuelve categorías activas y visibles, ordenadas.
 */
function getCategories() {
  var rows = getSheetData('Categorias');
  return rows
    .filter(function(r) { return r.activo !== false; })
    .filter(function(r) { return r.visible_landing !== false; })
    .filter(function(r) { return !!r.categoria_id && !!r.slug; })
    .sort(function(a, b) { return (a.orden || 999) - (b.orden || 999); });
}

/**
 * Devuelve productos activos y visibles, ordenados.
 */
function getProducts() {
  var rows = getSheetData('Productos');
  return rows
    .filter(function(r) { return r.activo !== false; })
    .filter(function(r) { return r.visible_landing !== false; })
    .filter(function(r) { return !!r.producto_id && !!r.nombre && !!r.slug && !!r.categoria_id; })
    .sort(function(a, b) { return (a.orden || 999) - (b.orden || 999); });
}

/**
 * Devuelve packs activos y visibles, ordenados.
 * Normaliza items_incluidos a array.
 */
function getPacks() {
  var rows = getSheetData('Packs');
  return rows
    .filter(function(r) { return r.activo !== false; })
    .filter(function(r) { return r.visible_landing !== false; })
    .filter(function(r) { return !!r.pack_id && !!r.slug; })
    .map(function(pack) {
      // Normalizar items_incluidos a array
      if (pack.items_incluidos && typeof pack.items_incluidos === 'string') {
        pack.items_incluidos = parseItemsIncluidos(pack.items_incluidos);
      } else if (!pack.items_incluidos) {
        pack.items_incluidos = [];
      }
      return pack;
    })
    .sort(function(a, b) { return (a.orden || 999) - (b.orden || 999); });
}

/**
 * Productos destacados.
 */
function getFeaturedProducts() {
  return getProducts().filter(function(p) { return p.destacado === true; });
}

/**
 * Packs destacados.
 */
function getFeaturedPacks() {
  return getPacks().filter(function(p) { return p.destacado === true; });
}

/**
 * Busca un producto por slug.
 */
function getProductBySlug(slug) {
  if (!slug) return null;
  var products = getProducts();
  for (var i = 0; i < products.length; i++) {
    if (products[i].slug === slug) return products[i];
  }
  return null;
}

/**
 * Busca un pack por slug.
 */
function getPackBySlug(slug) {
  if (!slug) return null;
  var packs = getPacks();
  for (var i = 0; i < packs.length; i++) {
    if (packs[i].slug === slug) return packs[i];
  }
  return null;
}

/**
 * Busca una categoría por slug y devuelve la categoría con sus productos.
 */
function getProductsByCategory(slug) {
  if (!slug) return null;
  var categorias = getCategories();
  var cat = null;
  for (var i = 0; i < categorias.length; i++) {
    if (categorias[i].slug === slug) {
      cat = categorias[i];
      break;
    }
  }
  if (!cat) return null;

  var productos = getProducts().filter(function(p) {
    return p.categoria_id === cat.categoria_id;
  });

  return {
    categoria: cat,
    productos: productos
  };
}

// ── LECTURA GENÉRICA DE HOJAS ──────────────────

/**
 * Lee una hoja completa usando encabezados como claves.
 * Normaliza cada valor. Ignora filas vacías.
 * No rompe si la hoja no existe (devuelve []).
 */
function getSheetData(sheetName) {
  var ss = SpreadsheetApp.openById("1TN6vb05w29CqSaEAwDvs2eHTRM0E4UYP");
  var sheet = ss.getSheetByName(sheetName);

  if (!sheet) {
    Logger.log('Hoja no encontrada: ' + sheetName);
    return [];
  }

  var data = sheet.getDataRange().getValues();
  if (data.length < 2) return []; // Solo headers o vacío

  var headers = data[0].map(function(h) {
    return String(h).trim().toLowerCase().replace(/\s+/g, '_');
  });

  var rows = [];
  for (var i = 1; i < data.length; i++) {
    var row = data[i];

    // Ignorar filas completamente vacías
    var allEmpty = row.every(function(cell) {
      return cell === '' || cell === null || cell === undefined;
    });
    if (allEmpty) continue;

    var obj = {};
    for (var j = 0; j < headers.length; j++) {
      if (headers[j]) {
        obj[headers[j]] = normalizeValue(row[j], headers[j]);
      }
    }
    rows.push(obj);
  }

  return rows;
}

// ── NORMALIZACIÓN ──────────────────────────────

/**
 * Normaliza un valor según su tipo y nombre de columna.
 */
function normalizeValue(value, headerName) {
  // Null / undefined / empty
  if (value === null || value === undefined || value === '') {
    return null;
  }

  // Booleanos nativos de Sheets
  if (typeof value === 'boolean') {
    return value;
  }

  // Números nativos de Sheets
  if (typeof value === 'number') {
    return value;
  }

  // Dates de Sheets
  if (value instanceof Date) {
    return value.toISOString();
  }

  // String processing
  if (typeof value === 'string') {
    var trimmed = value.trim();

    // Booleanos como texto
    var upper = trimmed.toUpperCase();
    if (upper === 'TRUE' || upper === 'VERDADERO' || upper === 'SI' || upper === 'SÍ') {
      return true;
    }
    if (upper === 'FALSE' || upper === 'FALSO' || upper === 'NO') {
      return false;
    }

    // Columnas que deberían ser numéricas
    var numericColumns = [
      'precio_unidad_pen', 'precio_25_pen', 'precio_50_pen', 'precio_100_pen',
      'precio_desde_50_pen', 'precio_buttercream_pen', 'precio_chantilly_pen',
      'orden', 'pisos', 'porciones', 'cantidad', 'total_pen',
      'costo_estimado_pen', 'costo_real_pen', 'mano_obra_pen', 'packaging_pen',
      'margen_objetivo_pct', 'ganancia_estimada_pen'
    ];

    if (numericColumns.indexOf(headerName) !== -1) {
      // Limpiar formato de moneda: "S/.220.0" -> "220.0"
      var cleaned = trimmed.replace(/^S\/\.?\s*/i, '').replace(/,/g, '');
      var num = parseFloat(cleaned);
      if (!isNaN(num)) {
        return num;
      }
      return null;
    }

    return trimmed;
  }

  return value;
}

// ── PARSING DE items_incluidos ─────────────────

/**
 * Transforma un string de ítems a un array limpio.
 * Soporta: saltos de línea, punto y coma, bullets.
 */
function parseItemsIncluidos(text) {
  if (!text || typeof text !== 'string') return [];

  // Intentar split por saltos de línea primero
  var lines = text.split(/[\n\r]+/);
  if (lines.length > 1) {
    return lines
      .map(function(l) { return l.replace(/^[\s•\-\*·]+/, '').trim(); })
      .filter(function(l) { return l.length > 0; });
  }

  // Split por pipe | (usado en tu base de datos)
  if (text.indexOf('|') !== -1) {
    return text.split('|')
      .map(function(l) { return l.replace(/^[\s•\-\*·]+/, '').trim(); })
      .filter(function(l) { return l.length > 0; });
  }

  // Luego por punto y coma
  if (text.indexOf(';') !== -1) {
    return text.split(';')
      .map(function(l) { return l.trim(); })
      .filter(function(l) { return l.length > 0; });
  }

  // Luego por bullets/guiones al inicio
  if (/^[\s]*[•\-\*·]/.test(text)) {
    return text.split(/[•\-\*·]/)
      .map(function(l) { return l.trim(); })
      .filter(function(l) { return l.length > 0; });
  }

  // Si es una sola línea, devolver como array de un elemento
  var trimmed = text.trim();
  return trimmed ? [trimmed] : [];
}

// ── UTILIDADES ─────────────────────────────────

/**
 * Construye metadata de la respuesta.
 */
function buildMeta() {
  return {
    currency: 'PEN',
    currency_symbol: 'S/',
    source: 'google_sheets',
    updated_at: new Date().toISOString()
  };
}

/**
 * Devuelve respuesta JSON con headers CORS.
 */
function jsonResponse(data) {
  // Agregar meta si no existe
  if (!data.meta) {
    data.meta = buildMeta();
  }

  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

// ── PROTECCIÓN DE ENCABEZADOS ──────────────────

/**
 * Protege la fila 1 (encabezados) de las hojas principales.
 * Ejecutar manualmente desde el editor de Apps Script.
 * Menú: Ejecutar → protectHeaders
 */
function protectHeaders() {
  var ss = SpreadsheetApp.openById("1TN6vb05w29CqSaEAwDvs2eHTRM0E4UYP");
  var sheetNames = ['Categorias', 'Productos', 'Packs', 'Ventas', 'Costos'];
  var owner = Session.getEffectiveUser();

  sheetNames.forEach(function(name) {
    var sheet = ss.getSheetByName(name);
    if (!sheet) {
      Logger.log('Hoja no encontrada, saltando: ' + name);
      return;
    }

    // Congelar fila 1
    sheet.setFrozenRows(1);

    // Proteger fila 1
    var lastCol = sheet.getLastColumn();
    if (lastCol < 1) lastCol = 26; // Default a Z si está vacía
    var range = sheet.getRange(1, 1, 1, lastCol);

    // Verificar si ya existe una protección similar
    var protections = sheet.getProtections(SpreadsheetApp.ProtectionType.RANGE);
    var alreadyProtected = protections.some(function(p) {
      return p.getDescription() === 'Encabezados protegidos - no editar';
    });

    if (!alreadyProtected) {
      var protection = range.protect();
      protection.setDescription('Encabezados protegidos - no editar');
      protection.addEditor(owner);

      // Remover otros editores si hay
      var editors = protection.getEditors();
      editors.forEach(function(editor) {
        if (editor.getEmail() !== owner.getEmail()) {
          protection.removeEditor(editor);
        }
      });

      Logger.log('Headers protegidos en: ' + name);
    } else {
      Logger.log('Headers ya protegidos en: ' + name);
    }
  });

  Logger.log('Protección de encabezados completada.');
}
