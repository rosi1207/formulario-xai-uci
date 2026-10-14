/* Perfil del participante, con preguntas que dependen de su situación.
 * Se pide una sola vez por dispositivo; las siguientes veces se muestra relleno para revisarlo. */
window.Perfil = (() => {
  const ESPECIALIDADES = ["Medicina Intensiva y Emergencias", "Medicina Interna", "Anestesiología y Reanimación",
    "Cardiología", "Neumología", "Nefrología", "Neurología", "Cirugía General", "Medicina General Integral", "Pediatría"];
  const opciones = (name, valores, etiquetas) => `<div class="opts">${valores.map((v, i) =>
    `<label><input type="radio" name="${name}" value="${v}">${etiquetas ? etiquetas[i] : v}</label>`).join("")}</div>`;
  const ordinales = n => Array.from({ length: n }, (_, i) => `${i + 1}.º`);

  function html() {
    return `
    <h2>Perfil del participante</h2>
    <div id="perfilConocido" class="prev" hidden>Ya respondió antes desde este dispositivo. Revise que sus datos sigan siendo correctos.</div>
    <fieldset><legend>¿Cuál es su situación actual?</legend>
      ${opciones("perfil", ["Estudiante de Medicina", "Médico general", "Residente", "Especialista"],
                 ["Estudiante de Medicina", "Médico/a graduado/a (sin especialidad)", "Residente", "Especialista"])}
    </fieldset>
    <div data-para="Estudiante de Medicina" hidden><fieldset><legend>¿En qué año de la carrera está?</legend>
      ${opciones("anio_carrera", [1, 2, 3, 4, 5, 6], ordinales(6))}</fieldset></div>
    <div data-para="Médico general|Residente|Especialista" hidden><fieldset><legend>¿Cuántos años lleva graduado/a de médico/a?</legend>
      <input type="number" id="anios_graduado" min="0" max="60" step="1" inputmode="numeric" placeholder="Ej.: 4"></fieldset></div>
    <div data-para="Residente|Especialista" hidden><fieldset><legend id="leyendaEsp">Especialidad</legend>
      <select id="especialidad"><option value="">Seleccione…</option>
        ${ESPECIALIDADES.map(e => `<option>${e}</option>`).join("")}<option value="Otra">Otra…</option></select>
      <input type="text" id="especialidad_otra" class="sub" placeholder="Escriba su especialidad" hidden></fieldset></div>
    <div data-para="Residente" hidden><fieldset><legend>¿En qué año de la residencia está?</legend>
      ${opciones("anio_residencia", [1, 2, 3, 4, 5], ordinales(5))}</fieldset></div>
    <div data-para="Especialista" hidden><fieldset><legend>¿Cuántos años lleva de especialista?</legend>
      <input type="number" id="anios_especialista" min="0" max="60" step="1" inputmode="numeric" placeholder="Ej.: 10"></fieldset></div>
    <div data-para="Médico general|Residente|Especialista" hidden><fieldset><legend>¿Cuántos años de experiencia tiene trabajando en UCI?</legend>
      <input type="number" id="anios_uci" min="0" max="60" step="1" inputmode="numeric" placeholder="Ponga 0 si no ha trabajado en UCI"></fieldset></div>`;
  }

  const val = n => (document.querySelector(`input[name="${n}"]:checked`) || {}).value;
  const num = id => document.getElementById(id).value;

  function actualizar() {
    const p = val("perfil");
    document.querySelectorAll("[data-para]").forEach(d => d.hidden = !p || !d.dataset.para.split("|").includes(p));
    document.getElementById("leyendaEsp").textContent = p === "Residente" ? "¿De qué especialidad es su residencia?" : "¿Cuál es su especialidad?";
    document.getElementById("especialidad_otra").hidden = document.getElementById("especialidad").value !== "Otra";
  }

  function iniciar(guardado) {
    document.querySelectorAll('input[name="perfil"]').forEach(i => i.addEventListener("change", actualizar));
    document.getElementById("especialidad").addEventListener("change", actualizar);
    if (!guardado) return;
    document.getElementById("perfilConocido").hidden = false;
    const marcar = (n, v) => { const r = document.querySelector(`input[name="${n}"][value="${v}"]`); if (r) r.checked = true; };
    marcar("perfil", guardado.perfil); marcar("anio_carrera", guardado.anio_carrera); marcar("anio_residencia", guardado.anio_residencia);
    ["anios_graduado", "anios_especialista", "anios_uci"].forEach(k => document.getElementById(k).value = guardado[k] ?? "");
    const sel = document.getElementById("especialidad");
    if (guardado.especialidad) {
      if ([...sel.options].some(o => o.value === guardado.especialidad)) sel.value = guardado.especialidad;
      else { sel.value = "Otra"; document.getElementById("especialidad_otra").value = guardado.especialidad; }
    }
    actualizar();
  }

  /** Devuelve [perfil, mensaje de error]. */
  function leer() {
    const p = val("perfil");
    if (!p) return [null, "Indique su situación actual."];
    const r = { perfil: p, anio_carrera: "", anios_graduado: "", especialidad: "", anio_residencia: "", anios_especialista: "", anios_uci: "" };
    if (p === "Estudiante de Medicina") {
      r.anio_carrera = val("anio_carrera");
      return r.anio_carrera ? [r, ""] : [null, "Indique en qué año de la carrera está."];
    }
    r.anios_graduado = num("anios_graduado");
    if (r.anios_graduado === "") return [null, "Indique cuántos años lleva graduado/a."];
    if (p === "Residente" || p === "Especialista") {
      let e = document.getElementById("especialidad").value;
      if (e === "Otra") e = document.getElementById("especialidad_otra").value.trim();
      if (!e) return [null, "Indique la especialidad."];
      r.especialidad = e;
    }
    if (p === "Residente") {
      r.anio_residencia = val("anio_residencia");
      if (!r.anio_residencia) return [null, "Indique en qué año de la residencia está."];
    }
    if (p === "Especialista") {
      r.anios_especialista = num("anios_especialista");
      if (r.anios_especialista === "") return [null, "Indique cuántos años lleva de especialista."];
    }
    r.anios_uci = num("anios_uci");
    if (r.anios_uci === "") return [null, "Indique sus años de experiencia en UCI (0 si ninguno)."];
    return [r, ""];
  }

  return { html, iniciar, leer };
})();
