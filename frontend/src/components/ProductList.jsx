import { useState, useContext, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Productos cargados dinámicamente desde la API


export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { addToCart } = useContext(CartContext);

    // Estados para Paginación, Filtrado y Vista Rápida
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState('Todos');
    const [quickViewProduct, setQuickViewProduct] = useState(null);
    const productsPerPage = 12; // Bajamos un poco para que se vea mejor en móviles

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await fetch('/api/shop_api.php', { cache: 'no-store' });
                if (!response.ok) throw new Error('Error al cargar productos');
                const data = await response.json();
                setProducts(data);
            } catch (err) {
                setError(err.message);
                toast.error("No se pudo conectar con la API.");
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const handleAddToCart = (product, e) => {
        if (e) e.stopPropagation(); // Evitar abrir el modal al añadir
        addToCart(product);
        toast.success(`¡${product.name} añadido! 🛒`, {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: true,
            theme: "dark",
        });
    };

    // Lógica de Filtrado
    const filteredProducts = selectedCategory === 'Todos'
        ? products
        : products.filter(p => p.category === selectedCategory);

    // Cálculos para paginación
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setCurrentPage(1); // Resetear a la primera página al filtrar
    };

    // Obtener categorías únicas
    const categories = ['Todos', ...new Set(products.map(p => p.category))];

    // Productos relacionados para el modal
    const relatedProducts = quickViewProduct
        ? products.filter(p => p.category === quickViewProduct.category && p.id !== quickViewProduct.id).slice(0, 4)
        : [];

    if (loading) {
        return (
            <div className="flex justify-center items-center h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-20">
                <p className="text-red-500 font-medium">Error: {error}</p>
                <button onClick={() => window.location.reload()} className="mt-4 text-sm underline">Reintentar</button>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 mt-16">
            <div className="text-center mb-8 animate-fade-in-up">
                <h2 className="text-3xl font-light text-gray-900 sm:text-4xl tracking-tight"><strong>LO MÁS DESTACADO</strong></h2>
                <p className="mt-4 text-lg text-gray-500 font-light italic">Tecnología premium para tu día a día.</p>
            </div>

            {/* Filtros de Categoría */}
            <div className="flex flex-wrap justify-center gap-3 mb-12 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => handleCategoryChange(category)}
                        className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedCategory === category
                            ? 'bg-black text-white shadow-lg scale-105'
                            : 'bg-white text-gray-500 border border-gray-100 hover:border-gray-300 hover:bg-gray-50'
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6 xl:gap-x-8">
                {currentProducts.map((product, index) => (
                    <div
                        key={product.id}
                        onClick={() => setQuickViewProduct(product)}
                        className="group relative bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col overflow-hidden animate-fade-in-up cursor-pointer"
                        style={{ animationDelay: `${index * 50}ms` }}
                    >
                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden bg-gray-50/50 group-hover:bg-gray-50 transition-colors duration-500 lg:aspect-none lg:h-72 flex items-center justify-center p-8 relative">
                            <img
                                src={product.image_url}
                                alt={product.name}
                                className="h-full w-full object-contain object-center transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
                                loading="lazy"
                            />

                            {/* Badger de Stock */}
                            {product.stock === 0 ? (
                                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center font-semibold text-gray-400 uppercase tracking-widest text-xs">
                                    Agotado
                                </div>
                            ) : product.stock < 6 ? (
                                <div className="absolute top-4 right-4 bg-orange-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg animate-bounce-subtle">
                                    ¡SOLO {product.stock}!
                                </div>
                            ) : null}

                            <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <span className="bg-white/90 backdrop-blur-md text-[10px] font-bold px-3 py-1.5 rounded-full shadow-sm text-gray-900 border border-gray-100">
                                    VISTA RÁPIDA
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-1 flex-col p-6">
                            <h3 className="text-base font-semibold text-gray-900 mb-1 group-hover:text-black transition-colors">
                                {product.name}
                            </h3>
                            <p className="text-sm text-gray-500 line-clamp-2 mb-4 font-light leading-relaxed">
                                {product.description || "Descripcion por defecto"}
                            </p>

                            <div className="mt-auto flex items-center justify-between">
                                <p className="text-xl font-bold text-gray-900">
                                    {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(product.price)}
                                </p>
                                <button
                                    className={`rounded-full p-3 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 ${product.stock === 0
                                        ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                                        : 'bg-black text-white hover:bg-gray-800 shadow-md hover:shadow-lg active:scale-90'
                                        }`}
                                    onClick={(e) => product.stock > 0 && handleAddToCart(product, e)}
                                    disabled={product.stock === 0}
                                    title={product.stock === 0 ? "Agotado" : "Añadir al carrito"}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Controles de Paginación Minimalistas */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-16 gap-4">
                    <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`text-sm font-medium transition-colors ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:text-black'}`}
                    >
                        &larr; Anterior
                    </button>

                    <div className="flex gap-2">
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i}
                                onClick={() => paginate(i + 1)}
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all ${currentPage === i + 1
                                    ? 'bg-black text-white shadow-md'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`text-sm font-medium transition-colors ${currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:text-black'}`}
                    >
                        Siguiente &rarr;
                    </button>
                </div>
            )}

            {/*vista rapida y articulos relacionados*/}
            {quickViewProduct && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={() => setQuickViewProduct(null)}>
                    <div
                        className="bg-white w-full max-w-5xl max-h-[90vh] rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row animate-fade-in-up"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Imagen grande */}
                        <div className="lg:w-1/2 bg-gray-50 flex items-center justify-center p-12 relative">
                            <button
                                onClick={() => setQuickViewProduct(null)}
                                className="absolute top-6 left-6 lg:hidden bg-white/80 p-2 rounded-full shadow-sm"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            <img
                                src={quickViewProduct.image_url}
                                alt={quickViewProduct.name}
                                className="max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-700"
                            />
                        </div>

                        {/* Detalles y Relacionados */}
                        <div className="lg:w-1/2 p-8 lg:p-12 overflow-y-auto">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{quickViewProduct.category}</span>
                                    <h2 className="text-3xl font-bold text-gray-900 mt-1">{quickViewProduct.name}</h2>
                                </div>
                                <button
                                    onClick={() => setQuickViewProduct(null)}
                                    className="hidden lg:block text-gray-300 hover:text-black transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <p className="text-gray-600 font-light leading-relaxed mb-8 text-lg">
                                {quickViewProduct.description}
                            </p>

                            <div className="flex items-center justify-between mb-12 bg-gray-50 p-6 rounded-3xl border border-gray-100">
                                <div>
                                    <p className="text-3xl font-bold text-gray-900">
                                        {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(quickViewProduct.price)}
                                    </p>
                                    <p className={`text-xs mt-1 font-medium ${quickViewProduct.stock < 6 ? 'text-orange-500' : 'text-green-600'}`}>
                                        {quickViewProduct.stock === 0 ? "Sin stock" : `Stock disponible: ${quickViewProduct.stock}`}
                                    </p>
                                </div>
                                <button
                                    className={`px-8 py-4 rounded-full font-bold transition-all ${quickViewProduct.stock === 0
                                        ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                                        : 'bg-black text-white hover:bg-gray-800 shadow-xl active:scale-95'
                                        }`}
                                    onClick={() => quickViewProduct.stock > 0 && handleAddToCart(quickViewProduct)}
                                    disabled={quickViewProduct.stock === 0}
                                >
                                    Añadir al Carrito
                                </button>
                            </div>

                            {/* Productos Relacionados */}
                            {relatedProducts.length > 0 && (
                                <div className="mt-8 pt-8 border-t border-gray-100">
                                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-6">También te podría gustar</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        {relatedProducts.map(rp => (
                                            <div
                                                key={rp.id}
                                                className="group cursor-pointer flex gap-4 items-center bg-gray-50 p-3 rounded-2xl hover:bg-white border border-transparent hover:border-gray-100 transition-all hover:shadow-sm"
                                                onClick={() => setQuickViewProduct(rp)}
                                            >
                                                <div className="w-12 h-12 flex-shrink-0 bg-white rounded-lg p-2">
                                                    <img src={rp.image_url} alt={rp.name} className="w-full h-full object-contain" />
                                                </div>
                                                <div className="min-w-0">
                                                    <h4 className="text-xs font-semibold text-gray-900 truncate">{rp.name}</h4>
                                                    <p className="text-[10px] text-gray-500">{new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(rp.price)}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <ToastContainer />
        </div>
    );
}
