import { test, expect } from '@playwright/test';

test.describe('Ejemplos de Automatización', () => {
    test.beforeEach(async ({ page }) => {
        // Navegar al sitio web antes de cada test
        await page.goto('https://example.com');
    });

    test('Validar que la página carga correctamente', async ({ page }) => {
        // Validar que el elemento h1 es visible
        await expect(page.locator('h1')).toBeVisible();
    });

    test('Ejemplo de interacción con elementos', async ({ page }) => {
        // Hacer clic en un botón (ajusta el selector según tu página)
        // await page.click('button.submit');

        // Esperar y validar un elemento
        // await expect(page.locator('text=Success')).toBeVisible();
    });

    test('Ejemplo de captura de pantalla', async ({ page }) => {
        // Tomar una captura de pantalla
        await page.screenshot({ path: 'screenshot.png' });
    });
});
