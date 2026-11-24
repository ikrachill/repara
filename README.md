# REPARA

Plataforma web para solicitar reparaciones, consultar presupuestos y seguir el estado de cada trabajo.

## Integrantes

- Fabián Giménez

## Cómo ejecutar

1. Desde la raíz, ejecutá `npm ci`.
2. Ejecutá `npm start` y abrí `http://localhost:4200`.
3. Para compilar la versión de entrega, ejecutá `npm run build`. La salida está en `www/`.

## Fuente de datos

Está prevista en `src/assets/data/repara.json`, con las colecciones `solicitudes`, `presupuestos` y `seguimientos`. Las dos últimas se relacionan con la primera por `solicitudId`. El archivo se incorpora en la fase 3.

## Componentes Ionic

| Componente | Dónde se usa |
| --- | --- |
| `ion-tabs`, `ion-tab-bar`, `ion-tab-button` | Navegación inicial en `src/app/tabs/tabs.page.html` |
| `ion-icon` | Íconos provisionales en `src/app/tabs/tabs.page.html` |
| `ion-header`, `ion-toolbar`, `ion-title`, `ion-content` | Plantillas provisionales de las tres páginas en `src/app/tab1/`, `src/app/tab2/` y `src/app/tab3/` |

## Capturas

