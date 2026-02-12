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

    // Estados para Paginación
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 16;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                console.log('Iniciando fetch a /products.json');
                const response = await fetch('/products.json');
                console.log('Respuesta recibida:', response.status);
                if (!response.ok) throw new Error('Error al cargar productos');
                const data = await response.json();
                console.log('Datos cargados:', data.length, 'productos');
                setProducts(data);
            } catch (err) {
                console.error(err);
                setError(err.message);
                toast.error("No se pudo conectar con la API de productos.");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleAddToCart = (product) => {
        addToCart(product);
        toast.success(`¡${product.name} añadido al carrito! 🛒`, {
            position: "bottom-right",
            autoClose: 4000,
            theme: "colored",
        });
    };

    // Cálculos para paginación
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(products.length / productsPerPage);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

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
            <div className="text-center mb-12">
                <h2 className="text-3xl font-light text-gray-900 sm:text-4xl"><strong>LO MÁS DESTACADO</strong></h2>
                <p className="mt-4 text-lg text-gray-500">Tecnología premium para tu día a día.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6 xl:gap-x-8">
                {currentProducts.map((product) => (
                    <div key={product.id} className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden">
                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden bg-gray-50 group-hover:opacity-95 lg:aspect-none lg:h-64 flex items-center justify-center p-6 relative">
                            <img
                                src={product.image_url}
                                alt={product.name}
                                className="h-full w-full object-contain object-center transition-transform duration-300 group-hover:scale-105"
                                loading="lazy"
                            />
                            {product.stock === 0 && (
                                <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center font-medium text-gray-500 uppercase tracking-wider text-sm">
                                    Agotado
                                </div>
                            )}
                        </div>

                        <div className="flex flex-1 flex-col p-5">
                            <h3 className="text-base font-medium text-gray-900 mb-1 truncate">
                                {product.name}
                            </h3>
                            <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                                {product.description || "Experiencia de alta calidad definida por la innovación."}
                            </p>

                            <div className="mt-auto flex items-center justify-between">
                                <p className="text-lg font-semibold text-gray-900">
                                    {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(product.price)}
                                </p>
                                <button
                                    className={`rounded-full p-2.5 transition-all focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 ${product.stock === 0
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        : 'bg-black text-white hover:bg-gray-800 shadow-sm hover:shadow-md active:scale-95'
                                        }`}
                                    onClick={() => product.stock > 0 && handleAddToCart(product)}
                                    disabled={product.stock === 0}
                                    title={product.stock === 0 ? "Agotado" : "Añadir al carrito"}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
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

            <ToastContainer />
        </div>
    );
}
