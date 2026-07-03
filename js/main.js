/* ==========================================================
   GENOV · interacción general
   ========================================================== */
"use strict";

(() => {
  const WA_NUMBER = "526679908851";

  /* Enlaces con data-wa abren WhatsApp con mensaje prellenado */
  document.querySelectorAll("[data-wa]").forEach(a => {
    const msg = a.dataset.msg || "Hola Genov 👋 Quiero cotizar un pastel.";
    // El botón del hero y los CTA que apuntan a #cotizar mantienen su ancla;
    // los demás van directo a WhatsApp.
    if (a.getAttribute("href") === "#" || a.classList.contains("wa-float")) {
      a.href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
      a.target = "_blank";
      a.rel = "noopener";
    }
  });

  /* Nav con sombra al hacer scroll */
  const nav = document.getElementById("nav");
  addEventListener("scroll", () => {
    nav.classList.toggle("is-scrolled", scrollY > 12);
  }, { passive: true });

  /* Animaciones de aparición */
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  document.querySelectorAll(".reveal").forEach(el => io.observe(el));

  /* Botón flotante: aparece tras el hero y se oculta en el cotizador */
  const waFloat = document.getElementById("waFloat");
  const hero = document.getElementById("inicio");
  const quote = document.getElementById("cotizar");

  const heroIO = new IntersectionObserver(([en]) => {
    waFloat.classList.toggle("is-hidden", en.isIntersecting);
  }, { threshold: 0.4 });
  heroIO.observe(hero);

  const quoteIO = new IntersectionObserver(([en]) => {
    if (en.isIntersecting) waFloat.classList.add("is-hidden");
    else if (!isInView(hero)) waFloat.classList.remove("is-hidden");
  }, { threshold: 0.25 });
  quoteIO.observe(quote);

  function isInView(el) {
    const r = el.getBoundingClientRect();
    return r.bottom > 0 && r.top < innerHeight * 0.6;
  }

  /* Año del footer */
  document.getElementById("year").textContent = new Date().getFullYear();
})();
