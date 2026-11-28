# Explicación de REPARA

## Archivos y decisiones de las fases 1 a 8

| Archivo o grupo | Función |
| --- | --- |
| `src/main.ts`, `src/index.html` | Arrancan Angular y alojan el componente raíz. `main.ts` registra `provideHttpClient()`. |
| `src/app/app.component.*`, `src/app/app.routes.ts` | Definen el contenedor de la app y la entrada al conjunto de pestañas. |
| `src/app/tabs/tabs.page.*`, `src/app/tabs/tabs.routes.ts` | Definen la barra inferior y las rutas hijas que cargan las páginas. |
| `src/app/pages/solicitudes/`, `src/app/pages/presupuestos/`, `src/app/pages/seguimiento/` | Cada carpeta contiene el componente standalone, su plantilla, estilos y prueba unitaria. |
| `src/app/models/repara.model.ts` | Define el rol y las interfaces de las tres colecciones y de la respuesta completa. |
| `src/app/services/repara.service.ts` | Inyecta `HttpClient` por constructor, lee las tres colecciones con una petición y mantiene el rol de interfaz, inicialmente cliente, y guarda por ID los cambios de estado de la sesión. |
| `src/environments/environment.ts`, `src/environments/environment.prod.ts` | Definen la misma clave `urlRepara`. Angular reemplaza el archivo de desarrollo al compilar para producción. |
| `src/assets/data/repara.json` | Contiene los datos de muestra y se publica con los demás recursos del build. |
| `src/global.scss`, `src/theme/`, `src/assets/` | Estilos generales, tema y recursos estáticos. |
| `package.json`, `package-lock.json` | Scripts y dependencias. El archivo de bloqueo permite reproducir la instalación. |
| `angular.json`, `ionic.config.json`, `tsconfig*.json` | Configuración de compilación, identificación del proyecto Ionic y opciones TypeScript. |
| `e2e/`, `playwright.config.ts`, `vitest.config.mts`, `*.spec.ts` | Configuración de pruebas. `e2e/app.spec.ts` verifica los clics en las pestañas, las rutas y los errores de consola. |
| `eslint.config.js`, `.prettierignore`, `.editorconfig`, `.browserslistrc`, `.vscode/` | Reglas de análisis, formato, compatibilidad de navegadores y configuración del editor. |
| `.gitignore`, `AGENTS.md`, `README.md`, `IA.md`, `PROGRESO.md`, `EXPLICACION.md` | Exclusiones de Git, reglas del proyecto, ejecución, uso de IA, estado y explicación del código. |

Se eligió standalone para declarar en cada componente las dependencias de su plantilla. Se mantuvo el starter tabs como base y se retiró Capacitor porque la entrega se ejecuta en navegador. La raíz abre Bienvenida. Su formulario actualiza el rol del servicio y navega a Solicitudes. Los campos de demostración se pueden dejar vacíos. El router carga cada página cuando se visita su ruta y la barra registra un ícono acorde a cada pestaña.

`solicitudes.page.ts` carga los datos en `ngOnInit` y permite repetir la petición tras un error. `finalize` apaga el indicador al finalizar la petición y `markForCheck` señala que la plantilla debe actualizarse. `solicitudes.page.html` usa `*ngIf` para los estados de carga, error y lista vacía, y `*ngFor` para mostrar cada solicitud. La prueba de la página simula una primera petición fallida y un reintento exitoso.

`presupuestos.page.ts` solicita el mismo JSON y relaciona cada presupuesto con su solicitud por `solicitudId`. Si no encuentra el equipo, muestra el identificador de la solicitud. `presupuestos.page.html` muestra tarjetas con el equipo, técnico, detalle, monto en guaraníes y estado. Su prueba comprueba el reintento y el nombre del equipo asociado.

`seguimiento.page.ts` carga el JSON en `ngOnInit`, ordena una copia de las novedades de más reciente a más antigua y obtiene el equipo por `solicitudId`. `seguimiento.page.html` usa `*ngFor` para listar el equipo, el detalle y la fecha, y `*ngIf` para carga, error y lista vacía. La prueba comprueba el reintento y el orden por fecha.

En Bienvenida, `ionChange` actualiza la selección y el botón Ingresar copia el rol a `rolActivo` en el servicio. El botón de cada solicitud abierta se muestra si el rol es técnico. Al hacer clic, la página elige el siguiente estado y el servicio vuelve a comprobar el rol antes de aplicarlo. El servicio guarda el estado por ID en memoria y agrega una novedad con el ID de la solicitud y la fecha local. Seguimiento recarga al volver a la pestaña y ordena por fecha descendente. Las novedades de sesión se anteponen en el origen para desempatar por orden de registro en la misma fecha.

La auditoría final y sus rutas de evidencia están en `PROGRESO.md`. Las pruebas cubren carga, error y reintento en cada página, además de navegación y cambio de estado por rol en Chromium.

`src/theme/variables.scss` define la paleta, la tipografía y las dimensiones compartidas. `src/global.scss` aplica el tema a las listas, las píldoras de estado y los botones. Los estilos de cada página ajustan el monto, las fechas y el selector de rol. `src/app/tabs/tabs.page.scss` personaliza la navegación inferior. `src/index.html` declara español, UTF-8 y carga Inter desde Google Fonts.

`src/app/pages/bienvenida/` contiene la página standalone, la plantilla de acceso de demostración y su estilo. Las letras y el punto del logo forman una ola con retardos de 90 ms en un ciclo CSS de tres segundos y respetan la preferencia de movimiento reducido. Cada pestaña define los colores de su encabezado y su estado vacío.

El fondo de Bienvenida se define en `src/global.scss` con reglas acotadas a la página. La foto se difumina con una máscara CSS y el tricolor inferior usa un degradado al 35 % y una máscara que suaviza su borde superior. Su oscilación CSS tarda seis segundos y se desactiva con movimiento reducido.

Cuando el estado pasa a presupuestada, el servicio crea una estimación de prueba asociada al ID de la solicitud. Presupuestos y Seguimiento recargan sus datos al volver a abrirse. Las pantallas reconocen los IDs negativos de los registros de sesión y los resaltan por dos segundos la primera vez que los muestran. El toast confirma un cambio aplicado.

El formulario de Solicitudes pide equipo, problema y cliente. El servicio comprueba el rol y los campos, asigna un ID de sesión y guarda la solicitud como pendiente. Al generar una estimación, activa `hayPresupuestoNuevo`. Cada cambio de estado activa también `haySeguimientoNuevo`. Seguimiento limpia su aviso en `ngOnInit` y al volver a entrar en la pestaña. `tabs.page.html` muestra el aviso y lo limpia al pulsar Presupuestos. Al cerrar sesión se restablece el rol y se vuelve a `/login`. `ionViewWillEnter` sincroniza la selección de Bienvenida incluso cuando Ionic reutiliza esa página.

## Diez preguntas del docente

1. **¿Qué resuelve REPARA?** Permite solicitar reparaciones, consultar presupuestos y seguir el estado de cada trabajo.
2. **¿Qué significa standalone?** El componente importa directamente lo que necesita para su plantilla.
3. **¿Dónde arranca Angular?** En `src/main.ts`, que inicia el componente raíz y configura los proveedores.
4. **¿Dónde se define la navegación?** En `app.routes.ts` y `tabs.routes.ts`.
5. **¿Cómo se vincula un botón con una página?** La barra de pestañas apunta a la ruta hija que carga esa página.
6. **¿Qué verifica el build?** Compila el TypeScript y las plantillas y genera los archivos de la web en `www/`.
7. **¿Por qué se versiona el lockfile?** Para reproducir las versiones instaladas con `npm ci`.
8. **¿Cómo lee el servicio el JSON?** `obtenerDatos()` devuelve el observable tipado de `HttpClient.get`. La URL sale del environment y la página se suscribirá en `ngOnInit`.
9. **¿Cómo se relacionan las colecciones?** Presupuestos y seguimientos usan `solicitudId` para apuntar a una solicitud.
10. **¿Por qué se retiró Capacitor?** El proyecto necesita una aplicación web y Capacitor integra plataformas nativas.

