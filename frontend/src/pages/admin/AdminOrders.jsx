import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export default function AdminOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await fetch('/api/admin/orders');
            const data = await res.json();
            setOrders(data);
        } catch (err) {
            toast.error('Error al cargar pedidos');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="p-8">Cargando...</div>;

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Listado de Pedidos Global</h1>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-gray-400 text-xs uppercase tracking-widest">
                        <tr>
                            <th className="px-6 py-4">ID Pedido</th>
                            <th className="px-6 py-4">Cliente</th>
                            <th className="px-6 py-4">Fecha</th>
                            <th className="px-6 py-4">Total</th>
                            <th className="px-6 py-4">Estado</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {orders.map((order) => (
                            <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 font-mono font-bold text-sm">{order.id}</td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-gray-900">{order.user_name || 'Sin nombre'}</span>
                                        <span className="text-xs text-gray-500">{order.user_email}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600">{order.date}</td>
                                <td className="px-6 py-4 font-bold">{order.total}€</td>
                                <td className="px-6 py-4">
                                    <span className="px-4 py-1.5 rounded-full text-[10px] font-bold bg-green-100 text-green-700 uppercase">
                                        {order.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {orders.length === 0 && (
                <div className="text-center py-20 bg-white rounded-3xl mt-6 border border-dashed border-gray-200">
                    <p className="text-gray-400 italic">No hay pedidos registrados todavía.</p>
                </div>
            )}
        </div>
    );
}
