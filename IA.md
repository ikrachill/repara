# Uso de IA en REPARÁ

**Herramienta utilizada:** Codex en VS Code. El reparto que declaro es una estimación del trabajo total. Codex aportó el **40 %** en diseño e implementación de lógica puntual. Mi aporte, como **Fabián Giménez**, fue del **60 %**.

## Soluciones de lógica que resolvió la IA

- **Presupuesto automático.** Si una solicitud pasaba a presupuestada, faltaba su registro en Presupuestos. Codex agregó la creación de una estimación vinculada por `solicitudId` y conectó el aviso de presupuesto nuevo.
- **Novedades de seguimiento.** Los cambios de estado quedaban visibles solo en Solicitudes. Codex hizo que el servicio genere una novedad con la fecha local y que Seguimiento la muestre al volver a abrir la pestaña.

## Prompts utilizados para el diseño

### Codificación y rediseño general

~~~text
Tenemos dos tareas de diseño antes de cerrar el proyecto:

1. URGENTE: En la pestaña Seguimiento, los textos muestran signos de interrogación en lugar de tildes y eñes (ej: "diagn?stico"). Corregí la codificación del archivo JSON a UTF-8 y asegurate de que los acentos se lean bien en toda la app.

2. REDISEÑO VISUAL (Estilo UENO Bank): Quiero cambiar el diseño por defecto de Ionic a algo mucho más moderno, con estas reglas:
  - Tipografía: Usá la fuente 'Inter' o 'Poppins' (importala desde Google Fonts en index.html o global.scss).
  - Colores: Definí una paleta en variables.scss. Fondo claro (ej: #F8F9FA) y un color primario fuerte para los acentos (ej: un verde lima o amarillo brillante).
  - Tarjetas (Presupuestos): Fondo blanco, sin bordes (border: none), sombra súper suave (box-shadow: 0 4px 12px rgba(0,0,0,0.05)) y border-radius grande (16px). El monto en guaraníes que sea grande y en negrita.
  - Listas (Solicitudes y Seguimiento): Sin líneas divisorias. Cada ítem debe verse como una tarjeta limpia.
  - Badges (estados): Que parezcan píldoras (border-radius: 20px). Fondo del color del estado pero con opacidad baja, y el texto del color fuerte (ej: "en reparación" en fondo celeste claro con texto azul oscuro).
  - Tabs: Ocultá la línea superior. Fondo blanco, íconos un poco más grandes.
  - Selector de Rol: Que parezca un botón moderno, no un select nativo.

Hacelo de forma global (global.scss, variables.scss) y en los CSS de cada página. Compilá, arreglá lo que falle y mostrame cómo quedó.
~~~

### Pantalla de bienvenida

~~~text
Quiero agregar una capa de presentación antes de las tabs para darle un toque más profesional, sin romper la estructura actual ni la rúbrica.

Tareas:
1. Crear una nueva página standalone llamada `login` (o `bienvenida`).
2. Modificar el archivo de rutas principal (`app.routes.ts` o donde esté el ruteo de las tabs) para que la ruta raíz (`''`) apunte a esta nueva página de Login. Al hacer clic en un botón "Ingresar", debe redirigir a `/tabs/solicitudes`.
3. En la página de Login, agregar:
  - Un logo tipográfico elegante para REPARA (usando HTML y CSS, sin imágenes externas). Que tenga el estilo UENO (colores claros, verde lima).
  - Campos falsos de "Usuario" y "Contraseña" usando `ion-input`.
  - Un selector para elegir el rol (Cliente o Técnico), que al hacer clic en "Ingresar" actualice la variable `rolActivo` en el `ReparaService`.
4. IMPORTANTE: Mantener el selector de rol dentro de la pestaña de Solicitudes por si acaso, o quitarlo si el Login ya lo define (elegí la opción más limpia).
5. Verificar que al compilar (`npm run build`) todo siga funcionando, que las tabs sigan navegando bien y que el diseño siga siendo coherente.

Hacelo, compilá y mostrame cómo quedó.
~~~

### Animación inicial, encabezados y estados vacíos

~~~text
Quiero pulir un par de detalles de UX para que la app se sienta más real, vívida y no tan vacía. No rompas la rúbrica (seguimos con 3 tabs):

1. LOGIN (Estilo Ueno Bank con animación):
  - En lugar de un fondo blanco/gris, usá un fondo con un gradiente o un color sólido verde lima vibrante en la parte superior, y la tarjeta blanca flotando por encima con bordes bien redondeados (border-radius: 24px) y una sombra suave.
  - Agregá una lista de 3 beneficios con iconos (ej: `checkmark-circle-outline`): "Solicitá reparaciones", "Recibí presupuestos" y "Seguí el estado".
  - ANIMACIÓN: Hacé que el logo "REPARA" tenga una animación de entrada elegante usando CSS puro (fade-in + slide-up). Además, que el punto verde lima del logo haga un pequeño "pop" (rebote) usando `@keyframes`. El botón de "Ingresar" debe tener un efecto de escala al presionarlo (`:active`).

2. ROL REDUNDANTE:
  - Eliminá el selector de rol de la pestaña de Solicitudes (ya que ahora se elige en el Login). Asegurate de que el rol elegido en el Login se mantenga y funcione bien para mostrar u ocultar el botón de cambiar estado.

3. DARLE "ALMA" Y COLOR A LAS TABS:
  - En los headers de las 3 pestañas, poné un fondo de color suave y los títulos en negrita bien marcados. Agregá un subtítulo en gris oscuro debajo (ej: en Presupuestos: "Consultá los costos de tus reparaciones").
  - Usá iconos grandes y coloridos para los estados vacíos (si no hay datos).
  - Asegurate de que las tarjetas de Solicitudes y Presupuestos tengan una sombra un poquito más notoria para que "floten" sobre el fondo, igual que en la app de Ueno.

Hacelo, compilá, probá y mostrame cómo quedó.
~~~

### Foto de fondo, respiración del logo y contraste

~~~text
Tenemos que corregir un error de lógica y darle los toques finales al diseño. Prestá mucha atención:

1. BUG DE SEGUIMIENTO (Lógica):
  - Actualmente, cuando el técnico cambia el estado de una solicitud, este cambio no se refleja en la pestaña Seguimiento.
  - Arreglo: En el método que actualiza el estado de la solicitud en el ReparaService, agregá también una nueva novedad al arreglo de `seguimientos`. Debe tener el ID de la solicitud, la fecha actual, y un texto como "El estado cambió a [nuevo_estado]". Asegurate de que esta nueva novedad aparezca primera en la lista de Seguimiento (ordenada por fecha).

2. DISEÑO DE LOGIN - Fondo y Animación:
  - Cambiá el texto del logo a "REPARÁ" (con acento en la A final).
  - Fondo: Agregá una imagen de fondo (podés usar una URL de Unsplash de herramientas o reparaciones) que cubra toda la pantalla, pero con una capa de opacidad muy baja (ej: opacity: 0.1 o 0.15) o un filtro, para que no compita con la tarjeta blanca. El fondo debe sentirse vivo pero sutil.
  - Animación: Quitá la animación de entrada simple. En su lugar, hacé que el logo "REPARÁ" (y el punto verde) tengan una animación de "respiración" infinita en loop (que crezca un 2% y vuelva a su tamaño original suavemente, usando `@keyframes` con `animation: breathe 3s ease-in-out infinite`).

3. ELIMINAR SELECTOR REDUNDANTE:
  - Revisá que el selector de rol en la pestaña de Solicitudes ya no esté visible (ya que el rol se define en el Login).

4. PULIR DISEÑO DE TABS:
  - En los headers de las tabs, asegurate de que los subtítulos tengan un contraste lindo y que las tarjetas mantengan la sombra suave que pedimos antes.

Compilá, probá que el flujo de cambiar estado en Solicitudes actualice Seguimiento, y mostrame cómo quedó.
~~~

### Foto de una reparación y ola del logo

~~~text
Tenemos los últimos ajustes de diseño y lógica. Necesito que corrijas tres cosas:

1. TEXTO DE SEGUIMIENTO:
  - En el método del ReparaService que actualiza el estado de una solicitud, cambiá el texto automático que se genera. En lugar de "El estado cambió a [estado]", generá algo más natural: "El técnico actualizó el estado del equipo a [estado]". Asegurate de que respete las mayúsculas.

2. FONDO DE LOGIN:
  - La imagen actual (herramientas verdes) no se entiende y tapa toda la pantalla.
  - Cambiala por una imagen de Unsplash que muestre a un técnico trabajando (manos con herramientas, o una persona arreglando algo), asegurándote de que la imagen se centre en el rostro/acción.
  - El filtro verde lima que usás encima de la imagen debe ser más sutil (bajale la opacidad) para que la foto se vea clara, pero manteniendo la tarjeta blanca del login resaltando por encima.

3. ANIMACIÓN DEL LOGO (Secuencial):
  - Quitá la animación de "respiración" actual.
  - Quiero que cada letra de la palabra "REPARÁ." se mueva de forma secuencial (efecto ola o rebote).
  - Para hacerlo, vas a tener que separar el logo en etiquetas `<span>` individuales (ej: `<span>R</span><span>E</span>...`).
  - Usá `@keyframes` con un `animation-delay` incremental para cada letra, de modo que suban y bajen una tras otra en loop infinito. Hacelo de forma suave y minimalista (que no parezca una feria).

Compilá, probá y mostrame cómo quedó.
~~~

### Difuminado de la foto y bandera

~~~text
Quedó espectacular, pero necesitamos dos ajustes finales de pulido:

1. TEXTOS DE SEGUIMIENTO (Humanizar):
  - Siguen sonando muy técnicos. Cambiá la lógica en el servicio para que cuando se actualice el estado, el mensaje diga: "El técnico actualizó el estado a: [estado]". Usá etiquetas HTML en el string (ej: `<strong>`) si es necesario, para resaltar el nombre del estado. Que se lea natural.

2. FONDO DE BIENVENIDA (Degradado y Bandera):
  - La imagen del técnico está muy buena, pero el corte recto abajo queda mal. Aplicá un degradado (usando `mask-image` o un `linear-gradient` con `transparent`) en la parte inferior de la imagen para que se difumine suavemente sobre el fondo de la pantalla.
  - En la parte inferior de la pantalla (detrás de la tarjeta blanca), agregá la bandera de Paraguay (podés usar un color sólido o una imagen) pero con una opacidad del 5% o 10% (muy clarita) para que llene el espacio vacío y le dé identidad sin quitar protagonismo.

Compilá, probá y mostrame cómo quedó.
~~~

### Degradado continuo de la bandera

~~~text
Dos correcciones finales, por favor:

1. BOTÓN DE CAMBIAR ESTADO:
  - Desapareció el botón "Cambiar estado" en Solicitudes. Verificá que el botón siga existiendo y que solo se muestre cuando el rol activo es 'tecnico'. Si al loguearse como técnico no aparece, restablecé la lógica para que vuelva a funcionar.

2. FONDO DE BIENVENIDA (Bandera con degradado):
  - La franja de la bandera de Paraguay quedó muy dura y fea.
  - Quitá la imagen de la bandera y, en su lugar, usá un degradado CSS (`linear-gradient`) en la parte inferior de la pantalla.
  - Ese degradado debe llevar los colores de la bandera (rojo, blanco y azul) pero con una opacidad muy baja (entre 10% y 15%), para que se vea como un resplandor sutil que ocupe todo el ancho de la pantalla. Asegurate de que el texto y la tarjeta blanca sigan siendo los protagonistas.

Compilá, probá logueándote como técnico para confirmar que el botón funciona, y mostrame cómo quedó.
~~~

### Bandera curva, botón, toast y resaltado

~~~text
Vamos a hacer los últimos ajustes de nivel profesional (lógica y UI). Prestá mucha atención a estos 4 puntos:

1. FONDO DE BIENVENIDA (Bandera con curva y más color):
  - La bandera de Paraguay se ve muy transparente. Subile la opacidad (al 30% o 40%) para que los colores rojo, blanco y azul se distingan mejor.
  - En lugar de un corte recto, usá un pseudo-elemento (`::before` o `::after`) con `border-radius: 50% 50% 0 0 / 20px 20px 0 0;` (o similar) para crear una curva sutil (parábola invertida) en la parte superior de la bandera, como si fuera una ola suave.

2. BOTONES DE "CAMBIAR ESTADO" (Diseño Profesional):
  - En la pestaña Solicitudes, cambiá el estilo del botón de cambiar estado. Que no sea un botón plano. Usá un `ion-button` con `fill="solid"`, color primario suave, íconos (como `sync-outline` o `create-outline`) y bordes bien redondeados (`border-radius: 20px`). Que se vea como un botón de acción premium.

3. BUG LÓGICO (Solicitud a Presupuesto):
  - Actualmente, si una solicitud pasa a "presupuestada", no se refleja en la pestaña Presupuestos.
  - Arreglo: En el `ReparaService`, cuando se actualice el estado de una solicitud a "presupuestada" (o "en revisión"), generá automáticamente un nuevo objeto en el arreglo de `presupuestos` con datos de prueba (técnico, monto estimado, etc.) asociado a ese `solicitudId`, para que aparezca en la pestaña Presupuestos.

4. NOTIFICACIONES (Toast) Y RESALTADO (Highlight):
  - Usá `ion-toast` (ToastController) para mostrar un mensaje en la parte inferior cuando se cambie el estado de una solicitud (ej: "Solicitud actualizada con éxito").
  - Cuando el usuario navegue a la pestaña Presupuestos o Seguimiento y vea el nuevo ítem, ese ítem debe tener una animación CSS temporal (ej: un fondo amarillo o verde suave que se desvanece en 2 segundos) para indicar "esto es lo nuevo". Podés usar una variable de estado global (ej: `ultimoIdActualizado`) en el servicio para saber cuál resaltar.

Hacelo, compilá, probá el flujo completo y mostrame cómo quedó.
~~~

### Formulario, salida y badge de Presupuestos

~~~text
Vamos a agregar la lógica de negocio final y mejorar la UX de navegación. No rompas los indicadores actuales:

1. MÁS DATOS DE PRUEBA:
  - En `src/assets/data/repara.json`, agregá 2 solicitudes más con estado "pendiente" para tener más casos de prueba.

2. BOTÓN DE CERRAR SESIÓN (Logout):
  - En la pestaña de Solicitudes, en el `ion-toolbar` superior (a la derecha), agregá un botón con ícono `log-out-outline`. Al hacer clic, debe resetear el rol en el servicio y redirigir al usuario a la página de Bienvenida (`/login`).

3. CREAR SOLICITUD (Solo Cliente):
  - En la pestaña de Solicitudes, agregá un `ion-fab` (botón flotante) en la esquina inferior derecha con un ícono de "+".
  - Este botón solo debe ser visible si el rol activo es 'cliente'.
  - Al hacer clic, debe abrir un `ion-modal` (o alert) con un formulario simple (Equipo, Problema, Cliente) y al guardar, agregar la nueva solicitud al arreglo del servicio con estado "pendiente".

4. NOTIFICACIÓN EN EL TAB (Badge Rojo):
  - En el archivo `tabs.page.html`, en el botón de la pestaña "Presupuestos", agregá un `<ion-badge color="danger">` que muestre un "1" (o un punto).
  - Este badge solo debe mostrarse si el servicio tiene una variable `hayPresupuestoNuevo` en `true`.
  - Cuando el usuario hace clic en la pestaña de Presupuestos, esa variable debe pasar a `false` (el badge desaparece).

5. LÓGICA DE NEGOCIO (Presupuesto automático):
  - Revisá que cuando una solicitud cambie a "presupuestada" desde el modo Técnico, se cree el presupuesto y se active la variable `hayPresupuestoNuevo` para que aparezca el badge rojo.

Compilá, probá el flujo completo de cliente y técnico, y mostrame cómo quedó.
~~~

### Badge de Seguimiento

~~~text
Excelente trabajo. Solo faltan dos ajustes de lógica para cerrar:

1. BADGE EN SEGUIMIENTO:
  - Al igual que en Presupuestos, agregá un `ion-badge` rojo en la pestaña de Seguimiento (en `tabs.page.html`).
  - En el `ReparaService`, agregá una variable booleana `haySeguimientoNuevo`. Esta debe ponerse en `true` cada vez que se actualice un estado (ya que eso genera una nueva novedad).
  - En la página de Seguimiento (`ngOnInit`), asegurate de poner esa variable en `false` para que el badge desaparezca cuando el usuario entra a ver las novedades.

2. ACLARACIÓN DE ROLES (Sin romper nada):
  - Revisá el flujo visual del cliente. El cliente debe ver la lista de presupuestos (ya lo hace), pero asegurate de que el botón "Cambiar estado" en Solicitudes esté estrictamente oculto para él (solo visible para técnico).

Compilá, probá ambos roles (cliente y técnico) y mostrame cómo quedó.
~~~

### Onda de la bandera

~~~text
Un último detalle visual para la pantalla de Bienvenida (la bandera):

1. DIFUMINADO: Asegurate de que el degradado de la bandera (rojo, blanco y azul) sea súper suave y no tenga cortes rectos.
2. ANIMACIÓN EN LOOP (Efecto Onda): Quiero que la bandera del fondo tenga un movimiento sutil y constante, como si fuera una tela meciéndose con el viento.
  - Podés lograrlo animando la posición del `background-position` del gradiente, o usando un `@keyframes` con un `transform: skewY` o `scaleY` muy leve (por ejemplo, que se mueva 1 o 2 grados hacia los lados y vuelva, en un ciclo de 6 segundos, `ease-in-out infinite`).
  - El movimiento debe ser MUY sutil para no marear ni quitar legibilidad a la tarjeta blanca.

Compilá, probá y mostrame cómo quedó.
~~~

## Mi aporte como Fabián Giménez (60 %)

Definí el tema de REPARÁ, la arquitectura con tres pestañas y un servicio para los datos locales, y las reglas de negocio de Cliente y Técnico. Elegí la dirección visual y pedí ajustes concretos al revisar las pantallas. También definí los casos que había que probar, como crear una solicitud, presupuestarla y comprobar que los avisos desaparezcan al abrir su pestaña.

## Revisión de los integrantes
