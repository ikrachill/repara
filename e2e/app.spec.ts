import { expect, test } from '@playwright/test';

test('navega entre las tres pestañas sin errores', async ({ page }) => {
  const errores: string[] = [];
  page.on('pageerror', (error) => errores.push(error.message));
  page.on('console', (mensaje) => {
    if (mensaje.type() === 'error') errores.push(mensaje.text());
  });

  await page.goto('/');
  await expect(page).toHaveURL(/\/tabs\/solicitudes$/);
  await expect(page.locator('app-solicitudes ion-title').first()).toHaveText('Solicitudes');

  await expect(page.locator('app-solicitudes ion-list ion-item')).toHaveCount(5);

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

test('solo el técnico puede cambiar el estado de una solicitud', async ({ page }) => {
  await page.goto('/');
  const tabla = page.locator('app-solicitudes ion-list');
  const notebook = tabla.locator('ion-item').filter({ hasText: 'Notebook' });
  const rol = page.locator('app-solicitudes ion-select');
  const cambiarEstado = notebook.getByRole('button', { name: 'Cambiar estado' });

  await expect(notebook.locator('ion-badge')).toHaveText('en reparación');
  await expect(cambiarEstado).toHaveCount(0);
  await rol.click();
  await page.getByRole('radio', { name: 'Técnico' }).click();
  await page.getByRole('button', { name: /^ok$/i }).click();

  await cambiarEstado.click();
  await expect(notebook.locator('ion-badge')).toHaveText('finalizada');
  await expect(cambiarEstado).toHaveCount(0);

  await page.locator('ion-tab-button[tab="presupuestos"]').click();
  await page.locator('ion-tab-button[tab="solicitudes"]').click();
  await expect(notebook.locator('ion-badge')).toHaveText('finalizada');

  await rol.click();
  await page.getByRole('radio', { name: 'Cliente' }).click();
  await page.getByRole('button', { name: /^ok$/i }).click();
  await expect(tabla.getByRole('button', { name: 'Cambiar estado' })).toHaveCount(0);

  await page.reload();
  await expect(notebook.locator('ion-badge')).toHaveText('en reparación');
});
