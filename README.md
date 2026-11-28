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

## Rol simulado

Al abrir la aplicación, elegí el rol en Bienvenida y presioná **Ingresar**. Los campos de usuario y contraseña son de demostración y se pueden dejar vacíos. Para elegir otro rol, usá el botón de salida en Solicitudes. La salida restablece Cliente y abre `/login`. En modo Cliente, el botón **+** abre el formulario para crear solicitudes pendientes. El rol se conserva al navegar entre pestañas. Al elegir Técnico, aparece **Cambiar estado** en las solicitudes abiertas. Cada clic avanza al siguiente estado, muestra una confirmación y agrega una novedad en Seguimiento. Al pasar a presupuestada se crea una estimación de prueba de Gs. 150.000. Los registros nuevos se resaltan al abrir sus pestañas. Presupuestos muestra un aviso rojo hasta que abrís la pestaña. Las solicitudes y los presupuestos de la demostración quedan en memoria al cambiar de rol. Los cambios se conservan al navegar y se reinician al recargar el navegador.

## Componentes Ionic

| Componente | Dónde se usa |
| --- | --- |
| `ion-tabs`, `ion-tab-bar`, `ion-tab-button` | Navegación de Solicitudes, Presupuestos y Seguimiento en `src/app/tabs/tabs.page.html` |
| `ion-icon` | Navegación en `src/app/tabs/tabs.page.html`, beneficios en Bienvenida y estados vacíos en las tres pestañas |
| `ion-header`, `ion-toolbar`, `ion-title`, `ion-content` | Encabezados y áreas de contenido de las tres páginas en `src/app/pages/` |
| `ion-list`, `ion-item`, `ion-label`, `ion-badge` | Agrupan los registros, muestran equipo y cliente y reflejan el estado en `src/app/pages/solicitudes/solicitudes.page.html` |
| `ion-spinner`, `ion-button` | Carga y reintento en las tres pestañas. En Solicitudes, el botón también avanza el estado del registro seleccionado |
| `ion-card`, `ion-card-header`, `ion-card-title`, `ion-card-content`, `ion-badge` | Equipo, detalle, monto y estado en `src/app/pages/presupuestos/presupuestos.page.html` |
| `ion-list`, `ion-item`, `ion-label`, `ion-note` | Equipo, detalle y fecha de cada novedad en `src/app/pages/seguimiento/seguimiento.page.html` |
| `ion-select`, `ion-select-option` | Eligen el rol en Bienvenida |
| `ion-input` | Campos de demostración en `src/app/pages/bienvenida/bienvenida.page.html` |

El tema visual de REPARA usa Inter, fondo claro y acentos verde lima. La foto de Bienvenida es de [Revendo en Unsplash](https://unsplash.com/photos/a-person-using-a-screwdriver-to-fix-a-cell-phone-Q_I49DIzHu8).

`ion-fab`, `ion-fab-button`, `ion-modal`, `ion-input` e `ion-textarea` se usan en `src/app/pages/solicitudes/solicitudes.page.html` para crear solicitudes. El `ion-badge` de `src/app/tabs/tabs.page.html` indica una estimación pendiente de lectura.

## Verificación

La compilación y las pruebas unitarias se ejecutan con `npm run build` y `npm run test:unit`. Para la prueba de navegador, instalá Chromium con `npx playwright install chromium` y ejecutá `npm run test:e2e`.

La auditoría de la rúbrica está en [PROGRESO.md](PROGRESO.md#auditoría-final-de-la-rúbrica). La guía para explicar el código está en [EXPLICACION.md](EXPLICACION.md).

## Capturas

