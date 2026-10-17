# Spec 001 — Registro de actividades (hábitos diarios)

## 1. Contexto y objetivo
Quien quiere mantener hábitos diarios (leer, hacer ejercicio, meditar…) necesita una forma rápida de registrarlos, marcar cada día si los ha cumplido y ver cuántos días seguidos lleva. El objetivo de este MVP es ofrecer, mediante una API HTTP, tres capacidades: gestionar actividades (crear, consultar, editar y borrar), marcarlas como hechas hoy y listarlas con su racha y un resumen de su historial. Los pasos ordenados dentro de una actividad forman parte del proyecto, pero llegarán en una spec posterior.

## 2. Usuarios
- **Persona usuaria individual**: una sola persona, en local y sin autenticación, que registra sus propios hábitos a través de la API HTTP.

## 3. Historias de usuario
- **HU-1**: Como usuaria, quiero crear una actividad con nombre y una descripción opcional, para empezar a seguir un hábito.
- **HU-2**: Como usuaria, quiero consultar una actividad con su historial completo, editarla o borrarla, para mantener mi lista al día.
- **HU-3**: Como usuaria, quiero marcar una actividad como hecha hoy, para dejar constancia de que la he cumplido.
- **HU-4**: Como usuaria, quiero listar mis actividades con su racha y un resumen de su historial (total de días y último día hecho), para ver mi progreso de un vistazo.

## 4. Requisitos funcionales

### Catálogo de errores
Los textos son literales y se comprueban tal cual.

| Código | Tipo | Texto |
|---|---|---|
| E-01 | validación | «El nombre es obligatorio.» |
| E-02 | validación | «El nombre no puede superar los 100 caracteres.» |
| E-03 | validación | «La descripción no puede superar los 500 caracteres.» |
| E-04 | validación | «El campo «{campo}» no se puede modificar.» |
| E-05 | conflicto | «Ya existe una actividad con ese nombre.» |
| E-06 | conflicto | «La actividad ya está marcada como hecha hoy.» |
| E-07 | no encontrada | «Actividad no encontrada.» |
| E-08 | almacenamiento | «No se pudieron leer los datos guardados.» |
| E-09 | almacenamiento | «No se pudieron guardar los datos.» |
| E-10 | validación | «El cuerpo de la petición no es un JSON válido.» |
| E-11 | no encontrada | «Ruta no encontrada.» |

### Definiciones
- **Carácter**: punto de código Unicode tras normalizar el texto a NFC. Una letra con tilde combinada cuenta como uno; un emoji compuesto cuenta como varios.
- **Nombre normalizado**: el nombre recortado, con los espacios internos consecutivos reducidos a uno, sin tildes ni diacríticos y comparado sin distinguir mayúsculas según Unicode completo. Solo se usa para comprobar la unicidad; el nombre se guarda recortado, tal como lo escribió la usuaria.
- **Hoy**: la fecha local del sistema en el momento de recibir la petición. Se fija una sola vez por operación.

### RF-1 — Crear actividad
- Cuando la usuaria cree una actividad con un nombre válido, el sistema deberá guardarla con un identificador UUID generado, el nombre recortado, la fecha y hora de creación y un historial vacío, y devolver su detalle (RF-3).
- Si el nombre falta o queda vacío tras recortar, entonces el sistema deberá rechazar la operación con E-01.
- Si el nombre recortado supera los 100 caracteres, entonces el sistema deberá rechazar la operación con E-02.
- Si ya existe otra actividad con el mismo nombre normalizado, entonces el sistema deberá rechazar la operación con E-05.
- Si el nombre es nulo, entonces el sistema deberá rechazar la operación con E-01.
- Si el nombre llega con un valor que no es texto ni nulo, entonces el sistema deberá convertirlo a su representación JSON en texto antes de validarlo.

### RF-2 — Descripción opcional
- Cuando la usuaria aporte una descripción, el sistema deberá guardarla recortada.
- Cuando la usuaria aporte una descripción que queda vacía tras recortar, el sistema deberá guardar la actividad sin descripción.
- Si la descripción recortada supera los 500 caracteres, entonces el sistema deberá rechazar la operación con E-03.
- Cuando la usuaria cree una actividad con la descripción nula, el sistema deberá guardar la actividad sin descripción.
- Si la descripción llega con un valor que no es texto ni nulo, entonces el sistema deberá convertirla a su representación JSON en texto antes de validarla.

### RF-3 — Consultar una actividad
- Cuando la usuaria consulte una actividad por su identificador, el sistema deberá devolver su detalle: identificador, nombre, descripción (nula si no tiene), fecha y hora de creación, si está hecha hoy, racha actual, total de días hechos, fecha del último día hecho (nula si nunca se marcó) e historial completo de fechas en orden ascendente.
- Si no existe ninguna actividad con ese identificador, o el identificador no tiene formato UUID, entonces el sistema deberá responder con E-07.

### RF-4 — Editar una actividad
- Cuando la usuaria edite el nombre o la descripción de una actividad existente, el sistema deberá aplicar solo los campos enviados y devolver el detalle actualizado (RF-3).
- Cuando la usuaria envíe una edición sin nombre ni descripción, el sistema deberá devolver el detalle de la actividad sin cambios.
- Cuando la usuaria envíe en una edición la descripción vacía o nula, el sistema deberá eliminar la descripción de la actividad.
- El sistema deberá aplicar a los valores editados las mismas reglas que RF-1 y RF-2. Para la unicidad no cuenta la propia actividad.
- Si la edición incluye el identificador, la fecha de creación o el historial, entonces el sistema deberá rechazarla entera con E-04, indicando el campo, y no aplicar ningún cambio.
- Si la edición incluye campos desconocidos, entonces el sistema deberá ignorarlos.
- Si la actividad no existe, entonces el sistema deberá responder con E-07.

### RF-5 — Borrar una actividad
- Cuando la usuaria borre una actividad existente, el sistema deberá eliminarla junto con todo su historial de forma definitiva, sin pedir confirmación, y responder sin contenido.
- Si la actividad no existe, entonces el sistema deberá responder con E-07.

### RF-6 — Marcar como hecha hoy
- Cuando la usuaria marque una actividad como hecha, el sistema deberá añadir hoy a su historial y devolver su detalle actualizado (RF-3).
- Si la actividad ya está marcada hoy, entonces el sistema deberá rechazar la operación con E-06 y dejar el historial sin cambios.
- Si la actividad no existe, entonces el sistema deberá responder con E-07.

### RF-7 — Listar actividades
- Cuando la usuaria liste las actividades, el sistema deberá devolverlas todas ordenadas por fecha y hora de creación ascendente y, en caso de empate, por orden de inserción. De cada una mostrará: identificador, nombre, descripción (nula si no tiene), si está hecha hoy, racha actual, total de días hechos y fecha del último día hecho (nula si nunca se marcó).
- Mientras no existan actividades, cuando la usuaria liste las actividades, el sistema deberá devolver una lista vacía.

### RF-8 — Cálculo de la racha
- El sistema deberá calcular la racha como el número de días consecutivos del historial que terminan hoy, si hoy está marcada, o ayer, si hoy no lo está.
- Si el último día hecho es anterior a ayer o el historial está vacío, entonces el sistema deberá informar una racha de 0.

### RF-9 — Precedencia de errores
- El sistema deberá informar un único error por operación, con esta precedencia: 1) E-11; 2) E-10; 3) E-07; 4) errores de formato, por este orden de campos: campos no modificables (identificador, fecha de creación, historial; E-04 nombra el primero presente), nombre (E-01, E-02) y descripción (E-03); 5) errores de conflicto (E-05, E-06).

### RF-11 — Peticiones mal formadas
- Si el cuerpo de una petición no es un JSON válido o no es un objeto, entonces el sistema deberá rechazarla con E-10.
- Cuando una petición llegue con el cuerpo vacío, el sistema deberá tratarlo como un objeto vacío.
- Si la petición no corresponde a ninguna operación de la API (ruta o método inexistente), entonces el sistema deberá responder con E-11.

### RF-10 — Datos guardados
- Mientras no existan datos guardados, el sistema deberá comportarse como si no hubiera ninguna actividad.
- Si los datos guardados no se pueden interpretar, o contienen datos que incumplen esta spec (nombres duplicados, fechas futuras o fechas repetidas en un historial), entonces el sistema deberá responder con E-08 y no modificar los datos.
- Si los datos no se pueden guardar, entonces el sistema deberá responder con E-09 y no dar la operación por realizada.

## 5. Requisitos no funcionales
- **RNF-1**: Los datos deberán persistir entre ejecuciones y guardarse en un formato legible por una persona.
- **RNF-2**: Todos los mensajes dirigidos a la usuaria, incluidos los de error, deberán estar en español y coincidir con el catálogo de errores.
- **RNF-3**: Los nombres de campo expuestos por la API y los persistidos deberán estar en inglés.
- **RNF-4**: Cada respuesta de error deberá identificar su tipo (validación, conflicto, no encontrada o almacenamiento) de forma distinguible, para que quien use la API pueda reaccionar a cada uno.
- **RNF-5**: Las fechas se representarán en ISO 8601: los días como AAAA-MM-DD y la creación como fecha y hora local.
- **RNF-6**: El comportamiento deberá poder verificarse con tests automáticos sin depender de la fecha real ni de los datos reales de la usuaria.

## 6. Casos límite
- Un nombre con solo espacios da E-01.
- Un nombre de 100 caracteres es válido y uno de 101 da E-02, contando tras recortar.
- Una «é» escrita como «e» + tilde combinada cuenta como un carácter.
- Un emoji compuesto (p. ej. 👨‍👩‍👧) cuenta como varios caracteres, uno por punto de código.
- «Leer», «  leer », «LEER» y «Leer» con espacios internos dobles son el mismo nombre.
- «Meditación» y «meditacion» son el mismo nombre, y «Straße» y «STRASSE» también.
- Se puede renombrar una actividad con su propio nombre, incluso cambiando las mayúsculas o las tildes.
- Editar sin campos no es error y la actividad no cambia.
- Editar con un campo desconocido lo ignora y aplica el resto.
- Editar incluyendo el historial da E-04 y no aplica ningún cambio, aunque también se envíe un nombre válido.
- Una edición con la descripción nula la elimina; omitir la descripción la deja igual.
- El identificador «abc» da E-07.
- Editar una actividad inexistente con un nombre inválido da E-07, no E-01.
- Marcar por primera vez una actividad recién creada da una racha de 1.
- Marcada ayer y no hoy: la racha conserva su valor y «hecha hoy» es falso.
- Último día hecho anteayer: la racha es 0, pero el total de días se mantiene.
- Huecos en el historial: la racha solo cuenta el tramo final consecutivo.
- Una petición que llega a las 23:59:59 usa esa fecha como hoy durante toda la operación.
- Si se borra una actividad y se crea otra con el mismo nombre, la nueva empieza con el historial vacío y otro identificador.
- Sin datos guardados (primera ejecución), el listado devuelve una lista vacía.
- Datos guardados con una fecha futura o repetida en un historial dan E-08 en cualquier operación.
- Un nombre enviado como número 123 se guarda como «123»; un nombre nulo da E-01.
- Una edición con historial y nombre vacío da E-04, no E-01.
- Un cuerpo que no es JSON válido, o que es una lista, da E-10.
- Una ruta inexistente, o un método no admitido en una ruta existente, da E-11.

## 7. Fuera de alcance
- Pasos dentro de una actividad (llegarán en una spec posterior).
- Desmarcar un día y editar el historial (añadir o quitar días pasados).
- Archivar o restaurar actividades borradas.
- Filtros, búsqueda, paginación y órdenes alternativos en el listado.
- Frecuencias distintas de la diaria (semanal, días concretos…).
- Varias personas usuarias, autenticación y sincronización.
- Peticiones concurrentes: se asume una sola petición a la vez.
- Límites de volumen (número de actividades, tamaño del historial) y objetivos de rendimiento.
- Recordatorios, notificaciones y estadísticas más allá de la racha y el total.

## 8. Criterios de finalización
- Cada criterio de aceptación de RF-1 a RF-11 tiene al menos un test automático que lo cubre, y todos pasan.
- Los casos límite de la sección 6 están cubiertos por tests.
- Los tests no usan la fecha real ni los datos reales de la usuaria (RNF-6).
- Cada error del catálogo se comprueba en algún test por su tipo y su texto literal.
- No quedan elementos [NECESITA ACLARACIÓN]. Uno solo puede quedar pendiente si la persona responsable lo aprueba y su aprobación queda registrada en la sección 9 con la fecha y la decisión.

## 9. Dudas abiertas
Ninguna. N1, N2 y N3 están resueltas en las definiciones, en RF-1, RF-2 y en RF-9.
