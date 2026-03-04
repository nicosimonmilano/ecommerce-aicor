# Apuntes del Proyecto AICOR E-commerce 🚀

Este documento resume los puntos clave del proyecto para entendersu funcionamiento.

### 1. ¿Cómo está montado?
La web no es un bloque entero, está dividida en dos:
- **Front-end (La cara)**: Hecho con *React*. Es lo que hace que la web sea súper rápida y no pegue saltos al cambiar de página.
- **Back-end (El cerebro)**: Funciona con *Laravel*. Es el que manda la info de los productos y guarda los pedidos.
- **Base de Datos**: *MySQL* (con Laragon).

### 2. El Stock y los Pedidos
- **Control de Stock**: Cada vez que alguien compra, Laravel mira en la base de datos si queda de eso. Si queda, lo descuenta al momento. Si no, no te deja comprar.
- **IDs Únicas**: Cada pedido tiene un número propio (ej: ORD-2026-001) para que no haya líos.
- **Tablas Relacionadas**: En la base de datos, un pedido está conectado con el usuario y con los artículos que compró.

### 3. El Ticket en PDF
En vez de enviar correos, he hecho un generador de tickets.
- Se hace directamente en el navegador del cliente.
- Sale el logo de la web, el desglose de lo que ha comprado y el recordatorio de que pase a por ello por la tienda de Córdoba en 48/72h.

### 4. Entrar con Google
La autenticación esta hecha con una SPA(Single Page Application), asi al cargarlo todo en React(Front-end) la web se comunica directamente con Google. Para esta "maqueta" lo he hecho así porque es bastante rápido y nos evitamos tener que pasar por el servidor y es más directo, en una app real, le añadiria la capa de validación en el Back-end. 

### 5. ¿Cómo arranca todo?
Con el comando *npm run dev* en la carpeta principal se enciende todo a la vez: el servidor de la web(5173) y el del servidor de Laravel(8000), todo automático.

