import { useNavigate } from 'react-router-dom';

export default function Orders() {
    const navigate = useNavigate();

    // Datos de ejemplo para ver el diseño (luego los traeremos de Laravel)
    const orders = [
        {
            id: 'ORD-2026-001',
            date: '15 Feb 2026',
            total: 1249.00,
            status: 'Entregado',
            items: 2,
            image: "poner url de la imagen aqui"
        },
        {
            id: 'ORD-2026-002',
            date: '17 Feb 2026',
            total: 899.00,
            status: 'En camino',
            items: 1,
            image: "poner url de la imagen aqui"
        }
    ];

    return (
        <div className="max-w-5xl mx-auto py-20 px-6 animate-fade-in-up">
            {/* Cabecera */}
            <div className="mb-12">
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-gray-400 mb-4 block">Historial</span>
                <h1 className="text-5xl font-bold tracking-tighter text-gray-900">Mis Pedidos.</h1>
            </div>

            {orders.length > 0 ? (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div
                            key={order.id}
                            className="group bg-white border border-gray-100 rounded-[2rem] p-8 flex flex-col md:flex-row items-center gap-8 hover:shadow-xl transition-all duration-500"
                        >
                            {/* Imagen del primer producto del pedido */}
                            <div className="w-24 h-24 bg-gray-50 rounded-2xl overflow-hidden flex-shrink-0">
                                <img src={order.image} alt="Pedido" className="w-full h-full object-cover" />
                            </div>

                            {/* Info del pedido */}
                            <div className="flex-1 text-center md:text-left space-y-2">
                                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                                    <h3 className="text-lg font-bold text-gray-900 tracking-tight">{order.id}</h3>
                                    <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${order.status === 'Entregado' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'
                                        }`}>
                                        {order.status}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-500 font-light">
                                    Realizado el <span className="font-medium text-gray-700">{order.date}</span> • {order.items} {order.items === 1 ? 'producto' : 'productos'}
                                </p>
                            </div>

                            {/* Total y Acción */}
                            <div className="text-center md:text-right space-y-4">
                                <p className="text-2xl font-bold text-gray-900 tracking-tighter">
                                    {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(order.total)}
                                </p>
                                <button className="px-6 py-2 bg-gray-900 text-white text-xs font-bold uppercase tracking-widest rounded-full hover:bg-black transition-all active:scale-95 shadow-lg">
                                    Ver detalles
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                /* Estado vacío por si no hay pedidos */
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
