/* ==========================================================
   GALERÍA · "Historias que cobraron vida"
   Filtros + lightbox con teclado y swipe.
   Para agregar pasteles: añade la imagen a assets/img
   (versión completa y -th) y una entrada en CAKES.
   ========================================================== */
"use strict";

const WA_NUMBER = "526679908851";

const CAKES = [
  { img: "boda-blanca",    cat: ["bodas", "elegantes"], title: "Cinco pisos para el «sí, acepto»" },
  { img: "boda-myb",       cat: ["bodas", "elegantes"], title: "Boda M&B · velos de isomalt y oro" },
  { img: "xv-mariany",     cat: ["xv", "elegantes"],    title: "XV de Mariany · flores y hoja de oro" },
  { img: "mono-dorado",    cat: ["elegantes"],          title: "Un regalo con moño dorado" },
  { img: "bautizo",        cat: ["elegantes"],          title: "Bautizo · texturas al óleo y oro" },
  { img: "gabby-brianna",  cat: ["infantiles"],         title: "La casa de Gabby, piso por piso" },
  { img: "pastel-vintage", cat: ["infantiles"],         title: "Primer año estilo vintage pastel" },
  { img: "granja-victoria",cat: ["infantiles"],         title: "La granja rosa de Victoria" },
  { img: "plaza-sesamo",   cat: ["infantiles"],         title: "Plaza Sésamo para Alexander" },
  { img: "monsters-emilio",cat: ["infantiles"],         title: "El primer monstruo de Emilio" },
  { img: "fortnite",       cat: ["infantiles"],         title: "Victoria royale para Perlita" },
  { img: "granja-emma",    cat: ["infantiles"],         title: "Emma cumple un año en la granja" },
  { img: "luis-andres",    cat: ["infantiles"],         title: "El potrillo de Luis Andrés" },
  { img: "nike",           cat: ["3d"],                 title: "Air Jordan 1 · caja incluida" },
  { img: "trailer",        cat: ["3d"],                 title: "Un tráiler para el amor de su vida" },
  { img: "ranger-3d",      cat: ["3d"],                 title: "Ranger 2019 modelada en 3D" },
  { img: "rzr",            cat: ["3d"],                 title: "RZR sobre una llanta gigante" },
  { img: "nutella",        cat: ["3d"],                 title: "Un bote de Nutella tamaño fiesta" },
  { img: "cucaracha",      cat: ["3d"],                 title: "Sí… esto también es pastel 🪳" },
];

const grid = document.getElementById("masonry");

/* Pintar tiles */
grid.innerHTML = CAKES.map((c, i) => `
  <button class="tile" data-cat="${c.cat.join(" ")}" data-index="${i}" aria-label="Ver: ${c.title}">
    <img src="assets/img/${c.img}-th.webp" alt="${c.title} — pastel personalizado de Genov Repostería" loading="lazy" decoding="async">
    <span class="tile__label">${c.title}</span>
  </button>
`).join("");

/* Filtros */
const filterBtns = document.querySelectorAll(".filter");
filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => { b.classList.remove("is-active"); b.setAttribute("aria-selected", "false"); });
    btn.classList.add("is-active");
    btn.setAttribute("aria-selected", "true");
    const f = btn.dataset.filter;
    document.querySelectorAll(".tile").forEach(t => {
      const show = f === "todos" || t.dataset.cat.split(" ").includes(f);
      t.classList.toggle("is-hidden", !show);
    });
  });
});

/* ---------- Lightbox ---------- */
const lb      = document.getElementById("lightbox");
const lbImg   = document.getElementById("lbImg");
const lbTitle = document.getElementById("lbTitle");
const lbCta   = document.getElementById("lbCta");
let current = 0;
let visible = [];

function openLb(index) {
  visible = CAKES.map((c, i) => i).filter(i => {
    const t = grid.querySelector(`[data-index="${i}"]`);
    return t && !t.classList.contains("is-hidden");
  });
  current = visible.indexOf(index) >= 0 ? index : visible[0];
  renderLb();
  lb.hidden = false;
  document.body.style.overflow = "hidden";
  document.getElementById("lbClose").focus();
}

function renderLb() {
  const c = CAKES[current];
  lbImg.src = `assets/img/${c.img}.webp`;
  lbImg.alt = `${c.title} — pastel personalizado de Genov Repostería`;
  lbTitle.textContent = c.title;
  const msg = encodeURIComponent(`Hola Genov 👋 Vi "${c.title}" en su página y quiero cotizar algo parecido 🎂`);
  lbCta.href = `https://wa.me/${WA_NUMBER}?text=${msg}`;
}

function closeLb() {
  lb.hidden = true;
  document.body.style.overflow = "";
}

function move(dir) {
  const pos = visible.indexOf(current);
  current = visible[(pos + dir + visible.length) % visible.length];
  renderLb();
}

grid.addEventListener("click", e => {
  const tile = e.target.closest(".tile");
  if (tile) openLb(Number(tile.dataset.index));
});
document.getElementById("lbClose").addEventListener("click", closeLb);
document.getElementById("lbPrev").addEventListener("click", () => move(-1));
document.getElementById("lbNext").addEventListener("click", () => move(1));
lb.addEventListener("click", e => { if (e.target === lb) closeLb(); });

document.addEventListener("keydown", e => {
  if (lb.hidden) return;
  if (e.key === "Escape") closeLb();
  if (e.key === "ArrowLeft") move(-1);
  if (e.key === "ArrowRight") move(1);
});

/* Swipe en móvil */
let touchX = null;
lb.addEventListener("touchstart", e => { touchX = e.changedTouches[0].clientX; }, { passive: true });
lb.addEventListener("touchend", e => {
  if (touchX === null) return;
  const dx = e.changedTouches[0].clientX - touchX;
  if (Math.abs(dx) > 48) move(dx > 0 ? -1 : 1);
  touchX = null;
}, { passive: true });
