/* Envío de cada respuesta a la hoja de Google (Apps Script).
 * Si falla (sin conexión), la respuesta se guarda en el dispositivo y se reintenta al volver a abrir
 * la página, para no perder datos. */
window.Envio = (() => {
  async function post(fila) {
    // no-cors: Apps Script no devuelve cabeceras CORS; la petición llega pero no se puede leer la respuesta.
    await fetch(window.CONFIG.SCRIPT_URL, { method: "POST", mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(fila) });
  }

  /** Devuelve "enviado", "prueba" o "pendiente". */
  async function enviar(fila) {
    if (!window.CONFIG.SCRIPT_URL) {
      console.log("Respuesta (modo de prueba, sin SCRIPT_URL):", JSON.stringify(fila));
      window.ULTIMA_RESPUESTA = fila;          // útil para comprobar el formulario
      return "prueba";
    }
    try { await post(fila); return "enviado"; }
    catch (e) {
      const pend = Almacen.get("pendientes", []); pend.push(fila); Almacen.set("pendientes", pend);
      return "pendiente";
    }
  }

  async function reintentarPendientes() {
    if (!window.CONFIG.SCRIPT_URL) return;
    const pend = Almacen.get("pendientes", []);
    const quedan = [];
    for (const fila of pend) { try { await post(fila); } catch (e) { quedan.push(fila); } }
    Almacen.set("pendientes", quedan);
  }

  return { enviar, reintentarPendientes };
})();
