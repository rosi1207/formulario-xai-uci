/* Flujo del formulario: navegación entre pasos, validación, tiempos y armado de la respuesta.
 * Cada respuesta es UNA fila: un participante, un caso, un método. */
(() => {
  const E = window.ESTUDIO, T = window.TEXTOS;
  if (!E) { document.getElementById("pasos").innerHTML =
    '<section class="card"><p>Falta datos/estudio.js. Genérelo con exportar_web.py.</p></section>'; return; }

  const PASOS = Vistas.construir();
  const secciones = [...document.querySelectorAll(".step")];
  const ETIQUETAS = PASOS.map(p => ({ bienvenida: "Inicio", perfil: "Perfil", gracias: "Fin" }[p.tipo] || ""));
  let participante = Almacen.get("participante", null) || { id: nuevoId(), perfil: null };
  let asig, R, actual, t0;

  function nuevoId() {
    return "P-" + Math.random().toString(36).slice(2, 8).toUpperCase() + Date.now().toString(36).slice(-3).toUpperCase();
  }
  const val = n => (document.querySelector(`input[name="${n}"]:checked`) || {}).value;
  const errorEn = (sec, msg) => { sec.querySelector(".err").textContent = msg || ""; return !msg; };

  function nuevoCaso() {
    asig = Asignacion.siguiente(participante.id);
    R = { participante: participante.id, version: E.version, ...(participante.perfil || {}),
          caso: asig.caso.id, metodo: asig.metodo.id, etiqueta_metodo: asig.metodo.etiqueta,
          etapas: E.etapas.join(","), inicio: new Date().toISOString() };
    document.querySelectorAll('.step[data-paso] input[type=radio]').forEach(i => {
      if (!secciones[0].contains(i) && !document.getElementById("perfil").contains(i)) i.checked = false; });
    document.querySelectorAll("textarea").forEach(t => t.value = "");
    document.querySelectorAll("details.again").forEach(d => d.open = false);
    Vistas.mostrarCaso(asig);
  }

  function mostrar(n) {
    const medible = actual !== undefined && ["perfil", "decision", "cuestionario"].includes(PASOS[actual].tipo);
    if (medible && t0 && R) R["seg_" + PASOS[actual].id] = Math.round((Date.now() - t0) / 1000);
    actual = n; t0 = Date.now();
    secciones.forEach(s => s.hidden = Number(s.dataset.paso) !== n);
    const visibles = PASOS.length - 1;
    document.getElementById("etiquetaPaso").textContent = ETIQUETAS[n] || `Paso ${n - 1} de ${visibles - 2}`;
    document.getElementById("barra").style.width = (n / visibles * 100) + "%";
    window.scrollTo(0, 0);
  }

  const validar = {
    bienvenida: sec => document.getElementById("consentimiento").checked || errorEn(sec, "Para continuar debe aceptar participar."),
    perfil: sec => {
      const [p, msg] = Perfil.leer();
      if (!p) return errorEn(sec, msg);
      participante.perfil = p; Almacen.set("participante", participante); Object.assign(R, p);
      return errorEn(sec);
    },
    decision: (sec, p) => {
      const d = val("decision_" + p.etapa), c = val("confianza_" + p.etapa);
      if (!d || !c) return errorEn(sec, "Responda la valoración y la confianza.");
      R["decision_" + p.etapa] = d; R["confianza_" + p.etapa] = c;
      Vistas.mostrarPrevias(R);
      return errorEn(sec);
    },
    cuestionario: (sec, p) => {
      const items = E.preguntas["paso" + p.paso];
      for (let i = 0; i < items.length; i++) {
        const v = val(items[i][0]);
        if (!v) return errorEn(sec, `Falta responder la afirmación ${i + 1}.`);
        R[items[i][0]] = Number(v);
      }
      R["comentario_p" + p.paso] = document.getElementById("comentario_p" + p.paso).value.trim();
      return errorEn(sec);
    },
  };

  async function terminar(boton) {
    R["seg_" + PASOS[actual].id] = Math.round((Date.now() - t0) / 1000);
    R.fin = new Date().toISOString();
    R.dispositivo = navigator.userAgent;
    R.ancho_pantalla = window.innerWidth;
    R.figura = asig.figura;             // "normal" (igual a los Excel) o "movil"
    const primera = E.etapas[0];
    R.cambio_decision = R["decision_" + primera] === R.decision_explicacion ? "No" : "Sí";
    boton.disabled = true; boton.textContent = "Enviando…";
    const estado = await Envio.enviar(R);
    boton.disabled = false; boton.textContent = "Enviar respuestas";
    const quedan = Asignacion.registrar(asig);
    document.getElementById("mensajeEnvio").textContent = { enviado: T.enviado, prueba: T.pruebaSinURL, pendiente: T.pendiente }[estado];
    document.getElementById("mensajeMas").textContent = quedan > 0 ? T.otroCaso(quedan) : T.todos;
    document.getElementById("botonOtro").hidden = quedan <= 0;
  }

  document.querySelectorAll("[data-siguiente]").forEach(b => b.addEventListener("click", async () => {
    const p = PASOS[actual], sec = secciones[actual];
    if (validar[p.tipo] && !validar[p.tipo](sec, p)) return;
    if (p.id === "paso6") await terminar(b);
    mostrar(actual + 1);
  }));
  document.getElementById("botonOtro").addEventListener("click", () => { nuevoCaso(); mostrar(2); });

  Perfil.iniciar(participante.perfil);
  nuevoCaso();
  Envio.reintentarPendientes();
  mostrar(0);
})();
