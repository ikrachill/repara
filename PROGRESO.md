# Progreso de REPARA

- Fase 0 completada. Diagnóstico de herramientas y compatibilidad.
- Fase 1 completada. Starter tabs standalone en la raíz de `C:\TP-miapp`, repositorio inicializado y build aprobado. El CLI añadió Capacitor automáticamente y se retiró para conservar el alcance web.
- Fase actual cerrada. Esperar «continuar» para la fase 3.
- Fase 2 completada. Páginas, selectores y rutas renombrados a Solicitudes, Presupuestos y Seguimiento, con íconos propios. Se retiraron los restos de las páginas de ejemplo y se organizaron las carpetas `pages/`, `services/` y `models/`. Pasaron el build y la prueba de navegación en Chromium.
- Fase 3 pendiente. Crear environments, JSON local, interfaces y un único `ReparaService`.
- Fases 4 a 6 pendientes. Implementar el contenido de las tres pestañas en orden.
- Fase 7 pendiente. Completar al menos siete componentes Ionic que cuenten para la rúbrica y el manejo de carga, error y reintento.
- Fase 8 pendiente. Completar documentos y auditar cada indicador con ruta de evidencia.

## Reglas para continuar

Usar PowerShell y trabajar una fase por autorización. Anunciar el plan, ejecutar `npm run build`, actualizar los documentos y hacer commits lógicos en español con la identidad existente, separando documentación y código. Nunca hacer push. Mantener código sencillo en español, inyectar por constructor, cargar en `ngOnInit` y mantener la misma clave de URL en todos los environments. Angular 22.3.0 exporta `NgFor` y `NgIf`. El alcance es web, con datos locales y rol simulado en el servicio.

