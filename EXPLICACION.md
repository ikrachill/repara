# Explicación de REPARA

## Archivos y decisiones de las fases 1 y 2

| Archivo o grupo | Función |
| --- | --- |
| `src/main.ts`, `src/index.html` | Arrancan Angular y alojan el componente raíz. |
| `src/app/app.component.*`, `src/app/app.routes.ts` | Definen el contenedor de la app y la entrada al conjunto de pestañas. |
| `src/app/tabs/tabs.page.*`, `src/app/tabs/tabs.routes.ts` | Definen la barra inferior y las rutas hijas que cargan las páginas. |
| `src/app/pages/solicitudes/`, `src/app/pages/presupuestos/`, `src/app/pages/seguimiento/` | Cada carpeta contiene el componente standalone, su plantilla, estilos y prueba unitaria. |
| `src/app/models/`, `src/app/services/` | Carpetas reservadas para las interfaces y el servicio de datos de la fase 3. |
| `src/global.scss`, `src/theme/`, `src/assets/` | Estilos generales, tema y recursos estáticos. |
| `package.json`, `package-lock.json` | Scripts y dependencias. El archivo de bloqueo permite reproducir la instalación. |
| `angular.json`, `ionic.config.json`, `tsconfig*.json` | Configuración de compilación, identificación del proyecto Ionic y opciones TypeScript. |
| `e2e/`, `playwright.config.ts`, `vitest.config.mts`, `*.spec.ts` | Configuración de pruebas. `e2e/app.spec.ts` verifica los clics en las pestañas, las rutas y los errores de consola. |
| `eslint.config.js`, `.prettierignore`, `.editorconfig`, `.browserslistrc`, `.vscode/` | Reglas de análisis, formato, compatibilidad de navegadores y configuración del editor. |
| `.gitignore`, `AGENTS.md`, `README.md`, `IA.md`, `PROGRESO.md`, `EXPLICACION.md` | Exclusiones de Git, reglas del proyecto, ejecución, uso de IA, estado y explicación del código. |

Se eligió standalone para declarar en cada componente las dependencias de su plantilla. Se mantuvo el starter tabs como base y se retiró Capacitor porque la entrega se ejecuta en navegador. La raíz redirige a Solicitudes. El router carga cada página cuando se visita su ruta y la barra registra un ícono acorde a cada pestaña.

## Diez preguntas del docente

1. **¿Qué resuelve REPARA?** Permite solicitar reparaciones, consultar presupuestos y seguir el estado de cada trabajo.
2. **¿Qué significa standalone?** El componente importa directamente lo que necesita para su plantilla.
3. **¿Dónde arranca Angular?** En `src/main.ts`, que inicia el componente raíz y configura los proveedores.
4. **¿Dónde se define la navegación?** En `app.routes.ts` y `tabs.routes.ts`.
5. **¿Cómo se vincula un botón con una página?** La barra de pestañas apunta a la ruta hija que carga esa página.
6. **¿Qué verifica el build?** Compila el TypeScript y las plantillas y genera los archivos de la web en `www/`.
7. **¿Por qué se versiona el lockfile?** Para reproducir las versiones instaladas con `npm ci`.
8. **¿Dónde se guardarán los datos?** En `src/assets/data/repara.json`, previsto para la fase 3.
9. **¿Cómo se relacionarán las colecciones?** Presupuestos y seguimientos usarán `solicitudId` para apuntar a una solicitud.
10. **¿Por qué se retiró Capacitor?** El proyecto necesita una aplicación web y Capacitor integra plataformas nativas.

