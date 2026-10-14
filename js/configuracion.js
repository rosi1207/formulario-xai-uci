/* ===================== CONFIGURACIÓN =====================
 * Lo único que hay que tocar para publicar.
 * Los casos, las imágenes y las preguntas NO se editan aquí: los genera exportar_web.py
 * (proyecto privado) en datos/estudio.js e img/.
 */
window.CONFIG = {
  // URL de la aplicación web de Google Apps Script (ver README). Termina en /exec.
  // Vacía = modo de prueba: la respuesta se muestra en la consola del navegador y no se guarda.
  SCRIPT_URL: "https://script.google.com/macros/s/AKfycbytbr7-5dWgkKyWeo3evokzUAyrnvEWE8i6CLGIAKdBrj9ETP-uHczMRQJlCRu3LeK3dQ/exec",

  // Prefijo de lo que se guarda en el navegador (perfil, casos ya respondidos, envíos pendientes).
  // Cámbielo si quiere que todos empiecen de cero tras una nueva versión del estudio.
  PREFIJO_ALMACEN: "xai_uci_v1_",

  // Tiempo estimado que se anuncia en la bienvenida.
  TIEMPO_ESTIMADO: "5–7 minutos por caso",
};
