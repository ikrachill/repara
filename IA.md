# Uso de IA en REPARA

Herramienta indicada para el proyecto: Codex en VS Code.

## Instrucciones del proyecto


~~~text
# Reglas permanentes del proyecto (Ionic + Angular)

Este archivo se lee en cada sesión. Estas reglas tienen prioridad sobre
cualquier suposición tuya. Si una regla choca con la realidad técnica
(por ejemplo, una versión que no la soporta), NO improvises en silencio:
informalo, proponé la alternativa mínima y registralo en IA.md.

## Entorno
- Sistema: Windows (PowerShell). Usá comandos compatibles con PowerShell.
- Herramientas ya instaladas: Angular CLI 22.3.0, Node.js 26.13.1,
  npm 12.2.3, Ionic CLI 7.2.1. No instales nada global.
- Si `ionic start` falla por incompatibilidad de versiones, la alternativa
  mínima es `ng new` + agregar `@ionic/angular`; registralo en IA.md.

## Rúbrica que este proyecto debe cumplir (20 puntos)
1. Estructura y navegación (3): 3 tabs funcionales, renombradas, con
   íconos propios; sin errores al navegar; carpetas services/ y páginas.
2. Servicios JSON (4): providedIn 'root', inyección por constructor, datos
   en ngOnInit, URL en AMBOS environments, indicador de carga y error.
3. Componentes Ionic (4): al menos 5 distintos (sin contar header, toolbar,
   content ni tabs), integrados con datos (*ngFor, bindings, eventos).
4. Repositorio (3): README completo y commits progresivos con mensajes
   descriptivos (no un commit único al final).
5. Trabajo original (3): cada integrante debe poder explicar el código.
6. IA evidenciable (3): IA.md con herramienta, prompts, qué se generó y qué
   se corrigió.
- Si `npm run build` falla, el proyecto pierde puntaje. Compilar siempre.

## Método de trabajo
- Entregá código mínimo, correcto y verificado. Nada de funciones,
  dependencias ni patrones que no estén pedidos.
- Trabajá por fases. Antes de codificar una fase, enunciá el plan en 5
  líneas como máximo. Al cerrarla:
  1. ejecutá `npm run build` y corregí hasta que compile sin errores;
  2. actualizá PROGRESO.md, IA.md y EXPLICACION.md;
  3. hacé los commits correspondientes (ver sección Git);
  4. informá en 8 líneas como máximo y DETENTE hasta que el usuario escriba
     "continuar".
- Economía de tokens: leé solo los archivos que vas a tocar; no pegues
  salidas largas de consola; no repitas el código en tus respuestas;
  no hagas ciclos de revisión visual salvo que se pidan.
- Prohibido: --force, --legacy-peer-deps sin avisar antes, `git push`
  (de cualquier tipo), `git reset --hard`, `git rebase`, `git commit --amend`
  sobre commits ya hechos, modificar fechas de commits (--date), cambiar la
  identidad de git, instalar globalmente, borrar archivos que no creaste.

## Complejidad permitida (el grupo debe poder explicarlo todo)
- Sin NgRx ni signals avanzados. RxJS solo lo básico: subscribe, map,
  catchError, finalize.
- Sin librerías extra aparte de Ionic y Angular.
- Nombres claros en español. Comentarios breves, en español simple, solo
  donde la lógica no sea obvia.
- Sin pagos ni autenticación. El rol activo se simula con una variable en
  el servicio (`rolActivo`), solo para la UI.

## Estructura y navegación
- 3 tabs con archivos, clases, selectores y rutas renombrados según el tema
  (no solo la etiqueta visible). Eliminá todo resto de la plantilla
  (tab1, tab2, tab3, explore-container y cualquier referencia sobrante).
- Íconos semánticos, distintos de los de la plantilla.
- Carpetas: src/app/services/, src/app/models/ y src/app/pages/.
- Sin errores de consola al navegar entre tabs.
- El scaffold de `ionic start` crea una subcarpeta con el nombre del
  proyecto. La raíz del repositorio debe ser la raíz de la app: mover el
  contenido de la subcarpeta a la raíz de la carpeta de trabajo, eliminar
  la subcarpeta vacía, y recién entonces inicializar git. Los .md del
  proyecto viven en la raíz de la app.

## Servicios JSON
- @Injectable({ providedIn: 'root' }) e inyección por constructor
  (NO uses inject()). Un servicio por fuente de datos (si hay una sola fuente, un solo servicio).
- REPARA usa un único JSON local con tres colecciones (solicitudes,
  presupuestos, seguimientos). Un solo `ReparaService` con
  `providedIn: 'root'` las expone; no crear un servicio por colección.
- Si no existen, generá los environments con `ng generate environments`.
  La URL de cada fuente va con la MISMA clave en TODOS los archivos de
  environment. Nunca escribas la URL directamente en el servicio.
- Cargá los datos en ngOnInit. Modelos con interfaces tipadas en models/.
- Variables `cargando` y `error`: ion-spinner o ion-skeleton-text mientras
  carga; mensaje de error visible con botón de reintento si falla.
- Si el JSON es local, ubicalo en src/assets/data/ y verificá que el build
  lo sirva (si la plantilla usa public/, avisalo y resolvelo).
- Usá *ngFor y *ngIf. Si no existen en la versión instalada, usá @for y @if
  y registralo en IA.md y README.md.

## Componentes Ionic
- Al menos 7 componentes distintos (no cuentan header, toolbar, content,
  tabs, tab-bar ni tab-button), cada uno con datos reales: bindings y
  eventos. Nada puramente decorativo.
- En el README, una tabla: componente y dónde se usa.

## Git
- Formato del mensaje: `tipo: descripción` o `tipo(alcance): descripción`.
- Tipos permitidos (y solo estos):
  - feat: nuevas funcionalidades.
  - fix: correcciones de errores.
  - docs: documentación.
  - style: cambios visuales.
  - refactor: mejoras internas del código.
  - test: pruebas.
  - chore: mantenimiento (configuración, dependencias, .gitignore).
- Descripción en español, minúscula inicial, verbo en presente
  ("agrega", "corrige"), concreta, sin punto final, máximo 72 caracteres
  en total. Sin emojis, sin firmas ni trailers automáticos.
- Ejemplos válidos:
  - chore: inicializa proyecto ionic con plantilla tabs
  - chore: agrega .gitignore y excluye node_modules
  - feat: agrega servicio y modelo de datos
  - fix: corrige la ruta de la segunda pestaña
  - style: ajusta el espaciado de las tarjetas
  - docs: completa la tabla de componentes en el readme
- Un commit por cambio lógico. No mezclar tipos: la documentación va en
  commits `docs` separados del código. Apuntá a unos 15–25 commits en total,
  nunca un commit enorme por fase.
- Solo commiteá si `npm run build` pasa. Usá la identidad de git ya
  configurada. Nunca hagas push; el usuario lo hará.
- .gitignore correcto desde el primer commit (node_modules, www, dist,
  .angular).

## Documentos (se mantienen actualizados en cada fase)
- README.md: nombre del proyecto, integrantes, fuente de datos, cómo
  ejecutarlo, tabla de componentes y una sección "Capturas" vacía.
- IA.md: herramienta (Codex), prompts principales (literales, incluidos
  este AGENTS.md y el prompt de inicio), qué se generó, qué falló y cómo se
  corrigió. Solo hechos reales; lo incierto va como "pendiente de verificar".
  Sección final "Revisión de los integrantes" vacía, para completar a mano.
- EXPLICACION.md: qué hace cada archivo, decisiones tomadas y 10 preguntas
  probables del docente con su respuesta.
- PROGRESO.md: fases hechas, fase actual, pendientes y estas reglas
  resumidas, de modo que otra herramienta pueda continuar el trabajo sin
  pérdida de contexto.

## Fases
0. Diagnóstico, sin código ni commits.
1. Scaffold con plantilla tabs; la raíz del repositorio es la raíz de la
   app; git init y primer commit.
2. Tabs renombradas, íconos propios y carpetas.
3. Environments, modelos y servicio.
4. Contenido de la pestaña 1.
5. Contenido de la pestaña 2.
6. Contenido de la pestaña 3.
7. Completar componentes (mínimo 7) y manejo de carga y error.
8. Documentos finales y auditoría contra la rúbrica: por cada indicador,
   CUMPLE o NO CUMPLE, con la ruta del archivo como evidencia.
~~~

## Prompt de inicio

~~~text
Leé AGENTS.md y ejecutá SOLO la Fase 0, sin escribir código ni hacer commits.
Informá: las versiones instaladas; las opciones y el comando exacto de
`ionic start` para Angular con plantilla tabs (indicá si crea módulos o
componentes standalone y cuál conviene para cumplir las reglas de
AGENTS.md); si *ngFor está disponible en el @angular/common instalado;
y cualquier riesgo de compatibilidad entre Ionic y Angular 22.
Detenete y esperá mi "continuar".

PROYECTO
- Tema: REPARA — plataforma simple de gestión de reparaciones. Un cliente
  pide una reparación, un técnico pasa un presupuesto y se sigue el estado
  del trabajo. Sin pagos, sin login, sin backend. Datos locales.
- Fuente JSON: archivo local src/assets/data/repara.json con tres
  colecciones: solicitudes, presupuestos y seguimientos, relacionadas por
  solicitudId.
- Tabs: Solicitudes · Presupuestos · Seguimiento
- Integrantes (solo para el README): Fabián Giménez
- Herramienta de IA (para IA.md): Codex en VS Code.
~~~

## Prompt de la fase 1

~~~text
continuar

Antes de hacer git init: mové todo el contenido de la subcarpeta repara/
a la raíz de TP-miapp/, borrá la subcarpeta vacía, y recién ahí inicializá
git. La raíz del repo debe ser TP-miapp/, con AGENTS.md adentro.
~~~

## Prompt de la fase 2

~~~text
continuar
~~~

## Prompt de la fase 3

~~~text
continuar
~~~

## Prompt de la fase 4

~~~text
continuar
~~~

## Prompt de la fase 5

~~~text
continuar
~~~

## Prompt de la fase 6

~~~text
continuar
~~~

## Prompt de la fase 7

~~~text
continuar
~~~

## Prompt de la fase 8

~~~text
continuar
~~~

## Qué se generó y qué se corrigió

- Fase 0. Se verificaron las versiones de las herramientas y las opciones del CLI. El proyecto todavía carecía de dependencias instaladas.
- Fase 1. Se ejecutó `ionic.cmd start repara tabs --type=angular-standalone --no-git --no-capacitor --no-interactive`. Se movió todo el contenido, incluidos los archivos ocultos, a la raíz. Se eliminó el directorio vacío antes de ejecutar `git init`.
- El CLI activó Capacitor pese a `--no-capacitor`. Se retiraron sus dependencias y su configuración generada y se volvió a compilar con éxito.
- npm informó que bloqueó algunos scripts de instalación y Angular avisó que la configuración de Browserslist incluye navegadores fuera de su soporte. El build terminó correctamente.
- Se confirmó en los tipos instalados de `@angular/common` 22.3.0 la exportación de `NgFor` y `NgIf`.

- Fase 2. Se renombraron las tres páginas y sus rutas, se asignaron íconos de herramientas, recibo y reloj y se retiró el componente de ejemplo. Se adaptó la prueba existente para recorrer las pestañas y detectar errores de consola. La prueba pasó en Chromium y el build pasó con el aviso conocido de Browserslist.

- Fase 3. Se reutilizaron los environments y la publicación de `src/assets` del starter. Se creó un JSON con tres colecciones, sus interfaces y un único servicio inyectable por constructor. El build pasó con el aviso conocido de Browserslist. Se comprobó el tipado del servicio por separado y se verificaron la copia del JSON en el build, la respuesta HTTP local y las referencias por `solicitudId`.

- Antes de la fase 4 se ampliaron las tres colecciones de muestra a cinco registros. Para la pantalla de Solicitudes se usarán `*ngFor` y `*ngIf`, importando `NgFor` y `NgIf` desde `@angular/common`. Ambas directivas están disponibles en la versión instalada 22.3.0 y AGENTS.md pide usarlas mientras estén disponibles.

- Fase 4. Se conectó Solicitudes al servicio en `ngOnInit`, se listaron los datos con `*ngFor` y se implementaron carga, error, reintento y lista vacía con `*ngIf`. El build pasó con el aviso conocido de Browserslist. La prueba unitaria verificó carga, error y reintento. La prueba de Chromium verificó cinco filas del JSON y la navegación entre pestañas.

- Fase 5. Se conectó Presupuestos al servicio en `ngOnInit`, se asociaron los equipos por `solicitudId` y se mostraron los registros con `*ngFor`. Se usó `*ngIf` para carga, error y lista vacía. El build pasó con el aviso conocido de Browserslist. La prueba unitaria verificó carga, error, reintento y equipo asociado. Chromium confirmó cinco tarjetas y la navegación sin errores de consola.

- Fase 6. Se conectó Seguimiento al servicio, se ordenaron las novedades por fecha y se asoció su equipo por `solicitudId`. Se usaron `*ngFor` y `*ngIf`. La primera compilación detectó importaciones de Ionic que faltaban en Seguimiento. Se corrigieron y el build pasó con el aviso conocido de Browserslist. Pasaron las cinco pruebas unitarias y Chromium verificó las cinco novedades y la navegación.

- Fase 7. Se integró el rol simulado en Solicitudes y el cambio de estado en memoria para el técnico. Se documentaron los usos de los componentes conectados a registros, estados de carga y eventos. El build pasó con el aviso conocido de Browserslist. En Chromium se verificaron los permisos de interfaz, la conservación del estado al navegar y su reinicio al recargar.

- Fase 8. Se auditó la rúbrica y se registró la evidencia en `PROGRESO.md`. Pasaron `npm run build`, cinco pruebas unitarias y dos pruebas en Chromium. El build conservó el aviso conocido de Browserslist y se verificó que publique una copia idéntica del JSON. Queda pendiente de verificar la explicación oral del integrante.

- Ajustes de cierre. Se detectaron signos de interrogación literales en los textos de los datos. Se restauraron los caracteres originales, se guardó `repara.json` como UTF-8 y se verificaron los acentos en el build servido en Chromium. Se aplicaron Inter, fondo claro, acentos verde lima, tarjetas sin divisores, estados en píldoras y una barra de pestañas sin borde superior. Al revisar la vista móvil, se aumentó la altura de la barra para que las etiquetas se vieran completas. El build pasó con el aviso conocido de Browserslist.

- Bienvenida. Se agregó una página standalone en la ruta raíz con campos simulados, logo tipográfico y selección de rol. Al ingresar se actualiza `rolActivo` y se navega a Solicitudes. Se conservó el selector de Solicitudes y se adaptaron las pruebas para entrar desde Bienvenida.

- Pulido de UX. Se animó el logo con CSS, se añadieron beneficios y se movió la elección del rol exclusivamente a Bienvenida. Las pestañas incorporaron encabezados con subtítulos, estados vacíos con íconos y sombras más visibles en Solicitudes y Presupuestos. Las pruebas en Chromium verificaron navegación, rol técnico y los tres estados vacíos.

- Ajuste final. Se agregó el historial de cambios de sesión y la recarga de Seguimiento al reabrir la pestaña. Se verificó en Chromium que los cambios del mismo día se ordenen del último al primero. Se actualizó Bienvenida con el logo REPARÁ, la animación CSS y una foto de herramientas servida desde `src/assets/taller-bienvenida.jpg`. Pasaron el build, cinco pruebas unitarias y tres pruebas en Chromium.

- Último pulido. Se actualizó el texto automático de Seguimiento y su prueba de navegador. Se reemplazó la foto por una reparación de celular y se aplicó una ola CSS al logo REPARÁ. La primera compilación avisó que la hoja de estilos de Bienvenida superaba su presupuesto. Se simplificaron los retardos con una variable CSS por letra y se volvió a compilar. Se verificaron los retardos y el movimiento reducido en Chromium.

- Pulido final. Se cambió el texto de las novedades a «El técnico actualizó el estado a: …» y se verificó en el navegador. Se agregó una máscara para difuminar la foto y un tricolor inferior al 8 %. El primer build advirtió por el tamaño de los estilos de Bienvenida. Las reglas del fondo se trasladaron a `global.scss` con alcance limitado a Bienvenida y el build final pasó con el aviso conocido de Browserslist.

- Se suavizó el fondo inferior con un degradado de los colores de Paraguay al 12 %. En Chromium se verificó que Cambiar estado sigue disponible para el técnico en solicitudes abiertas, que el cliente no lo ve y que el cambio aparece en Seguimiento.

- Ajuste de presupuestos. Se agregó una estimación de prueba cuando una solicitud pasa a presupuestada. Se verificaron su monto y aparición al volver a Presupuestos, el toast y el resaltado de las novedades. Se suavizó el botón de estado y se aplicó el fondo tricolor curvo. El build pasó con el aviso conocido de Browserslist. Pasaron cinco pruebas unitarias y cuatro pruebas en Chromium.

## Revisión de los integrantes

