import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

export default function Navbar() {
  const { getCartCount } = useContext(CartContext);
  const cartItemCount = getCartCount();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-md border-b border-gray-100 transition-all duration-300 animate-fade-in-up">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo / Nombre de la Tienda */}
        <Link to="/" className="text-2xl font-bold tracking-tighter text-gray-900 group flex items-center gap-1 transition-all">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white mr-1 group-hover:rotate-12 transition-transform duration-300">A</div>{/*Animacion de rotacion*/}
          <span>Tienda</span><span className="font-light text-gray-400">AICOR</span>
        </Link>

        {/* Menú de Navegación */}
        <div className="flex items-center gap-8">
          <Link to="/" className="text-sm font-medium text-gray-500 hover:text-black transition-all relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-black after:transition-all hover:after:w-full">
            Productos
          </Link>

          {/* Botón del Carrito */}
          <Link to="/cart" className="relative group p-2 text-gray-500 hover:text-black transition-colors rounded-full hover:bg-gray-50">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transform group-hover:-rotate-12 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {cartItemCount > 0 && (
              <span className="absolute top-1 right-1 bg-black text-white text-[9px] font-bold h-4 w-4 flex items-center justify-center rounded-full ring-2 ring-white animate-pulse">
                {cartItemCount}
              </span>
            )}
          </Link>

          {/* Login / Perfil */}
          <Link to="/login" className="bg-black text-white text-sm font-medium px-6 py-2.5 rounded-full hover:bg-gray-800 transition-all shadow-md hover:shadow-xl active:scale-95">
            Iniciar Sesión
          </Link>
        </div>
      </div>
    </nav>
  );
}
