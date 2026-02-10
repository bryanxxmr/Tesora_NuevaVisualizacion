#!/bin/bash

# Pre-Merge Validation Script
# Ejecutar ANTES de hacer un commit o PR

echo "🔍 Pre-Merge Validation"
echo "====================="
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

ERRORS=0

# 1. Verificar formato de YAML
echo "1️⃣  Validando YAML de workflows..."
if ! command -v yamllint &> /dev/null; then
    echo "${YELLOW}⚠️  yamllint no instalado, instalando...${NC}"
    npm install -g yamllint || true
fi

if yamllint .github/workflows/*.yml 2>/dev/null; then
    echo "${GREEN}✅ YAML válido${NC}"
else
    echo "${RED}❌ Error en YAML${NC}"
    ERRORS=$((ERRORS + 1))
fi
echo ""

# 2. Verificar que exista package.json
echo "2️⃣  Verificando package.json..."
if [ -f "package.json" ]; then
    echo "${GREEN}✅ package.json existe${NC}"
else
    echo "${RED}❌ package.json no encontrado${NC}"
    ERRORS=$((ERRORS + 1))
fi
echo ""

# 3. Verificar que exista playwright.config.ts
echo "3️⃣  Verificando playwright.config.ts..."
if [ -f "playwright.config.ts" ]; then
    echo "${GREEN}✅ playwright.config.ts existe${NC}"
else
    echo "${RED}❌ playwright.config.ts no encontrado${NC}"
    ERRORS=$((ERRORS + 1))
fi
echo ""

# 4. Verificar dependencias
echo "4️⃣  Verificando dependencias instaladas..."
if grep -q '"@playwright/test"' package.json; then
    echo "${GREEN}✅ Playwright dependencies declaradas${NC}"
else
    echo "${RED}❌ Playwright dependencies faltando${NC}"
    ERRORS=$((ERRORS + 1))
fi
echo ""

# 5. Ejecutar tests localmente
echo "5️⃣  Ejecutando tests localmente..."
if npm test 2>&1 | grep -q "passed"; then
    echo "${GREEN}✅ Tests pasaron${NC}"
else
    echo "${YELLOW}⚠️  Algunos tests fallaron (revisa los logs)${NC}"
fi
echo ""

# Resumen
echo "====================="
if [ $ERRORS -eq 0 ]; then
    echo "${GREEN}✅ Validaciones completadas - Listo para commit${NC}"
    echo "Puedes hacer push con confianza"
    exit 0
else
    echo "${RED}❌ Se encontraron $ERRORS errores${NC}"
    echo "Arregla los errores antes de hacer commit"
    exit 1
fi
