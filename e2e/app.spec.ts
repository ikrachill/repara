import { expect, test } from '@playwright/test';

test('navega entre las tres pestañas sin errores', async ({ page }) => {
  const errores: string[] = [];
  page.on('pageerror', (error) => errores.push(error.message));
  page.on('console', (mensaje) => {
    if (mensaje.type() === 'error') errores.push(mensaje.text());
  });

  await page.goto('/');
  const bienvenida = page.locator('app-bienvenida');
  await expect(bienvenida.getByRole('heading', { name: 'REPARÁ' })).toBeVisible();
  await bienvenida.getByRole('button', { name: 'Ingresar' }).click();
  await expect(page).toHaveURL(/\/tabs\/solicitudes$/);
  await expect(page.locator('app-solicitudes ion-title').first()).toHaveText('Solicitudes');

  await expect(page.locator('app-solicitudes ion-list ion-item')).toHaveCount(5);
  await expect(page.locator('app-solicitudes ion-select')).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Cambiar estado' })).toHaveCount(0);

  for (const [ruta, titulo] of [
    ['presupuestos', 'Presupuestos'],
    ['seguimiento', 'Seguimiento'],
    ['solicitudes', 'Solicitudes'],
  ]) {
    await page.locator(`ion-tab-button[tab="${ruta}"]`).click();
    await expect(page).toHaveURL(new RegExp(`/tabs/${ruta}$`));
    await expect(page.locator(`app-${ruta} ion-title`).first()).toBeVisible();
    await expect(page.locator(`app-${ruta} ion-title`).first()).toHaveText(titulo);
  }

  await page.locator('ion-tab-button[tab="presupuestos"]').click();
  const tarjetas = page.locator('app-presupuestos ion-card');
  await expect(tarjetas).toHaveCount(5);
  await expect(tarjetas.first().locator('ion-card-title')).toHaveText('Notebook');

  await page.locator('ion-tab-button[tab="seguimiento"]').click();
  const novedades = page.locator('app-seguimiento ion-list ion-item');
  await expect(novedades).toHaveCount(5);
  await expect(novedades.first().locator('ion-note')).toHaveText('2026-11-24');

  expect(errores).toEqual([]);
});

test('registra y ordena en Seguimiento los cambios que hace el técnico', async ({ page }) => {
  await page.clock.setFixedTime(new Date('2026-11-24T12:00:00'));
  await page.goto('/');
  const bienvenida = page.locator('app-bienvenida');
  await expect(bienvenida.getByRole('heading', { name: 'REPARÁ' })).toBeVisible();
  await bienvenida.locator('ion-select').click();
  await page.getByRole('radio', { name: 'Técnico' }).click();
  await page.getByRole('button', { name: /^ok$/i }).click();
  await bienvenida.getByRole('button', { name: 'Ingresar' }).click();
  const tabla = page.locator('app-solicitudes ion-list');
  const notebook = tabla.locator('ion-item').filter({ hasText: 'Notebook' });
  const cambiarEstado = notebook.getByRole('button', { name: 'Cambiar estado' });

  await expect(notebook.locator('ion-badge')).toHaveText('en reparación');
  await expect(cambiarEstado).toBeVisible();

  const novedades = page.locator('app-seguimiento ion-item');
  await page.locator('ion-tab-button[tab="seguimiento"]').click();
  await expect(novedades).toHaveCount(5);
  await page.locator('ion-tab-button[tab="solicitudes"]').click();

  await cambiarEstado.click();
  await expect(notebook.locator('ion-badge')).toHaveText('finalizada');
  await expect(cambiarEstado).toHaveCount(0);

  await page.locator('ion-tab-button[tab="seguimiento"]').click();
  await expect(novedades).toHaveCount(6);
  await expect(novedades.first().locator('h2')).toHaveText('Notebook');
  await expect(novedades.first().locator('p')).toHaveText('El técnico actualizó el estado a: finalizada');
  await expect(novedades.first().locator('ion-note')).toHaveText('2026-11-24');

  await page.locator('ion-tab-button[tab="solicitudes"]').click();
  await tabla.locator('ion-item').filter({ hasText: 'Ventilador' })
    .getByRole('button', { name: 'Cambiar estado' }).click();
  await page.locator('ion-tab-button[tab="seguimiento"]').click();
  await expect(novedades).toHaveCount(7);
  await expect(novedades.first().locator('h2')).toHaveText('Ventilador');
  await expect(novedades.nth(1).locator('h2')).toHaveText('Notebook');

  await page.locator('ion-tab-button[tab="presupuestos"]').click();
  await page.locator('ion-tab-button[tab="solicitudes"]').click();
  await expect(notebook.locator('ion-badge')).toHaveText('finalizada');

  await expect(tabla.getByRole('button', { name: 'Cambiar estado' }).first()).toBeVisible();
  await page.reload();
  await expect(notebook.locator('ion-badge')).toHaveText('en reparación');
});

test('muestra un estado vacío ilustrado en cada pestaña', async ({ page }) => {
  await page.route('**/assets/data/repara.json', (ruta) =>
    ruta.fulfill({ json: { solicitudes: [], presupuestos: [], seguimientos: [] } }),
  );
  await page.goto('/tabs/solicitudes');

  for (const [ruta, icono, mensaje] of [
    ['solicitudes', 'document-text-outline', 'No hay solicitudes registradas.'],
    ['presupuestos', 'receipt-outline', 'No hay presupuestos registrados.'],
    ['seguimiento', 'time-outline', 'No hay novedades de seguimiento.'],
  ]) {
    if (ruta !== 'solicitudes') await page.locator(`ion-tab-button[tab="${ruta}"]`).click();
    const estado = page.locator(`app-${ruta} .estado-vacio`);
    await expect(estado).toHaveText(mensaje);
    await expect(estado.locator(`ion-icon[name="${icono}"] svg`)).toBeVisible();
  }
});

test('genera y resalta un presupuesto al presupuestar una solicitud', async ({ page }) => {
  await page.goto('/');
  await page.locator('app-bienvenida ion-select').click();
  await page.getByRole('radio', { name: 'Técnico' }).click();
  await page.getByRole('button', { name: /^ok$/i }).click();
  await page.getByRole('button', { name: 'Ingresar' }).click();

  const pestana = (nombre: string) => page.locator(`ion-tab-button[tab="${nombre}"]`);
  const tarjetas = page.locator('app-presupuestos ion-card');
  await pestana('presupuestos').click();
  await expect(tarjetas).toHaveCount(5);
  await pestana('solicitudes').click();

  const solicitud = page.locator('app-solicitudes ion-item').filter({ hasText: 'Licuadora' });
  await expect(solicitud.locator('ion-badge')).toHaveText('pendiente');
  const accion = solicitud.getByRole('button', { name: 'Cambiar estado' });
  await accion.click();
  await expect(solicitud.locator('ion-badge')).toHaveText('presupuestada');
  await expect(page.locator('ion-toast').getByText('Solicitud actualizada con éxito')).toBeVisible();

  await pestana('presupuestos').click();
  await expect(tarjetas).toHaveCount(6);
  const presupuesto = tarjetas.first();
  await expect(presupuesto.locator('ion-card-title')).toHaveText('Licuadora');
  await expect(presupuesto.locator('.monto')).toHaveText('Gs. 150,000');
  await expect(presupuesto).toHaveClass(/registro-nuevo/);
  await expect(presupuesto).toHaveCSS('animation-duration', '2s');

  await pestana('seguimiento').click();
  const novedad = page.locator('app-seguimiento ion-item').first();
  await expect(novedad.locator('p')).toHaveText('El técnico actualizó el estado a: presupuestada');
  await expect(novedad).toHaveClass(/registro-nuevo/);

  await pestana('presupuestos').click();
  await expect(tarjetas).toHaveCount(6);
  await expect(tarjetas.first()).not.toHaveClass(/registro-nuevo/);
});
