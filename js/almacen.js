/* Almacenamiento local del navegador: perfil, casos ya respondidos, métodos vistos y envíos
 * pendientes. Nada de esto sale del dispositivo salvo lo que se envía en cada respuesta. */
window.Almacen = (() => {
  const k = n => window.CONFIG.PREFIJO_ALMACEN + n;
  const get = (n, defecto) => {
    try { const v = localStorage.getItem(k(n)); return v ? JSON.parse(v) : defecto; } catch (e) { return defecto; }
  };
  const set = (n, v) => { try { localStorage.setItem(k(n), JSON.stringify(v)); } catch (e) { /* modo privado */ } };
  return { get, set };
})();
