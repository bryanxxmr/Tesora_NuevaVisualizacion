// Patrón Page Object Model - Ejemplo de implementación
// Este patrón ayuda a mantener los tests más mantenibles

import { Page, Locator } from '@playwright/test';

/**
 * Página de Login
 */
export class LoginPage {
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailInput = page.locator('input[name="email"]');
        this.passwordInput = page.locator('input[name="password"]');
        this.loginButton = page.locator('button[type="submit"]');
        this.errorMessage = page.locator('.error-message');
    }

    async goto() {
        await this.page.goto('https://example.com/login');
    }

    async login(email: string, password: string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async verifyErrorMessage() {
        return this.errorMessage.isVisible();
    }
}

/**
 * Página de Dashboard
 */
export class DashboardPage {
    readonly page: Page;
    readonly header: Locator;
    readonly userMenu: Locator;
    readonly logoutButton: Locator;
    readonly sidebar: Locator;

    constructor(page: Page) {
        this.page = page;
        this.header = page.locator('header');
        this.userMenu = page.locator('[aria-label="user-menu"]');
        this.logoutButton = page.locator('button:has-text("Logout")');
        this.sidebar = page.locator('aside');
    }

    async goto() {
        await this.page.goto('https://example.com/dashboard');
    }

    async openUserMenu() {
        await this.userMenu.click();
    }

    async logout() {
        await this.openUserMenu();
        await this.logoutButton.click();
    }

    async isVisible() {
        return this.header.isVisible();
    }
}

/**
 * Página de Búsqueda
 */
export class SearchPage {
    readonly page: Page;
    readonly searchInput: Locator;
    readonly searchButton: Locator;
    readonly results: Locator;
    readonly resultItems: Locator;
    readonly noResultsMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchInput = page.locator('input[placeholder="Buscar..."]');
        this.searchButton = page.locator('button[aria-label="search"]');
        this.results = page.locator('[data-testid="search-results"]');
        this.resultItems = page.locator('[data-testid="result-item"]');
        this.noResultsMessage = page.locator('text=No se encontraron resultados');
    }

    async goto() {
        await this.page.goto('https://example.com/search');
    }

    async search(query: string) {
        await this.searchInput.fill(query);
        await this.searchButton.click();
        await this.page.waitForSelector('[data-testid="search-results"]');
    }

    async getResultsCount() {
        return this.resultItems.count();
    }

    async isNoResultsVisible() {
        return this.noResultsMessage.isVisible();
    }

    async getFirstResultText() {
        return this.resultItems.first().textContent();
    }

    async clickResultByIndex(index: number) {
        await this.resultItems.nth(index).click();
    }
}

/**
 * Página de Configuración
 */
export class SettingsPage {
    readonly page: Page;
    readonly profileSection: Locator;
    readonly emailInput: Locator;
    readonly phoneInput: Locator;
    readonly saveButton: Locator;
    readonly successMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.profileSection = page.locator('[data-testid="profile-settings"]');
        this.emailInput = page.locator('input[name="email"]');
        this.phoneInput = page.locator('input[name="phone"]');
        this.saveButton = page.locator('button:has-text("Guardar")');
        this.successMessage = page.locator('text=Guardado exitosamente');
    }

    async goto() {
        await this.page.goto('https://example.com/settings');
    }

    async updateProfile(email: string, phone: string) {
        await this.emailInput.clear();
        await this.emailInput.fill(email);
        await this.phoneInput.clear();
        await this.phoneInput.fill(phone);
        await this.saveButton.click();
    }

    async verifySuccessMessage() {
        return this.successMessage.isVisible();
    }

    async getProfileData() {
        return {
            email: await this.emailInput.inputValue(),
            phone: await this.phoneInput.inputValue(),
        };
    }
}

/**
 * Ejemplo de uso de Page Objects
 *
 * import { test } from '@playwright/test';
 * import { LoginPage, DashboardPage } from './pages';
 *
 * test('Login y acceder al dashboard', async ({ page }) => {
 *   const loginPage = new LoginPage(page);
 *   const dashboardPage = new DashboardPage(page);
 *
 *   await loginPage.goto();
 *   await loginPage.login('user@example.com', 'password123');
 *   await dashboardPage.goto();
 *   
 *   const isVisible = await dashboardPage.isVisible();
 *   expect(isVisible).toBeTruthy();
 * });
 */
