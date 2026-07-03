# Genov Repostería — Sitio web

Sitio de una página para **Genov Repostería** (Culiacán y Navolato). Objetivo: convertir visitas en conversaciones de WhatsApp para cotizar pasteles personalizados.

**Stack:** HTML + CSS + JavaScript vanilla. Sin frameworks, sin build, sin dependencias. Se despliega en cualquier hosting estático.

## Estructura

```
├── index.html          Página completa (hero, galería, proceso, opiniones, cotizador, FAQ)
├── css/styles.css      Estilos con design tokens de la marca
├── js/main.js          Navegación, animaciones, botón flotante
├── js/gallery.js       Galería: datos de pasteles, filtros y lightbox
├── js/quote.js         Cotizador de 3 pasos → genera mensaje de WhatsApp
├── assets/img/         Fotos optimizadas en WebP (versión completa + -th miniatura)
├── robots.txt / sitemap.xml
└── favicon.png
```

## Publicar en GitHub Pages

1. Crea un repositorio (ej. `genov-web`) y sube todos los archivos.
2. En **Settings → Pages**, elige la rama `main` y carpeta `/ (root)`.
3. Tu sitio quedará en `https://TU-USUARIO.github.io/genov-web/`.
4. Con dominio propio: agrega un archivo `CNAME` con el dominio y configura el DNS.

> Si usas dominio propio, reemplaza `https://genovreposteria.com/` en `index.html` (canonical, Open Graph, Schema) y en `sitemap.xml` por tu URL real.

## Cosas por completar (marcadas con ⚠️ en el código)

1. **Reseñas reales** — En la sección "Opiniones" hay 3 testimonios de ejemplo. Reemplázalos con reseñas reales de Google Maps (texto, nombre y ciudad) en `index.html`. El botón "Ver todas las reseñas en Google" apunta a una búsqueda; cámbialo por el enlace directo a la ficha de Google Business cuando la tengan.
2. **Horario** — Ajusta el horario real en el footer.
3. **Anticipo y tiempos** — Revisa las respuestas del FAQ (anticipación recomendada, política de anticipo) y ajústalas a su operación real.

## Cómo agregar pasteles a la galería

1. Guarda dos versiones de la foto en `assets/img/`: `nombre.webp` (máx. 1100px de ancho) y `nombre-th.webp` (640px).
2. Agrega una línea en `CAKES` dentro de `js/gallery.js`:

```js
{ img: "nombre", cat: ["bodas"], title: "Título corto de la historia" },
```

Categorías disponibles: `bodas`, `xv`, `infantiles`, `3d`, `elegantes` (puedes combinar varias).

## Cambiar el número de WhatsApp

El número está en tres archivos: `js/main.js`, `js/gallery.js` y `js/quote.js` (constante `WA_NUMBER`, formato `52` + 10 dígitos).

## Nota sobre reseñas de Google (API)

La versión actual usa reseñas curadas + enlace a Google Maps, por decisión de costo/beneficio: la API de Google Places requiere backend, cuenta de facturación en Google Cloud y solo devuelve 5 reseñas. Si más adelante quieren automatizarlo, el componente `.reviews__grid` está listo para poblarse desde un fetch a una función serverless.
# genov
