/* Qué caso y qué método ve el participante.
 * - Caso: al azar entre los que aún no respondió en este dispositivo.
 * - Método: equilibrado por participante Y por caso (tipo cuadrado latino). Cada participante tiene un
 *   desfase fijo, calculado a partir de su código; el método de un caso es
 *       metodos[(desfase + posición del caso en el estudio) % nº de métodos].
 *   Así cada participante ve los métodos alternados entre casos, y cada caso recibe los distintos
 *   métodos entre participantes: un método no queda asociado a los casos más difíciles.
 *   El método de un caso no depende del orden en que se respondan los casos. */
window.Asignacion = (() => {
  const azar = arr => arr[Math.floor(Math.random() * arr.length)];

  function desfase(id) {
    let h = 0;
    for (const ch of String(id)) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
    return h;
  }

  function metodoDe(participanteId, caso) {
    const E = window.ESTUDIO;
    const k = E.casos.findIndex(c => c.id === caso.id);
    return E.metodos[(desfase(participanteId) + k) % E.metodos.length];
  }

  function siguiente(participanteId) {
    const E = window.ESTUDIO;
    const hechos = Almacen.get("hechos", []);
    let pool = E.casos.filter(c => !hechos.includes(c.id));
    if (pool.length === 0) pool = E.casos.slice();
    const caso = azar(pool);
    return { caso, metodo: metodoDe(participanteId, caso) };
  }

  function registrar(asig) {
    const hechos = Almacen.get("hechos", []);
    hechos.push(asig.caso.id);
    Almacen.set("hechos", hechos);
    const vistos = Almacen.get("metodos_vistos", {});
    vistos[asig.metodo.id] = (vistos[asig.metodo.id] || 0) + 1;
    Almacen.set("metodos_vistos", vistos);
    return window.ESTUDIO.casos.length - new Set(hechos).size;   // casos que quedan
  }

  return { siguiente, registrar };
})();
