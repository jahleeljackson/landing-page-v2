/**
 * Cassian AI landing page — edit these values to update embeds and images.
 */
const CONFIG = {
  calendlyUrl:
    "https://calendly.com/jahleeljackson-cassianconsultingai/30-minute-discovery-call",
  /**
   * About photo path. Drop a file in /images then set this, e.g. "images/about.jpg".
   * Leave empty to show the placeholder.
   */
  aboutImage: "images/about-image2.png",
  /**
   * Scenarios / audit PDF collage. e.g. "images/scenarios.png"
   * Leave empty to show the placeholder.
   */
  scenariosImage: "",
  formName: "contact",
};

function initNav() {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (!toggle || !links) return;

  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  links.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      links.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function initScrollReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  items.forEach((el) => observer.observe(el));
}

function initCalendly() {
  const mount = document.getElementById("calendly-embed");
  if (!mount || !CONFIG.calendlyUrl) return;

  mount.setAttribute("data-url", CONFIG.calendlyUrl);

  if (!document.querySelector('link[href*="calendly.com/assets/external/widget.css"]')) {
    const link = document.createElement("link");
    link.href = "https://assets.calendly.com/assets/external/widget.css";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }

  if (document.querySelector('script[src*="calendly.com/assets/external/widget.js"]')) {
    return;
  }

  const script = document.createElement("script");
  script.src = "https://assets.calendly.com/assets/external/widget.js";
  script.async = true;
  document.body.appendChild(script);
}

function initConfigurableImage(imgId, placeholderId, src) {
  const img = document.getElementById(imgId);
  const placeholder = document.getElementById(placeholderId);
  if (!img || !placeholder) return;

  if (!src) {
    placeholder.hidden = false;
    img.hidden = true;
    return;
  }

  img.onload = () => {
    placeholder.hidden = true;
    img.hidden = false;
  };

  img.onerror = () => {
    placeholder.hidden = false;
    img.hidden = true;
  };

  img.src = src;
}

function initAboutImage() {
  initConfigurableImage("about-photo-img", "about-photo-placeholder", CONFIG.aboutImage);
}

function initScenariosImage() {
  initConfigurableImage("scenarios-img", "scenarios-placeholder", CONFIG.scenariosImage);
}

function initFormSuccess() {
  const params = new URLSearchParams(window.location.search);
  if (params.get("success") !== "1") return;

  const banner = document.getElementById("form-success");
  if (banner) {
    banner.hidden = false;
    banner.focus();
  }

  const contact = document.getElementById("contact");
  if (contact) {
    contact.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function wireCalendlyLinks() {
  document.querySelectorAll("[data-calendly-link]").forEach((el) => {
    el.setAttribute("href", "#book");
  });
}

/** file:// cannot POST to Netlify Forms — show success UI in place instead. */
function initLocalFormFallback() {
  const form = document.querySelector("form.contact-form");
  if (!form || location.protocol !== "file:") return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const banner = document.getElementById("form-success");
    if (banner) {
      banner.hidden = false;
      banner.focus();
    }
    const contact = document.getElementById("contact");
    if (contact) {
      contact.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  wireCalendlyLinks();
  initNav();
  initScrollReveal();
  initCalendly();
  initAboutImage();
  initScenariosImage();
  initFormSuccess();
  initLocalFormFallback();
});
