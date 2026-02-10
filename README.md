# Playwright QA Automation

[![Playwright Tests](https://github.com/bryanxxmr/Tesora_NuevaVisualizacion/actions/workflows/playwright.yml/badge.svg)](https://github.com/bryanxxmr/Tesora_NuevaVisualizacion/actions/workflows/playwright.yml)
[![Node.js CI](https://github.com/bryanxxmr/Tesora_NuevaVisualizacion/actions/workflows/playwright-advanced.yml/badge.svg)](https://github.com/bryanxxmr/Tesora_NuevaVisualizacion/actions/workflows/playwright-advanced.yml)

Este proyecto es un servidor MCP (Model Context Protocol) para automatización de pruebas QA con Playwright.

## Descripción

Proporciona capacidades de automatización de pruebas web mediante el protocolo MCP, permitiendo:
- Automatizar pruebas en navegadores Chrome, Firefox y Safari
- Capturación de pantallas y videos
- Reportes detallados de pruebas
- Integración con herramientas de IA a través del protocolo MCP

## Instalación

```bash
npm install
```

## Estructura del Proyecto

```
playwright-mcp-automation/
├── src/
│   ├── mcp-server.js           # Servidor MCP principal
│   ├── tools/
│   │   ├── browser.js          # Herramientas de navegador
│   │   ├── page.js             # Herramientas de página
│   │   └── assertions.js       # Herramientas de validación
│   └── utils/
│       ├── logger.js           # Sistema de logging
│       └── config.js           # Configuración
├── tests/
│   ├── example.spec.ts         # Test de ejemplo
│   └── fixtures/
│       └── test-data.json      # Datos de prueba
├── reports/                    # Reportes de pruebas
├── screenshots/                # Capturas de pantalla
└── videos/                     # Videos de grabación
```

## Uso

### Iniciar el servidor MCP

```bash
npm run mcp-server
```

### Ejecutar pruebas

```bash
# Modo normal
npm test

# Modo interactivo (visible)
npm run test:headed

# Modo debug
npm run test:debug

# Generador de código
npm run codegen
```

## Configuración de Playwright

Las pruebas se configuran en `playwright.config.ts` con soporte para:
- Múltiples navegadores
- Paralelización
- Reportes HTML
- Screenshots automáticas
- Grabación de videos

## Herramientas Disponibles en el MCP Server

El servidor MCP proporciona las siguientes herramientas de automatización:

### Herramientas de Navegador
- `launch_browser`: Lanzar una instancia del navegador
- `close_browser`: Cerrar el navegador
- `new_page`: Crear una nueva página/pestaña

### Herramientas de Página
- `goto`: Navegar a una URL
- `click`: Hacer clic en un elemento
- `type`: Escribir texto
- `fill`: Llenar un campo
- `screenshot`: Tomar una captura
- `wait_for`: Esperar a que se cumpla una condición

### Herramientas de Validación
- `expect_visible`: Validar que un elemento es visible
- `expect_text`: Validar el texto de un elemento
- `expect_value`: Validar el valor de un input

## Próximos Pasos

1. Revisar `src/mcp-server.js` para entender la estructura del servidor
2. Consultar los ejemplos en la carpeta `tests/`
3. Crear tu primer test de automatización
4. Configurar los navegadores y dispositivos deseados en `playwright.config.ts`

## Recursos

- [Documentación de Playwright](https://playwright.dev)
- [Documentación del Protocolo MCP](https://modelcontextprotocol.io)

## Licencia

MIT
