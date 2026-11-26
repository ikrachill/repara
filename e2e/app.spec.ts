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

  expect(errores).toEqual([]);
});
