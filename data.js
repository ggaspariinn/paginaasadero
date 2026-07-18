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
 *  - Fotografías: publicaciones públicas de la ficha oficial del negocio
 *    en Google Maps. Se eligieron imágenes sin carteles promocionales.
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
    { label: "Confirmar disponibilidad", available: null, note: "Por llamada telefónica" },
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

  featuredImages: [
    {
      id: "tacos-casa",
      name: "Tacos de la casa",
      eyebrow: "Para compartir",
      description:
        "Preparaciones frescas, vegetales, salsas y el toque de la casa sobre tortilla.",
      image: "tacos-casa.jpg",
      alt: "Dos tacos servidos en Asadero Bar & Grill con cebolla morada, vegetales y limón",
    },
    {
      id: "plato-asadero",
      name: "De la brasa a la mesa",
      eyebrow: "Fuego real",
      description:
        "Carnes, acompañamientos y salsas servidos sin complicaciones y con sabor ahumado.",
      image: "plato-asadero.jpg",
      alt: "Plato de carne a la brasa con pasta, vegetales, pan y salsas en Asadero Bar & Grill",
    },
    {
      id: "bebida-rosa",
      name: "Algo frío para brindar",
      eyebrow: "Bar & Grill",
      description:
        "Bebidas preparadas para acompañar una sobremesa larga entre amigos.",
      image: "bebida-rosa.jpg",
      alt: "Bebida rosa con hielo, romero y cítrico servida en Asadero Bar & Grill",
    },
  ],

  visualStory: {
    hero: "hero-fuego.jpg",
    heroAlt: "Especialidad caliente con carne, hongos y queso servida en sartén en Asadero Bar & Grill",
    ambience: "ambiente-rustico.jpg",
    ambienceAlt: "Mesas de madera y patio abierto del ambiente rústico de Asadero Bar & Grill",
    cocktail: "michelada-camaron.jpg",
    cocktailAlt: "Bebida preparada con camarón y limón sobre una mesa de madera",
    facade: "fachada-asadero.jpg",
    facadeAlt: "Fachada amarilla y rústica de Asadero Bar & Grill en Villa Canales",
  },

  // Menú completo transcrito de la pizarra física del restaurante.
  menuCategories: [
    {
      name: "Entradas",
      items: [
        { name: "Aguachile", price: "Q 95" },
        { name: "Berenjena confitada", price: "Q 65" },
        { name: "Bolitas de morcilla", price: "Q 35" },
        { name: "Camarones a la Picona", price: "Q 88" },
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

  reviews: [
    {
      author: "Esperanza López",
      meta: "Local Guide · 66 opiniones · 345 fotos",
      when: "Hace 2 años",
      rating: 5,
      text: "Excelente! Ambiente abierto, maravilloso trato y comida deliciosa 😋",
      source: "Google",
    },
    {
      author: "David Guerra",
      meta: "Local Guide · 38 opiniones · 7 fotos",
      when: "Hace 3 años",
      rating: 5,
      text: "Muy buena comida, excelente sabor y buen menu con bastantes opciones.",
      source: "Google",
    },
    {
      author: "David Mendez",
      meta: "Local Guide · 67 opiniones · 10 fotos",
      when: "Hace 3 años",
      rating: 5,
      text:
        "Muy bonito lugar, excelente servicio, riquísimos los platos, lo que coman seguro les va gustar...",
      source: "Google",
    },
  ],

  reviewsTotalNote:
    "Selección de opiniones de 5 estrellas que destacan comida, atención y ambiente. Consulta las 101 opiniones completas en Google.",
};

if (typeof module !== "undefined") {
  module.exports = RESTAURANT;
}
