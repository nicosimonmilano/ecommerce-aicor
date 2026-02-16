import { useState, useEffect } from 'react';

const QUICK_RESPONSES = [
    {
        id: 'stock_query',
        question: "¿Qué stock hay por categoría?",
        answer: "Selecciona una categoría para ver el detalle de stock por marca:"
    },

    {
        id: 2,
        question: "¿Cuánto tarda el envío?",
        answer: "Para España peninsular, nuestros envíos premium AICOR tardan entre 24 y 48 horas laborales."
    },
    {
        id: 3,
        question: "¿Qué garantía tienen?",
        answer: "Todos nuestros productos tecnológicos cuentan con 3 años de garantía oficial y 30 días de devolución gratuita."
    },
    {
        id: 4,
        question: "Hablar con un humano",
        answer: "¡Sin problema! Puedes usar el botón de WhatsApp de la derecha para hablar directamente con nuestro equipo de soporte."
    }
];

export default function ShopAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [messages, setMessages] = useState([
        { type: 'bot', text: '¡Hola! Soy el asistente virtual de Tienda AICOR. ¿En qué puedo ayudarte hoy?' }
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const [showCategoryButtons, setShowCategoryButtons] = useState(false);

    // Cargar productos para tener datos reales de stock
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/api/shop_api.php');
                if (response.ok) {
                    const data = await response.json();
                    setProducts(data);
                }
            } catch (error) {
                console.error("Error cargando productos en el asistente:", error);
            }
        };
        fetchProducts();
    }, []);

    const handleQuestion = (q) => {
        setMessages(prev => [...prev, { type: 'user', text: q.question }]);
        setIsTyping(true);
        setShowCategoryButtons(false);

        setTimeout(() => {
            setIsTyping(false);
            setMessages(prev => [...prev, { type: 'bot', text: q.answer }]);
            if (q.id === 'stock_query') {
                setShowCategoryButtons(true);
            }
        }, 800);
    };

    const handleCategoryStock = (category) => {
        // 1. Buscamos los productos de esta categoría
        const lista = products.filter(p => p.category === category);

        // 2. Marcas con stock (sumando sus unidades)
        const nombresMarcas = [...new Set(lista.filter(p => p.stock > 0).map(p => p.name.split(' ')[0]))];
        const marcasConStock = nombresMarcas.map(marca => {
            let suma = 0;
            lista.filter(p => p.name.startsWith(marca)).forEach(p => suma += p.stock);
            return `${marca} (${suma} uds)`;
        });

        // 3. Productos sin stock
        const agotados = lista.filter(p => p.stock === 0).map(p => `${p.name} (Sin stock)`);

        // 4. Escribimos la respuesta
        let respuesta = `En ${category}: \n\n`;
        if (marcasConStock.length > 0) respuesta += `✅ Marcas: ${marcasConStock.join(', ')}. \n`;
        if (agotados.length > 0) respuesta += `❌ ${agotados.join(', ')}. \n`;

        setMessages(prev => [...prev, { type: 'user', text: `Stock de ${category}` }]);
        setIsTyping(true);
        setShowCategoryButtons(false);

        setTimeout(() => {
            setIsTyping(false);
            setMessages(prev => [...prev, { type: 'bot', text: respuesta }]);
        }, 1000);
    };

    const categories = ['Portátiles', 'Móviles', 'Periféricos', 'Audio', 'Tablets', 'Consolas', 'Componentes'];

    return (
        <div className="fixed bottom-8 left-8 z-[100]">
            {/* Botón Flotante */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`bg-black text-white p-4 rounded-full shadow-2xl transition-all duration-500 hover:scale-110 active:scale-95 flex items-center justify-center ${isOpen ? 'rotate-90 bg-gray-800' : ''}`}
            >
                {isOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                )}
            </button>

            {/* Ventana de Chat */}
            {isOpen && (
                <div className="absolute bottom-20 left-0 w-[350px] bg-white rounded-[2rem] shadow-2xl border border-gray-100 overflow-hidden flex flex-col animate-fade-in-up">
                    {/* Header */}
                    <div className="bg-black p-6 text-white text-center">
                        <div className="w-12 h-12 bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-2 text-xl font-bold">A</div>
                        <h3 className="font-bold text-lg">Asistente AICOR</h3>
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">Respuesta instantánea</p>
                    </div>

                    {/* Cuerpo del Chat */}
                    <div className="flex-1 p-6 h-[320px] overflow-y-auto space-y-4 bg-gray-50/50">
                        {messages.map((m, i) => (
                            <div key={i} className={`flex ${m.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] p-4 rounded-2xl text-sm shadow-sm whitespace-pre-wrap ${m.type === 'user'
                                    ? 'bg-black text-white rounded-br-none'
                                    : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
                                    }`}>
                                    {m.text}
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-white border border-gray-100 p-4 rounded-2xl rounded-bl-none shadow-sm flex gap-1">
                                    <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce"></span>
                                    <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                                    <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                                </div>
                            </div>
                        )}
                        {showCategoryButtons && (
                            <div className="grid grid-cols-2 gap-2 mt-2 animate-fade-in">
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => handleCategoryStock(cat)}
                                        className="text-xs bg-white border border-gray-200 hover:border-black p-2 rounded-xl transition-all shadow-sm"
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* FAQ / Quick Actions */}
                    <div className="p-4 bg-white border-t border-gray-50">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3 px-2">¿Cómo puedo ayudarte?</p>
                        <div className="flex flex-col gap-2">
                            {QUICK_RESPONSES.map(q => (
                                <button
                                    key={q.id}
                                    onClick={() => handleQuestion(q)}
                                    className="text-left text-xs bg-gray-50 hover:bg-black hover:text-white p-3 rounded-xl transition-all border border-gray-100/50"
                                >
                                    {q.question}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
