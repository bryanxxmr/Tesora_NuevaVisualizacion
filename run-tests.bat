@echo off
REM Script para ejecutar tareas comunes en Playwright

cls
color 0F
echo.
echo ============================================
echo   PLAYWRIGHT QA AUTOMATION - MENU RAPIDO
echo ============================================
echo.

:menu
echo Selecciona una opcion:
echo.
echo 1. Ejecutar todos los tests
echo 2. Ejecutar tests en modo visual
echo 3. Ejecutar test especifico
echo 4. Debugar tests
echo 5. Ver reporte de pruebas
echo 6. Generar codigo (UI Recorder)
echo 7. Iniciar servidor MCP
echo 8. Instalar navegadores
echo 9. Limpiar reportes y capturas
echo 0. Salir
echo.

set /p choice="Ingresa el numero de tu opcion: "

if "%choice%"=="1" goto all_tests
if "%choice%"=="2" goto headed_tests
if "%choice%"=="3" goto specific_test
if "%choice%"=="4" goto debug_tests
if "%choice%"=="5" goto show_report
if "%choice%"=="6" goto codegen
if "%choice%"=="7" goto mcp_server
if "%choice%"=="8" goto install_browsers
if "%choice%"=="9" goto clean
if "%choice%"=="0" goto end

echo Opcion no valida. Intenta nuevamente.
echo.
goto menu

:all_tests
cls
echo.
echo Ejecutando todos los tests...
echo.
npm test
pause
goto menu

:headed_tests
cls
echo.
echo Ejecutando tests en modo visual...
echo.
npm run test:headed
pause
goto menu

:specific_test
cls
echo.
set /p testfile="Ingresa la ruta del archivo de test (ej: tests/example.spec.ts): "
npm test -- "%testfile%"
pause
goto menu

:debug_tests
cls
echo.
echo Iniciando modo debug...
echo.
npm run test:debug
pause
goto menu

:show_report
cls
echo.
echo Abriendo reporte de pruebas...
echo.
npx playwright show-report
goto menu

:codegen
cls
echo.
set /p url="Ingresa la URL a grabar (ej: https://example.com): "
npx playwright codegen "%url%"
goto menu

:mcp_server
cls
echo.
echo Iniciando servidor MCP...
echo.
npm run mcp-server
pause
goto menu

:install_browsers
cls
echo.
echo Instalando navegadores de Playwright...
echo.
npx playwright install
pause
goto menu

:clean
cls
echo.
echo Limpiando reportes y capturas...
echo.
rmdir /s /q "playwright-report" 2>nul
rmdir /s /q "test-results" 2>nul
rmdir /s /q "screenshots" 2>nul
rmdir /s /q "videos" 2>nul
del /q "*.png" 2>nul
del /q "*.mp4" 2>nul
echo Limpieza completada.
pause
goto menu

:end
cls
echo.
echo Hasta luego!
echo.
