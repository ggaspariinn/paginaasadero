/**
 * Interacciones y renderizado del sitio de Asadero Bar & Grill.
 * Toda la información comercial vive en data.js.
 */
(function () {
  "use strict";

  const menuState = {
    category: "all",
    query: "",
  };

  let revealObserver = null;

  function getPath(object, path) {
    return path.split(".").reduce((value, key) => (value == null ? value : value[key]), object);
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function bindData(root) {
    root.querySelectorAll("[data-bind]").forEach((element) => {
      const value = getPath(RESTAURANT, element.dataset.bind);
      if (value !== undefined && value !== null) element.textContent = value;
    });

    root.querySelectorAll("[data-bind-href]").forEach((element) => {
      const value = getPath(RESTAURANT, element.dataset.bindHref);
      if (value) element.setAttribute("href", value);
    });
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

  function restaurantImage(filename) {
    return `assets/img/restaurant/${filename}`;
  }

  function renderFeaturedImages() {
    const grid = document.getElementById("featuredGrid");
    if (!grid) return;

    grid.innerHTML = RESTAURANT.featuredImages
      .map(
        (item, index) => `
          <article class="flavor-card flavor-card--${index + 1}">
            <div class="flavor-photo">
              <img
                src="${restaurantImage(escapeHtml(item.image))}"
                alt="${escapeHtml(item.alt)}"
                width="${index === 1 ? 563 : 476}"
                height="${index === 1 ? 422 : 635}"
                loading="lazy"
                decoding="async"
              />
              <span class="flavor-number">0${index + 1}</span>
            </div>
            <div class="flavor-copy">
              <span>${escapeHtml(item.eyebrow)}</span>
              <h3>${escapeHtml(item.name)}</h3>
              <p>${escapeHtml(item.description)}</p>
            </div>
          </article>
        `
      )
      .join("");
  }

  function getVisibleMenuCategories() {
    return RESTAURANT.menuCategories
      .filter((category) => menuState.category === "all" || categoryKey(category.name) === menuState.category)
      .map((category) => {
        const items = category.items.filter((item) => {
          if (!menuState.query) return true;
          return normalizeText(`${category.name} ${item.name}`).includes(menuState.query);
        });
        return { ...category, items };
      })
      .filter((category) => category.items.length > 0);
  }

  function renderMenuCategories() {
    const container = document.getElementById("menuCategories");
    if (!container) return;

    const categories = getVisibleMenuCategories();
    const itemCount = categories.reduce((total, category) => total + category.items.length, 0);

    container.innerHTML = categories.length
      ? categories
          .map(
            (category) => `
              <section class="menu-category">
                <div class="menu-category-heading">
                  <h3>${escapeHtml(category.name)}</h3>
                  <span>${String(category.items.length).padStart(2, "0")}</span>
                </div>
                <ul>
                  ${category.items
                    .map(
                      (item) => `
                        <li>
                          <span class="dish-name">${escapeHtml(item.name)}</span>
                          <span class="dish-line" aria-hidden="true"></span>
                          <strong>${escapeHtml(item.price)}</strong>
                        </li>
                      `
                    )
                    .join("")}
                </ul>
              </section>
            `
          )
          .join("")
      : `
          <div class="menu-empty">
            <strong>No encontramos ese platillo.</strong>
            <span>Prueba otra palabra o vuelve a “Todo”.</span>
          </div>
        `;

    const results = document.getElementById("menuResults");
    if (results) {
      results.textContent = itemCount
        ? `${itemCount} ${itemCount === 1 ? "platillo" : "platillos"} · ${categories.length} ${categories.length === 1 ? "categoría" : "categorías"}`
        : "Sin resultados";
    }

    registerRevealTargets(container);
  }

  function setupMenuExplorer() {
    const filters = document.getElementById("menuFilters");
    const search = document.getElementById("menuSearch");
    if (!filters || !search) return;

    const categories = [
      { label: "Todo", value: "all" },
      ...RESTAURANT.menuCategories.map((category) => ({
        label: category.name,
        value: categoryKey(category.name),
      })),
    ];

    filters.innerHTML = categories
      .map(
        (category) => `
          <button
            type="button"
            class="menu-filter${category.value === "all" ? " is-active" : ""}"
            data-menu-filter="${category.value}"
            aria-pressed="${category.value === "all"}"
          >${escapeHtml(category.label)}</button>
        `
      )
      .join("");

    filters.addEventListener("click", (event) => {
      const button = event.target.closest("[data-menu-filter]");
      if (!button) return;

      menuState.category = button.dataset.menuFilter;
      filters.querySelectorAll("[data-menu-filter]").forEach((filter) => {
        const isActive = filter === button;
        filter.classList.toggle("is-active", isActive);
        filter.setAttribute("aria-pressed", String(isActive));
      });
      renderMenuCategories();
    });

    search.addEventListener("input", () => {
      menuState.query = normalizeText(search.value);
      renderMenuCategories();
    });
  }

  function renderReviews() {
    const grid = document.getElementById("reviewGrid");
    if (!grid) return;

    grid.innerHTML = RESTAURANT.reviews
      .map(
        (review, index) => `
          <article class="review-card">
            <div class="review-topline">
              <span>0${index + 1}</span>
              <span aria-label="${review.rating} de 5 estrellas">${"★".repeat(review.rating)}</span>
            </div>
            <blockquote>“${escapeHtml(review.text)}”</blockquote>
            <footer>
              <strong>${escapeHtml(review.author)}</strong>
              <span>${escapeHtml(review.when)} · ${escapeHtml(review.source)}</span>
            </footer>
          </article>
        `
      )
      .join("");
  }

  function renderServices() {
    const list = document.getElementById("serviceList");
    if (!list) return;

    list.innerHTML = RESTAURANT.services
      .filter((service) => service.available !== false)
      .map(
        (service) => `
          <span>
            <i aria-hidden="true"></i>
            ${escapeHtml(service.label)}
          </span>
        `
      )
      .join("");
  }

  function nowInRestaurantTimeZone() {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: RESTAURANT.timeZone,
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).formatToParts(new Date());

    const values = {};
    parts.forEach((part) => {
      values[part.type] = part.value;
    });

    const weekdayMap = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
    const hour = values.hour === "24" ? 0 : Number.parseInt(values.hour, 10);
    const minute = Number.parseInt(values.minute, 10);

    return {
      weekdayIndex: weekdayMap[values.weekday],
      minutes: hour * 60 + minute,
    };
  }

  function toMinutes(value) {
    const [hours, minutes] = value.split(":").map(Number);
    return hours * 60 + minutes;
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

  function renderHoursAndStatus() {
    const tableBody = document.querySelector("#hoursTable tbody");
    const { weekdayIndex, minutes } = nowInRestaurantTimeZone();
    const today = RESTAURANT.hours.find((item) => item.jsIndex === weekdayIndex);

    if (tableBody) {
      tableBody.innerHTML = RESTAURANT.hours
        .map(
          (item) => `
            <tr class="${item.jsIndex === weekdayIndex ? "is-today" : ""}">
              <td>${escapeHtml(item.day)}${item.jsIndex === weekdayIndex ? " · hoy" : ""}</td>
              <td>${escapeHtml(item.label)}</td>
            </tr>
          `
        )
        .join("");
    }

    let isOpen = false;
    let statusText = "Cerrado ahora";

    if (today) {
      const opens = toMinutes(today.open);
      const closes = toMinutes(today.close);
      isOpen = minutes >= opens && minutes < closes;

      if (isOpen) {
        statusText = `Abierto ahora · cierra a las ${today.label.split("–")[1].trim()}`;
      } else if (minutes < opens) {
        statusText = `Cerrado ahora · abre hoy a las ${today.label.split("–")[0].trim()}`;
      } else {
        const next = findNextOpening(weekdayIndex);
        if (next) statusText = `Cerrado ahora · abre ${next.when} a las ${next.hours.label.split("–")[0].trim()}`;
      }
    }

    ["heroStatus", "visitStatus"].forEach((id) => {
      const element = document.getElementById(id);
      if (!element) return;
      element.textContent = statusText;
      element.classList.toggle("is-open", isOpen);
    });
  }

  function renderFooterSocial() {
    const container = document.getElementById("footerSocial");
    if (!container) return;

    container.innerHTML = RESTAURANT.contact.social
      .map(
        (social) => `
          <a href="${escapeHtml(social.url)}" target="_blank" rel="noopener">
            ${escapeHtml(social.label)} <span aria-hidden="true">↗</span>
          </a>
        `
      )
      .join("");
  }

  function fallbackCopy(text) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    const copied = document.execCommand("copy");
    textarea.remove();
    return copied;
  }

  function setupAddressCopy() {
    const button = document.querySelector("[data-copy-address]");
    const feedback = document.getElementById("copyFeedback");
    if (!button) return;

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
      if (feedback) {
        feedback.textContent = copied
          ? "La dirección está lista para compartir."
          : "Selecciona la dirección y cópiala manualmente.";
      }

      window.setTimeout(() => {
        button.textContent = originalLabel;
        if (feedback) feedback.textContent = "";
      }, 2600);
    });
  }

  function setupMobileNavigation() {
    const toggle = document.getElementById("navToggle");
    const navigation = document.getElementById("mobileNav");
    if (!toggle || !navigation) return;

    const setOpen = (open) => {
      toggle.setAttribute("aria-expanded", String(open));
      navigation.classList.toggle("is-open", open);
      document.body.classList.toggle("nav-open", open);
    };

    toggle.addEventListener("click", () => {
      setOpen(!navigation.classList.contains("is-open"));
    });

    navigation.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setOpen(false));
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") setOpen(false);
    });
  }

  function setupHeaderAndProgress() {
    const header = document.getElementById("siteHeader");
    const progress = document.getElementById("scrollProgress");

    const update = () => {
      if (header) header.classList.toggle("is-scrolled", window.scrollY > 24);
      if (progress) {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        const percentage = scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0;
        progress.style.transform = `scaleX(${percentage})`;
      }
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
  }

  function setupActiveNavigation() {
    if (!("IntersectionObserver" in window)) return;

    const links = Array.from(document.querySelectorAll('.desktop-nav a[href^="#"]'));
    const sections = links
      .map((link) => document.querySelector(link.getAttribute("href")))
      .filter(Boolean);

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
      { rootMargin: "-38% 0px -52% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
  }

  function registerRevealTargets(root = document) {
    const targets = root.querySelectorAll(".reveal, .flavor-card, .menu-category, .review-card");
    if (!targets.length) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    targets.forEach((target, index) => {
      if (target.classList.contains("reveal-ready")) return;
      target.classList.add("reveal-ready");
      target.style.setProperty("--reveal-delay", `${(index % 3) * 90}ms`);

      if (reduceMotion || !revealObserver) {
        target.classList.add("is-visible");
      } else {
        revealObserver.observe(target);
      }
    });
  }

  function setupScrollReveal() {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!("IntersectionObserver" in window) || reduceMotion) {
      registerRevealTargets(document);
      return;
    }

    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -9%", threshold: 0.12 }
    );

    registerRevealTargets(document);
  }

  function setFooterYear() {
    const year = document.getElementById("footerYear");
    if (year) year.textContent = new Date().getFullYear();
  }

  document.addEventListener("DOMContentLoaded", () => {
    bindData(document);
    renderFeaturedImages();
    renderMenuCategories();
    setupMenuExplorer();
    renderReviews();
    renderServices();
    renderHoursAndStatus();
    renderFooterSocial();
    setupAddressCopy();
    setupMobileNavigation();
    setupHeaderAndProgress();
    setupActiveNavigation();
    setupScrollReveal();
    setFooterYear();
  });
})();
