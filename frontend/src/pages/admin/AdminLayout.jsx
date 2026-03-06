import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function AdminLayout() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const location = useLocation();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });
            const data = await res.json();

            if (data.success) {
                setIsAuthenticated(true);
                toast.success('Contraseña correcta');
            } else {
                toast.error('Contraseña incorrecta');
            }
        } catch (err) {
            toast.error('Error al conectar con el backend');
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="bg-white p-8 rounded-[2rem] shadow-xl w-full max-w-sm text-center border border-gray-100">
                    <div className="w-16 h-16 bg-black text-white rounded-2xl flex items-center justify-center text-3xl font-bold mx-auto mb-4">A</div>
                    <h1 className="text-xl font-bold mb-2">Panel de Control</h1>
                    <p className="text-gray-400 text-sm mb-6">Solo personal autorizado</p>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            type="password"
                            placeholder="Escribe la clave..."
                            className="w-full px-5 py-3 rounded-xl border outline-none focus:ring-1 focus:ring-black"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button className="w-full bg-black text-white py-3 rounded-xl font-bold hover:bg-gray-800 transition-all">
                            Entrar
                        </button>
                    </form>
                    <Link to="/" className="block mt-6 text-sm text-gray-400 hover:text-black hover:underline">
                        Volver a la tienda
                    </Link>
                </div>
            </div>
        );
    }

    // Si ya estamos autenticados, enseñamos el menú y el contenido
    const navItems = [
        { name: 'Productos', path: '/admin/products' },
        { name: 'Pedidos', path: '/admin/orders' },
        { name: 'Volver a Tienda', path: '/' },
    ];

    return (
        <div className="flex h-screen bg-gray-100 mt-[-80px]">
            {/* Sidebar */}
            <div className="w-64 bg-black text-white p-6 hidden md:block">
                <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
                <nav className="space-y-4">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`block px-4 py-2 rounded-lg transition-colors ${location.pathname === item.path ? 'bg-white text-black' : 'hover:bg-gray-800'
                                }`}
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>
            </div>

            {/* Contenido Principal */}
            <div className="flex-1 overflow-y-auto p-8">
                <Outlet />
            </div>
        </div>
    );
}
