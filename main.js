/**
 * main.js
 * Renderiza el contenido dinámico del sitio a partir de RESTAURANT
 * (data.js) y maneja la interacción de la interfaz: explorador de carta,
 * navegación, estado de horario, copia de dirección y pie de página.
 *
 * No depende de librerías externas ni de conexión a internet en tiempo
 * de ejecución (aparte de las tipografías de Google Fonts declaradas en
 * el CSS).
 */

(function () {
  "use strict";

  const menuState = {
    category: "all",
    query: "",
  };

  /** Obtiene un valor anidado de un objeto a partir de una ruta "a.b.c". */
  function getPath(obj, path) {
    return path.split(".").reduce((acc, key) => (acc == null ? acc : acc[key]), obj);
  }

  /** Une elementos data-bind / data-bind-href en el DOM con RESTAURANT. */
  function bindData(root) {
    root.querySelectorAll("[data-bind]").forEach((el) => {
      const value = getPath(RESTAURANT, el.dataset.bind);
      if (value !== undefined && value !== null) {
        el.textContent = value;
      }
    });

    root.querySelectorAll("[data-bind-href]").forEach((el) => {
      const value = getPath(RESTAURANT, el.dataset.bindHref);
      if (value) {
        el.setAttribute("href", value);
      }
    });
  }

  function imgPath(name, ext) {
    return `assets/img/optimized/${name}.${ext}`;
  }

  function normalizeText(value) {
    return String(value || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();
  }

  function categoryKey(name) {
    return normalizeText(name).replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }

  function pictureMarkup({ image, alt, width = 420, height = 525, lazy = true }) {
    const loadingAttr = lazy ? 'loading="lazy" decoding="async"' : 'decoding="async"';
    return `
      <picture>
        <source srcset="${imgPath(image, "webp")}" type="image/webp" />
        <img src="${imgPath(image, "jpg")}" alt="${alt}" width="${width}" height="${height}" ${loadingAttr} />
      </picture>
    `;
  }

  function renderMenu() {
    const grid = document.getElementById("menuGrid");
    if (!grid) return;
    grid.innerHTML = RESTAURANT.menuHighlights
      .map(
        (item) => `
      <article class="menu-card">
        <div class="menu-card-media">
          ${pictureMarkup({ image: item.image, alt: item.alt, width: 480, height: 330 })}
        </div>
        <div class="menu-card-body">
          <span class="menu-card-kicker">${item.category}</span>
          <h3>${item.name}</h3>
          <p>${item.description}</p>
          <div class="tag-row">
            ${item.tags.map((t) => `<span class="tag">${t}</span>`).join("")}
            <span class="tag tag-price">${item.price ? item.price : item.priceNote || ""}</span>
          </div>
          ${
            item.sourcePost
              ? `<a class="menu-card-link" href="${item.sourcePost}" target="_blank" rel="noopener">Ver publicación oficial <svg aria-hidden="true"><use href="#icon-external"></use></svg></a>`
              : ""
          }
        </div>
      </article>`
      )
      .join("");
  }

  function renderMenuCategories() {
    const wrap = document.getElementById("menuCategories");
    if (!wrap) return;

    const visibleCategories = RESTAURANT.menuCategories
      .filter((cat) => menuState.category === "all" || categoryKey(cat.name) === menuState.category)
      .map((cat) => {
        const items = cat.items.filter((item) => {
          if (!menuState.query) return true;
          return normalizeText(`${cat.name} ${item.name}`).includes(menuState.query);
        });
        return { ...cat, items };
      })
      .filter((cat) => cat.items.length > 0);

    const visibleItems = visibleCategories.reduce((total, cat) => total + cat.items.length, 0);

    wrap.innerHTML = visibleCategories.length
      ? visibleCategories
      .map(
        (cat) => `
      <section class="menu-category" data-category="${categoryKey(cat.name)}">
        <h3>${cat.name}</h3>
        <ul>
          ${cat.items
            .map(
              (item) => `
            <li class="menu-line">
              <span class="name${item.needsReview ? " needs-review" : ""}">${item.name}</span>
              <span class="filler" aria-hidden="true"></span>
              <span class="price">${item.price}</span>
            </li>`
            )
            .join("")}
        </ul>
      </section>`
      )
      .join("")
      : `<div class="menu-empty"><strong>No encontramos ese platillo.</strong><span>Prueba otra palabra o selecciona “Todo”.</span></div>`;

    const results = document.getElementById("menuResults");
    if (results) {
      results.textContent = visibleItems
        ? `${visibleItems} ${visibleItems === 1 ? "platillo" : "platillos"} en ${visibleCategories.length} ${visibleCategories.length === 1 ? "categoría" : "categorías"}`
        : "Sin resultados para esta búsqueda";
    }

    const note = document.getElementById("menuSourceNote");
    if (note) {
      note.innerHTML = `
        <svg aria-hidden="true"><use href="#icon-clock"></use></svg>
        <p>${RESTAURANT.menuSourceNote}</p>
      `;
    }
  }

  function setupMenuExplorer() {
    const filters = document.getElementById("menuFilters");
    const search = document.getElementById("menuSearch");
    if (!filters || !search) return;

    const categories = RESTAURANT.menuCategories.map((cat) => ({
      label: cat.name,
      value: categoryKey(cat.name),
    }));

    filters.innerHTML = [
      { label: "Todo", value: "all" },
      ...categories,
    ]
      .map(
        (cat) => `<button type="button" class="menu-filter${cat.value === "all" ? " is-active" : ""}" data-menu-filter="${cat.value}" aria-pressed="${cat.value === "all"}">${cat.label}</button>`
      )
      .join("");

    filters.addEventListener("click", (event) => {
      const button = event.target.closest("[data-menu-filter]");
      if (!button) return;
      menuState.category = button.dataset.menuFilter;
      filters.querySelectorAll("[data-menu-filter]").forEach((item) => {
        const active = item === button;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      renderMenuCategories();
    });

    search.addEventListener("input", () => {
      menuState.query = normalizeText(search.value);
      renderMenuCategories();
    });
  }

  function renderFooterSocial() {
    const wrap = document.getElementById("footerSocial");
    if (!wrap) return;
    const items = RESTAURANT.contact.social || [];
    if (items.length === 0) {
      wrap.innerHTML = "<li>Próximamente</li>";
      return;
    }
    wrap.innerHTML = items
      .map((s) => {
        const icon = s.label.toLowerCase().includes("insta") ? "icon-instagram" : "icon-facebook";
        return `<li class="footer-social-item"><svg aria-hidden="true"><use href="#${icon}"></use></svg><a href="${s.url}" target="_blank" rel="noopener">${s.label}</a></li>`;
      })
      .join("");
  }

  function renderReviews() {
    const grid = document.getElementById("reviewGrid");
    if (!grid) return;
    grid.innerHTML = RESTAURANT.reviews
      .map(
        (r) => `
      <article class="review-card">
        <p class="review-quote">${r.text}</p>
        <div class="review-author">
          <strong>${r.author}</strong>
          <span>${r.meta} · ${r.when} · ${r.source}</span>
        </div>
      </article>`
      )
      .join("");

    const note = document.getElementById("reviewsNote");
    if (note) note.textContent = RESTAURANT.reviewsTotalNote;
  }

  function renderServicePills() {
    const wrap = document.getElementById("servicePills");
    if (!wrap) return;
    wrap.innerHTML = RESTAURANT.services
      .map((s) => {
        if (s.available === true) {
          return `<span class="service-pill"><svg aria-hidden="true"><use href="#icon-check"></use></svg>${s.label}</span>`;
        }
        if (s.available === null) {
          return `<span class="service-pill">${s.label}${s.note ? ` — ${s.note}` : ""}</span>`;
        }
        return "";
      })
      .join("");
  }

  /** Devuelve { weekdayIndex, minutes } según la hora actual en Guatemala. */
  function nowInRestaurantTZ() {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: RESTAURANT.timeZone,
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).formatToParts(new Date());

    const map = {};
    parts.forEach((p) => (map[p.type] = p.value));

    const weekdayMap = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
    const hour = map.hour === "24" ? 0 : parseInt(map.hour, 10);
    const minute = parseInt(map.minute, 10);

    return {
      weekdayIndex: weekdayMap[map.weekday],
      minutes: hour * 60 + minute,
    };
  }

  function toMinutes(hhmm) {
    const [h, m] = hhmm.split(":").map(Number);
    return h * 60 + m;
  }

  function renderHoursAndStatus() {
    const tbody = document.querySelector("#hoursTable tbody");
    const { weekdayIndex, minutes } = nowInRestaurantTZ();
    const today = RESTAURANT.hours.find((h) => h.jsIndex === weekdayIndex);

    if (tbody) {
      tbody.innerHTML = RESTAURANT.hours
        .map((h) => {
          const isToday = h.jsIndex === weekdayIndex;
          return `<tr class="${isToday ? "is-today" : ""}"><td>${h.day}${isToday ? " · hoy" : ""}</td><td>${h.label}</td></tr>`;
        })
        .join("");
    }

    let isOpen = false;
    let statusText = "Cerrado ahora";

    if (today) {
      const openM = toMinutes(today.open);
      const closeM = toMinutes(today.close);
      isOpen = minutes >= openM && minutes < closeM;
      if (isOpen) {
        statusText = `Abierto ahora · cierra a las ${today.label.split("–")[1].trim()}`;
      } else if (minutes < openM) {
        statusText = `Cerrado ahora · abre hoy a las ${today.label.split("–")[0].trim()}`;
      } else {
        const next = findNextOpening(weekdayIndex);
        if (next) statusText = `Cerrado ahora · abre ${next.when} a las ${next.hours.label.split("–")[0].trim()}`;
      }
    } else {
      const next = findNextOpening(weekdayIndex);
      if (next) statusText = `Cerrado ahora · abre ${next.when} a las ${next.hours.label.split("–")[0].trim()}`;
    }

    const flag = document.getElementById("openFlag");
    const flagText = document.getElementById("openFlagText");
    const heroStatus = document.getElementById("heroOpenStatus");

    if (flag) {
      flag.classList.remove("is-open", "is-closed");
      flag.classList.add(isOpen ? "is-open" : "is-closed");
    }
    if (flagText) flagText.textContent = statusText;
    if (heroStatus) heroStatus.textContent = isOpen ? "Abierto ahora" : "Cerrado ahora";
  }

  function findNextOpening(weekdayIndex) {
    for (let offset = 1; offset <= 7; offset += 1) {
      const nextIndex = (weekdayIndex + offset) % 7;
      const hours = RESTAURANT.hours.find((item) => item.jsIndex === nextIndex);
      if (hours) {
        return {
          hours,
          when: offset === 1 ? "mañana" : `el ${hours.day.toLowerCase()}`,
        };
      }
    }
    return null;
  }

  function fallbackCopy(text) {
    const input = document.createElement("textarea");
    input.value = text;
    input.setAttribute("readonly", "");
    input.style.position = "fixed";
    input.style.opacity = "0";
    document.body.appendChild(input);
    input.select();
    const copied = document.execCommand("copy");
    input.remove();
    return copied;
  }

  function setupAddressCopy() {
    const buttons = document.querySelectorAll("[data-copy-address]");
    const feedback = document.getElementById("copyFeedback");
    if (!buttons.length) return;

    buttons.forEach((button) => {
      const originalLabel = button.textContent.trim();
      button.addEventListener("click", async () => {
        let copied = false;
        try {
          if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(RESTAURANT.location.addressLine);
            copied = true;
          } else {
            copied = fallbackCopy(RESTAURANT.location.addressLine);
          }
        } catch (_error) {
          copied = false;
        }

        button.textContent = copied ? "Dirección copiada" : "No se pudo copiar";
        if (feedback) feedback.textContent = copied ? "La dirección se copió al portapapeles." : "Selecciona la dirección y cópiala manualmente.";

        window.setTimeout(() => {
          button.textContent = originalLabel;
          if (feedback) feedback.textContent = "";
        }, 2500);
      });
    });
  }

  function setupHeaderState() {
    const header = document.querySelector(".site-header");
    if (!header) return;
    const update = () => header.classList.toggle("is-scrolled", window.scrollY > 16);
    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  function setupActiveNavigation() {
    if (!("IntersectionObserver" in window)) return;
    const links = Array.from(document.querySelectorAll('.main-nav a[href^="#"]'));
    const sections = links
      .map((link) => document.querySelector(link.getAttribute("href")))
      .filter(Boolean);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (!visible) return;
        links.forEach((link) => {
          const active = link.getAttribute("href") === `#${visible.target.id}`;
          link.classList.toggle("is-active", active);
          if (active) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
  }

  function setupMobileNav() {
    const toggle = document.getElementById("navToggle");
    const panel = document.getElementById("mobilePanel");
    const icon = document.getElementById("navToggleIcon");
    if (!toggle || !panel) return;

    function setOpen(open) {
      panel.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      if (icon) icon.innerHTML = `<use href="${open ? "#icon-close" : "#icon-menu"}"></use>`;
    }

    toggle.addEventListener("click", () => {
      setOpen(!panel.classList.contains("is-open"));
    });

    panel.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setOpen(false));
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setOpen(false);
    });
  }

  function setFooterYear() {
    const el = document.getElementById("footerYear");
    if (el) el.textContent = new Date().getFullYear();
  }

  document.addEventListener("DOMContentLoaded", () => {
    bindData(document);
    renderMenu();
    setupMenuExplorer();
    renderMenuCategories();
    renderReviews();
    renderServicePills();
    renderFooterSocial();
    renderHoursAndStatus();
    setupMobileNav();
    setupAddressCopy();
    setupHeaderState();
    setupActiveNavigation();
    setFooterYear();
  });
})();
