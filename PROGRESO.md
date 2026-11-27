# Progreso de REPARA

- Fase 0 completada. Diagnóstico de herramientas y compatibilidad.
- Fase 1 completada. Starter tabs standalone en la raíz de `C:\TP-miapp`, repositorio inicializado y build aprobado. El CLI añadió Capacitor automáticamente y se retiró para conservar el alcance web.
- Estado final. Fases 0 a 8 completadas.
- Fase 2 completada. Páginas, selectores y rutas renombrados a Solicitudes, Presupuestos y Seguimiento, con íconos propios. Se retiraron los restos de las páginas de ejemplo y se organizaron las carpetas `pages/`, `services/` y `models/`. Pasaron el build y la prueba de navegación en Chromium.
- Fase 3 completada. Los environments comparten `urlRepara`, el build publica el JSON y `ReparaService` expone una lectura tipada por `HttpClient`. Se verificó la respuesta HTTP y las relaciones por `solicitudId`.
- Fase 4 completada. Solicitudes carga y lista los datos en `ngOnInit`, con indicador de carga y reintento. Pasaron el build y las pruebas.
- Fase 5 completada. Presupuestos carga el JSON en `ngOnInit`, asocia los equipos por `solicitudId` y muestra monto, detalle y estado. Pasaron el build y las pruebas.
- Fase 6 completada. Seguimiento lista las novedades del JSON por fecha descendente y muestra el equipo asociado por `solicitudId`. Tiene manejo de carga, error, reintento y lista vacía.
- Fase 7 completada. Los componentes Ionic muestran datos, indican carga o permiten actuar. Las tres pestañas tienen manejo de carga, error y reintento. Solicitudes usa el rol simulado para habilitar el cambio de estado en memoria únicamente para el técnico.
- Fase 8 completada. Se cerraron los documentos y se auditó la rúbrica. El build, las cinco pruebas unitarias y las dos pruebas en Chromium pasaron.

## Reglas para continuar

Usar PowerShell y trabajar una fase por autorización. Anunciar el plan, ejecutar `npm run build`, actualizar los documentos y hacer commits lógicos en español con la identidad existente, separando documentación y código. Nunca hacer push. Mantener código sencillo en español, inyectar por constructor, cargar en `ngOnInit` y mantener la misma clave de URL en todos los environments. Angular 22.3.0 exporta `NgFor` y `NgIf`. El alcance es web, con datos locales y rol simulado en el servicio.


## Ajustes de cierre

Se restauraron los acentos dañados en el JSON y se aplicó el tema claro a las tres pestañas. El build pasó, las pruebas se ejecutaron en Chromium y se prepararon capturas móviles de la versión final.

Se agregó la bienvenida standalone en la raíz, con elección de rol únicamente al ingresar. Las rutas directas y las tres pestañas siguen disponibles. Se añadieron animaciones CSS, encabezados con subtítulos e íconos para los estados vacíos.

Cada cambio de estado ahora genera una novedad de sesión y aparece en Seguimiento al volver a la pestaña. Se agregó una foto local en Bienvenida y el logo pasa a mostrar REPARÁ con una animación continua.

## Auditoría final de la rúbrica

| Criterio e indicador | Resultado | Evidencia |
| --- | --- | --- |
| 1. Tres pestañas con rutas, archivos, clases, selectores e íconos propios | CUMPLE | `src/app/tabs/tabs.routes.ts`, `src/app/tabs/tabs.page.ts`, `src/app/tabs/tabs.page.html` y `src/app/pages/` |
| 1. Navegación sin errores de consola ni referencias del starter en las pantallas | CUMPLE | `e2e/app.spec.ts`, búsqueda de referencias en `src/` y `e2e/` |
| 1. Carpetas para páginas, modelo y servicio | CUMPLE | `src/app/pages/`, `src/app/models/`, `src/app/services/` |
| 2. Un JSON con tres colecciones relacionadas y publicado en el build | CUMPLE | `src/assets/data/repara.json`, `angular.json` y el archivo publicado bajo `www/` |
| 2. Servicio único con `providedIn: 'root'`, inyección por constructor, modelos tipados y HTTP configurado | CUMPLE | `src/app/services/repara.service.ts`, `src/app/models/repara.model.ts`, `src/main.ts` y los componentes en `src/app/pages/` |
| 2. URL con la misma clave en ambos environments | CUMPLE | `src/environments/environment.ts`, `src/environments/environment.prod.ts` |
| 2. Carga en `ngOnInit`, indicador, error visible y reintento en las tres páginas | CUMPLE | Archivos `*.page.ts`, `*.page.html` y `*.page.spec.ts` en `src/app/pages/` |
| 3. Al menos siete componentes conectados a datos, bindings y eventos | CUMPLE | `ion-list`, `ion-item`, `ion-label`, `ion-badge`, `ion-button`, `ion-card` e `ion-note` en las plantillas de `src/app/pages/`. La tabla en `README.md` también incluye el selector de rol y el indicador de carga. |
| 3. Listados con `*ngFor` y estados de interfaz con `*ngIf` | CUMPLE | `src/app/pages/solicitudes/solicitudes.page.html`, `src/app/pages/presupuestos/presupuestos.page.html`, `src/app/pages/seguimiento/seguimiento.page.html` |
| 4. README con integrantes, fuente, ejecución, tabla y sección Capturas vacía | CUMPLE | `README.md` |
| 4. Commits progresivos, descriptivos y con documentación separada | CUMPLE | Historial local de Git (`.git/logs/HEAD`), desde el scaffold hasta esta auditoría |
| 5. Trabajo original adaptado al tema y documentado para la defensa | CUMPLE | `src/assets/data/repara.json`, `src/app/pages/`, `EXPLICACION.md` |
| 5. Capacidad del integrante para explicar el código | NO CUMPLE | Pendiente de verificar en la defensa. `EXPLICACION.md` contiene diez preguntas con respuestas. |
| 6. Herramienta, instrucciones, prompts, resultados y correcciones de IA registrados | CUMPLE | `IA.md`, con «Revisión de los integrantes» reservada para completar a mano |
| Condición de entrega. Compilación con `npm run build` | CUMPLE | Script en `package.json`, configuración en `angular.json` y resultado registrado en `IA.md` |
