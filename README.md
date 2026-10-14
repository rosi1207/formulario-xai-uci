# Formulario online: mortalidad oculta en UCI, decisión clínica con y sin explicación

Página estática (GitHub Pages) para la **Etapa 3** (pasos 5 y 6) del estudio de evaluación de explicaciones del proyecto `XAI-Intensive-Care-Hidden-Mortality`. Permite que médicos de otros hospitales valoren casos y respondan los cuestionarios; las respuestas llegan a una hoja de Google.

## Qué hace el participante

1. Lee la información del estudio (qué es la **mortalidad oculta**: fallecer durante el resto de la hospitalización, *después* del egreso de la UCI) y acepta participar.
2. Rellena su perfil (solo la primera vez en ese dispositivo). El perfil determina su grupo en el análisis: especialistas o residentes de Medicina Intensiva, especialidades afines, médicos generales o estudiantes.
3. Recibe **un caso** al azar entre los que aún no respondió, y lo valora en varias etapas (configurables):
   - solo con los datos del paciente;
   - con la predicción del modelo;
   - con la predicción y la **explicación** de un método. El método está equilibrado por participante y por caso: cada participante ve los métodos alternados, y cada caso recibe los distintos métodos entre participantes (`js/asignacion.js`).
4. Responde el cuestionario del paso 5 (percepción) y del paso 6 (impacto en la decisión) sobre esa explicación.
5. Puede responder otro caso.

Cada caso respondido es **una fila** en la hoja de Google. El tiempo de cada pantalla se registra solo.

## Estructura

```
index.html              esqueleto de la página
css/estilos.css         estilos (tema claro/oscuro, móvil)
js/configuracion.js     ← lo único que se edita: SCRIPT_URL y opciones
js/textos.js            textos que ve el participante (revisar con coautores / comité de ética)
js/almacen.js           memoria del navegador (perfil, casos hechos, envíos pendientes)
js/asignacion.js        qué caso y qué método ve cada participante
js/perfil.js            perfil con preguntas condicionales
js/vistas.js            construcción de las pantallas
js/envio.js             envío a Google Sheets (con reintento si falla la conexión)
js/app.js               flujo, validación y tiempos
apps-script/Codigo.gs   código que recibe las respuestas en la hoja de Google
datos/estudio.js        ← GENERADO por exportar_web.py (no editar)
img/<metodo>/*.png      ← GENERADO por exportar_web.py (no editar)
```

`datos/` e `img/` se generan desde el proyecto privado con `Evaluations_Stage3/Exportar_web.ipynb`: los mismos casos y las mismas figuras que los formularios Excel. **Este repositorio no contiene** desenlaces, el tipo de acierto del modelo ni los modelos: eso queda en el proyecto privado (`clave_estudio.xlsx`).

## Puesta en marcha

### 1. Generar los datos y las figuras
En el proyecto privado, abrir `Evaluations_Stage3/Exportar_web.ipynb`, poner en `CARPETA_WEB` la ruta de este repositorio y ejecutarlo. Crea `datos/estudio.js` e `img/`.

Para probar en local basta con abrir `index.html` en el navegador (sin `SCRIPT_URL`, la respuesta se muestra en la consola y no se guarda).

### 2. Crear la hoja donde llegan las respuestas
1. Crear una Google Sheet nueva (sheets.new).
2. **Extensiones → Apps Script**, borrar lo que haya, pegar `apps-script/Codigo.gs` y guardar.
3. **Implementar → Nueva implementación →** tipo **Aplicación web**. Ejecutar como: **Yo**. Quién tiene acceso: **Cualquier persona**.
4. Autorizar y copiar la URL (termina en `/exec`).
5. Pegarla en `js/configuracion.js` → `SCRIPT_URL`.

Las columnas se crean solas con la primera respuesta (y se añaden si el estudio cambia).

### 3. Publicar con GitHub Pages
1. Subir todo el repositorio (incluidos `datos/` e `img/`).
2. **Settings → Pages → Branch: main / (root) → Save**.
3. En uno o dos minutos: `https://<usuario>.github.io/<repositorio>/`.

### 4. Probar antes de compartir
Responder un caso completo y comprobar que aparece la fila en la hoja "Respuestas"; después borrar esa fila.

## Analizar las respuestas
Descargar la hoja (**Archivo → Descargar → .csv**), guardarla en el proyecto privado (`Evaluations_Stage3/`) y poner su nombre en `RESPUESTAS_WEB` en `Evaluar_pasos5_6.ipynb`, y la fecha de apertura de la página en `APERTURA_WEB` (lo anterior se considera prueba). Se analizan con las mismas medidas que los formularios Excel, pero **por separado y por grupo**, según el plan de análisis del proyecto privado (README, sección 7.5): control de calidad, grupos G1–G5 e intervalos *bootstrap* por participante.

## Cambiar el estudio
- **Otros casos, métodos o etapas:** volver a ejecutar `Exportar_web.ipynb` y subir `datos/` e `img/`.
- **Si cambian los casos o el diseño:** cambiar `PREFIJO_ALMACEN` en `js/configuracion.js` para que los navegadores olviden los casos ya hechos. Cada respuesta guarda la `version` del estudio.
- **Si cambia `Codigo.gs`:** Apps Script → Implementar → Administrar implementaciones → editar → **Nueva versión**.

## Privacidad y ética
- La página es **pública** y muestra datos clínicos reales de 15 pacientes (sin nombres). Confirmar que la publicación está cubierta por la aprobación del comité de ética; si no, exportar con `EDAD_EN_RANGOS = True` o restringir el acceso.
- El texto de consentimiento está en `js/textos.js`: adaptarlo al aprobado por el comité.
- El participante se identifica solo con un código aleatorio por dispositivo. Se guarda el navegador (`dispositivo`) y el ancho de pantalla para poder analizar si responder en móvil influye.
- Cualquiera con el enlace puede enviar respuestas: revisar la hoja antes de analizarla.
