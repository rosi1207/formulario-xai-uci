// Generado por exportar_web.py desde el proyecto privado. No editar a mano.
// No contiene desenlaces ni el tipo de acierto del modelo.
window.ESTUDIO = {
 "version": "2026-10-14",
 "umbral_mostrado": "32%",
 "mostrar_probabilidad": true,
 "etapas": [
  "sin_modelo",
  "prediccion",
  "explicacion"
 ],
 "escala": "caso",
 "metodos": [
  {
   "id": "shap",
   "etiqueta": "Método A"
  },
  {
   "id": "ig",
   "etiqueta": "Método B"
  }
 ],
 "imagen": "img/{metodo}/{caso}.png",
 "imagen_movil": "img/{metodo}/{caso}_movil.png",
 "casos": [
  {
   "id": "K01",
   "datos": [
    [
     "Edad (años)",
     56
    ],
    [
     "Diagnóstico de ingreso 1",
     "Post-cirugía neurológica"
    ],
    [
     "Diagnóstico de ingreso 2",
     "Sin diagnóstico registrado"
    ],
    [
     "Diagnóstico de egreso 2",
     "BNB-IH"
    ],
    [
     "APACHE",
     15
    ],
    [
     "Ventilación mecánica (días)",
     12
    ]
   ],
   "prediccion": "Bajo riesgo",
   "probabilidad": "19%"
  },
  {
   "id": "K02",
   "datos": [
    [
     "Edad (años)",
     76
    ],
    [
     "Diagnóstico de ingreso 1",
     "EPOC descompensada"
    ],
    [
     "Diagnóstico de ingreso 2",
     "Insuficiencia cardíaca descompensada"
    ],
    [
     "Diagnóstico de egreso 2",
     "Insuficiencia cardíaca descompensada"
    ],
    [
     "APACHE",
     23
    ],
    [
     "Ventilación mecánica (días)",
     7
    ]
   ],
   "prediccion": "Alto riesgo",
   "probabilidad": "98%"
  },
  {
   "id": "K03",
   "datos": [
    [
     "Edad (años)",
     50
    ],
    [
     "Diagnóstico de ingreso 1",
     "Traumatismo craneoencefálico grave"
    ],
    [
     "Diagnóstico de ingreso 2",
     "Post-cirugía neurológica"
    ],
    [
     "Diagnóstico de egreso 2",
     "Post-cirugía neurológica"
    ],
    [
     "APACHE",
     19
    ],
    [
     "Ventilación mecánica (días)",
     4
    ]
   ],
   "prediccion": "Alto riesgo",
   "probabilidad": "49%"
  },
  {
   "id": "K04",
   "datos": [
    [
     "Edad (años)",
     78
    ],
    [
     "Diagnóstico de ingreso 1",
     "EPOC descompensada"
    ],
    [
     "Diagnóstico de ingreso 2",
     "BNV"
    ],
    [
     "Diagnóstico de egreso 2",
     "EPOC descompensada"
    ],
    [
     "APACHE",
     24
    ],
    [
     "Ventilación mecánica (días)",
     8
    ]
   ],
   "prediccion": "Alto riesgo",
   "probabilidad": "95%"
  },
  {
   "id": "K05",
   "datos": [
    [
     "Edad (años)",
     48
    ],
    [
     "Diagnóstico de ingreso 1",
     "Pancreatitis"
    ],
    [
     "Diagnóstico de ingreso 2",
     "SDRA"
    ],
    [
     "Diagnóstico de egreso 2",
     "SDRA"
    ],
    [
     "APACHE",
     8
    ],
    [
     "Ventilación mecánica (días)",
     2
    ]
   ],
   "prediccion": "Alto riesgo",
   "probabilidad": "50%"
  },
  {
   "id": "K06",
   "datos": [
    [
     "Edad (años)",
     51
    ],
    [
     "Diagnóstico de ingreso 1",
     "Traumatismo craneoencefálico grave"
    ],
    [
     "Diagnóstico de ingreso 2",
     "Post-cirugía neurológica"
    ],
    [
     "Diagnóstico de egreso 2",
     "Sin diagnóstico registrado"
    ],
    [
     "APACHE",
     18
    ],
    [
     "Ventilación mecánica (días)",
     2
    ]
   ],
   "prediccion": "Bajo riesgo",
   "probabilidad": "18%"
  },
  {
   "id": "K07",
   "datos": [
    [
     "Edad (años)",
     74
    ],
    [
     "Diagnóstico de ingreso 1",
     "Coma"
    ],
    [
     "Diagnóstico de ingreso 2",
     "Sin diagnóstico registrado"
    ],
    [
     "Diagnóstico de egreso 2",
     "Parada cardíaca recuperada"
    ],
    [
     "APACHE",
     10
    ],
    [
     "Ventilación mecánica (días)",
     3
    ]
   ],
   "prediccion": "Bajo riesgo",
   "probabilidad": "15%"
  },
  {
   "id": "K08",
   "datos": [
    [
     "Edad (años)",
     73
    ],
    [
     "Diagnóstico de ingreso 1",
     "EPOC descompensada"
    ],
    [
     "Diagnóstico de ingreso 2",
     "BNB-EH"
    ],
    [
     "Diagnóstico de egreso 2",
     "BNB-EH"
    ],
    [
     "APACHE",
     24
    ],
    [
     "Ventilación mecánica (días)",
     8
    ]
   ],
   "prediccion": "Alto riesgo",
   "probabilidad": "92%"
  },
  {
   "id": "K09",
   "datos": [
    [
     "Edad (años)",
     30
    ],
    [
     "Diagnóstico de ingreso 1",
     "Traumatismo craneoencefálico grave"
    ],
    [
     "Diagnóstico de ingreso 2",
     "Sin diagnóstico registrado"
    ],
    [
     "Diagnóstico de egreso 2",
     "Sin diagnóstico registrado"
    ],
    [
     "APACHE",
     13
    ],
    [
     "Ventilación mecánica (días)",
     4
    ]
   ],
   "prediccion": "Bajo riesgo",
   "probabilidad": "17%"
  },
  {
   "id": "K10",
   "datos": [
    [
     "Edad (años)",
     53
    ],
    [
     "Diagnóstico de ingreso 1",
     "Politraumatismo"
    ],
    [
     "Diagnóstico de ingreso 2",
     "Embolia grasa"
    ],
    [
     "Diagnóstico de egreso 2",
     "Embolia grasa"
    ],
    [
     "APACHE",
     18
    ],
    [
     "Ventilación mecánica (días)",
     3
    ]
   ],
   "prediccion": "Bajo riesgo",
   "probabilidad": "3%"
  },
  {
   "id": "K11",
   "datos": [
    [
     "Edad (años)",
     52
    ],
    [
     "Diagnóstico de ingreso 1",
     "BNB-EH"
    ],
    [
     "Diagnóstico de ingreso 2",
     "Sin diagnóstico registrado"
    ],
    [
     "Diagnóstico de egreso 2",
     "Post-toracotomía"
    ],
    [
     "APACHE",
     19
    ],
    [
     "Ventilación mecánica (días)",
     5
    ]
   ],
   "prediccion": "Alto riesgo",
   "probabilidad": "38%"
  },
  {
   "id": "K12",
   "datos": [
    [
     "Edad (años)",
     66
    ],
    [
     "Diagnóstico de ingreso 1",
     "EPOC descompensada"
    ],
    [
     "Diagnóstico de ingreso 2",
     "BNB-EH"
    ],
    [
     "Diagnóstico de egreso 2",
     "BNB-EH"
    ],
    [
     "APACHE",
     17
    ],
    [
     "Ventilación mecánica (días)",
     4
    ]
   ],
   "prediccion": "Alto riesgo",
   "probabilidad": "58%"
  },
  {
   "id": "K13",
   "datos": [
    [
     "Edad (años)",
     41
    ],
    [
     "Diagnóstico de ingreso 1",
     "EPOC descompensada"
    ],
    [
     "Diagnóstico de ingreso 2",
     "Insuficiencia cardíaca descompensada"
    ],
    [
     "Diagnóstico de egreso 2",
     "Insuficiencia cardíaca descompensada"
    ],
    [
     "APACHE",
     17
    ],
    [
     "Ventilación mecánica (días)",
     11
    ]
   ],
   "prediccion": "Alto riesgo",
   "probabilidad": "36%"
  },
  {
   "id": "K14",
   "datos": [
    [
     "Edad (años)",
     56
    ],
    [
     "Diagnóstico de ingreso 1",
     "EPOC descompensada"
    ],
    [
     "Diagnóstico de ingreso 2",
     "Sin diagnóstico registrado"
    ],
    [
     "Diagnóstico de egreso 2",
     "Sin diagnóstico registrado"
    ],
    [
     "APACHE",
     14
    ],
    [
     "Ventilación mecánica (días)",
     2
    ]
   ],
   "prediccion": "Bajo riesgo",
   "probabilidad": "29%"
  },
  {
   "id": "K15",
   "datos": [
    [
     "Edad (años)",
     48
    ],
    [
     "Diagnóstico de ingreso 1",
     "SDRA"
    ],
    [
     "Diagnóstico de ingreso 2",
     "BNB-EH"
    ],
    [
     "Diagnóstico de egreso 2",
     "BNB-EH"
    ],
    [
     "APACHE",
     4
    ],
    [
     "Ventilación mecánica (días)",
     17
    ]
   ],
   "prediccion": "Bajo riesgo",
   "probabilidad": "27%"
  }
 ],
 "preguntas": {
  "paso5": [
   [
    "T1",
    7,
    "Tengo confianza en esta explicación sobre el riesgo de los pacientes."
   ],
   [
    "D1",
    7,
    "Tengo recelo de esta explicación sobre el riesgo de los pacientes."
   ],
   [
    "S1",
    5,
    "A partir de estas explicaciones, entiendo cómo el sistema llegó a la predicción de mortalidad oculta."
   ],
   [
    "S2",
    5,
    "Estas explicaciones me permiten anticipar qué predicciones daría el sistema en pacientes similares."
   ],
   [
    "S3",
    5,
    "Estas explicaciones me ayudarían a notar si el sistema se equivocó en el riesgo de un paciente."
   ],
   [
    "S4",
    5,
    "Podría explicarle a un colega el razonamiento del sistema para los pacientes."
   ],
   [
    "S5",
    5,
    "Gracias a esta explicación, sé qué tan confiable es cada predicción para estos pacientes en particular."
   ],
   [
    "I1",
    5,
    "Los términos y el formato de las explicaciones me resultaron familiares."
   ],
   [
    "I2",
    5,
    "Pude identificar, sin mucho esfuerzo, qué factores de los pacientes destaca cada explicación."
   ],
   [
    "I3",
    5,
    "La relación entre los factores señalados y el riesgo de cada paciente tiene sentido clínico para mí."
   ]
  ],
  "paso6": [
   [
    "U1",
    5,
    "Estas explicaciones fueron fáciles de usar para apoyar mi valoración de cada paciente."
   ],
   [
    "C1",
    5,
    "La explicación incluyó los factores relevantes para cada paciente, con precisión suficiente."
   ],
   [
    "C2",
    5,
    "Pude usar estas explicaciones junto con mi conocimiento clínico."
   ],
   [
    "C3",
    5,
    "No encontré inconsistencias entre las explicaciones y la evolución clínica esperada de cada paciente."
   ],
   [
    "C4",
    5,
    "No necesité referencias adicionales (p. ej. guías clínicas) para interpretar estas explicaciones."
   ],
   [
    "C5",
    5,
    "Estas explicaciones cambiarían cómo yo monitorizaría o trataría a los pacientes."
   ]
  ]
 },
 "confianza": [
  "50%",
  "60%",
  "70%",
  "80%",
  "90%",
  "100%"
 ]
};
