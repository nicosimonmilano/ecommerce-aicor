import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function Cart() {
    const { cart, removeFromCart, updateQuantity, getCartCount } = useContext(CartContext);

    // Calcular el total a pagar
    const total = cart.reduce((acc, item) => {
        const price = Number(item.product.price);
        return acc + (price * item.quantity);
    }, 0);

    const handleCheckout = () => {
        alert("¡Funcionalidad de Checkout próximamente!");
    };

    if (cart.length === 0) {
        return (
            <div className="container mx-auto py-20 text-center mt-16">
                <div className="mb-6 text-gray-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                </div>
                <h2 className="text-2xl font-light text-gray-800 mb-4">Tu carrito está vacío</h2>
                <p className="text-gray-500 mb-8">Parece que aún no has añadido nada a tu selección.</p>
                <Link to="/" className="inline-block bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition shadow-sm">
                    Explorar Productos
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-12 px-6 mt-16">
            <h1 className="text-4xl font-light mb-12 text-gray-900 border-b border-gray-100 pb-8 flex items-baseline gap-4">
                Tu Carrito
                <span className="text-lg text-gray-400 font-light">{getCartCount()} {getCartCount() === 1 ? 'artículo' : 'artículos'}</span>
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                {/* Lista de Productos */}
                <div className="lg:col-span-2 space-y-6">
                    {cart.map((item) => (
                        <div key={item.product.id} className="group flex flex-col sm:flex-row items-center gap-8 p-6 bg-gray-100/50 rounded-3xl border border-gray-100 ">
                            <div className="w-32 h-32 bg-white rounded-2xl flex items-center justify-center p-4 overflow-hidden shadow-sm">
                                <img
                                    src={item.product.image_url}
                                    alt={item.product.name}
                                    className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>

                            <div className="flex-1 text-center sm:text-left">
                                <h3 className="text-lg font-medium text-gray-900 mb-1">{item.product.name}</h3>
                                <p className="text-sm text-gray-500 font-light">
                                    {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(item.product.price)} / ud.
                                </p>
                            </div>

                            <div className="flex items-center gap-8">
                                <div className="flex items-center gap-3 bg-gray-50 rounded-full px-3 py-1.5 border border-gray-100">
                                    <button
                                        onClick={() => updateQuantity(item.product.id, -1)}
                                        className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-white transition-colors text-gray-400 hover:text-black"
                                    >
                                        -
                                    </button>
                                    <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item.product.id, 1)}
                                        className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-white transition-colors text-gray-400 hover:text-black"
                                    >
                                        +
                                    </button>
                                </div>

                                <div className="text-xl font-medium text-gray-900 min-w-[100px] text-right">
                                    {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(item.product.price * item.quantity)}
                                </div>

                                <button
                                    onClick={() => removeFromCart(item.product.id)}
                                    className="text-gray-300 hover:text-red-500 transition-colors p-2"
                                    title="Eliminar"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm4 0A.5.5 0 0 1 10 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5z" />
                                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1 0-2H5V1a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1h2.5a1 1 0 0 1 1 1zM6 1v1h4V1H6z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Resumen del Pedido */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm sticky top-32">
                        <h2 className="text-xl font-medium text-gray-900 mb-8 border-b border-gray-50 pb-6 text-center">Resumen</h2>

                        <div className="space-y-4 mb-10">
                            <div className="flex justify-between text-gray-500 font-light">
                                <span>Subtotal</span>
                                <span>{new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(total)}</span>
                            </div>
                            <div className="flex justify-between text-gray-500 font-light">
                                <span>Coste de Envío</span>
                                <span className="text-green-600 font-normal">Gratis</span>
                            </div>
                            <div className="pt-4 border-t border-gray-50 flex justify-between text-2xl font-semibold text-gray-900">
                                <span>Total</span>
                                <span>{new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(total)}</span>
                            </div>
                            <p className="text-[10px] text-gray-400 text-center mt-2 italic">* IVA incluido en todos nuestros artículos</p>
                        </div>

                        <button
                            onClick={handleCheckout}
                            className="w-full bg-black text-white py-4 rounded-full font-medium hover:bg-gray-800 transition-all shadow-md hover:shadow-xl active:scale-[0.98] flex justify-center items-center gap-3"
                        >
                            <span>Finalizar Compra</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
