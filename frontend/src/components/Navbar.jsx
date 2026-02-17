import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { CartContext } from '../context/CartContext';

export default function Navbar() {
  const { getCartCount } = useContext(CartContext);
  const cartItemCount = getCartCount();
  const navigate = useNavigate();
  const location = useLocation();

  // Estados
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para el menu hamburguesa

  // Comprobamos el login al cargar o al cambiar de página
  useEffect(() => {
    const loggedIn = localStorage.getItem('user_logged_in') === 'true';
    setIsLoggedIn(loggedIn);
    // Cerramos el menu movil al cambiar de pagina para que no se quede abierto
    setIsMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('user_logged_in');
    localStorage.removeItem('user_data');
    setIsLoggedIn(false);
    setShowDropdown(false);
    setIsMenuOpen(false);
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo AICOR */}
        <Link to="/" className="text-2xl font-bold tracking-tighter text-gray-900 group flex items-center gap-1 transition-all">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white mr-1 group-hover:rotate-12 transition-transform duration-300">A</div>
          <span>Tienda</span><span className="font-light text-gray-400">AICOR</span>
        </Link>

        {/*MENU ESCRITORIO (Solo sale en pantallas grandes)*/}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm font-medium text-gray-500 hover:text-black transition-all relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-black after:transition-all hover:after:w-full">
            Inicio
          </Link>
          <Link to="/shop" className="text-sm font-medium text-gray-500 hover:text-black transition-all relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-black after:transition-all hover:after:w-full">
            Tienda
          </Link>
          <Link to="/contact" className="text-sm font-medium text-gray-500 hover:text-black transition-all relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-black after:transition-all hover:after:w-full">
            Contacto
          </Link>

          {/* Botón del Carrito */}
          <Link to="/cart" className="relative group p-2 text-gray-500 hover:text-black transition-colors rounded-full hover:bg-gray-50">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transform group-hover:-rotate-12 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {cartItemCount > 0 && (
              <span className="absolute top-0.5 right-0.5 bg-black text-white text-[9px] font-bold h-4 w-4 flex items-center justify-center rounded-full">
                {cartItemCount}
              </span>
            )}
          </Link>

          {/* Login / Perfil */}
          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 bg-gray-50 border border-gray-100 px-5 py-2 rounded-full hover:bg-gray-100 transition-all group"
              >
                <span className="text-sm font-medium text-gray-900">Mi Cuenta</span>
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 text-gray-400 transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-3 w-48 bg-white border border-gray-100 rounded-2xl shadow-xl py-2 animate-fade-in-up z-50">
                  <Link to="/profile" onClick={() => setShowDropdown(false)} className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors">Ver Perfil</Link>
                  <Link to="/orders" onClick={() => setShowDropdown(false)} className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors">Mis Pedidos</Link>
                  <div className="border-t border-gray-50 my-1"></div>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors font-medium">Cerrar Sesión</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="bg-black text-white text-sm font-medium px-6 py-2.5 rounded-full hover:bg-gray-800 transition-all shadow-md hover:shadow-xl active:scale-95">
              Iniciar Sesión
            </Link>
          )}
        </div>

        {/*BOTON HAMBURGUESA (Solo sale en movil)*/}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/*MENU MOVIL DESPLEGABLE*/}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 animate-fade-in-up pb-8 px-6 space-y-6">
          <div className="flex flex-col gap-4">
            <Link to="/" className="text-lg font-medium text-gray-900 py-2 border-b border-gray-50">Inicio</Link>
            <Link to="/shop" className="text-lg font-medium text-gray-900 py-2 border-b border-gray-50">Tienda</Link>
            <Link to="/contact" className="text-lg font-medium text-gray-900 py-2 border-b border-gray-50">Contacto</Link>

            {/* Carrito en movil */}
            <Link to="/cart" className="flex items-center justify-between text-lg font-medium text-gray-900 py-2 border-b border-gray-50">
              <span>Mi Carrito</span>
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {cartItemCount > 0 && <span className="bg-black text-white text-[10px] px-2 py-0.5 rounded-full">{cartItemCount}</span>}
              </div>
            </Link>

            {/* Login o Perfil en movil */}
            {isLoggedIn ? (
              <>
                <Link to="/profile" className="text-lg font-medium text-gray-900 py-2 border-b border-gray-50">Ver Perfil</Link>
                <Link to="/orders" className="text-lg font-medium text-gray-900 py-2 border-b border-gray-50">Mis Pedidos</Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left text-lg font-bold text-red-600 py-4 mt-2"
                >
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="w-full bg-black text-white text-center py-4 rounded-2xl font-bold mt-4 shadow-lg active:scale-95 transition-all"
              >
                Iniciar Sesión
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
