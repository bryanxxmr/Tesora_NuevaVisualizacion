import { test, expect } from '@playwright/test';

test.describe('Ejemplos de Automatización Básica', () => {

    test('Test 1: Playwright está disponible', () => {
        expect(true).toBeTruthy();
    });

    test('Test 2: Fixtures disponibles', async ({ page, browser }) => {
        expect(page).toBeDefined();
        expect(browser).toBeDefined();
    });

    test('Test 3: Crear contexto', async ({ browser }) => {
        const context = await browser.newContext();
        expect(context).toBeDefined();
        await context.close();
    });

    test('Test 4: Crear página', async ({ page }) => {
        expect(page).toBeDefined();
    });
});
