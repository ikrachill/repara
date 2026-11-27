# Progreso de REPARA

- Fase 0 completada. Diagnóstico de herramientas y compatibilidad.
- Fase 1 completada. Starter tabs standalone en la raíz de `C:\TP-miapp`, repositorio inicializado y build aprobado. El CLI añadió Capacitor automáticamente y se retiró para conservar el alcance web.
- Fase actual cerrada. Esperar «continuar» para la fase 8.
- Fase 2 completada. Páginas, selectores y rutas renombrados a Solicitudes, Presupuestos y Seguimiento, con íconos propios. Se retiraron los restos de las páginas de ejemplo y se organizaron las carpetas `pages/`, `services/` y `models/`. Pasaron el build y la prueba de navegación en Chromium.
- Fase 3 completada. Los environments comparten `urlRepara`, el build publica el JSON y `ReparaService` expone una lectura tipada por `HttpClient`. Se verificó la respuesta HTTP y las relaciones por `solicitudId`.
- Fase 4 completada. Solicitudes carga y lista los datos en `ngOnInit`, con indicador de carga y reintento. Pasaron el build y las pruebas.
- Fase 5 completada. Presupuestos carga el JSON en `ngOnInit`, asocia los equipos por `solicitudId` y muestra monto, detalle y estado. Pasaron el build y las pruebas.
- Fase 6 completada. Seguimiento lista las novedades del JSON por fecha descendente y muestra el equipo asociado por `solicitudId`. Tiene manejo de carga, error, reintento y lista vacía.
- Fase 7 completada. Los componentes Ionic muestran datos, indican carga o permiten actuar. Las tres pestañas tienen manejo de carga, error y reintento. Solicitudes usa el rol simulado para habilitar el cambio de estado en memoria únicamente para el técnico.
- Fase 8 pendiente. Completar documentos y auditar cada indicador con ruta de evidencia.

## Reglas para continuar

Usar PowerShell y trabajar una fase por autorización. Anunciar el plan, ejecutar `npm run build`, actualizar los documentos y hacer commits lógicos en español con la identidad existente, separando documentación y código. Nunca hacer push. Mantener código sencillo en español, inyectar por constructor, cargar en `ngOnInit` y mantener la misma clave de URL en todos los environments. Angular 22.3.0 exporta `NgFor` y `NgIf`. El alcance es web, con datos locales y rol simulado en el servicio.

