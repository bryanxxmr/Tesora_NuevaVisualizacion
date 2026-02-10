// Configuración del proyecto
export const config = {
    // Configuración de Playwright
    playwright: {
        defaultBrowser: 'chromium', // chromium, firefox, webkit
        headless: true,
        timeout: 30000,
        navigationTimeout: 30000,
    },

    // Configuración de reportes
    reports: {
        html: {
            enabled: true,
            path: './playwright-report',
        },
        json: {
            enabled: true,
            path: './test-results/results.json',
        },
        junit: {
            enabled: true,
            path: './test-results/results.xml',
        },
    },

    // Configuración de capturas y videos
    artifacts: {
        screenshots: {
            enabled: true,
            path: './screenshots',
            onFailure: true,
        },
        videos: {
            enabled: true,
            path: './videos',
            onFailure: true,
        },
    },

    // Configuración de logging
    logging: {
        level: 'info', // debug, info, warn, error
        timestamp: true,
        fileLog: true,
        logPath: './logs',
    },

    // Configuración de retries
    retries: {
        maxAttempts: 3,
        delayMs: 1000,
    },

    // URLs base por entorno
    baseUrl: {
        development: 'http://localhost:3000',
        staging: 'https://staging.example.com',
        production: 'https://example.com',
    },

    // Configuración de navegadores para pruebas paralelas
    browsers: ['chromium', 'firefox', 'webkit'],

    // Configuración de dispositivos móviles
    devices: {
        mobile: {
            chrome: {
                name: 'Pixel 5',
                userAgent:
                    'Mozilla/5.0 (Linux; Android 11; Pixel 5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.85 Mobile Safari/537.36',
            },
            safari: {
                name: 'iPhone 12',
                userAgent:
                    'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Mobile/15E148 Safari/604.1',
            },
        },
    },
};
