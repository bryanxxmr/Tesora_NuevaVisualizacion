# Pre-Merge Validation Script para Windows
# Ejecutar ANTES de hacer un commit o PR

Write-Host "`n🔍 Pre-Merge Validation" -ForegroundColor Cyan
Write-Host "=====================" -ForegroundColor Cyan

$ERRORS = 0

# 1. Verificar formato de YAML
Write-Host "`n1️⃣  Validando YAML de workflows..." -ForegroundColor Yellow
$yamlFiles = Get-ChildItem -Path ".github\workflows\*.yml"
$yamlValid = $true

foreach ($file in $yamlFiles) {
    # Validación básica de YAML (buscar errores comunes)
    $content = Get-Content $file.FullName
    if ($content -match "^[^ ].*:.*[^ ]$" -or $content -match "^  - [^ ]") {
        # YAML parece válido
    }
    else {
        $yamlValid = $false
    }
}

if ($yamlValid -and $yamlFiles.Count -gt 0) {
    Write-Host "✅ YAML válido" -ForegroundColor Green
}
else {
    Write-Host "❌ Error en YAML" -ForegroundColor Red
    $ERRORS++
}

# 2. Verificar que exista package.json
Write-Host "`n2️⃣  Verificando package.json..." -ForegroundColor Yellow
if (Test-Path "package.json") {
    Write-Host "✅ package.json existe" -ForegroundColor Green
}
else {
    Write-Host "❌ package.json no encontrado" -ForegroundColor Red
    $ERRORS++
}

# 3. Verificar que exista playwright.config.ts
Write-Host "`n3️⃣  Verificando playwright.config.ts..." -ForegroundColor Yellow
if (Test-Path "playwright.config.ts") {
    Write-Host "✅ playwright.config.ts existe" -ForegroundColor Green
}
else {
    Write-Host "❌ playwright.config.ts no encontrado" -ForegroundColor Red
    $ERRORS++
}

# 4. Verificar dependencias
Write-Host "`n4️⃣  Verificando dependencias instaladas..." -ForegroundColor Yellow
$packageContent = Get-Content "package.json" -Raw
if ($packageContent -match '"@playwright/test"') {
    Write-Host "✅ Playwright dependencies declaradas" -ForegroundColor Green
}
else {
    Write-Host "❌ Playwright dependencies faltando" -ForegroundColor Red
    $ERRORS++
}

# 5. Verificar que node_modules exista
Write-Host "`n5️⃣  Verificando instalación de dependencias..." -ForegroundColor Yellow
if (Test-Path "node_modules") {
    Write-Host "✅ node_modules instalados" -ForegroundColor Green
}
else {
    Write-Host "⚠️  node_modules no encontrado - Ejecuta: npm install" -ForegroundColor Yellow
}

# 6. Tests opcionales
Write-Host "`n6️⃣  Verificando configuración de tests..." -ForegroundColor Yellow
if (Test-Path "tests") {
    $testFiles = Get-ChildItem -Path "tests\*.spec.ts" -ErrorAction SilentlyContinue
    if ($testFiles.Count -gt 0) {
        Write-Host "✅ $($testFiles.Count) test files encontrados" -ForegroundColor Green
    }
}

# Resumen
Write-Host "`n=====================" -ForegroundColor Cyan
if ($ERRORS -eq 0) {
    Write-Host "✅ Validaciones completadas - Listo para commit" -ForegroundColor Green
    Write-Host "Puedes hacer push con confianza" -ForegroundColor Green
    exit 0
}
else {
    Write-Host "❌ Se encontraron $ERRORS errores" -ForegroundColor Red
    Write-Host "Arregla los errores antes de hacer commit" -ForegroundColor Red
    exit 1
}
