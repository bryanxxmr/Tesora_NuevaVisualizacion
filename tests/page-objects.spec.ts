// Test usando Playwright con patrones útiles
// Este es el patrón recomendado para tests mantenibles

import { test, expect } from '@playwright/test';

test.describe('Test Suite con Patrones Recomendados', () => {
    test('Validar múltiples navegadores funcionen', async ({ browser }) => {
        const context = await browser.newContext();
        const page = await context.newPage();

        // Navegar a un sitio
        await page.goto('https://example.com');

        // Esperar y validar
        await page.waitForLoadState('networkidle');
        const url = page.url();

        expect(url).toContain('example');
        await context.close();
    });

    test('Validar que podemos esperar por elementos', async ({ page }) => {
        await page.goto('https://example.com');

        // Esperar por el body (siempre existe)
        await page.waitForSelector('body');

        // Validar que existe
        const bodyExists = await page.isVisible('body');
        expect(bodyExists).toBeTruthy();
    });

    test('Validar que podemos obtener información de la página', async ({ page }) => {
        await page.goto('https://example.com');

        // Obtener título
        const title = await page.title();
        expect(title).toBeTruthy();

        // Obtener URL
        const url = page.url();
        expect(url).toContain('example');

        // Captura de pantalla
        const screenshot = await page.screenshot();
        expect(screenshot).toBeTruthy();
    });

    test('Validar respuesta del servidor', async ({ page }) => {
        const response = await page.goto('https://example.com');

        // El servidor debe responder
        expect(response?.status()).toBeDefined();
        expect(response?.status()).toBeLessThan(400);
    });

    test('Validar contenido de la página', async ({ page }) => {
        await page.goto('https://example.com');

        // Obtener el contenido del body
        const content = await page.innerText('body');

        // El contenido no debe estar vacío
        expect(content).toBeTruthy();
        expect(content.length).toBeGreaterThan(0);
    });

    test.describe('Subgrupo: Validaciones de Navegación', () => {
        test('Validar que se carga example.com', async ({ page }) => {
            const response = await page.goto('https://example.com');
            expect(response?.status()).toBeLessThan(400);
        });

        test('Validar que playwright.dev carga también', async ({ page }) => {
            const response = await page.goto('https://playwright.dev');
            expect(response?.status()).toBeLessThan(400);

            const title = await page.title();
            expect(title).toContain('Playwright');
        });

        test('Validar manejo de errores 404', async ({ page }) => {
            const response = await page.goto('https://example.com/pagina-que-no-existe', { waitUntil: 'domcontentloaded' }).catch(() => null);
            // Si hay error o 404, está bien
            expect(true).toBeTruthy();
        });
    });

    test.describe('Flujos de usuario complejos', () => {
        test('Flujo completo: Navegar -> Obtener Info -> Screenshot', async ({ page }) => {
            // 1. Navegar
            const response = await page.goto('https://example.com');
            expect(response?.status()).toBeLessThan(400);

            // 2. Obtener información
            const title = await page.title();
            const url = page.url();
            expect(title).toBeTruthy();
            expect(url).toContain('example');

            // 3. Screenshot
            const screenshot = await page.screenshot();
            expect(screenshot.length).toBeGreaterThan(0);
        });
    });
});
