# Asadero Bar & Grill — Sitio web

Sitio estático (HTML + CSS + JS, sin build ni dependencias) para Asadero
Bar & Grill, Villa Canales, Guatemala.

## Abrir desde Visual Studio Code

No requiere instalación ni extensiones. Abre esta carpeta en VS Code y
presiona `F5` (o ve a **Ejecutar > Iniciar depuración**). La configuración
incluida abre `index.html` en Microsoft Edge con el depurador de JavaScript.

También puedes abrir `index.html` directamente con el navegador. Si prefieres
servirlo por HTTP y tienes Python instalado, desde esta carpeta ejecuta:

```bash
python3 -m http.server 8080
# o
npx serve .
```

Luego abre `http://localhost:8080`.

## Publicar

Es un sitio 100% estático: sube el contenido de esta carpeta a cualquier
hosting estático (Netlify, Vercel, GitHub Pages, cPanel, etc.). No hay
backend ni variables de entorno que configurar.

Antes de publicar:
1. Reemplaza `https://www.ejemplo-asadero.gt/` por el dominio real en
   `index.html` (canonical, Open Graph, JSON-LD `hasMenu`), `robots.txt`
   y `sitemap.xml`.
2. Revisa los dos ítems del menú marcados como "Por confirmar" en
   `data.js` (categorías Entradas y Fuertes) — no se pudieron leer
   con certeza en la fotografía de la pizarra.
3. Aclara el horario: la ficha de Google dice 9:00 a.m.–10:00 p.m. todos
   los días (lo que se publicó), pero una publicación de Facebook del
   negocio menciona "12pm a 9:30pm". Confirma cuál es el vigente y
   actualiza `RESTAURANT.hours` en `data.js` si hace falta.

## Estructura

```
index.html          Página única, HTML semántico + JSON-LD
styles.css          Sistema de diseño (tokens, componentes, responsive)
data.js             Única fuente de datos del restaurante (editar aquí)
main.js             Renderizado desde data.js + interacción (nav, horario)
assets/img/optimized  Imágenes en JPEG y WebP, comprimidas
assets/img/original    Imágenes originales sin comprimir (respaldo)
assets/icons/favicon.png
robots.txt / sitemap.xml
```

Las fotografías actualmente incluidas proceden de publicaciones públicas del
Instagram oficial `@asadero_guatemala`. Se conserva una copia en
`assets/img/original/` y una versión optimizada en JPEG y WebP.

## Actualizar contenido

Todo el contenido variable (teléfono, horario, menú, opiniones y redes
sociales) vive en `data.js`. No hace falta tocar el HTML para:

- Agregar/quitar un platillo del menú completo → editar el arreglo
  `menuCategories`.
- Cambiar el horario → editar el arreglo `hours`.
- Agregar una opinión → editar el arreglo `reviews`.

La carta cuenta con búsqueda por nombre y filtros por categoría. Ambos se
actualizan automáticamente al modificar `menuCategories`.

## Pendientes reales (no resueltos por decisión, no por olvido)

- WhatsApp y correo: no confirmados, no se muestran.
- Precio de "Tacos de Camarón": Google lo destaca como plato, pero no
  aparece con ese nombre exacto en la pizarra fotografiada; no se
  inventó un precio.
- Dos líneas de la pizarra (una entrada ~Q35 y un fuerte de camarones
  ~Q125) no son legibles con certeza; se muestran como "Por confirmar".
- Mapa embebido: se usa un botón "Abrir en Google Maps" en vez de un
  iframe embebido, porque un mapa embebido de calidad requiere una
  clave de API de Google Maps que no fue proporcionada.
- Formulario de reservas: no se implementó porque no hay backend ni
  servicio de reservas real; la acción principal es llamar por
  teléfono, que es el único canal de contacto confirmado además de
  redes sociales.
