# Script de utilidad para simular el entorno de GitHub Actions localmente
# Uso: .\run-tests-ci.ps1

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Ejecutando tests como en GitHub Actions" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Establecer variable CI
$env:CI = "true"

Write-Host "1️⃣  Verificando Node.js..." -ForegroundColor Yellow
node --version
npm --version
Write-Host ""

Write-Host "2️⃣  Instalando dependencias..." -ForegroundColor Yellow
npm ci
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error al instalar dependencias" -ForegroundColor Red
    exit 1
}
Write-Host ""

Write-Host "3️⃣  Instalando navegadores de Playwright..." -ForegroundColor Yellow
npx playwright install --with-deps
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error al instalar navegadores" -ForegroundColor Red
    exit 1
}
Write-Host ""

Write-Host "4️⃣  Ejecutando tests..." -ForegroundColor Yellow
npm test
$TEST_RESULT = $LASTEXITCODE

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
if ($TEST_RESULT -eq 0) {
    Write-Host "✅ Todos los tests pasaron" -ForegroundColor Green
    Write-Host "📊 Reportes disponibles:" -ForegroundColor Green
    Write-Host "   - HTML: playwright-report\index.html" -ForegroundColor Green
    Write-Host "   - JSON: test-results\results.json" -ForegroundColor Green
    Write-Host "   - XML:  test-results\results.xml" -ForegroundColor Green
} else {
    Write-Host "❌ Algunos tests fallaron" -ForegroundColor Red
    Write-Host "📊 Revisa los reportes para más detalles" -ForegroundColor Red
}
Write-Host "========================================" -ForegroundColor Cyan

exit $TEST_RESULT
