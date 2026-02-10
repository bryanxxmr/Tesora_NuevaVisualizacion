# Script PowerShell para Playwright QA Automation
# Ejecuta: Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
# Luego: .\run-tests.ps1

function Show-Menu {
    Clear-Host
    Write-Host "╔═════════════════════════════════════════╗" -ForegroundColor Cyan
    Write-Host "║  PLAYWRIGHT QA AUTOMATION - MENU        ║" -ForegroundColor Cyan
    Write-Host "╚═════════════════════════════════════════╝" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "1. ▶️  Ejecutar todos los tests" -ForegroundColor Green
    Write-Host "2. 👁️  Ejecutar tests en modo visual" -ForegroundColor Green
    Write-Host "3. 🔍 Ejecutar test específico" -ForegroundColor Green
    Write-Host "4. 🐛 Debugar tests" -ForegroundColor Yellow
    Write-Host "5. 📊 Ver reporte de pruebas" -ForegroundColor Cyan
    Write-Host "6. 🎬 Grabar código (UI Recorder)" -ForegroundColor Magenta
    Write-Host "7. 🚀 Iniciar servidor MCP" -ForegroundColor Magenta
    Write-Host "8. 📥 Instalar navegadores" -ForegroundColor Yellow
    Write-Host "9. 🗑️  Limpiar reportes y capturas" -ForegroundColor Red
    Write-Host "10. 📚 Ver documentación" -ForegroundColor Blue
    Write-Host "0. ❌ Salir" -ForegroundColor Red
    Write-Host ""
}

function Run-AllTests {
    Clear-Host
    Write-Host "▶️  Ejecutando todos los tests..." -ForegroundColor Green
    Write-Host ""
    npm test
    Read-Host "Presiona Enter para continuar"
}

function Run-HeadedTests {
    Clear-Host
    Write-Host "👁️  Ejecutando tests en modo visual..." -ForegroundColor Green
    Write-Host ""
    npm run test:headed
    Read-Host "Presiona Enter para continuar"
}

function Run-SpecificTest {
    Clear-Host
    Write-Host "🔍 Ejecutar test específico" -ForegroundColor Green
    Write-Host ""
    $testfile = Read-Host "Ingresa la ruta del test (ej: tests/example.spec.ts)"
    npm test -- "$testfile"
    Read-Host "Presiona Enter para continuar"
}

function Debug-Tests {
    Clear-Host
    Write-Host "🐛 Iniciando modo debug..." -ForegroundColor Yellow
    Write-Host ""
    npm run test:debug
    Read-Host "Presiona Enter para continuar"
}

function Show-Report {
    Clear-Host
    Write-Host "📊 Abriendo reporte de pruebas..." -ForegroundColor Cyan
    Write-Host ""
    npx playwright show-report
}

function Run-Codegen {
    Clear-Host
    Write-Host "🎬 Grabar código (UI Recorder)" -ForegroundColor Magenta
    Write-Host ""
    $url = Read-Host "Ingresa la URL a grabar (ej: https://example.com)"
    npx playwright codegen "$url"
}

function Start-MCPServer {
    Clear-Host
    Write-Host "🚀 Iniciando servidor MCP..." -ForegroundColor Magenta
    Write-Host ""
    npm run mcp-server
    Read-Host "Presiona Enter para continuar"
}

function Install-Browsers {
    Clear-Host
    Write-Host "📥 Instalando navegadores de Playwright..." -ForegroundColor Yellow
    Write-Host ""
    npx playwright install
    Read-Host "Presiona Enter para continuar"
}

function Clean-Artifacts {
    Clear-Host
    Write-Host "🗑️  Limpiando reportes y capturas..." -ForegroundColor Red
    Write-Host ""
    
    $folders = @("playwright-report", "test-results", "screenshots", "videos")
    
    foreach ($folder in $folders) {
        if (Test-Path $folder) {
            Remove-Item -Recurse -Force $folder
            Write-Host "✅ Eliminado: $folder" -ForegroundColor Green
        }
    }
    
    Write-Host "✅ Limpieza completada" -ForegroundColor Green
    Read-Host "Presiona Enter para continuar"
}

function Show-Documentation {
    Clear-Host
    Write-Host "📚 Documentación Disponible" -ForegroundColor Blue
    Write-Host ""
    Write-Host "Archivos disponibles:"
    Write-Host "  1. README.md - Descripción general"
    Write-Host "  2. GUIA_INICIO_RAPIDO.md - Guía paso a paso"
    Write-Host "  3. INSTALACION_COMPLETADA.md - Documentación detallada"
    Write-Host "  4. RESUMEN_INSTALACION.txt - Resumen ejecutivo"
    Write-Host ""
    
    $choice = Read-Host "¿Cuál quieres abrir? (1-4 o Enter para volver)"
    
    switch ($choice) {
        "1" { notepad README.md }
        "2" { notepad GUIA_INICIO_RAPIDO.md }
        "3" { notepad INSTALACION_COMPLETADA.md }
        "4" { notepad RESUMEN_INSTALACION.txt }
    }
}

# Bucle principal
do {
    Show-Menu
    $option = Read-Host "Selecciona una opción (0-10)"
    
    switch ($option) {
        "1" { Run-AllTests }
        "2" { Run-HeadedTests }
        "3" { Run-SpecificTest }
        "4" { Debug-Tests }
        "5" { Show-Report }
        "6" { Run-Codegen }
        "7" { Start-MCPServer }
        "8" { Install-Browsers }
        "9" { Clean-Artifacts }
        "10" { Show-Documentation }
        "0" { 
            Write-Host ""
            Write-Host "👋 ¡Hasta luego!" -ForegroundColor Yellow
            break
        }
        default {
            Write-Host "❌ Opción no válida. Intenta nuevamente." -ForegroundColor Red
            Read-Host "Presiona Enter para continuar"
        }
    }
} while ($true)
