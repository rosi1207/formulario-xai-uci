/* Construcción de las pantallas a partir de datos/estudio.js y js/textos.js.
 * Pasos: bienvenida, perfil, una pantalla de decisión por etapa, paso 5, paso 6, gracias. */
window.Vistas = (() => {
  const E = () => window.ESTUDIO, T = () => window.TEXTOS;

  /** Lista de pasos, en orden: {id, tipo, etapa?} */
  function pasos() {
    return [{ id: "bienvenida", tipo: "bienvenida" }, { id: "perfil", tipo: "perfil" },
      ...E().etapas.map(e => ({ id: "dec_" + e, tipo: "decision", etapa: e })),
      { id: "paso5", tipo: "cuestionario", paso: 5 }, { id: "paso6", tipo: "cuestionario", paso: 6 },
      { id: "gracias", tipo: "gracias" }];
  }

  const opciones = (name, valores) => `<div class="opts">${valores.map(v =>
    `<label><input type="radio" name="${name}" value="${v}">${v}</label>`).join("")}</div>`;
  const acciones = (texto, extra = "") => `<div class="err"></div><div class="actions"><button data-siguiente ${extra}>${texto}</button></div>`;

  function likert(items) {
    return items.map(([cod, n, texto], i) => `
      <div class="item">
        <div style="margin-bottom:8px">${i + 1}. ${texto}</div>
        <div class="opts scale">${Array.from({ length: n }, (_, k) => k + 1).map(v =>
          `<label><input type="radio" name="${cod}" value="${v}">${v}</label>`).join("")}</div>
        <div class="scale-ends"><span>${T().extremos[n][0]}</span><span>${T().extremos[n][1]}</span></div>
      </div>`).join("");
  }

  function seccion(p, n, total) {
    const t = T(), e = E();
    let h = "";
    if (p.tipo === "bienvenida") {
      h = `<h2>${t.bienvenida.titulo}</h2><p>${t.bienvenida.estudio}</p><p class="def">${t.bienvenida.definicion}</p>
        <p>${t.bienvenida.queHara}</p><h3>Importante</h3>
        <ul class="muted">${t.bienvenida.importante.map(x => `<li>${x}</li>`).join("")}<li>Tiempo estimado: ${window.CONFIG.TIEMPO_ESTIMADO}.</li></ul>
        <label class="consent"><input type="checkbox" id="consentimiento"><span>${t.bienvenida.consentimiento}</span></label>
        ${acciones("Comenzar")}`;
    } else if (p.tipo === "perfil") {
      h = Perfil.html() + acciones("Continuar");
    } else if (p.tipo === "decision") {
      const et = t.etapas[p.etapa], k = e.etapas.indexOf(p.etapa) + 1;
      h = `<span class="tag">Parte ${k} de ${e.etapas.length + 2} · ${et.tag}</span>
        <h2>Caso <span class="idCaso"></span></h2>
        <div class="prev respuestasPrevias" hidden></div>
        <div class="tablaCaso"></div>
        ${p.etapa !== "sin_modelo" ? `<div class="cajaModelo"></div><p class="muted">${t.modelo(e.umbral_mostrado)}</p>` : ""}
        ${p.etapa === "explicacion" ? `<h3>Explicación del modelo (<span class="etiquetaMetodo"></span>)</h3>
          <p class="muted">${et.ayuda}</p><div class="expl cajaExplicacion"></div>` : ""}
        <fieldset><legend>${t.pregunta}</legend>${opciones("decision_" + p.etapa, ["Alta", "Baja"])}</fieldset>
        <fieldset><legend>${t.preguntaConfianza}</legend>${opciones("confianza_" + p.etapa, e.confianza)}
          <div class="scale-ends muted" style="display:flex;justify-content:space-between;font-size:.78rem"><span>50% = como lanzar una moneda</span><span>100% = completamente seguro/a</span></div>
        </fieldset>${acciones("Continuar")}`;
    } else if (p.tipo === "cuestionario") {
      const tx = t["paso" + p.paso], k = e.etapas.length + p.paso - 4;
      h = `<span class="tag">Parte ${k} de ${e.etapas.length + 2} · ${tx.tag}</span><h2>${tx.titulo}</h2>
        <details class="again"><summary>Ver de nuevo la explicación del caso <span class="idCaso"></span></summary><div class="expl cajaExplicacion"></div></details>
        <div class="likert">${likert(e.preguntas["paso" + p.paso])}</div>
        <fieldset><legend>Comentario libre (opcional)</legend><textarea id="comentario_p${p.paso}" placeholder="${tx.comentario}"></textarea></fieldset>
        ${acciones(p.paso === 6 ? "Enviar respuestas" : "Continuar")}`;
    } else {
      h = `<h2>${t.gracias}</h2><p id="mensajeEnvio"></p><p class="muted" id="mensajeMas"></p>
        <div class="actions"><button id="botonOtro">Responder otro caso</button></div>`;
    }
    return `<section class="card step" data-paso="${n}" id="${p.id}" hidden>${h}</section>`;
  }

  function construir() {
    const ps = pasos();
    document.getElementById("pasos").innerHTML = ps.map((p, i) => seccion(p, i, ps.length)).join("");
    return ps;
  }

  function tablaCaso(c) {
    return `<table class="case">${c.datos.map(([k, v]) => `<tr><th>${k}</th><td>${v}</td></tr>`).join("")}</table>`;
  }
  function cajaModelo(c) {
    return `<div class="model"><div><small>Predicción del modelo (riesgo tras el egreso de la UCI)</small><b>${c.prediccion}</b></div>
      ${E().mostrar_probabilidad ? `<div><small>Probabilidad de fallecer tras el egreso</small><b>${c.probabilidad}</b></div>` : ""}</div>`;
  }

  /** Rellena todas las pantallas con el caso y el método asignados. */
  function mostrarCaso(asig) {
    const c = asig.caso, src = E().imagen.replace("{metodo}", asig.metodo.id).replace("{caso}", c.id);
    document.querySelectorAll(".idCaso").forEach(x => x.textContent = c.id);
    document.querySelectorAll(".etiquetaMetodo").forEach(x => x.textContent = asig.metodo.etiqueta);
    document.querySelectorAll(".tablaCaso").forEach(x => x.innerHTML = tablaCaso(c));
    document.querySelectorAll(".cajaModelo").forEach(x => x.innerHTML = cajaModelo(c));
    document.querySelectorAll(".cajaExplicacion").forEach(box => {
      box.innerHTML = "";
      // Pantallas estrechas: misma figura con las etiquetas en dos líneas (img/<metodo>/<caso>_movil.png)
      const movil = E().imagen_movil && window.matchMedia("(max-width: 640px)").matches;
      const ruta = movil ? E().imagen_movil.replace("{metodo}", asig.metodo.id).replace("{caso}", c.id) : src;
      const img = new Image();
      img.alt = "Explicación del modelo para el caso " + c.id;
      img.onerror = () => { box.innerHTML = `<div class="missing">Falta la imagen <b>${ruta}</b>. Ejecute exportar_web.py.</div>`; };
      img.src = ruta;
      const enlace = document.createElement("a");          // tocar = ver a tamaño completo
      enlace.href = ruta; enlace.target = "_blank"; enlace.rel = "noopener";
      enlace.appendChild(img);
      box.appendChild(enlace);
      asig.figura = movil ? "movil" : "normal";
    });
    document.querySelectorAll(".respuestasPrevias").forEach(x => { x.hidden = true; x.innerHTML = ""; });
  }

  /** Recuerda en las pantallas siguientes lo que respondió en las anteriores. */
  function mostrarPrevias(r) {
    const nombres = { sin_modelo: "solo con los datos", prediccion: "con la predicción" };
    const prev = E().etapas.filter(e => r["decision_" + e] && e !== "explicacion")
      .map(e => `Su valoración ${nombres[e]} fue: <b>${r["decision_" + e]}</b> probabilidad de fallecer (confianza ${r["confianza_" + e]}).`);
    document.querySelectorAll(".respuestasPrevias").forEach(x => {
      const sec = x.closest("section").id.replace("dec_", "");
      const propias = prev.filter((_, i) => E().etapas.indexOf(sec) > i);
      x.innerHTML = propias.join("<br>");
      x.hidden = propias.length === 0;
    });
  }

  return { construir, mostrarCaso, mostrarPrevias };
})();
