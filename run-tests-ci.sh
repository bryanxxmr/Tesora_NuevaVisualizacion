#!/bin/bash

# Script de utilidad para simular el entorno de GitHub Actions localmente
# Usar: ./run-tests-ci.sh

echo "========================================"
echo "Ejecutando tests como en GitHub Actions"
echo "========================================"
echo ""

# Establecer variable CI
export CI=true

echo "1️⃣  Verificando Node.js..."
node --version
npm --version
echo ""

echo "2️⃣  Instalando dependencias..."
npm ci
if [ $? -ne 0 ]; then
    echo "❌ Error al instalar dependencias"
    exit 1
fi
echo ""

echo "3️⃣  Instalando navegadores de Playwright..."
npx playwright install --with-deps
if [ $? -ne 0 ]; then
    echo "❌ Error al instalar navegadores"
    exit 1
fi
echo ""

echo "4️⃣  Ejecutando tests..."
npm test
TEST_RESULT=$?

echo ""
echo "========================================"
if [ $TEST_RESULT -eq 0 ]; then
    echo "✅ Todos los tests pasaron"
    echo "📊 Reportes disponibles:"
    echo "   - HTML: playwright-report/index.html"
    echo "   - JSON: test-results/results.json"
    echo "   - XML:  test-results/results.xml"
else
    echo "❌ Algunos tests fallaron"
    echo "📊 Revisa los reportes para más detalles"
fi
echo "========================================"

exit $TEST_RESULT
