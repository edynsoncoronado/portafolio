# KERULab — landing v2

Segunda versión de la landing de KERULab. Mantiene el contenido y el stack de
la versión original (`../KeruLab`) y cambia por completo el lenguaje visual:
fondo crema, titulares manuscritos, trazos de rotulador, garabatos dibujados a
mano y una paleta morado / turquesa / mango inspirada en la referencia de marca
que se tomó como modelo.

## Stack

- Vite 8 + React 19 + TypeScript
- Tailwind CSS 4 (tema en `src/index.css`)
- framer-motion para las apariciones al hacer scroll
- lucide-react para la iconografía

## Comandos

```bash
npm run dev        # servidor de desarrollo
npm run build      # typecheck + build de producción en dist/
npm run preview    # sirve dist/ localmente
npm run typecheck  # solo comprobación de tipos
```

## Estructura

```
src/
  config/site.ts        Enlaces, datos de contacto y anclas de sección
  content/es.ts         Toda la copia de la página (fuente única)
  components/
    layout/             Navbar, Footer, Logo
    sections/           Una sección por archivo, en el orden de App.tsx
    ui/                 Botón, titular manuscrito, garabatos, Reveal
    visuals/            Mockups ilustrativos (factura, dashboard, asistente)
  lib/                  Utilidades y lógica del formulario
```

## Notas

- **Formulario de contacto**: `src/lib/contactForm.ts` valida en cliente y
  simula el envío. Para conectar un backend basta sustituir el cuerpo de
  `submitContactForm` por la llamada `fetch`; los estados del formulario no
  cambian.
- **Placeholders**: `CALENDAR_URL`, `DEMO_URL`, el correo, el teléfono y las
  redes viven en `src/config/site.ts` marcados con `TODO`. Mientras valgan `#`,
  los botones hacen scroll al formulario de contacto.
- **Mockups**: las visualizaciones de producto son ilustrativas y así se indica
  en la propia página; los datos no corresponden a ninguna empresa real.
- **Accesibilidad**: navegación por teclado con enlace de salto, foco visible,
  `aria-expanded` en menú y FAQ, y respeto a `prefers-reduced-motion`.
