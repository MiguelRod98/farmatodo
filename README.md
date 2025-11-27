# Farmatodo - Prueba Técnica de Automatización

Este proyecto contiene la prueba técnica de automatización desarrolladas con **Playwright** y **TypeScript**, implementando mejores prácticas de testing y arquitectura modular.

## 🚀 Instalación y Configuración

```bash
# Clonar el repositorio
git clone <repository-url>
cd farmatodo

# Instalar dependencias
npm install

# Instalar navegadores de Playwright
npx playwright install
```

## 🧪 Ejecución de Pruebas

### Todas las pruebas
```bash
npm test
```

### Solo pruebas de API
```bash
npm run test:api
```

### Solo pruebas E2E
```bash
npm run test:e2e
```

### Modo visual (headed)
```bash
npm run test:headed
```

## 📋 Pruebas Implementadas

### 1. Prueba de Integración API (PokéAPI)
- **Archivo**: `tests/api/specs/pokemon-evolution.spec.ts`
- **Helper**: `tests/api/helpers/pokemon-api.helper.ts`
- **Objetivo**: Obtener la cadena de evolución de Squirtle y mostrar nombres y pesos ordenados alfabéticamente
- **Características**:
  - Validación completa de códigos de respuesta HTTP 200
  - Extracción recursiva de cadena de evolución completa
  - Ordenamiento alfabético con implementación de burbuja (sin `.sort()`)
  - Captura y validación de peso de cada Pokémon
  - Variables descriptivas y código limpio
  - Logging detallado del proceso

### 2. Prueba E2E (SauceDemo)
- **Archivo**: `tests/e2e/specs/saucedemo-purchase.spec.ts`
- **Pages**: `tests/e2e/pages/saucedemo/`
- **Objetivo**: Flujo completo de compra del producto "Sauce Labs Fleece Jacket"
- **Características**:
  - Login automatizado con validación
  - Localización y captura de información del producto
  - Validación de datos en el carrito
  - Proceso completo de checkout con datos parametrizables
  - Confirmación de orden exitosa
  - Logging detallado en cada paso del flujo

## 🏗️ Arquitectura del Proyecto

```
farmatodo/
├── .github/
│   └── workflows/
│       └── playwright.yml       # CI/CD con GitHub Actions
├── tests/
│   ├── api/
│   │   ├── fixtures/
│   │   │   └── api.fixture.ts   # Fixture para pruebas API
│   │   ├── helpers/
│   │   │   └── pokemon-api.helper.ts  # Helper con lógica API
│   │   └── specs/
│   │       └── pokemon-evolution.spec.ts
│   └── e2e/
│       ├── fixtures/
│       │   └── pages.fixture.ts # Fixture con Page Objects
│       ├── pages/
│       │   └── saucedemo/       # Page Object Model
│       │       ├── base.page.ts
│       │       ├── login.page.ts
│       │       ├── inventory.page.ts
│       │       ├── cart.page.ts
│       │       ├── checkout.page.ts
│       │       ├── checkout-step-two.page.ts
│       │       └── checkout-complete.page.ts
│       └── specs/
│           └── saucedemo-purchase.spec.ts
├── playwright.config.ts        # Configuración optimizada
├── tsconfig.json               # Configuración TypeScript
├── package.json                # Scripts y dependencias
├── .gitignore                  # Exclusiones recomendadas
└── README.md
```

## 🛠️ Mejores Prácticas Implementadas

### Arquitectura y Organización
- **Page Object Model**: Separación completa de lógica de UI y pruebas
- **Fixtures personalizados**: Reutilización de configuración y objetos
- **Helpers especializados**: Lógica de negocio encapsulada
- **Configuración por proyectos**: API y E2E completamente separados

### Calidad de Código
- **TypeScript**: Tipado fuerte para mejor mantenibilidad
- **Variables descriptivas**: Nombres representativos en lugar de abreviaciones
- **Código limpio**: Implementación mínima y eficiente
- **Logging detallado**: Trazabilidad completa con emojis distintivos

### Testing y CI/CD
- **Paralelización**: Ejecución paralela optimizada (local vs CI)
- **Datos parametrizables**: Objetos de configuración centralizados
- **Manejo de errores**: Validaciones robustas y reintentos
- **GitHub Actions**: CI/CD integrado con reportes
- **Reportes avanzados**: HTML y GitHub reporters

### Configuración Avanzada
- **Screenshots y videos**: Solo en fallos para optimizar espacio
- **Traces**: Captura en primer reintento para debugging
- **Workers optimizados**: 1 en CI, automático en local
- **Reintentos**: 2 en CI, 1 en local

## ⚙️ Configuración de Paralelización

- **Local**: Ejecución paralela automática (50% de CPU cores)
- **CI**: 1 worker para estabilidad en GitHub Actions
- **Proyectos**: API y E2E corren simultáneamente
- **Tests**: Paralelización completa habilitada con `fullyParallel: true`

## 📊 Resultados Esperados

### Prueba API
```
Squirtle Evolution Chain (Alphabetically Sorted)
Blastoise: 855
Squirtle: 90
Wartortle: 225
```

### Prueba E2E (Logs de ejemplo)
```
✅ Login successful - User authenticated and redirected to Products page
🛍️ Product added: Sauce Labs Fleece Jacket - $49.99
🛒 Cart validation successful - Product details match
📝 Checkout information filled and submitted
🔄 Order processing initiated
✅ Order completed successfully
```

## 🚀 CI/CD con GitHub Actions

El proyecto incluye configuración completa para GitHub Actions:
- Ejecución automática en push y pull requests
- Instalación de dependencias y navegadores
- Ejecución de todas las pruebas
- Generación y almacenamiento de reportes
- Artifacts de screenshots y videos en fallos

## 📝 Notas de Desarrollo

- **Código mínimo**: Implementación eficiente sin código innecesario
- **Mantenibilidad**: Estructura modular y reutilizable
- **Escalabilidad**: Fácil adición de nuevas pruebas y páginas
- **Debugging**: Traces y logs detallados para troubleshooting
- **Performance**: Optimizado para ejecución rápida y confiable