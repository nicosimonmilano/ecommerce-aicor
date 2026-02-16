# Proyecto Full-Stack Aicor (Ecommerce)

Este proyecto es una aplicación E-commerce Full-Stack desarrollada como parte de la prueba de aptitud técnica. Utiliza **Laravel 11** para el backend (API REST) y **React** junto con **Tailwind CSS** para el frontend.

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado el siguiente software en tu sistema:

1.  **PHP** >= 8.2
2.  **Composer** (Gestor de dependencias de PHP)
3.  **Node.js** y **npm** (para el frontend)
4.  **Base de Datos**: MySQL o MariaDB (recomendado usar Laragon o XAMPP)
5.  **Git**: para clonar el repositorio

## 🚀 Instalación y Configuración

Sigue estos pasos para poner en marcha el proyecto rápidamente:

### 1. Preparación

Asegúrate de tener instalado **Node.js** y **PHP** en tu sistema.

```bash
# Entrar en el directorio del proyecto
cd ecommerce_aicor

# Instalar dependencias generales
npm install

# Instalar dependencias del frontend
cd frontend
npm install

```

### 2. Ejecución (Modo Automático)

El arranque esta simplificado para que con un solo comando funcione todo el ecosistema (Frontend y Backend):

```bash
# En la carpeta raíz del proyecto
npm run dev
```

Este comando:
1.  Inicia el servidor **Vite (React)** en el puerto habitual (5173).
2.  Levanta el servidor **PHP** para la API en el puerto "`8002`".

### 3. Acceso
-   **Tienda**: http://localhost:5173 
-   **API (Productos)**: http://localhost:8002/shop_api.php

## 🧪 Tests

El proyecto incluye tests automatizados (TDD) para garantizar la calidad del código.

```bash
# Ejecutar todos los tests
php artisan test
```

## 🛠️ Tecnologías Utilizadas

-   **Backend**: Laravel 11, JWT-Auth (Autenticación), Laravel Socialite (Login Social).
-   **Frontend**: React, Vite, Tailwind CSS, Context API.
-   **Base de Datos**: MySQL.
-   **CI/CD**: GitHub Actions.

## 📂 Estructura del Proyecto

-   `app/Models`: Modelos de datos (Product, Order, OrderItem).
-   `app/Http/Controllers`: Lógica de negocio (API endpoints).
-   `database/migrations`: Definición de esquema de base de datos.
-   `resources/js`: Código fuente de React.
-   `.github/workflows`: Configuración de integración continua.

---
**Autor**: Nicolas Simon Milano
