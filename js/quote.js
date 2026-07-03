/* ==========================================================
   COTIZADOR · wizard de 3 pasos → mensaje de WhatsApp
   ========================================================== */
"use strict";

(() => {
  const WA_NUMBER = "526679908851";
  const wizard = document.getElementById("wizard");
  const bar = document.getElementById("wizardBar");
  const steps = [...wizard.querySelectorAll(".wstep")];
  const summary = document.getElementById("summary");
  let step = 1;

  const state = { evento: "", porciones: "", bizcocho: "", relleno: "" };

  /* Chips: selección única por grupo */
  wizard.addEventListener("click", e => {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    const group = chip.dataset.group;
    chip.closest(".chips").classList.remove("is-invalid");
    wizard.querySelectorAll(`.chip[data-group="${group}"]`).forEach(c => c.classList.remove("is-selected"));
    chip.classList.add("is-selected");
    state[group] = chip.dataset.value;
  });

  function show(n) {
    step = n;
    steps.forEach(s => s.classList.toggle("is-active", Number(s.dataset.step) === n));
    bar.style.width = `${(n / steps.length) * 100}%`;
    if (n === 3) renderSummary();
    wizard.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function validate(n) {
    let ok = true;
    if (n === 1) {
      if (!state.evento) { mark("evento"); ok = false; }
      const fecha = document.getElementById("fecha");
      fecha.classList.toggle("is-invalid", !fecha.value);
      if (!fecha.value) ok = false;
      if (!state.porciones) { mark("porciones"); ok = false; }
    }
    if (n === 3) {
      ["nombre", "whats"].forEach(id => {
        const el = document.getElementById(id);
        const bad = !el.value.trim() || (id === "whats" && el.value.replace(/\D/g, "").length < 10);
        el.classList.toggle("is-invalid", bad);
        if (bad) ok = false;
      });
    }
    return ok;
  }

  function mark(group) {
    const chips = wizard.querySelector(`.chip[data-group="${group}"]`)?.closest(".chips");
    if (chips) chips.classList.add("is-invalid");
  }

  function fechaBonita(iso) {
    if (!iso) return "";
    const d = new Date(iso + "T12:00:00");
    return d.toLocaleDateString("es-MX", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  }

  function renderSummary() {
    const idea = document.getElementById("idea").value.trim();
    summary.innerHTML = `
      <strong>Resumen:</strong> ${state.evento || "—"} · ${fechaBonita(document.getElementById("fecha").value) || "sin fecha"} ·
      ${state.porciones || "—"} porciones · ${state.bizcocho || "bizcocho por definir"} con ${state.relleno || "relleno por definir"}
      ${idea ? `<br><strong>Idea:</strong> ${idea}` : ""}`;
  }

  wizard.addEventListener("click", e => {
    if (e.target.closest("[data-next]")) { if (validate(step)) show(step + 1); }
    if (e.target.closest("[data-prev]")) show(step - 1);
  });

  wizard.addEventListener("submit", e => {
    e.preventDefault();
    if (!validate(3)) return;

    const nombre = document.getElementById("nombre").value.trim();
    const whats = document.getElementById("whats").value.trim();
    const idea = document.getElementById("idea").value.trim();
    const tieneFoto = document.getElementById("tieneFoto").checked;

    const lines = [
      "¡Hola Genov! 🎂 Quiero cotizar un pastel:",
      "",
      `👤 Nombre: ${nombre}`,
      `📱 WhatsApp: ${whats}`,
      `🎉 Evento: ${state.evento}`,
      `📅 Fecha: ${fechaBonita(document.getElementById("fecha").value)}`,
      `🍰 Porciones: ${state.porciones}`,
      `🧁 Bizcocho: ${state.bizcocho || "Por definir"}`,
      `🍓 Relleno: ${state.relleno || "Por definir"}`,
    ];
    if (idea) lines.push(`💡 Mi idea: ${idea}`);
    if (tieneFoto) lines.push("📷 Tengo una imagen de inspiración, la envío por aquí.");
    lines.push("", "Enviado desde genovreposteria.com ✨");

    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener");
  });

  /* Fecha mínima: hoy */
  document.getElementById("fecha").min = new Date().toISOString().split("T")[0];
})();
