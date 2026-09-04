# KERULab — Landing page

Landing corporativa de KERULab: consultoría de procesos, ERP SaaS sobre Odoo Enterprise,
automatización, software a medida e inteligencia artificial.

SPA en React + TypeScript + Vite + Tailwind CSS v4, bilingüe (ES/EN), con modo claro y
oscuro, animaciones con Framer Motion y mockups de producto construidos en React/SVG
(sin capturas ni fotografías de stock). **No hay backend**: el formulario usa un mock.

## Requisitos

Node.js ≥ 22.12 (Vite 8). Desarrollado con Node 24.

## Comandos

```bash
npm install
npm run dev        # servidor de desarrollo en http://localhost:5173
npm run typecheck  # tsc --noEmit
npm run build      # tsc -b && vite build  →  dist/
npm run preview    # sirve dist/ en http://localhost:4173
```

## Estructura

```
src/
├── config/site.ts      Enlaces, contacto y anclas de sección (punto único de cambio)
├── i18n/               es.ts · en.ts · types.ts · index.tsx (provider)
├── context/            ThemeProvider (claro/oscuro con persistencia)
├── hooks/              useI18n · useTheme · useScrolled · usePrefersReducedMotion · useCountUp
├── data/               Estructura de las secciones: ids, iconos, acentos, datos mock del ERP
├── lib/                cn · motion (variantes) · validation · submitContactForm (mock)
└── components/
    ├── layout/         Navbar · Footer · Logo
    ├── ui/             Button · Card/GlowCard · Badge · Section · SectionHeading · Reveal ·
    │                   Accordion · Counter · GradientText · ThemeToggle · LanguageSwitcher ·
    │                   BookConsultationButton
    ├── visuals/        HeroFlow · AIFlow · ERPDashboardMockup (+ paneles) ·
    │                   AIAssistantMockup · ProjectVisual · GridBackdrop
    └── sections/       Hero · Capabilities · ValueProposition · Services · ERPSection ·
                        AISolutions · Industries · Process · About · Projects · Technology ·
                        FAQ · CTA · Contact
```

## Qué hay que configurar antes de publicar

Todo vive en [`src/config/site.ts`](src/config/site.ts) y está marcado con `TODO`:

| Constante | Uso |
| --- | --- |
| `CALENDAR_URL` | Enlace de agendamiento (Google Calendar, Calendly, Cal.com…). Mientras valga `'#'`, los botones desplazan al formulario de contacto. |
| `DEMO_URL` | Enlace de solicitud de demo del ERP. Mismo comportamiento. |
| `siteConfig.email` / `phone` | Datos de contacto del footer y del formulario. |
| `siteConfig.social` | LinkedIn y X. |

Todos los CTA de agenda y demo pasan por `BookConsultationButton`, así que basta cambiar
esas constantes: no hay que tocar ningún componente.

## Internacionalización

`src/i18n/es.ts` es la fuente de verdad: `type Dictionary = typeof es`. El diccionario
inglés se declara con `satisfies Dictionary`, de modo que **cualquier clave que falte o
sobre en `en.ts` rompe la compilación**. Los archivos de `src/data/` no contienen textos,
solo estructura (ids, iconos, acentos); el copy siempre vive en los diccionarios.

El idioma inicial se resuelve con `localStorage` → `navigator.language` → español. Al
cambiarlo se actualizan `<html lang>`, el `<title>` y la meta description.

## Tema

`ThemeProvider` alterna la clase `dark` en `<html>` y guarda la elección en `localStorage`
(`kerulab-theme`). Un script inline en `index.html` la aplica antes del primer pintado para
evitar el parpadeo. En Tailwind v4 el modo oscuro por clase se habilita con
`@custom-variant dark` en `src/index.css`, donde también se definen los tokens de color:
los componentes usan utilidades semánticas (`bg-bg`, `bg-surface`, `text-muted`,
`border-subtle`…) que cambian de valor con el tema.

## Conectar un backend

Sustituye el cuerpo de [`src/lib/submitContactForm.ts`](src/lib/submitContactForm.ts) por
la llamada real (hay un ejemplo con `fetch` en el propio archivo). La firma y los estados
del formulario (`idle` / `loading` / `success` / `error`) no cambian.

## Contenido

Las cifras de los dashboards, la conversación del asistente y los casos de uso son
**ejemplos ilustrativos** etiquetados como tales en la interfaz. No representan clientes ni
resultados reales; conviene mantener ese criterio al editar los textos.

## Accesibilidad y rendimiento

HTML semántico con un único `<h1>`, skip link, `aria-label` en controles, foco visible,
áreas táctiles ≥ 36 px, tablist del ERP navegable con flechas y acordeón de FAQ operable con
teclado. Se respeta `prefers-reduced-motion` en dos niveles: `MotionConfig reducedMotion="user"`
en Framer Motion y una media query que anula animaciones y el scroll suave. Verificado sin
scroll horizontal entre 320 px y 1440 px, en ambos temas e idiomas.
