# Tienda AI-cor - Evaluación Técnica

Sistema de comercio electrónico para la prueba técnica de AICOR, desarrollado con React (Vite) para el frontend y PHP para el backend.

## 📋 Tabla de Contenidos

- [Descripción del Proyecto](#-descripción-del-proyecto)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación Local](#-instalación-local)
- [Uso](#-uso)
- [API Endpoints](#-api-endpoints)
- [Pruebas Unitarias (TDD)](#-pruebas-unitarias-tdd)

## 📝 Descripción del Proyecto
- **Catálogo dinámico**: Gestión de productos mediante base de datos relacional MySQL.
- **Carrito de compra**: Persistencia local y validación con el backend.
- **Checkout Seguro**: Procesamiento de pedidos con transacciones de base de datos y control de inventario.
- **PDF de Pedido**: Generación automática de comprobantes profesionales descargables.
- **Google OAuth**: Acceso seguro y rápido mediante cuentas de Google.

## 🛠 Tecnologías Utilizadas

### Backend
- **PHP 8.3**
- **Composer** (Gestor de dependencias)
- **PHPUnit** (Framework para pruebas unitarias)
- **MySQL** (Persistencia de datos)
- **JSON** (Formato de importación/exportación inicial)
- **CORS** (Configuración de acceso seguro)

### Frontend
- **React** + **Vite**
- **Tailwind CSS** (Estilos modernos)
- **React Router DOM** (Navegación)
- **React Toastify** (Notificaciones premium)
- **Google OAuth** (Autenticación)

## 📁 Estructura del Proyecto
```
ecommerce_aicor/
├── backend/                   # Lógica de servidor y API Laravel
│   ├── app/                        # Modelos y Controladores (Lógica de negocio)
│   ├── database/                   # Migraciones y Seeders (Base de datos MySQL)
│   ├── routes/                     # Definición de rutas API (api.php)
│   ├── tests/                      # Pruebas Unitarias (Stock check)
│   ├── vendor/                     # Dependencias (Ignorado en Git)
│   └── composer.json               # Configuración Backend
├── frontend/                  # Interfaz de usuario React
│   ├── src/
│   │   ├── components/                 # UI y Ticket PDF
│   │   ├── pages/                      # Vistas (Home, Cart, Orders, Login)
│   │   └── context/                    # Estado global del carrito
│   └── package.json                # Configuración Frontend
├── Aicor_API.postman_collection.json # Pruebas de API
├── apuntes.md                 # Guía rápida para la defensa
└── README.md
```

## ⚙️ Requisitos Previos
Antes de instalar, asegúrate de tener:

- **Node.js** (v18 o superior)
- **PHP** (v8.2 o superior)
- **Composer** (instalado globalmente o en la ruta de Laragon)
- **Git**

## 🚀 Instalación Local

### 1. Clonar el repositorio
```bash
git clone https://github.com/nicosimonmilano/ecommerce-aicor.git
cd ecommerce_aicor
```

### 2. Configurar el Frontend
```bash
npm install
cp frontend/.env.example frontend/.env
```

### 3. Configurar el Backend
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
```

### 4. Configuración de Base de Datos
1. Abre **Laragon** (o tu gestor MySQL).
2. Crea una base de datos llamada `ecommerce_aicor`.
3. Asegúrate de que el puerto en el archivo `.env` del backend coincida con tu configuración (por defecto hemos configurado el **3307**).


### 4. Iniciar la aplicación
Desde la raíz del proyecto, ejecuta el comando unificado:
```bash
npm run dev
```
Este comando arranca:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000

## 👥 Uso

### Funcionamiento de la Tienda
1. **Login**: Inicia sesión con Gmail (Google OAuth).
2. **Compra**: Añade productos al carrito. Si el subtotal supera los 100€, el envío es gratuito.
3. **Checkout**: Finaliza la compra. El sistema descuenta stock en MySQL y genera el comprobante.
4. **Pedidos**: Descarga tus tickets en PDF desde la sección "Mis Pedidos".

## 🔌 API Endpoints (Guía Postman)

Puedes importar el archivo `Aicor_API.postman_collection.json` directamente en Postman.

- **GET** `/api/products`: Listar todos los productos disponibles.
- **POST** `/api/checkout`: Procesar compra (Valida stock y genera pedido).
- **GET** `/api/orders?email=...`: Consultar historial de un usuario específico.

## 🧪 Pruebas Unitarias (TDD)

El proyecto incluye tests para verificar la lógica de stock. Para ejecutarlos:
```bash
cd backend
C:\laragon\bin\php\php-8.3.28-Win32-vs16-x64\php.exe vendor/bin/phpunit tests/Unit/StockDiscountTest.php
```

---
© 2026 AICOR - Evaluación Técnica E-commerce.
