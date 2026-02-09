# Proyecto Full-Stack Aicor (Ecommerce)

Este proyecto es una aplicación E-commerce Full-Stack desarrollada como parte de la prueba de aptitud técnica. Utiliza **Laravel 11** para el backend (API REST) y **React** junto con **Tailwind CSS** para el frontend.

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado el siguiente software en tu sistema:

1.  **PHP** >= 8.2
2.  **Composer** (Gestor de dependencias de PHP)
3.  **Node.js** y **npm** (para el frontend)
4.  **Base de Datos**: MySQL o MariaDB (recomendado usar Laragon o XAMPP)
5.  **Git**

## 🚀 Instalación y Configuración

Sigue estos pasos estrictamente para poner en marcha el proyecto:

### 1. Configuración del Backend (Laravel)

```bash
# Entrar en el directorio del proyecto
cd ecommerce_aicor

# Instalar dependencias de PHP
composer install

# Copiar el archivo de entorno de ejemplo
cp .env.example .env
# O en Windows Powerhshell: copy .env.example .env

# Generar la clave de la aplicación
php artisan key:generate

# Configurar la base de datos en el archivo .env:
# Abre el archivo .env y configura DB_DATABASE, DB_USERNAME, etc.
# DB_CONNECTION=mysql
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_DATABASE=ecommerce_aicor
# DB_USERNAME=root
# DB_PASSWORD=

# Ejecutar las migraciones y seeders (datos de prueba)
php artisan migrate --seed
```

### 2. Configuración del Frontend (React + Vite)

```bash
# Instalar dependencias de Javascript
npm install

# Iniciar el servidor de desarrollo
npm run dev
```

### 3. Ejecución

Para trabajar, necesitarás dos terminales abiertas:
1.  Terminal 1 (Backend): `php artisan serve` (Inicia la API en http://localhost:8000)
2.  Terminal 2 (Frontend): `npm run dev` (Inicia React, generalmente en http://localhost:5173)

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
