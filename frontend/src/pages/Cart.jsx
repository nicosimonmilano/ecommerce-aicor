import { useContext, useState, useRef } from 'react';
import { CartContext } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from './Loading';
import Ticket from '../components/Ticket';
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';

export default function Cart() {
    const { cart, removeFromCart, updateQuantity, getCartCount, clearCart } = useContext(CartContext);
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [lastOrder, setLastOrder] = useState(null);
    const ticketRef = useRef(null);
    const FREE_SHIPPING_MIN = 100;

    // Calculo del Subtotal
    let subtotal = 0;
    cart.forEach(item => {
        subtotal = subtotal + (item.product.price * item.quantity);
    });

    const isFreeShipping = subtotal >= FREE_SHIPPING_MIN;
    let shippingCost = isFreeShipping ? 0 : 7.99;
    const total = subtotal + shippingCost;
    const progress = Math.min((subtotal / FREE_SHIPPING_MIN) * 100, 100);

    const handleCheckout = async () => {
        const estaLogueado = localStorage.getItem('user_logged_in') === 'true';
        if (!estaLogueado) {
            toast.info('Inicia sesión para completar tu compra', { theme: 'dark' });
            navigate('/login');
            return;
        }

        const datosUsuario = JSON.parse(localStorage.getItem('user_data') || '{}');
        setIsProcessing(true);

        try {
            const itemsParaEnviar = cart.map(item => ({
                product_id: item.product.id,
                quantity: item.quantity
            }));

            const respuesta = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user_email: datosUsuario.email,
                    user_name: datosUsuario.name,
                    items: itemsParaEnviar
                })
            });

            const datos = await respuesta.json();
            if (!respuesta.ok) throw new Error(datos.error || 'Error al procesar el pedido');

            setLastOrder({
                id: datos.order_id,
                total: total,
                date: new Date().toLocaleString('es-ES', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
                user_name: datosUsuario.name,
                user_email: datosUsuario.email,
                items: cart.map(item => ({
                    name: item.product.name,
                    quantity: item.quantity,
                    price: item.product.price,
                    subtotal: item.product.price * item.quantity
                }))
            });

            setIsSuccess(true);
            clearCart();
            toast.success('¡Pedido realizado con éxito!', { theme: 'dark', autoClose: 3000 });

        } catch (error) {
            toast.error(error.message || 'Error al conectar con el servidor');
        } finally {
            setIsProcessing(false);
        }
    };

    const downloadTicket = async () => {
        if (!ticketRef.current) return;

        try {
            toast.info('Generando PDF...', { autoClose: 1000 });

            // Un pequeño respiro para que el DOM se asiente
            await new Promise(r => setTimeout(r, 300));

            const dataUrl = await toPng(ticketRef.current, {
                quality: 1,
                backgroundColor: 'white',
                pixelRatio: 2
            });

            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgProps = pdf.getImageProperties(dataUrl);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`Ticket_AICOR_${lastOrder.id}.pdf`);

            toast.success('¡Ticket descargado!', { theme: 'dark' });
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error al generar el PDF');
        }
    };

    if (isSuccess && lastOrder) {
        return (
            <div className="container mx-auto py-20 px-6 text-center animate-fade-in-up mt-16">
                <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                </div>

                <h2 className="text-4xl font-bold tracking-tighter text-gray-900 mb-4">¡Gracias por tu compra!</h2>
                <p className="text-gray-500 mb-8 italic">Pedido <span className="font-bold text-black">#{lastOrder.id}</span> procesado.</p>

                <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 max-w-xl mx-auto mb-12">
                    <p className="text-blue-700 font-medium">Recogida en 48/72 horas en Aicor Córdoba.</p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <button onClick={downloadTicket} className="px-8 py-4 bg-black text-white rounded-full font-bold hover:bg-gray-800 transition flex items-center gap-3 active:scale-95">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Descargar Ticket PDF
                    </button>
                    <Link to="/orders" className="px-8 py-4 bg-white text-gray-900 border border-gray-100 rounded-full font-bold hover:bg-gray-50 transition">
                        Mis Pedidos
                    </Link>
                </div>

                {/* Div contenedor invisible para el ticket */}
                <div style={{ position: 'absolute', top: '-5000px', left: 0 }}>
                    <Ticket order={lastOrder} ticketRef={ticketRef} />
                </div>
                <ToastContainer />
            </div>
        );
    }

    if (cart.length === 0) {
        return (
            <div className="container mx-auto py-20 text-center mt-16">
                <h2 className="text-2xl font-light text-gray-800 mb-4">Tu carrito está vacío</h2>
                <Link to="/shop" className="inline-block bg-black text-white px-8 py-3 rounded-full">Volver a la tienda</Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-17 px-6 animate-fade-in-up">
            <h1 className="text-4xl font-bold tracking-tighter mb-12 text-gray-900 border-b border-gray-100 pb-8 flex items-baseline gap-4">
                Tu Carrito <span className="text-lg text-gray-400 font-light">{getCartCount()}</span>
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                <div className="lg:col-span-2 space-y-6">
                    {cart.map((item) => (
                        <div key={item.product.id} className="flex items-center gap-8 p-6 bg-white rounded-[2rem] border border-gray-100 shadow-sm">
                            <img src={item.product.image_url} alt={item.product.name} className="w-20 h-20 object-contain" />
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold">{item.product.name}</h3>
                                <p className="text-sm text-gray-500">{item.product.price}€ / ud.</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <button onClick={() => updateQuantity(item.product.id, -1)} className="w-8 h-8 rounded-full bg-gray-50">-</button>
                                <span className="font-bold">{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.product.id, 1)} className="w-8 h-8 rounded-full bg-gray-50">+</button>
                                <div className="font-bold w-24 text-right">{(item.product.price * item.quantity).toFixed(2)}€</div>
                                <button onClick={() => removeFromCart(item.product.id)} className="text-red-500 ml-4">×</button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="lg:col-span-1">
                    <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-xl sticky top-32">
                        <h2 className="text-2xl font-bold mb-8">Resumen</h2>
                        <div className="space-y-4 mb-10">
                            <div className="flex justify-between"><span>Subtotal</span><span>{subtotal.toFixed(2)}€</span></div>
                            <div className="flex justify-between"><span>Envío</span><span>{shippingCost === 0 ? 'GRATIS' : shippingCost + '€'}</span></div>
                            <div className="pt-6 border-t flex justify-between text-3xl font-bold"><span>Total</span><span>{total.toFixed(2)}€</span></div>
                        </div>
                        <button onClick={handleCheckout} disabled={isProcessing} className="w-full py-5 bg-black text-white rounded-full font-bold hover:bg-gray-800 transition">
                            {isProcessing ? 'Procesando...' : 'Finalizar Compra'}
                        </button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}
