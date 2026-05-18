# 🍰 Alejandra · Cakes & Events
### Boutique Digital de Alta Repostería & Servicio de Catering de Autor

[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react&logoColor=black&style=flat-square)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white&style=flat-square)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite&logoColor=white&style=flat-square)](https://vitejs.dev/)
[![Sass](https://img.shields.io/badge/Sass-SCSS_Modules-CC6699?logo=sass&logoColor=white&style=flat-square)](https://sass-lang.com/)
[![GSAP](https://img.shields.io/badge/GSAP-3.12-88CE02?logo=greensock&logoColor=white&style=flat-square)](https://gsap.com/)

Bienvenido al repositorio oficial de **Alejandra · Cakes & Events**, una boutique digital ultra-premium diseñada para exhibir creaciones artesanales dulces y saladas con un nivel estético y de experiencia de usuario excepcional. 

Este proyecto migra un menú estático a una plataforma viva, dinámica y altamente visual, logrando un equilibrio perfecto entre diseño editorial de alta gama e interactividad fluida.

---

## ✨ Características Principales

### 👑 1. Diseño Editorial & Estética Ultra-Premium
* **Paleta de Colores Exclusiva**: Combinación armónica de tonos orgánicos (terracota suave, lino cálido, champán dorado y un elegante ciruela/bordó profundo de lujo en el Hero).
* **Tipografía Sofisticada**: Uso refinado de fuentes serif editoriales de Google Fonts (*Cinzel* / *Playfair Display*) integradas con *Montserrat* para lecturas fluidas.
* **Brillo de Satén Líquido**: Títulos de autor animados mediante CSS dinámico con degradados metálicos que simulan el reflejo de la seda bajo la luz.

### 🧁 2. Constelación de Pastelería Glassmorphic (GSAP)
* **Vectores de Autor**: Renderización en tiempo real de iconos vectoriales de repostería (tortas, cupcakes, macarons, rebanadas, empanadas) flotando orgánicamente en el fondo.
* **Efectos de Parallax con el Mouse**: Las figuras reaccionan suave y orgánicamente a la posición física del puntero en pantalla.
* **Parallax por Scroll & Loops de Deriva**: Bucle infinito síncrono de movimiento en ondas flotantes para simular ingravidez, junto a un desfase físico al desplazar la página.
* **Carga Cinematográfica**: Los elementos interactivos flotan e inician su animación desde el primer milisegundo en la pantalla de carga, asegurando una experiencia visual impecable.

### 🖼️ 3. Galería de Imágenes Horizontal & Navegación Segura
* **Scroll Horizontal Infinito**: Una galería fotográfica de gran formato con un scroll horizontal en pantalla completa accionado mediante GSAP ScrollTrigger.
* **Arquitectura de Navegación Robusta**: Desarrollado con ciclos de vida reactivos síncronos (`useLayoutEffect`), asegurando la desinstalación física instantánea de los elementos de arrastre (*pin-spacers*) para evitar errores residuales del DOM al cambiar de ruta.

### 📊 4. Catálogo Dinámico Serverless (Google Sheets API)
* **Inventario en Tiempo Real**: Consumo directo de una hoja de cálculo de Google Sheets como base de datos de alta velocidad libre de mantenimiento de backend.
* **Filtros Estructurados Limpios**: Pestañas de filtrado principal sin emojis (*Todo*, *Dulces*, *Salados*, *Packs*) seguidas de botones dinámicos para subcategorías secundarias de producto.
* **Paginación Inteligente**: Distribución premium a 6 productos por página con scroll suave automatizado hacia el inicio del catálogo al cambiar de página.

---

## 🛠️ Stack Tecnológico

El proyecto está construido bajo los más altos estándares de desarrollo moderno en frontend:

* **Núcleo**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) (Tipado estricto para componentes y respuestas de API).
* **Herramienta de Construcción**: [Vite](https://vitejs.dev/) (Compilación ultrarrápida y recarga en caliente HMR).
* **Estilos**: [SASS (SCSS Modules)](https://sass-lang.com/) para estilos aislados, limpios e integrados con variables y mixins responsivos.
* **Animaciones**: [GSAP 3](https://gsap.com/) (GreenSock) + [ScrollTrigger](https://gsap.com/scrolltrigger/) + [Framer Motion](https://www.framer.com/motion/) para transiciones de rejilla.
* **Iconografía**: [Lucide React](https://lucide.dev/) para iconos vectoriales limpios y de alto contraste.

---

## 🚀 Instalación y Configuración Local

Sigue los siguientes pasos para ejecutar el proyecto en tu entorno local:

### 1. Clonar el repositorio
```bash
git clone https://github.com/Enzopinotti/Ecommerce_Alejandra.git
cd Ecommerce_Alejandra
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
Crea un archivo `.env` en la raíz del proyecto (puedes tomar como referencia el archivo [`.env.example`](file:///Users/enzopinotti/Desktop/ProSkills/Alejandra's%20Cakes/.env.example)):

```env
# URL de la API o Google Sheets Web App de Alejandra's Cakes
VITE_API_URL=https://script.google.com/macros/s/TU_SCRIPT_ID/exec
```

### 4. Iniciar el servidor de desarrollo
```bash
npm run dev
```
La aplicación estará disponible de forma predeterminada en `http://localhost:5174/` (o el puerto configurado por Vite).

---

## 📦 Estructura del Proyecto

```text
├── src/
│   ├── components/       # Componentes visuales organizados por secciones
│   │   ├── About/        # Sección historia de autor
│   │   ├── Categories/   # Catálogo y carta interactiva de productos
│   │   ├── Contact/      # Formulario de contacto premium con corazón dorado
│   │   ├── Hero/         # Portada editorial con satén metálico y vectores
│   │   ├── Navbar/       # Barra de navegación inteligente con accesos a catálogo
│   │   ├── Footer/       # Pie de página editorial con créditos
│   │   └── ui/           # Componentes UI atómicos (Cards, Vectores, Loaders)
│   ├── hooks/            # Hooks personalizados para data fetching (Google Sheets)
│   ├── lib/              # Utilidades compartidas y clientes de conexión
│   ├── styles/           # Configuración global de SASS (Variables, Mixins)
│   ├── types/            # Definiciones de tipos TypeScript para API y Datos
│   ├── App.tsx           # Enrutador principal y layout global
│   └── main.tsx          # Punto de entrada de la aplicación React
├── google-apps-script/   # Backend serverless para Google Sheets & Drive
└── index.html            # Plantilla HTML base y configuración SEO
```

---

## 🎖️ Créditos & Desarrollo

* **Diseño e Implementación**: Desarrollado con amor, dedicación y pasión por la excelencia por **[Enzo Pinotti](https://enzopinotti.dev)**.
* **Propietaria & Creación**: **Alejandra · Cakes & Events** (Todos los derechos de autor reservados sobre recetas, marca y nombres de fantasía, 2026).
