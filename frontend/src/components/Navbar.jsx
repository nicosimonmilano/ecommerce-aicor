import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

export default function Navbar() {
  const { getCartCount } = useContext(CartContext);
  const cartItemCount = getCartCount();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100 transition-all duration-300">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo / Nombre de la Tienda */}
        <Link to="/" className="text-2xl font-bold tracking-tight text-gray-900 hover:opacity-80 transition-opacity">
          Tienda<span className="font-light">AICOR</span>
        </Link>

        {/* Menú de Navegación */}
        <div className="flex items-center gap-8">
          <Link to="/" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
            Productos
          </Link>

          {/* Botón del Carrito */}
          <Link to="/cart" className="relative group text-gray-600 hover:text-gray-900 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {cartItemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-black text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full ring-2 ring-white">
                {cartItemCount}
              </span>
            )}
          </Link>

          {/* Login / Perfil */}
          <Link to="/login" className="bg-gray-900 text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-gray-800 transition-all shadow-sm hover:shadow-md">
            Iniciar Sesión
          </Link>
        </div>
      </div>
    </nav>
  );
}
