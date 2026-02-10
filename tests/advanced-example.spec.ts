// Ejemplo avanzado de uso del MCP Server con Playwright
// Este archivo muestra cómo estructurar tests complejos

import { test, expect } from '@playwright/test';

test.describe('Suite de Automatización Avanzada', () => {
    test('Test 1: Validar contenido de página', async ({ page }) => {
        await page.goto('https://example.com');

        // Esperar a que se cargue la página
        await page.waitForLoadState('networkidle');

        // Obtener contenido del body
        const bodyContent = await page.innerHTML('body');

        // Validar que hay contenido
        expect(bodyContent).toBeTruthy();
        expect(bodyContent?.length).toBeGreaterThan(0);
    });

    test('Test 2: Validar múltiples navegadores funcionen', async ({ browser }) => {
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

    test('Test 3: Con patrones de espera', async ({ page }) => {
        // Ya estamos en example.com
        await page.goto('https://example.com');

        // Realizar acciones
        await page.waitForSelector('body');
        const isVisible = await page.isVisible('body');
        expect(isVisible).toBeTruthy();
    });

    test.describe('Subgrupo: Validaciones de navegación', () => {
        test('Validar que se carga la página', async ({ page }) => {
            const response = await page.goto('https://example.com');
            expect(response?.status()).toBeLessThan(400);
        });

        test('Validar que el bodyexiste', async ({ page }) => {
            await page.goto('https://example.com');
            await page.waitForSelector('body');
            const bodyVisible = await page.isVisible('body');
            expect(bodyVisible).toBeTruthy();
        });
    });
});

test.describe.parallel('Tests en Paralelo', () => {
    test('Test paralelo 1', async ({ page }) => {
        const response = await page.goto('https://example.com');
        expect(response?.status()).toBeLessThan(400);
    });

    test('Test paralelo 2', async ({ page }) => {
        await page.goto('https://example.com');
        const title = await page.title();
        expect(title).toBeTruthy();
    });

    test('Test paralelo 3', async ({ page }) => {
        await page.goto('https://example.com');
        const screenshot = await page.screenshot();
        expect(screenshot.length).toBeGreaterThan(0);
    });
});
