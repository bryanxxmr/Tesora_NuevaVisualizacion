// Ejemplo avanzado de uso del MCP Server con Playwright
// Este archivo muestra cómo estructurar tests complejos

import { test, expect } from '@playwright/test';

// Fixture personalizado para login
const loginFixture = test.extend({
    authenticatedPage: async ({ page }, use) => {
        // Setup: Navegar y hacer login
        await page.goto('https://example.com/login');
        await page.fill('input[name="email"]', 'test@example.com');
        await page.fill('input[name="password"]', 'password123');
        await page.click('button[type="submit"]');

        // Esperar a que se complete el login
        await page.waitForURL('**/dashboard');

        // Usar la página autenticada en el test
        await use(page);

        // Cleanup: Logout
        await page.click('button[aria-label="logout"]');
    },
});

test.describe('Suite de Automatización Avanzada', () => {
    test('Test 1: Validar cargas de página', async ({ page }) => {
        await page.goto('https://example.com');

        // Validar elementos críticos
        const header = page.locator('header');
        const navigation = page.locator('nav');

        await expect(header).toBeVisible();
        await expect(navigation).toBeVisible();

        // Captura de éxito
        await page.screenshot({ path: 'test-header.png' });
    });

    test('Test 2: Flujo de usuario completo', async ({ page }) => {
        // Arrange
        await page.goto('https://example.com');

        // Act
        await page.click('button:has-text("Comenzar")');
        await page.fill('input#search', 'Playwright');
        await page.press('input#search', 'Enter');

        // Assert
        await page.waitForSelector('[data-testid="results"]');
        const resultsCount = await page.locator('[data-testid="result-item"]').count();
        expect(resultsCount).toBeGreaterThan(0);
    });

    test('Test 3: Con fixture autenticado', async ({ authenticatedPage }) => {
        // Ya estamos en dashboard autenticado
        await expect(authenticatedPage.locator('h1:has-text("Dashboard")')).toBeVisible();

        // Realizar acciones de usuario autenticado
        await authenticatedPage.click('button[aria-label="profile"]');
        await expect(authenticatedPage.locator('[data-testid="profile-menu"]')).toBeVisible();
    });

    test.describe('Subgrupo: Validaciones de formularios', () => {
        test('Validar campos requeridos', async ({ page }) => {
            await page.goto('https://example.com/form');

            // Intentar enviar sin llenar
            await page.click('button[type="submit"]');

            // Validar mensajes de error
            await expect(page.locator('.error-message')).toBeVisible();
        });

        test('Validar tipos de datos', async ({ page }) => {
            await page.goto('https://example.com/form');

            const emailInput = page.locator('input[type="email"]');

            // Escribir email inválido
            await emailInput.fill('email-invalido');
            await page.click('button[type="submit"]');

            // Validar error de formato
            const errorMsg = page.locator('text=Email inválido');
            await expect(errorMsg).toBeVisible();
        });
    });
});

test.describe.parallel('Tests en Paralelo', () => {
    test('Test paralelo 1', async ({ page }) => {
        await page.goto('https://example.com');
        await expect(page).toHaveTitle(/.*Example.*/);
    });

    test('Test paralelo 2', async ({ page }) => {
        await page.goto('https://example.com');
        const links = page.locator('a');
        expect(await links.count()).toBeGreaterThan(0);
    });
});

test.describe.serial('Tests Secuenciales', () => {
    test('Paso 1: Crear datos', async ({ page }) => {
        // Este test debe ejecutarse primero
        await page.goto('https://example.com/admin');
        await page.click('button:has-text("Crear")');

        await page.screenshot({ path: 'step-1-create.png' });
    });

    test('Paso 2: Editar datos', async ({ page }) => {
        // Este test se ejecuta después del paso 1
        await page.goto('https://example.com/admin/items');
        await page.click('button:has-text("Editar")');

        await page.screenshot({ path: 'step-2-edit.png' });
    });

    test('Paso 3: Eliminar datos', async ({ page }) => {
        // Este test se ejecuta al final
        await page.goto('https://example.com/admin/items');
        await page.click('button:has-text("Eliminar")');

        await page.screenshot({ path: 'step-3-delete.png' });
    });
});
