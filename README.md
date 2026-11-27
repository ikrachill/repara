# REPARA

Plataforma web para solicitar reparaciones, consultar presupuestos y seguir el estado de cada trabajo.

## Integrantes

- Fabián Giménez

## Cómo ejecutar

1. Desde la raíz, ejecutá `npm ci`.
2. Ejecutá `npm start` y abrí `http://localhost:4200`.
3. Para compilar la versión de entrega, ejecutá `npm run build`. La salida está en `www/`.

## Fuente de datos

La aplicación usa el archivo local `src/assets/data/repara.json`, con las colecciones `solicitudes`, `presupuestos` y `seguimientos`. Las dos últimas se relacionan con la primera por `solicitudId`. Los dos environments configuran su URL con la clave `urlRepara`. Las tres pestañas cargan sus registros desde este archivo.

## Componentes Ionic

| Componente | Dónde se usa |
| --- | --- |
| `ion-tabs`, `ion-tab-bar`, `ion-tab-button` | Navegación de Solicitudes, Presupuestos y Seguimiento en `src/app/tabs/tabs.page.html` |
| `ion-icon` | Íconos de herramientas, recibo y reloj en `src/app/tabs/tabs.page.html` |
| `ion-header`, `ion-toolbar`, `ion-title`, `ion-content` | Encabezados y áreas de contenido de las tres páginas en `src/app/pages/` |
| `ion-list`, `ion-item`, `ion-label`, `ion-badge` | Lista y estados en `src/app/pages/solicitudes/solicitudes.page.html` |
| `ion-spinner`, `ion-button` | Indicador de carga y reintento en las plantillas de las tres pestañas |
| `ion-card`, `ion-card-header`, `ion-card-title`, `ion-card-content`, `ion-badge` | Equipo, detalle, monto y estado en `src/app/pages/presupuestos/presupuestos.page.html` |
| `ion-list`, `ion-item`, `ion-label`, `ion-note` | Equipo, detalle y fecha de cada novedad en `src/app/pages/seguimiento/seguimiento.page.html` |

## Capturas

