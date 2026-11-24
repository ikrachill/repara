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
