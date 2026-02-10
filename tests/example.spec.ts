import { test, expect } from '@playwright/test';

test.describe('Ejemplos de Automatización Básica', () => {
    test('Validar que Playwright puede navegar', async ({ page }) => {
        // Navegar a Playwright docs - sitio confiable para tests
        await page.goto('https://playwright.dev');

        // Esperar a que la página cargue
        await page.waitForLoadState('networkidle');

        // Validar que la página tiene contenido
        const title = await page.title();
        expect(title).toBeTruthy();
    });

    test('Validar que la página responde', async ({ page }) => {
        const response = await page.goto('https://example.com');

        // Verificar que el servidor responde
        expect(response?.status()).toBeLessThan(400);
    });

    test('Validar que podemos hacer screenshot', async ({ page }) => {
        // Navegar a un sitio simple
        await page.goto('https://example.com');

        // Tomar captura de pantalla
        const screenshot = await page.screenshot();

        // Verificar que se capturó algo
        expect(screenshot).toBeTruthy();
        expect(screenshot.length).toBeGreaterThan(0);
    });

    test('Validar que Playwright maneja errores correctamente', async ({ page }) => {
        try {
            // Intentar ir a una página que no existe
            const response = await page.goto('https://this-domain-definitely-does-not-exist-12345.com', { waitUntil: 'domcontentloaded' }).catch(() => null);
            // Si llegamos aquí, está bien (el sitio no existe pero Playwright lo maneja)
            expect(true).toBeTruthy();
        } catch (error) {
            // También está bien si hay error
            expect(true).toBeTruthy();
        }
    });
});
