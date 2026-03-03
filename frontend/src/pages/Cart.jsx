import { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from './Loading';

export default function Cart() {
    const { cart, removeFromCart, updateQuantity, getCartCount, clearCart } = useContext(CartContext);
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const FREE_SHIPPING_MIN = 100;

    // Calculo del Subtotal (lo que valen los articulos por su cantidad)
    let subtotal = 0;
    cart.forEach(item => {
        subtotal = subtotal + (item.product.price * item.quantity);
    });

    // Envío
    const isFreeShipping = subtotal >= FREE_SHIPPING_MIN;

    let shippingCost = 7.99; // Precio de envío estándar
    if (isFreeShipping) {
        shippingCost = 0; // Si llegamos al mínimo, el envío es GRATIS
    }

    const total = subtotal + shippingCost;

    // Barra de progreso de envío gratis
    const progress = Math.min((subtotal / FREE_SHIPPING_MIN) * 100, 100);

    //Esta función se ejecuta al pulsar Finalizar Compra, hace un POST al backend con los productos del carrito
    const handleCheckout = async () => {

        //1: El usuario ha iniciado sesión?
        const estaLogueado = localStorage.getItem('user_logged_in') === 'true';
        if (!estaLogueado) {
            toast.info('Inicia sesión para completar tu compra', { theme: 'dark' });
            navigate('/login');
            return; // Si no está logueado, no seguimos 
        }

        //2: Sacar los datos del usuario (email y nombre)
        const datosUsuario = JSON.parse(localStorage.getItem('user_data') || '{}');

        //3: Activar el estado de "procesando" (para mostrar el spinner)
        setIsProcessing(true);

        try {
            //4: Preparar los productos del carrito para enviarlos
            // Solo mandamos el id del producto y la cantidad (el precio lo calcula el servidor)
            const itemsParaEnviar = cart.map(item => ({
                product_id: item.product.id,
                quantity: item.quantity
            }));

            //5: Enviar la petición POST al backend
            const respuesta = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user_email: datosUsuario.email,
                    user_name: datosUsuario.name,
                    items: itemsParaEnviar
                })
            });

            //6: Leer la respuesta del servidor
            const datos = await respuesta.json();

            //7: Hubo algún error? (por ejemplo, sin stock)
            if (!respuesta.ok) {
                throw new Error(datos.error || 'Error al procesar el pedido');
            }

            //8: Compra completada: activar pantalla de carga y vaciar el carrito
            setIsSuccess(true);
            clearCart();

            // Mostrar un mensaje de éxito
            toast.success('¡Pedido realizado con éxito! ' + datos.order_id, {
                theme: 'dark',
                autoClose: 3000
            });

            //9: Redirigir a Mis Pedidos después de 1.5 segundos (sensación premium)
            setTimeout(() => {
                navigate('/orders');
            }, 1500);

        } catch (error) {
            // Si algo falla, mostramos el error al usuario
            toast.error(error.message || 'Error al conectar con el servidor');
        } finally {
            // Siempre desactivamos el spinner al terminar
            setIsProcessing(false);
        }
    };

    // Si la compra ha tenido éxito, mostramos la pantalla de carga premium
    if (isSuccess) {
        return <Loading />;
    }

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
        <div className="container mx-auto py-17 px-6 animate-fade-in-up">
            <h1 className="text-4xl font-bold tracking-tighter mb-12 text-gray-900 border-b border-gray-100 pb-8 flex items-baseline gap-4">
                Tu Carrito
                <span className="text-lg text-gray-400 font-light">{getCartCount()} {getCartCount() === 1 ? 'artículo' : 'artículos'}</span>
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                {/* Lista de Productos */}
                <div className="lg:col-span-2 space-y-6">
                    {cart.map((item, index) => (
                        <div
                            key={item.product.id}
                            className="group flex flex-col sm:flex-row items-center gap-4 sm:gap-8 p-6 bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in-up"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className="w-32 h-32 bg-gray-50 rounded-2xl flex items-center justify-center p-4 overflow-hidden group-hover:bg-white transition-colors duration-300">
                                <img
                                    src={item.product.image_url}
                                    alt={item.product.name}
                                    className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>

                            <div className="flex-1 text-center sm:text-left">
                                <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.product.name}</h3>
                                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                                    <p className="text-sm text-gray-500 font-light">
                                        {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(item.product.price)} / ud.
                                    </p>
                                    <span className="text-[10px] text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full border border-gray-100 self-center sm:self-auto tracking-wide uppercase font-medium">
                                        Stock: {item.product.stock}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 sm:gap-8 w-full sm:w-auto justify-between sm:justify-end">
                                <div className="flex items-center gap-2 sm:gap-3 bg-gray-50 rounded-full px-3 sm:px-4 py-2 border border-gray-100">
                                    <button
                                        onClick={() => updateQuantity(item.product.id, -1)}
                                        className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-white transition-all text-gray-400 hover:text-black active:scale-75 shadow-none hover:shadow-sm"
                                    >
                                        -
                                    </button>
                                    <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item.product.id, 1)}
                                        className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-white transition-all text-gray-400 hover:text-black active:scale-75 shadow-none hover:shadow-sm"
                                    >
                                        +
                                    </button>
                                </div>

                                <div className="text-lg sm:text-xl font-bold text-gray-900 min-w-[80px] sm:min-w-[100px] text-right">
                                    {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(item.product.price * item.quantity)}
                                </div>

                                <button
                                    onClick={() => removeFromCart(item.product.id)}
                                    className="text-gray-300 hover:text-red-500 transition-all p-2 hover:bg-red-50 rounded-full active:scale-90"
                                    title="Eliminar"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm4 0A.5.5 0 0 1 10 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5z" />
                                        <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1 0-2H5V1a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1h2.5a1 1 0 0 1 1 1zM6 1v1h4V1H6z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Resumen del Pedido */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-xl sticky top-32 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-8 border-b border-gray-50 pb-6">Resumen</h2>

                        {/* Barra de Progreso de Envío */}
                        <div className="mb-8">
                            <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider mb-2 text-gray-500">
                                <span>Progreso Envío Gratis</span>
                            </div>
                            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className={`h-full transition-all duration-1000 ease-out ${progress === 100 ? 'bg-green-500' : 'bg-black'}`}
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                            <p className="text-[11px] mt-3 text-gray-500 leading-tight">
                                {isFreeShipping
                                    ? "¡Enhorabuena! Tienes envío PREMIUM gratuito." //comillas dobles("") para texto estatico
                                    : `Suma ${new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(FREE_SHIPPING_MIN - subtotal)} para envío gratis.`} {/*comillas simples('') para texto dinamico */}
                            </p>
                        </div>

                        <div className="space-y-4 mb-10">
                            <div className="flex justify-between text-gray-500 font-light">
                                <span>Subtotal</span>
                                <span className="font-medium text-gray-900">{new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(subtotal)}</span>
                            </div>
                            <div className="flex justify-between text-gray-500 font-light items-center">
                                <span>Coste de Envío</span>
                                <span className={`font-bold ${isFreeShipping ? 'text-green-500' : 'text-gray-900'}`}>
                                    {isFreeShipping
                                        ? 'GRATIS'
                                        : new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(shippingCost)}
                                </span>
                            </div>
                            <div className="pt-6 border-t border-gray-50 flex justify-between text-3xl font-bold text-gray-900">
                                <span>Total</span>
                                <span>{new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(total)}</span>
                            </div>
                            <p className="text-[10px] text-gray-400 text-center mt-6 italic bg-gray-50 py-2 rounded-lg">* IVA incluido en todos nuestros artículos</p>
                        </div>

                        <button
                            onClick={handleCheckout}
                            disabled={isProcessing}
                            className={`w-full py-5 rounded-full font-bold transition-all shadow-lg hover:shadow-2xl active:scale-[0.98] flex justify-center items-center gap-3 group ${isProcessing ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-gray-800 text-white'}`}
                        >
                            {isProcessing ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                                    <span>Procesando...</span>
                                </>
                            ) : (
                                <>
                                    <span>Finalizar Compra</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}
