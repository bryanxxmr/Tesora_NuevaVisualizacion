# Guía de Inicio Rápido - Playwright QA Automation

## 1️⃣ Instalación de Dependencias

Ejecuta el siguiente comando para instalar todas las dependencias:

```bash
npm install
```

## 2️⃣ Configuración Básica

### Estructura de carpetas creada:

```
d:\Nuevo Tesora\
├── src/
│   ├── mcp-server.js           ← Servidor MCP principal
│   ├── tools/
│   │   └── browser.js          ← Herramientas de automatización
│   ├── utils/
│   │   ├── config.js           ← Configuración del proyecto
│   │   └── logger.js           ← Sistema de logs
├── tests/
│   └── example.spec.ts         ← Test de ejemplo
├── playwright.config.ts        ← Configuración de Playwright
├── package.json                ← Dependencias del proyecto
└── README.md                   ← Documentación
```

## 3️⃣ Primeros Pasos

### Opción A: Iniciar el Servidor MCP

```bash
npm run mcp-server
```

Esto inicia el servidor MCP que puede ser utilizado por herramientas de IA para automatizar pruebas.

### Opción B: Ejecutar Tests Existentes

```bash
# Ejecutar las pruebas
npm test

# Ver las pruebas en modo visual
npm run test:headed

# Modo debug interactivo
npm run test:debug

# Generar código de automatización (UI Recorder)
npm run codegen
```

## 4️⃣ Crear tu Primer Test

Crea un archivo `tests/mi-primer-test.spec.ts`:

```typescript
import { test, expect } from '@playwright/test';

test('Mi primer test de automatización', async ({ page }) => {
  // 1. Navegar a Google
  await page.goto('https://www.google.com');
  
  // 2. Buscar algo
  await page.fill('input[name="q"]', 'Playwright automation');
  
  // 3. Presionar Enter
  await page.press('input[name="q"]', 'Enter');
  
  // 4. Esperar a los resultados
  await page.waitForSelector('div#search');
  
  // 5. Validar que los resultados se muestran
  await expect(page.locator('div#search')).toBeVisible();
  
  console.log('✅ Test completado exitosamente');
});
```

Ejecuta tu test con:
```bash
npm test -- tests/mi-primer-test.spec.ts
```

## 5️⃣ Selectores Comunes

### Por atributo ID:
```typescript
page.locator('#id-del-elemento')
```

### Por clase CSS:
```typescript
page.locator('.clase-elemento')
```

### Por etiqueta HTML:
```typescript
page.locator('button:has-text("Enviar")')
```

### Por XPath:
```typescript
page.locator('//button[contains(text(), "Enviar")]')
```

### Por text content:
```typescript
page.locator('text=Click Me')
```

## 6️⃣ Acciones Comunes

```typescript
// Navegar
await page.goto('https://example.com');

// Hacer clic
await page.click('button.submit');

// Escribir texto
await page.fill('input#email', 'test@example.com');
await page.type('input#password', 'password123');

// Esperar
await page.waitForSelector('.results');
await page.waitForTimeout(2000);

// Tomar captura
await page.screenshot({ path: 'screenshot.png' });

// Validar elementos
await expect(page.locator('h1')).toBeVisible();
await expect(page.locator('input#email')).toHaveValue('test@example.com');
await expect(page.locator('.error-message')).toContainText('Error');

// Obtener información
const title = await page.title();
const text = await page.textContent('selector');
```

## 7️⃣ Ver Reportes

Después de ejecutar las pruebas, abre el reporte HTML:

```bash
npx playwright show-report
```

## 8️⃣ Configuración de Navegadores

Edita `playwright.config.ts` para cambiar:
- Navegadores (Chromium, Firefox, WebKit)
- Dispositivos móviles
- URL base
- Timeouts
- Reportes

## 9️⃣ Consejos de Buenas Prácticas

✅ **Usa selectors estables** - Prefiere IDs o atributos data-test
✅ **Espera elementos** - No uses timeouts fijos
✅ **Maneja errores** - Usa try/catch en operaciones críticas
✅ **Reutiliza código** - Crea fixtures y helpers
✅ **Ejecuta en paralelo** - Playwright ejecuta tests en paralelo por defecto
✅ **Revisa los reports** - Los reportes HTML muestran capturas en caso de fallos

## 🔟 Recursos Útiles

- 📚 [Documentación Oficial de Playwright](https://playwright.dev)
- 🎯 [Selectores Avanzados](https://playwright.dev/docs/locators)
- 🧪 [Best Practices](https://playwright.dev/docs/best-practices)
- 🐛 [Debugging Guide](https://playwright.dev/docs/debug)

## 📞 Soporte

Para más información sobre Playwright o MCP Server, consulta la documentación oficial.

---

**¡Listo para automatizar!** 🚀
