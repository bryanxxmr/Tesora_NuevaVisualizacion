// Herramientas de navegador para MCP Server
import { chromium, firefox, webkit, Browser, BrowserContext, Page } from 'playwright';

let currentBrowser: Browser | null = null;
let currentContext: BrowserContext | null = null;
let currentPage: Page | null = null;

/**
 * Lanza una instancia de navegador de Playwright
 */
export async function launchBrowser(
    browserType: 'chromium' | 'firefox' | 'webkit' = 'chromium',
    headless: boolean = true
): Promise<void> {
    try {
        const browserModule = browserType === 'chromium' ? chromium : browserType === 'firefox' ? firefox : webkit;

        currentBrowser = await browserModule.launch({
            headless: headless,
        });

        currentContext = await currentBrowser.newContext();
        currentPage = await currentContext.newPage();

        console.log(`✅ Navegador ${browserType} lanzado exitosamente`);
    } catch (error) {
        console.error(`❌ Error al lanzar navegador: ${error}`);
        throw error;
    }
}

/**
 * Navega a una URL
 */
export async function goto(url: string, waitUntil: string = 'load'): Promise<void> {
    if (!currentPage) {
        throw new Error('No hay página abierta. Lanza un navegador primero.');
    }

    try {
        await currentPage.goto(url, { waitUntil: waitUntil as any });
        console.log(`✅ Navegación a ${url} completada`);
    } catch (error) {
        console.error(`❌ Error al navegar: ${error}`);
        throw error;
    }
}

/**
 * Hace clic en un elemento
 */
export async function click(selector: string, button: string = 'left'): Promise<void> {
    if (!currentPage) {
        throw new Error('No hay página abierta.');
    }

    try {
        await currentPage.click(selector, { button: button as 'left' | 'right' | 'middle' });
        console.log(`✅ Clic en selector: ${selector}`);
    } catch (error) {
        console.error(`❌ Error al hacer clic: ${error}`);
        throw error;
    }
}

/**
 * Rellena un campo de texto
 */
export async function fill(selector: string, text: string): Promise<void> {
    if (!currentPage) {
        throw new Error('No hay página abierta.');
    }

    try {
        await currentPage.fill(selector, text);
        console.log(`✅ Campo rellenado: ${selector}`);
    } catch (error) {
        console.error(`❌ Error al rellenar campo: ${error}`);
        throw error;
    }
}

/**
 * Toma una captura de pantalla
 */
export async function screenshot(filename: string, fullPage: boolean = false): Promise<void> {
    if (!currentPage) {
        throw new Error('No hay página abierta.');
    }

    try {
        await currentPage.screenshot({ path: filename, fullPage: fullPage });
        console.log(`✅ Captura guardada: ${filename}`);
    } catch (error) {
        console.error(`❌ Error al capturar pantalla: ${error}`);
        throw error;
    }
}

/**
 * Obtiene el texto de un elemento
 */
export async function getText(selector: string): Promise<string> {
    if (!currentPage) {
        throw new Error('No hay página abierta.');
    }

    try {
        const text = await currentPage.textContent(selector);
        console.log(`✅ Texto obtenido: ${text}`);
        return text || '';
    } catch (error) {
        console.error(`❌ Error al obtener texto: ${error}`);
        throw error;
    }
}

/**
 * Espera a que un elemento esté presente
 */
export async function waitForSelector(selector: string, timeout: number = 30000): Promise<void> {
    if (!currentPage) {
        throw new Error('No hay página abierta.');
    }

    try {
        await currentPage.waitForSelector(selector, { timeout });
        console.log(`✅ Elemento encontrado: ${selector}`);
    } catch (error) {
        console.error(`❌ Error esperando selector: ${error}`);
        throw error;
    }
}

/**
 * Valida que un elemento contenga un texto específico
 */
export async function expectText(selector: string, expectedText: string): Promise<boolean> {
    if (!currentPage) {
        throw new Error('No hay página abierta.');
    }

    try {
        const text = await currentPage.textContent(selector);
        const matches = text?.includes(expectedText) || false;

        if (matches) {
            console.log(`✅ Validación exitosa: ${selector} contiene "${expectedText}"`);
        } else {
            console.log(`❌ Validación fallida: ${selector} no contiene "${expectedText}". Texto encontrado: "${text}"`);
        }

        return matches;
    } catch (error) {
        console.error(`❌ Error en validación: ${error}`);
        throw error;
    }
}

/**
 * Cierra el navegador
 */
export async function closeBrowser(): Promise<void> {
    try {
        if (currentBrowser) {
            await currentBrowser.close();
            currentBrowser = null;
            currentContext = null;
            currentPage = null;
            console.log(`✅ Navegador cerrado`);
        }
    } catch (error) {
        console.error(`❌ Error al cerrar navegador: ${error}`);
        throw error;
    }
}

/**
 * Obtiene la página actual
 */
export function getCurrentPage(): Page | null {
    return currentPage;
}
