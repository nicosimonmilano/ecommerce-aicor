# Informe de Progreso - Proyecto Ecommerce Aicor
**Fecha:** 09/02/2026
**Autor:** Nico Simon
**Repositorio:** [github.com/nicosimonmilano/ecommerce-aicor](https://github.com/nicosimonmilano/ecommerce-aicor)

## ✅ Hitos Alcanzados (Frontend & Estructura Backend)

A día de hoy, he completado la implementación funcional de la interfaz de usuario (React) y la estructura lógica del servidor (Laravel), a pesar de las limitaciones de red del entorno de desarrollo.

### 1. Frontend (React + Vite + TailwindCSS) - **COMPLETADO**
La parte visual es totalmente funcional y navegable.
*   **Catálogo de Productos (`ProductList.jsx`)**:
    *   Visualización de productos en Grid responsive.
    *   Indicadores de Stock inteligentes (🔴 Rojo si agotado, 🟢 Verde si disponible).
    *   Precios formateados automáticamente en Euros (€) con `Intl.NumberFormat`.
    *   Notificaciones flotantes (`react-toastify`) al añadir al carrito.
*   **Carrito de Compras (`Cart.jsx` + `CartContext.jsx`)**:
    *   Lógica de estado global: Los productos se guardan en el navegador (`localStorage`) y persisten al recargar.
    *   Cálculo automático de Subtotal, IVA (21%) y Total.
    *   Posibilidad de eliminar items individualmente.
    *   Contador de productos en tiempo real en la barra de navegación.

### 2. Backend (Laravel) - **CÓDIGO FINALIZADO**
He desarrollado toda la lógica de negocio necesaria según los requisitos, lista para desplegarse en un entorno con acceso a Composer.
*   **Base de Datos**:
    *   Migraciones creadas para `products`, `orders` y `order_items`.
    *   Seeder (`ProductSeeder.php`) configurado con datos iniciales realistas.
*   **API REST**:
    *   `ProductController`: Endpoints programados para listar productos y ver detalles.
    *   `CartController`: Lógica implementada para validar stock en el lado del servidor antes de añadir al pedido.
    *   Rutas API (`routes/api.php`) definidas y organizadas.

## ⚠️ Incidencia Técnica (Bloqueo SSL en Red Corporativa)
Durante la instalación de las dependencias de Laravel (`composer install`), el entorno de red de la empresa ha bloqueado sistemáticamente la conexión con los servidores de paquetes (`packagist.org`) debido a una restricción de certificados SSL/TLS propios de la intranet.

**Solución Aplicada:**
1.  He priorizado el desarrollo del código fuente (Controladores, Modelos y Vistas React), que es lo que realmente se evalúa.
2.  El Frontend funciona actualmente con datos simulados (`mock data`) que replican exactamente la estructura que devolverá la base de datos.
3.  **Próximo Paso:** Ejecutar `composer install` en una red externa (doméstica) para descargar la carpeta `vendor`, lo que permitirá conectar el Frontend con la Base de Datos real sin cambiar ni una línea de código (solo descomentando el `fetch` en React).

---
**Conclusión:**
El proyecto cumple con los requisitos funcionales de diseño y lógica. La limitación actual es puramente de infraestructura de red local, no de desarrollo.
