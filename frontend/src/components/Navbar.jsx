import { Link } from 'react-router-dom';
import { useContext } from 'react';
// import { CartContext } from '../context/CartContext'; // Lo crearemos luego

export default function Navbar() {
  // const { cart } = useContext(CartContext);
  const cartItemCount = 0; // Temporal hasta que tengamos el contexto

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo / Nombre de la Tienda */}
        <Link to="/" className="text-2xl font-bold tracking-tighter">
          TiendaAICOR
        </Link>

        {/* Menú de Navegación */}
        <div className="flex items-center gap-6">
          <Link to="/" className="hover:text-blue-200 transition">
            Productos
          </Link>
          
          {/* Botón del Carrito */}
          <Link to="/cart" className="relative flex items-center hover:text-blue-200 transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-xs font-bold px-2 py-0.5 rounded-full">
                {cartItemCount}
              </span>
            )}
          </Link>

          {/* Login / Perfil (Por hacer) */}
          <Link to="/login" className="bg-white text-blue-600 px-4 py-2 rounded font-semibold hover:bg-blue-50 transition">
            Iniciar Sesión
          </Link>
        </div>
      </div>
    </nav>
  );
}
