# 🚀 Guía de GitHub Actions para Playwright

## ✅ Lo Que Se Ha Configurado

Tu proyecto Playwright ahora tiene una configuración completa de GitHub Actions lista para usar. Se han creado los siguientes archivos:

```
.github/
├── workflows/
│   ├── playwright.yml              ← Workflow básico (recomendado)
│   └── playwright-advanced.yml     ← Workflow avanzado (opcional)
└── GITHUB_ACTIONS_SETUP.md         ← Documentación detallada
```

## 📋 Pasos Inmediatos (IMPORTANTE)

### 1️⃣ Hacer Push de los Cambios a GitHub

```bash
# Navega a tu repositorio
cd "d:\Nuevo Tesora"

# Añade los nuevos archivos
git add .github/

# Commit
git commit -m "✨ Add GitHub Actions workflows for Playwright testing"

# Push
git push origin main
```

### 2️⃣ Verificar que Funcione

1. Ve a tu repositorio en GitHub
2. Haz clic en la pestaña **Actions**
3. Verás que el workflow se está ejecutando automáticamente
4. Espera a que termine (5-10 minutos)
5. Verifica que muestre ✅ (verde) en todos los checks

## 🎯 Eligiendo el Workflow Correcto

### **Opción A: playwright.yml** (Recomendado para Empezar)
- ✅ Más rápido (3-5 min)
- ✅ Probado en Linux
- ✅ Ideal para equipos pequeños
- ✅ Cachea dependencias automáticamente

**Usar si:** Estás empezando o tu equipo es pequeño

### **Opción B: playwright-advanced.yml** (Para Equipos Grandes)
- 🖥️ Prueba en 3 SOs (Linux, Windows, macOS)
- 💾 Cachea navegadores de Playwright
- 💬 Comenta resultados en PRs
- ⏰ Ejecución diaria programada
- ⏱️ Más lento (10-15 min)

**Usar si:** Quieres máxima cobertura y recursos ilimitados

## 🔴 Si Usas Ambos Workflows

**IMPORTANTE:** Solo puedes usar UNO. Elige en GitHub:

```bash
# Opción 1: Mantener solo el básico (recomendado)
git rm .github/workflows/playwright-advanced.yml
git commit -m "Remove advanced workflow"
git push

# Opción 2: Mantener solo el avanzado
git rm .github/workflows/playwright.yml
git commit -m "Use advanced workflow only"
git push
```

## 🛠️ Troubleshooting Rápido

### ❌ "Workflow fails to run"
**Solución:**
```bash
# Verifica que el archivo YAML está bien formado
npm install -g yamllint
yamllint .github/workflows/playwright.yml
```

### ❌ "Tests pass locally but fail in GitHub"
**Causa:** Variables de entorno faltando
**Solución:**
```bash
# Añade en: GitHub Settings → Secrets and variables → Actions
# Ejemplo:
BASE_URL=https://staging.example.com
API_TOKEN=xxx
```

### ❌ "Browser installation timeout"
**Solución:** En el workflow, aumenta el timeout:
```yaml
jobs:
  test:
    timeout-minutes: 45  # Cambiar de 30
```

## 📊 Monitoreo y Reportes

### Ver los Resultados
1. GitHub → Actions → Última ejecución
2. Descarga los artifacts:
   - `playwright-report-node-*.zip` (Reporte HTML)
   - `test-results-*.zip` (JSON y XML)

### Abrir el Reporte HTML
```bash
# Descomprime el artifact descargado
# Abre: playwright-report/index.html en el navegador
```

## 🔧 Configuración Avanzada

### Añadir Notificaciones en Slack
En `.github/workflows/playwright.yml`, añade:

```yaml
- name: Notificar en Slack
  if: failure()
  uses: slackapi/slack-github-action@v1
  with:
    webhook-url: ${{ secrets.SLACK_WEBHOOK }}
```

### Ejecutar Tests Solo en Ramas Específicas
Edita el workflow:

```yaml
on:
  push:
    branches: [main, develop, staging]  # Solo estas ramas
  pull_request:
    branches: [main]
```

### Ejecutar Tests en Horarios Específicos
```yaml
on:
  schedule:
    - cron: '0 2 * * *'  # 2 AM UTC diariamente
    - cron: '0 9 * * 1'  # Cada lunes a las 9 AM UTC
```

## 📝 Script Simulador Local

Para probar localmente como lo hace GitHub Actions:

**En Windows (PowerShell):**
```powershell
.\run-tests-ci.ps1
```

**En Linux/Mac:**
```bash
chmod +x run-tests-ci.sh
./run-tests-ci.sh
```

Este script simula exactamente lo que hace GitHub Actions.

## ✅ Checklist Final

- [ ] He hecho push de `.github/workflows/` a GitHub
- [ ] He elegido UN workflow (básico o avanzado)
- [ ] La pestaña "Actions" en GitHub muestra el workflow
- [ ] El workflow ejecutó al menos una vez
- [ ] Los tests pasaron (✅) o entiendo por qué fallaron
- [ ] He descargado y revisado los reportes HTML
- [ ] Mis variables de entorno están en GitHub Secrets (si las necesito)

## 🎓 Próximos Pasos

1. **Integración Continua:** Ahora tus tests se ejecutan automáticamente en cada push
2. **Pull Requests:** Los checks aparecerán en tus PRs automáticamente
3. **Reportes:** Accede a los reportes en cada ejecución
4. **Escalabilidad:** Cuando crezcas, migra a `playwright-advanced.yml`

## 📚 Referencias

- [Documentación Oficial de Playwright](https://playwright.dev)
- [GitHub Actions Documentation](https://docs.github.com/es/actions)
- [Playwright Testing Best Practices](https://playwright.dev/docs/ci)

---

**¿Preguntas?** Revisa el archivo `.github/GITHUB_ACTIONS_SETUP.md` para detalles adicionales.

**Status:** ✅ GitHub Actions está configurada y lista para usar
