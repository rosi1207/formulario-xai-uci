/**
 * Recibe las respuestas del formulario y las añade como filas en la hoja "Respuestas".
 *
 * Instalación (ver README):
 *   Google Sheets -> Extensiones -> Apps Script -> pegar este archivo -> Guardar
 *   Implementar -> Nueva implementación -> Aplicación web
 *     Ejecutar como: Yo | Quién tiene acceso: Cualquier persona
 *   Copiar la URL que termina en /exec en js/configuracion.js (SCRIPT_URL).
 * Tras cambiar este código: Implementar -> Administrar implementaciones -> editar -> Nueva versión.
 *
 * Las columnas se crean solas: si una respuesta trae un campo nuevo (otra etapa, otra pregunta),
 * se añade una columna al final sin tocar las anteriores. Así no hay que mantener aquí la lista
 * de columnas cada vez que cambia el estudio.
 */
const HOJA = "Respuestas";
const MAX_CAMPOS = 200;          // defensa básica contra envíos malformados
const MAX_LARGO = 5000;          // caracteres por celda

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const datos = JSON.parse(e.postData.contents);
    if (typeof datos !== "object" || Array.isArray(datos) || !datos.participante || !datos.caso) {
      return ContentService.createTextOutput("rechazado");
    }
    const claves = Object.keys(datos).slice(0, MAX_CAMPOS);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const hoja = ss.getSheetByName(HOJA) || ss.insertSheet(HOJA);

    let cabecera = hoja.getLastRow() > 0
      ? hoja.getRange(1, 1, 1, hoja.getLastColumn()).getValues()[0].map(String)
      : ["recibido"];
    const nuevas = claves.filter(k => !cabecera.includes(k));
    if (nuevas.length) {
      cabecera = cabecera.concat(nuevas);
      hoja.getRange(1, 1, 1, cabecera.length).setValues([cabecera]);
      hoja.setFrozenRows(1);
    }
    datos.recibido = new Date();
    const fila = cabecera.map(k => {
      const v = datos[k];
      if (v === undefined || v === null) return "";
      const s = typeof v === "object" ? JSON.stringify(v) : v;
      // evita que un texto que empieza por = + - @ se interprete como fórmula
      return typeof s === "string" ? ((/^[=+\-@]/.test(s) ? "'" : "") + s.slice(0, MAX_LARGO)) : s;
    });
    hoja.appendRow(fila);
    return ContentService.createTextOutput("ok");
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return ContentService.createTextOutput("El formulario está activo.");
}
