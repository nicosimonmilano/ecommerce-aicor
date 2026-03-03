import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Orders() {
    const navigate = useNavigate();

    // Estado para guardar los pedidos y si estamos cargando
    const [pedidos, setPedidos] = useState([]);
    const [cargando, setCargando] = useState(true);

    // Pedir los pedidos al servidor al cargar la página
    useEffect(() => {
        // Sacamos el email del usuario de localStorage( que lo guardamos en el login )
        const datosUsuario = JSON.parse(localStorage.getItem('user_data') || '{}');

        // Si no hay email, no podemos buscar pedidos
        if (!datosUsuario.email) {
            setCargando(false);
            return;
        }

        // Hacer la petición GET al backend
        fetch('/api/orders?email=' + datosUsuario.email)
            .then(respuesta => respuesta.json())   // Convertir la respuesta a JSON
            .then(datos => {
                setPedidos(datos);                  // Guardar los pedidos en el estado
                setCargando(false);                 // Ya no estamos cargando
            })
            .catch(error => {
                console.error('Error cargando pedidos:', error);
                setCargando(false);
            });

    }, []); // El array vacío [] significa "solo ejecutar una vez al cargar"

    // Mientas carga mostrar un spinner
    if (cargando) {
        return (
            <div className="flex justify-center items-center h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
            </div>
        );
    }

    // Renderizar pagina
    return (
        <div className="max-w-5xl mx-auto py-20 px-6 animate-fade-in-up">
            {/* Cabecera */}
            <div className="mb-12">
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-gray-400 mb-4 block">Historial</span>
                <h1 className="text-5xl font-bold tracking-tighter text-gray-900">Mis Pedidos.</h1>
            </div>

            {/* Si hay pedidos, los mostramos */}
            {pedidos.length > 0 ? (
                <div className="space-y-6">
                    {pedidos.map((pedido) => (
                        <div
                            key={pedido.id}
                            className="group bg-white border border-gray-100 rounded-[2rem] p-8 hover:shadow-xl transition-all duration-500"
                        >
                            {/* Info del pedido: ID, estado, total y fecha */}
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                                    <h3 className="text-lg font-bold text-gray-900">{pedido.id}</h3>
                                    <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-green-50 text-green-600">
                                        {pedido.status}
                                    </span>
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-bold text-gray-900">
                                        {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(pedido.total)}
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1">{pedido.date}</p>
                                </div>
                            </div>

                            {/* Lista de productos de este pedido */}
                            <div className="border-t border-gray-50 pt-4 space-y-3">
                                {pedido.items && pedido.items.map((item, index) => (
                                    <div key={index} className="flex items-center gap-4">
                                        {/* Imagen del producto */}
                                        <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center p-2">
                                            <img src={item.image_url} alt={item.name} className="w-full h-full object-contain" />
                                        </div>
                                        {/* Nombre y cantidad */}
                                        <div className="flex-1">
                                            <p className="text-sm font-semibold text-gray-900">{item.name}</p>
                                            <p className="text-xs text-gray-400">
                                                {item.quantity} × {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(item.price)}
                                            </p>
                                        </div>
                                        {/* Subtotal */}
                                        <p className="text-sm font-bold text-gray-700">
                                            {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(item.subtotal)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                // Si no hay pedidos, mostramos un mensaje 
                <div className="text-center py-20 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-100">
                    <p className="text-gray-400 font-light italic mb-8">Aún no has realizado ninguna compra.</p>
                    <button
                        onClick={() => navigate('/shop')}
                        className="px-10 py-4 bg-black text-white text-sm font-bold uppercase tracking-widest rounded-full hover:bg-gray-800 transition-all shadow-xl"
                    >
                        Empezar a comprar
                    </button>
                </div>
            )}
        </div>
    );
}
