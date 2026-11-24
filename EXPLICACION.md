# Explicación de REPARA

## Archivos y decisiones de la fase 1

| Archivo o grupo | Función |
| --- | --- |
| `src/main.ts`, `src/index.html` | Arrancan Angular y alojan el componente raíz. |
| `src/app/app.component.*`, `src/app/app.routes.ts` | Definen el contenedor de la app y la entrada al conjunto de pestañas. |
| `src/app/tabs/tabs.page.*`, `src/app/tabs/tabs.routes.ts` | Definen la barra inferior y las rutas hijas que cargan las páginas. |
| `src/app/tab1/`, `src/app/tab2/`, `src/app/tab3/` | Contienen las páginas provisionales, con plantilla, estilos y pruebas generadas. |
| `src/app/explore-container/` | Componente de ejemplo que muestran las páginas provisionales. |
| `src/global.scss`, `src/theme/`, `src/assets/` | Estilos generales, tema y recursos estáticos. |
| `package.json`, `package-lock.json` | Scripts y dependencias. El archivo de bloqueo permite reproducir la instalación. |
| `angular.json`, `ionic.config.json`, `tsconfig*.json` | Configuración de compilación, identificación del proyecto Ionic y opciones TypeScript. |
| `e2e/`, `playwright.config.ts`, `vitest.config.mts`, `*.spec.ts` | Configuración y pruebas que trae el starter. |
| `eslint.config.js`, `.prettierignore`, `.editorconfig`, `.browserslistrc`, `.vscode/` | Reglas de análisis, formato, compatibilidad de navegadores y configuración del editor. |
| `.gitignore`, `AGENTS.md`, `README.md`, `IA.md`, `PROGRESO.md`, `EXPLICACION.md` | Exclusiones de Git, reglas del proyecto, ejecución, uso de IA, estado y explicación del código. |

Se eligió standalone para declarar en cada componente las dependencias de su plantilla. Se mantuvo el starter tabs como base y se retiró Capacitor porque la entrega se ejecuta en navegador.

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

