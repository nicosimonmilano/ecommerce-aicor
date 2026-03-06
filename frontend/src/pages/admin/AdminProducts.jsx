import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export default function AdminProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingProduct, setEditingProduct] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const initialForm = {
        name: '',
        description: '',
        price: '',
        stock: '',
        image_url: '',
        category: '',
    };

    const [form, setForm] = useState(initialForm);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await fetch('/api/admin/products');
            const data = await res.json();
            setProducts(data);
        } catch (err) {
            toast.error('Error al cargar productos');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = editingProduct ? 'PUT' : 'POST';
        const url = editingProduct ? `/api/admin/products/${editingProduct.id}` : '/api/admin/products';

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            if (res.ok) {
                toast.success(editingProduct ? 'Producto actualizado' : 'Producto creado');
                setShowModal(false);
                setEditingProduct(null);
                setForm(initialForm);
                fetchProducts();
            }
        } catch (err) {
            toast.error('Error en la operación');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('¿Seguro que quieres eliminar este producto?')) return;
        try {
            const res = await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
            if (res.ok) {
                toast.success('Producto eliminado');
                fetchProducts();
            }
        } catch (err) {
            toast.error('Error al eliminar');
        }
    };

    const openEdit = (product) => {
        setEditingProduct(product);
        setForm(product);
        setShowModal(true);
    };

    if (loading) return <div className="p-8">Cargando...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Gestión de Productos</h1>
                <button
                    onClick={() => { setEditingProduct(null); setForm(initialForm); setShowModal(true); }}
                    className="bg-black text-white px-6 py-2 rounded-full font-bold hover:bg-gray-800 transition-all"
                >
                    + Nuevo Producto
                </button>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-gray-400 text-xs uppercase tracking-widest">
                        <tr>
                            <th className="px-6 py-4">Imagen</th>
                            <th className="px-6 py-4">Nombre</th>
                            <th className="px-6 py-4">Categoría</th>
                            <th className="px-6 py-4">Precio</th>
                            <th className="px-6 py-4">Stock</th>
                            <th className="px-6 py-4">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {products.map((p) => (
                            <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">
                                    <img src={p.image_url} alt={p.name} className="w-12 h-12 object-contain" />
                                </td>
                                <td className="px-6 py-4 font-semibold">{p.name}</td>
                                <td className="px-6 py-4">{p.category}</td>
                                <td className="px-6 py-4">{p.price}€</td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${p.stock < 10 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                                        {p.stock}
                                    </span>
                                </td>
                                <td className="px-6 py-4 space-x-2 text-sm">
                                    <button onClick={() => openEdit(p)} className="text-blue-600 hover:underline">Editar</button>
                                    <button onClick={() => handleDelete(p.id)} className="text-red-600 hover:underline">Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal de Formulario */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
                    <div className="bg-white rounded-[2rem] w-full max-w-lg p-8 animate-fade-in-up">
                        <h2 className="text-2xl font-bold mb-6">{editingProduct ? 'Editar Producto' : 'Nuevo Producto'}</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                placeholder="Nombre"
                                className="w-full p-3 rounded-xl border"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                required
                            />
                            <textarea
                                placeholder="Descripción"
                                className="w-full p-3 rounded-xl border"
                                value={form.description}
                                onChange={(e) => setForm({ ...form, description: e.target.value })}
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    type="number"
                                    placeholder="Precio"
                                    className="w-full p-3 rounded-xl border"
                                    value={form.price}
                                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                                    step="0.01"
                                    required
                                />
                                <input
                                    type="number"
                                    placeholder="Stock"
                                    className="w-full p-3 rounded-xl border"
                                    value={form.stock}
                                    onChange={(e) => setForm({ ...form, stock: e.target.value })}
                                    required
                                />
                            </div>
                            <input
                                placeholder="URL de imagen"
                                className="w-full p-3 rounded-xl border"
                                value={form.image_url}
                                onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                                required
                            />
                            <input
                                placeholder="Categoría (ej: Smartphones, Tablets)"
                                className="w-full p-3 rounded-xl border"
                                value={form.category}
                                onChange={(e) => setForm({ ...form, category: e.target.value })}
                                required
                            />
                            <div className="flex gap-4 pt-4">
                                <button type="submit" className="flex-1 bg-black text-white py-3 rounded-xl font-bold">Guardar</button>
                                <button type="button" onClick={() => setShowModal(false)} className="flex-1 bg-gray-100 py-3 rounded-xl font-bold">Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
