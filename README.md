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

Antes de publicar, aclara el horario: la ficha de Google dice
9:00 a.m.–10:00 p.m. todos
   los días (lo que se publicó), pero una publicación de Facebook del
   negocio menciona "12pm a 9:30pm". Confirma cuál es el vigente y
   actualiza `RESTAURANT.hours` en `data.js` si hace falta.

## Estructura

```
index.html          Página única, HTML semántico + JSON-LD
styles.css          Sistema de diseño (tokens, componentes, responsive)
data.js             Única fuente de datos del restaurante (editar aquí)
main.js             Renderizado, carta interactiva, horario y navegación
assets/img/restaurant Fotografías limpias usadas en la página
assets/img/social     Imagen de vista previa al compartir el enlace
assets/img/original   Artes anteriores conservados como respaldo, no visibles
assets/icons/favicon.png
```

Las fotografías visibles proceden de la ficha pública de Asadero Bar & Grill
en Google Maps. Se seleccionaron únicamente imágenes reales de comida y del
ambiente, sin precios, textos ni carteles promocionales. Los antiguos artes de
Instagram permanecen como respaldo, pero el sitio ya no los carga.

## Actualizar contenido

Todo el contenido variable (teléfono, horario, menú, opiniones y redes
sociales) vive en `data.js`. No hace falta tocar el HTML para:

- Agregar/quitar un platillo del menú completo → editar el arreglo
  `menuCategories`.
- Cambiar las imágenes y textos destacados → editar `featuredImages` y
  `visualStory`.
- Cambiar el horario → editar el arreglo `hours`.
- Agregar una opinión → editar el arreglo `reviews`.

La carta cuenta con búsqueda por nombre y filtros por categoría. Ambos se
actualizan automáticamente al modificar `menuCategories`.

## Pendientes reales (no resueltos por decisión, no por olvido)

- WhatsApp y correo: no confirmados, no se muestran.
- Precio de "Tacos de Camarón": Google lo destaca como plato, pero no
  aparece con ese nombre exacto en la pizarra fotografiada; no se
  inventó un precio.
- Mapa embebido: se usa un botón "Abrir en Google Maps" en vez de un
  iframe embebido, porque un mapa embebido de calidad requiere una
  clave de API de Google Maps que no fue proporcionada.
- Formulario de disponibilidad: no se implementó porque no hay backend ni
  servicio de agenda real; la acción principal es llamar por
  teléfono, que es el único canal de contacto confirmado además de
  redes sociales.
