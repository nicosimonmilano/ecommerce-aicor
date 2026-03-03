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
Tienda AI-cor es una plataforma de e-commerce que implementa:

- **Catálogo de productos** dinámico cargado desde JSON.
- **Gestión de carrito de compra** (LocalStorage y API).
- **Flujo de Checkout completo** con descuento de stock en tiempo real.
- **Historial de pedidos** por usuario tras sesión iniciada con Google.
- **Validación de stock** en el servidor para evitar compras inválidas.
- **Integración con Google OAuth** para autenticación segura.

### 🚀 Mejoras y Correcciones (Febrero 2026)
- **Solución SSL (Problemas con Avast):** Se ha implementado un parche en la configuración de certificados de PHP para permitir el uso de Composer a pesar de la interceptación de antivirus.
- **Checkout:** Implementación de lógica de negocio en PHP para descontar stock y guardar pedidos en formato JSON persistente.
- **Pruebas Automatizadas:** Implementación de tests unitarios con PHPUnit para asegurar el correcto funcionamiento del inventario.
- **Documentación Postman:** Creación de una colección completa para pruebas de API sin necesidad de frontend.

## 🛠 Tecnologías Utilizadas

### Backend
- **PHP 8.3**
- **Composer** (Gestor de dependencias)
- **PHPUnit** (Framework para pruebas unitarias)
- **JSON** (Almacenamiento de datos/persistencia)
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
├── backend/                   # Backend PHP
│   ├── tests/                      # Pruebas Unitarias (TDD)
│   ├── vendor/                     # Dependencias de PHP (Ignorado en Git)
│   ├── products.json               # Base de datos de productos
│   ├── orders.json                 # Registro de pedidos realizados
│   ├── shop_api.php                # API de catálogo
│   ├── cart_api.php                # API de carrito
│   ├── checkout_api.php            # API de procesamiento de compra
│   ├── orders_api.php              # API de historial
│   └── composer.json               # Dependencias del backend
├── frontend/                  # Frontend React (Vite)
│   ├── src/
│   │   ├── components/                 # Navbar, WhatsAppButton, Loading...
│   │   ├── pages/                      # Home, Cart, Orders, Login...
│   │   ├── context/                    # CartContext (Estado global)
│   │   └── App.jsx                     # Punto de entrada React
│   ├── package.json                # Dependencias del frontend
│   └── vite.config.js              # Configuración de Vite y Proxy
├── Aicor_API.postman_collection.json  # Documentación de API
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
```

### 3. Configurar el Backend
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
```

### 4. Iniciar la aplicación
Desde la raíz del proyecto, ejecuta el comando unificado:
```bash
npm run dev
```
Este comando arranca:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8002

## 👥 Uso

### Funcionamiento de la Tienda
1. **Login**: Inicia sesión con Gmail (Google OAuth).
2. **Compra**: Añade productos al carrito. Si el subtotal supera los 100€, el envío es gratuito.
3. **Checkout**: Finaliza la compra. Se descontará el stock de `products.json` y se guardará la transacción en `orders.json`.
4. **Pedidos**: Consulta tu historial en la sección "Mis Pedidos".

## 🔌 API Endpoints (Guía Postman)

Puedes importar el archivo `Aicor_API.postman_collection.json` directamente en Postman.

- **GET** `/shop_api.php`: Listar todos los productos.
- **GET** `/cart_api.php`: Consultar estado del carrito en servidor.
- **POST** `/checkout_api.php`: Procesar compra (Body JSON requerido).
- **GET** `/orders_api.php?email=...`: Consultar historial de un usuario.

## 🧪 Pruebas Unitarias (TDD)

El proyecto incluye tests para verificar la lógica de stock. Para ejecutarlos:
```bash
cd backend
C:\laragon\bin\php\php-8.3.28-Win32-vs16-x64\php.exe vendor/bin/phpunit tests/Unit/StockDiscountTest.php
```

---
© 2026 AICOR - Evaluación Técnica E-commerce.
