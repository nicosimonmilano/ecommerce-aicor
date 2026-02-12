import { createContext, useState, useEffect } from 'react';

// Creamos el contexto. Es como una "nube" de datos accesible desde cualquier componente.
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    // Estado del carrito: array de objetos { product, quantity }
    // Intentamos cargar lo que haya en LocalStorage al iniciar, si no, array vacío.
    const [cart, setCart] = useState(() => {
        try {
            const savedCart = localStorage.getItem('cart');
            return savedCart ? JSON.parse(savedCart) : [];
        } catch (error) {
            return [];
        }
    });

    // Cada vez que cambie 'cart', lo guardamos en LocalStorage automáticamente
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    // Función para añadir producto
    const addToCart = (product) => {
        setCart(prevCart => {
            // Buscamos si el producto ya está en el carrito
            const existingItem = prevCart.find(item => item.product.id === product.id);

            if (existingItem) {
                // Si existe, aumentamos la cantidad +1
                return prevCart.map(item =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                // Si no existe, lo añadimos nuevo con cantidad 1
                return [...prevCart, { product, quantity: 1 }];
            }
        });
    };

    // Función para eliminar producto
    const removeFromCart = (productId) => {
        setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
    };

    // Función para actualizar cantidad directamente (sumar/restar en el carrito)
    const updateQuantity = (productId, delta) => {
        setCart(prevCart => prevCart.map(item => {
            if (item.product.id === productId) {
                const newQuantity = item.quantity + delta;
                return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
            }
            return item;
        }));
    };

    // Función para calcular el total de items (para el numerito rojo del icono)
    const getCartCount = () => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    };

    // Valores que compartimos con toda la app
    const value = {
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        getCartCount
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};
