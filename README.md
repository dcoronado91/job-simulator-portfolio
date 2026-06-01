# Portafolio — Derek Coronado

Portafolio personal de Derek Friedhelm Coronado Chilin, desarrollador full-stack con base en Guatemala. Single-page application construida con Next.js 16, Tailwind CSS 4 y Framer Motion. Muestra proyectos reales, decisiones técnicas, stack profesional y datos de contacto — todo en una sola página con scroll.

## Vista previa

| Sección | Descripción |
|---------|-------------|
| **Hero** | Nombre con gradiente animado, subtítulo typewriter, pills de tecnología, botones CTA magnéticos, partículas reactivas al cursor |
| **01 · Sobre mí** | Bio profesional, links de contacto, stats con contador animado |
| **02 · Proyectos** | Grilla de proyectos destacados con cards 3D y spotlight |
| **03 · Tecnologías** | Stack técnico categorizado con niveles y justificación |
| **04 · Contacto** | Email y LinkedIn con botones magnéticos |

## Tecnologías

| Herramienta | Versión | Uso |
|-------------|---------|-----|
| [Next.js](https://nextjs.org) | 16.2.6 | Framework principal, App Router, Turbopack |
| [React](https://react.dev) | 19 | UI con hooks modernos |
| [TypeScript](https://www.typescriptlang.org) | 5 | Tipado estático en todo el proyecto |
| [Tailwind CSS](https://tailwindcss.com) | 4 | Estilos utility-first con tema personalizado |
| [Framer Motion](https://www.framer.com/motion) | 12 | Animaciones, spring physics, scroll-driven |
| [lucide-react](https://lucide.dev) | — | Iconos (ArrowRight, Mail, MapPin, ExternalLink, Menu, X) |
| [Geist](https://vercel.com/font) | — | Tipografía: Geist Sans + Geist Mono |

## Estructura del proyecto

```
src/
├── app/
│   ├── layout.tsx          # Layout raíz: Navbar + Footer + metadata + anti-flash script
│   ├── page.tsx            # Single-page: Hero, Sobre mí, Proyectos, Tecnologías, Contacto
│   ├── globals.css         # Variables de tema, animaciones CSS, grain, grid
│   └── favicon.ico
├── components/
│   ├── Navbar.tsx          # Navbar fija: scroll shadow, detección de sección activa, AnimatePresence
│   ├── ThemeToggle.tsx     # Toggle dark/light con persistencia en localStorage
│   ├── Footer.tsx          # Footer con links sociales
│   ├── ProjectCard.tsx     # Componente de card (referencia, cards ahora están inline)
│   └── icons.tsx           # Iconos SVG de marca: GithubIcon, LinkedinIcon
└── data/
    ├── projects.ts         # Datos de 8 proyectos: título, año, categoría, tech, links
    └── tech.ts             # Stack técnico: 4 categorías, 13 tecnologías con nivel y justificación
```

## Componentes internos de page.tsx

Todos los componentes de animación viven en `page.tsx` como funciones locales:

| Componente | Descripción |
|------------|-------------|
| `ScrollProgress` | Barra de progreso de scroll (degradado verde→cyan→purple, spring physics) |
| `CustomCursor` | Anillo verde que sigue el cursor con lag de spring, se expande en hover/click |
| `ParticleField` | Canvas con 55 partículas flotantes que se repelen al cursor, conectadas por líneas |
| `TypeWriter` | Efecto máquina de escribir con cursor parpadeante, delay configurable |
| `AnimatedCounter` | Contador que cuenta hacia arriba al entrar al viewport (easing cúbico) |
| `SpotlightCard` | Card con tilt 3D (spring) + radial glow que sigue el cursor dentro de la card |
| `MagneticWrap` | Wrapper que hace que sus hijos sigan el cursor magnéticamente |
| `Section` | Wrapper de sección con número de fondo animado (01–04) y orb ambiental opcional |
| `SectionHead` | Encabezado de sección: línea animada + label + título con animación word-by-word |

## Animaciones

### Globales (siempre visibles)
| Animación | Implementación |
|-----------|----------------|
| Barra de progreso de scroll | `useScroll` + `useSpring` + `scaleX` |
| Anillo del cursor | `useMotionValue` + `useSpring`, solo en `pointer: fine` |

### Hero
| Animación | Descripción |
|-----------|-------------|
| Partículas reactivas | Canvas API, 55 puntos, repulsión al cursor a 110px, conexiones a 130px |
| Orbs flotantes | 3 blobs CSS con `@keyframes orb-float-1/2/3`, duración 12–19s |
| Grid animado | `background-position` drifting diagonal, 30s loop |
| Gradiente del nombre | `backgroundPosition` animated, 5s loop, verde→cyan→indigo |
| Typewriter del subtítulo | Escribe "Desarrollador Full-Stack · Guatemala" letra por letra |
| Parallax del contenido | `useTransform(scrollY)` → el hero sube 80px más lento que el scroll |
| Badge "Disponible" | Ping-ring CSS infinito |
| Tech pills | Pop-in escalonado (`scale: 0.75→1`), hover: scale + color verde |
| Botones CTA | Magnéticos (siguen el cursor), shimmer sweep en hover |
| Scroll indicator | Línea vertical con `scaleY` pulsante |

### Secciones
| Animación | Descripción |
|-----------|-------------|
| Números de fondo | "01"–"04" fade + slide desde la derecha al entrar al viewport |
| Orbs ambientales | Orb cyan en Sobre mí, verde en Proyectos y Contacto, purple en Tecnologías |
| Encabezados | Línea verde crece desde 0 + label slide-in + palabras del título con stagger |
| Cards de proyectos | SpotlightCard: tilt 3D al mover el mouse + radial glow que sigue el cursor |
| Stats cards | Hover lift (-4px, scale 1.02) + sombra verde |
| Contadores de stats | Cuenta 0→valor real al entrar al viewport (1.4s, ease-out cúbico) |
| Tech icons | Hover lift (-5px, scale 1.04) + sombra verde |
| Tags "también conozco" | Pop-in escalonado (`scale: 0.8→1`) por tag |
| Línea de contacto | Crece de 0 a 18rem al entrar al viewport |
| Menú móvil | `AnimatePresence`: height 0→auto, items slide-in con stagger |
| fadeUp + stagger | Variante base para todos los elementos al entrar al viewport |

### CSS puro (globals.css)
| Clase / Selector | Efecto |
|-----------------|--------|
| `.grid-bg` | Grid verde de 80px con drift diagonal continuo |
| `.orb` + `.orb-1/2/3` | Blobs radiales con traslaciones flotantes |
| `.ping-ring` | Anillo expandiéndose en el badge de disponibilidad |
| `.btn-shimmer` | Sweep de luz en hover sobre botones primarios |
| `.typewriter-cursor` | Cursor `|` parpadeante verde |
| `body::before` | Textura grain (SVG feTurbulence, opacity 3.5%) |

## Diseño

### Paleta de colores

| Token | Oscuro | Claro | Uso |
|-------|--------|-------|-----|
| `bg` | `#080B14` | `#FFFFFF` | Fondo principal |
| `surface` | `#0D1117` | `#F8FAFC` | Fondos secundarios |
| `card` | `#111827` | `#F1F5F9` | Tarjetas |
| `text` | `#F8FAFC` | `#0F172A` | Texto principal |
| `muted` | `#94A3B8` | `#64748B` | Texto secundario |
| `border` | `#1E293B` | `#E2E8F0` | Bordes y separadores |
| `green` | `#00FF87` | — | Acento principal, links activos |
| `purple` | `#6366F1` | — | Acento secundario |
| `cyan` | `#22D3EE` | — | Tercer acento |

### Temas
El toggle dark/light persiste en `localStorage` bajo la key `"theme"`. El layout inyecta un script inline antes del primer render para evitar el flash de tema incorrecto.

## Datos

### Proyectos (`src/data/projects.ts`)

8 proyectos definidos, 6 marcados como `highlight: true` (visibles en la grilla):

| ID | Título | Categoría | Destacado |
|----|--------|-----------|-----------|
| `uvg-collab` | UVG Collab | Full-Stack | ✓ |
| `nba-tracker` | NBA Tracker | Full-Stack | ✓ |
| `albums-api` | Albums JSON API | Backend | ✓ |
| `gestion-tiendas` | Sistema de Gestión de Tiendas | Full-Stack | ✓ |
| `calculadora-react` | Calculadora React | Frontend | ✓ |
| `snake-react` | Snake | Frontend | ✓ |
| `triptide-uvg` | TripTide UVG | Frontend | — |
| `seasos` | SeaSOS | Full-Stack | — |

Cada proyecto soporta `github` (URL única), `githubLinks` (array de repos separados) y `live` (URL de demo).

### Stack técnico (`src/data/tech.ts`)

4 categorías con 13 tecnologías. Cada ítem tiene `name`, `icon` (slug de Simple Icons CDN), `why`, `level` (`avanzado` | `sólido` | `intermedio`) y `usedIn`.

Los íconos se cargan desde `https://cdn.simpleicons.org/{slug}` — sin dependencia de paquetes de iconos.

## Correr localmente

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo (Turbopack)
npm run dev
# → http://localhost:3000

# Build de producción
npm run build
npm start
```

Requiere Node.js 18+.

## Autor

**Derek Friedhelm Coronado Chilin**

- GitHub: [github.com/dcoronado91](https://github.com/dcoronado91)
- LinkedIn: [linkedin.com/in/derek-friedhelm-coronado-chilin-12bbb3388](https://www.linkedin.com/in/derek-friedhelm-coronado-chilin-12bbb3388/)
- Email: derekcoronado9@gmail.com
- Ubicación: Guatemala
