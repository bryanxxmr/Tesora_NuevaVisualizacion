// Test usando Page Object Model
// Este es el patrón recomendado para tests mantenibles

import { test, expect } from '@playwright/test';
import { LoginPage, DashboardPage, SearchPage, SettingsPage } from './pages';

test.describe('Test Suite con Page Object Model', () => {
    test('Login exitoso y acceso al dashboard', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const dashboardPage = new DashboardPage(page);

        // Navegar a login
        await loginPage.goto();

        // Realizar login
        await loginPage.login('test@example.com', 'password123');

        // Verificar que estamos en el dashboard
        const isDashboardVisible = await dashboardPage.isVisible();
        expect(isDashboardVisible).toBeTruthy();
    });

    test('Login fallido muestra error', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.login('wrong@example.com', 'wrongpassword');

        const hasError = await loginPage.verifyErrorMessage();
        expect(hasError).toBeTruthy();
    });

    test('Búsqueda de productos', async ({ page }) => {
        const searchPage = new SearchPage(page);

        await searchPage.goto();
        await searchPage.search('Playwright');

        const resultsCount = await searchPage.getResultsCount();
        expect(resultsCount).toBeGreaterThan(0);

        const firstResult = await searchPage.getFirstResultText();
        expect(firstResult).toBeTruthy();
    });

    test('Búsqueda sin resultados', async ({ page }) => {
        const searchPage = new SearchPage(page);

        await searchPage.goto();
        await searchPage.search('xyz123notfound');

        const noResults = await searchPage.isNoResultsVisible();
        expect(noResults).toBeTruthy();
    });

    test('Actualizar perfil de usuario', async ({ page }) => {
        const settingsPage = new SettingsPage(page);

        await settingsPage.goto();
        await settingsPage.updateProfile('newemail@example.com', '+1234567890');

        const success = await settingsPage.verifySuccessMessage();
        expect(success).toBeTruthy();

        const profile = await settingsPage.getProfileData();
        expect(profile.email).toBe('newemail@example.com');
        expect(profile.phone).toBe('+1234567890');
    });

    test('Logout desde dashboard', async ({ page }) => {
        const dashboardPage = new DashboardPage(page);
        const loginPage = new LoginPage(page);

        // Asumir que ya estamos logueados en el dashboard
        await dashboardPage.goto();

        // Realizar logout
        await dashboardPage.logout();

        // Verificar que estamos en login page
        await loginPage.goto();
        const emailInputVisible = await loginPage.emailInput.isVisible();
        expect(emailInputVisible).toBeTruthy();
    });
});

test.describe('Flujos de usuario complejos', () => {
    test('Flujo completo: Login -> Búsqueda -> Compra -> Logout', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const dashboardPage = new DashboardPage(page);
        const searchPage = new SearchPage(page);

        // 1. Login
        await loginPage.goto();
        await loginPage.login('test@example.com', 'password123');
        expect(await dashboardPage.isVisible()).toBeTruthy();

        // 2. Ir a búsqueda
        await searchPage.goto();
        await searchPage.search('producto interesante');
        expect(await searchPage.getResultsCount()).toBeGreaterThan(0);

        // 3. Hacer clic en primer resultado (simularía una compra)
        await searchPage.clickResultByIndex(0);
        await page.waitForURL('**/product/**');

        // 4. Logout
        await dashboardPage.logout();
    });
});
