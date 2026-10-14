/* Textos que ve el participante. Están separados del código para poder revisarlos con los
 * coautores (y con el comité de ética) sin tocar la lógica. */
window.TEXTOS = {
  bienvenida: {
    titulo: "Bienvenido/a",
    estudio: "Este estudio evalúa si las explicaciones de un modelo predictivo de <b>mortalidad oculta</b> ayudan a tomar decisiones clínicas, y cómo cambia la confianza al usarlas.",
    definicion: "<b>Mortalidad oculta:</b> que un paciente fallezca durante el resto de su hospitalización, <b>después de haber sido egresado de la Unidad de Cuidados Intensivos (UCI)</b>. No se trata de la mortalidad durante la estancia en la UCI.",
    queHara: "Verá <b>un caso</b> de un paciente real (anonimizado) en el momento de su egreso de la UCI. Lo valorará primero solo con sus datos clínicos y después con la ayuda del modelo, y podrá mantener o cambiar su valoración. Al final responderá unas preguntas breves sobre la explicación.",
    importante: [
      "No se muestra el desenlace real del paciente. Por favor no lo busque ni lo infiera de otras fuentes.",
      "Avance en orden; no podrá volver atrás para cambiar respuestas.",
      "No hay respuestas correctas o incorrectas: interesa su criterio clínico con la información disponible en cada momento.",
    ],
    // Adapte este texto a lo aprobado por el comité de ética.
    consentimiento: "He leído la información anterior y acepto participar de forma voluntaria y anónima. Entiendo que mis respuestas se usarán solo con fines de investigación.",
  },
  pregunta: "¿Considera que este paciente tiene ALTA o BAJA probabilidad de fallecer después del egreso de la UCI?",
  preguntaConfianza: "¿Cuánta confianza tiene en su valoración?",
  etapas: {
    sin_modelo: { tag: "Solo los datos del paciente", ayuda: "" },
    prediccion: { tag: "Con la predicción del modelo",
                  ayuda: "El modelo estima la probabilidad de que el paciente fallezca después de su egreso de la UCI." },
    explicacion: { tag: "Con la explicación del modelo",
                   ayuda: "Cada barra es un dato del paciente. Las barras rojas (a la derecha) son datos que, según el modelo, AUMENTAN su riesgo de fallecer tras el egreso de la UCI; las azules (a la izquierda), datos que lo DISMINUYEN. Cuanto más larga la barra, más pesa ese dato en la predicción." },
  },
  modelo: umbral => `El modelo clasifica al paciente como ALTO RIESGO cuando la probabilidad estimada es igual o mayor que ${umbral}. Se ajustó para no dejar escapar fallecidos, por lo que da más falsas alarmas que fallecidos no detectados.`,
  paso5: { tag: "Su opinión sobre la explicación", titulo: "¿Qué le pareció la explicación?",
           comentario: "¿Qué le ayudó o le confundió de la explicación?" },
  paso6: { tag: "La explicación y su decisión", titulo: "¿Cómo le sirvió para decidir?",
           comentario: "¿Cambiaría algo en su manejo de este paciente? ¿Por qué?" },
  extremos: { 7: ["1 = Nada", "7 = Extremadamente"], 5: ["1 = Totalmente en desacuerdo", "5 = Totalmente de acuerdo"] },
  gracias: "¡Gracias por participar!",
  enviado: "Sus respuestas se registraron correctamente.",
  pruebaSinURL: "Modo de prueba: la URL de envío aún no está configurada, así que esta respuesta no se guardó (está en la consola del navegador).",
  pendiente: "No se pudo enviar ahora. Su respuesta quedó guardada en este dispositivo y se enviará automáticamente la próxima vez que abra la página con conexión.",
  otroCaso: n => `Si dispone de unos minutos más, puede valorar otro caso distinto (quedan ${n}). Cada caso cuenta mucho para el estudio.`,
  todos: "Ya valoró todos los casos disponibles. ¡Muchas gracias!",
};
