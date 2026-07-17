/**
 * data.js
 * Fuente única de datos del restaurante.
 *
 * Procedencia de los datos:
 *  - Identidad, teléfono, dirección, horario y opiniones: capturas de la
 *    ficha de Google Maps proporcionadas por el negocio.
 *  - Menú y precios: fotografía de la pizarra física del restaurante,
 *    proporcionada por el negocio, contrastada con su Instagram
 *    (@asadero_guatemala) y su página de Facebook oficial (mismo teléfono).
 *  - Fotografías de platillos: proporcionadas por el negocio.
 *
 * Dos líneas de la pizarra (una entrada y un fuerte de camarones) no son
 * legibles con certeza y se marcan con needsReview: true en vez de
 * inventar su nombre. Revísalas y complétalas aquí cuando tengas el dato.
 *
 * Para actualizar el sitio (nuevo horario, nuevo plato, nueva opinión),
 * edita únicamente este archivo.
 */

const RESTAURANT = {
  name: "Asadero Bar & Grill",
  category: "Restaurante · Bar & Grill",
  priceRange: "Q 100–300 por persona",
  priceRangeSchema: "Q100-Q300",

  contact: {
    phoneDisplay: "3811 4132",
    phoneIntl: "+502 3811 4132",
    phoneHref: "tel:+50238114132",
    whatsapp: null,
    email: null,
    social: [
      {
        label: "Instagram",
        handle: "@asadero_guatemala",
        url: "https://www.instagram.com/asadero_guatemala",
      },
      {
        label: "Facebook",
        handle: "Asadero Bar & Grill Villa Canales",
        url: "https://www.facebook.com/p/Asadero-Bar-Grill-Villa-Canales-100061079814293/",
      },
    ],
  },

  location: {
    addressLine: "3ra. Avenida 12-08, Villa Canales, Guatemala",
    street: "3ra. Avenida 12-08",
    locality: "Villa Canales",
    region: "Guatemala",
    country: "GT",
    plusCode: "FFG8+R2 Villa Canales",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Asadero+Bar+%26+Grill%2C+3ra.+Avenida+12-08%2C+Villa+Canales%2C+Guatemala",
    wazeUrl:
      "https://waze.com/ul?q=Asadero%20Bar%20%26%20Grill%2C%203ra.%20Avenida%2012-08%2C%20Villa%20Canales&navigate=yes",
  },

  rating: {
    value: 4.7,
    count: 101,
    source: "Google",
    url: "https://www.google.com/maps/search/?api=1&query=Asadero+Bar+%26+Grill+Villa+Canales",
  },

  services: [
    { label: "Consumo en el lugar", available: true },
    { label: "Para llevar", available: true },
    { label: "Entrega a domicilio", available: true },
    { label: "Reservas", available: null, note: "Solo por llamada telefónica" },
  ],

  // Horario confirmado directamente por el negocio (ficha de Google).
  // Nota: una publicación de Facebook del negocio (13 de febrero) anuncia
  // "Los esperamos 12pm a 9:30pm", lo que no coincide con este horario.
  // Se mantiene el horario confirmado por el negocio; conviene aclarar
  // cuál es el vigente antes de publicar.
  hours: [
    { day: "Lunes", jsIndex: 1, open: "09:00", close: "22:00", label: "9:00 a.m. – 10:00 p.m." },
    { day: "Martes", jsIndex: 2, open: "09:00", close: "22:00", label: "9:00 a.m. – 10:00 p.m." },
    { day: "Miércoles", jsIndex: 3, open: "09:00", close: "22:00", label: "9:00 a.m. – 10:00 p.m." },
    { day: "Jueves", jsIndex: 4, open: "09:00", close: "22:00", label: "9:00 a.m. – 10:00 p.m." },
    { day: "Viernes", jsIndex: 5, open: "09:00", close: "22:00", label: "9:00 a.m. – 10:00 p.m." },
    { day: "Sábado", jsIndex: 6, open: "09:00", close: "22:00", label: "9:00 a.m. – 10:00 p.m." },
    { day: "Domingo", jsIndex: 0, open: "09:00", close: "22:00", label: "9:00 a.m. – 10:00 p.m." },
  ],
  timeZone: "America/Guatemala",

  // Fotografías tomadas de publicaciones públicas del Instagram oficial.
  // Los precios mostrados en esas publicaciones eran promociones puntuales,
  // por eso se pide confirmar disponibilidad y precio con el restaurante.
  menuHighlights: [
    {
      id: "costilla-ahumada",
      name: "Costilla Ahumada",
      category: "Especialidad a la brasa",
      price: null,
      priceNote: "Consulta disponibilidad y precio",
      description:
        "Costilla ahumada presentada con distintas salsas de la casa, fotografiada para el Instagram oficial del restaurante.",
      image: "costilla-ahumada",
      alt: "Costilla ahumada de Asadero Bar & Grill en publicación de su Instagram oficial",
      tags: ["Costilla", "Ahumada"],
      sourcePost: "https://www.instagram.com/asadero_guatemala/p/DY7ixqOGrPi/",
    },
    {
      id: "tacos",
      name: "Tacos de la Casa",
      category: "Martes de tacos",
      price: null,
      priceNote: "Consulta especialidades y precio",
      description:
        "Tacos preparados con especialidades como camarón, costilla, pulpo y champiñón, según disponibilidad.",
      image: "tacos",
      alt: "Taco de camarón de Asadero Bar & Grill publicado en su Instagram oficial",
      tags: ["Tacos", "Especialidades"],
      sourcePost: "https://www.instagram.com/asadero_guatemala/p/DZX2BKACYlN/",
    },
    {
      id: "ramen",
      name: "Ramen Asadero",
      category: "Especial de temporada",
      price: null,
      priceNote: "Consulta disponibilidad y precio",
      description:
        "Ramen servido con opciones de cerdo, camarón, res o vegetales, anunciado como especial de mitad de semana.",
      image: "ramen",
      alt: "Ramen con cerdo, huevo, hongos y vegetales publicado por Asadero Bar & Grill",
      tags: ["Ramen", "Temporada"],
      sourcePost: "https://www.instagram.com/asadero_guatemala/p/DZaSm0rjUN0/",
    },
  ],

  // Menú completo transcrito de la pizarra física del restaurante.
  // Los ítems con needsReview no se muestran con nombre inventado: se
  // listan como "Por confirmar" hasta que el negocio los revise.
  menuCategories: [
    {
      name: "Entradas",
      items: [
        { name: "Aguachile", price: "Q 95" },
        { name: "Berenjena confitada", price: "Q 65" },
        { name: "Bolitas de morcilla", price: "Q 35" },
        { name: "Camarones a la Picona", price: "Q 88" },
        { name: "Por confirmar", price: "Q 35", needsReview: true },
      ],
    },
    {
      name: "Fondue",
      items: [
        { name: "De lomito", price: "Q 80" },
        { name: "De camarones", price: "Q 135" },
        { name: "Mar y tierra", price: "Q 135" },
      ],
    },
    {
      name: "Pizzas al horno de leña",
      items: [
        { name: "Camarones", price: "Q 125" },
        { name: "Costilla", price: "Q 95" },
        { name: "Lomito", price: "Q 105" },
        { name: "Morcilla", price: "Q 95" },
        { name: "Italiana", price: "Q 95" },
        { name: "Mar y tierra", price: "Q 150" },
        { name: "Margarita", price: "Q 95" },
        { name: "Mixta", price: "Q 150" },
        { name: "Napolitana", price: "Q 95" },
        { name: "Champiñones", price: "Q 95" },
      ],
    },
    {
      name: "Panini",
      items: [
        { name: "Lomito", price: "Q 90" },
        { name: "Cerdo", price: "Q 50" },
        { name: "Cerdo y queso", price: "Q 65" },
        { name: "Lomito y queso", price: "Q 80" },
      ],
    },
    {
      name: "Fuertes",
      items: [
        { name: "Brocheta", price: "Q 75" },
        { name: "Camarones con dos tostadas", price: "Q 125" },
        { name: "Por confirmar", price: "Q 125", needsReview: true },
      ],
    },
    {
      name: "Costilla",
      items: [
        { name: "Asada", price: "Q 105" },
        { name: "BBQ", price: "Q 75" },
        { name: "Chimichurri", price: "Q 75" },
        { name: "Teriyaki", price: "Q 75" },
      ],
    },
    {
      name: "Lomito",
      items: [
        { name: "Asado", price: "Q 85" },
        { name: "Cuatro quesos", price: "Q 125" },
        { name: "Tartare", price: "Q 125" },
        { name: "Mar y tierra", price: "Q 150" },
        { name: "Gratinado (extra)", price: "Q 25" },
      ],
    },
    {
      name: "Especiales",
      items: [
        { name: "Tablazo", price: "Q 150" },
        { name: "Tablazo mar y tierra", price: "Q 200" },
        { name: "Pasta de camarones", price: "Q 75" },
        { name: "Puyazo importado", price: "Q 115" },
      ],
    },
  ],

  menuSourceNote:
    "Menú transcrito de la pizarra física del restaurante. Dos ítems no se alcanzan a leer con certeza y se muestran como \"Por confirmar\". Los precios pueden variar; el negocio invita a guiarse también por las publicaciones de su Instagram.",

  reviews: [
    {
      author: "Luna Rouge",
      meta: "4 opiniones · 24 fotos",
      when: "Hace 2 meses",
      text:
        "Mi experiencia en Asadero fue regular. El tiempo de espera para la comida fue más largo de lo esperado.",
      source: "Google",
    },
    {
      author: "Lucy Mendoza",
      meta: "Local Guide · 216 opiniones · 685 fotos",
      when: "Hace 5 años (editada)",
      text: "Excelente atención y la comida súper deliciosa.",
      source: "Google",
    },
    {
      author: "Douglas López",
      meta: "Local Guide · 83 opiniones · 231 fotos",
      when: "Hace un mes",
      text:
        "Súper recomendado, bebidas deliciosas y ambiente especial. Un lugar fuera de serie.",
      source: "Google",
    },
  ],

  reviewsTotalNote: "98 opiniones adicionales visibles en Google (no incluidas aquí).",
};

if (typeof module !== "undefined") {
  module.exports = RESTAURANT;
}
