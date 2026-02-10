# Configuración de GitHub Actions para Playwright

## 📋 Archivos Descargados

Se han creado dos workflows de GitHub Actions:

### 1. **playwright.yml** (Recomendado - Simple)
- ✅ Ideal para la mayoría de proyectos
- Ejecuta en Ubuntu Linux
- Prueba con Node 18.x y 20.x
- Genera reportes HTML, JSON y XML
- Cachea dependencias automáticamente

### 2. **playwright-advanced.yml** (Avanzado)
- 🔧 Para equipos más exigentes
- Prueba en múltiples SO (Ubuntu, Windows, macOS)
- Cachea navegadores de Playwright
- Comenta resultados en PRs automáticamente
- Ejecuta pruebas diarias programadas

## 🚀 Primeros Pasos

### 1. **Hacer push del código a GitHub**
```bash
git add .github/
git commit -m "Add GitHub Actions workflows for Playwright"
git push origin main
```

### 2. **Seleccionar el workflow**
Edita `.github/workflows/` y deja solo uno:
- **Para empezar:** Usa `playwright.yml`
- **Cuando crezcas:** Migra a `playwright-advanced.yml`

### 3. **Verificar el estado**
- Ve a la pestaña **Actions** en GitHub
- Verifica que el workflow se ejecute correctamente
- Revisa los logs en caso de errores

## ⚙️ Configuración Recomendada

### Variables de Entorno (Opcional)
Si necesitas variables de entorno, añádelas en GitHub:
1. Ve a **Settings** → **Secrets and variables** → **Actions**
2. Añade tus secretos (API_KEY, BASE_URL, etc.)
3. Úsalas en el workflow:

```yaml
- name: Run tests
  run: npm test
  env:
    BASE_URL: ${{ secrets.BASE_URL }}
    API_KEY: ${{ secrets.API_KEY }}
```

## 🔍 Solución de Problemas

### Problema: Los tests fallan en GitHub pero funcionan localmente

**Causa:** Diferencias en el entorno
**Solución:**
```typescript
// playwright.config.ts - Usar valores por defecto más seguros
use: {
    baseURL: process.env.BASE_URL || 'https://example.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
}
```

### Problema: Timeout en instalación de navegadores

**Causa:** Navegadores grandes tardando demasiado
**Solución:** En `playwright.yml`, aumenta `timeout-minutes`:
```yaml
jobs:
  test:
    timeout-minutes: 45  # Cambiar de 30 a 45
```

### Problema: Cache no funciona

**Solución:** Limpia el cache en GitHub:
1. Ve a **Actions** → clicking en **...** → **Clear caches**
2. El siguiente run descargará todo de nuevo

## 📊 Monitoreo

### Ver Reportes
1. Ve a la ejecución del workflow en GitHub
2. Descarga `playwright-report` de Artifacts
3. Abre `index.html` en el navegador

### Estadísticas en el PR
Si usas `playwright-advanced.yml`, los resultados se comentan automáticamente en los PRs.

## ✅ Checklist de Validación

- [ ] `.github/workflows/playwright.yml` existe
- [ ] `package.json` tiene scripts de test
- [ ] `playwright.config.ts` está configurado
- [ ] Tests locales pasan con `npm test`
- [ ] Git push de `.github/` al repositorio
- [ ] Workflow aparece en la pestaña **Actions**
- [ ] Primer run completó exitosamente

## 📝 Próximas Mejoras

Considera añadir:
- ✅ Integración de reportes en Slack
- ✅ Covertura de código (NYC/Nyc)
- ✅ Automatic tags en GitHub Releases
- ✅ Deployment automático en staging

## 🤝 Soporte

Para problemas:
1. Revisa los logs del workflow en GitHub
2. Intenta reproducir localmente: `npm test`
3. Verifica las dependencias: `npm list`
