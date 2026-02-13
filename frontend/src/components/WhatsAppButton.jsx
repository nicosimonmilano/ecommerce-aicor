import { useState, useEffect } from 'react';

export default function WhatsAppButton() {
    const [isVisible, setIsVisible] = useState(false);
    const [showBubble, setShowBubble] = useState(false);

    // Aparecer con retraso para no agobiar al entrar
    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 2000);
        const bubbleTimer = setTimeout(() => setShowBubble(true), 5000);

        return () => {
            clearTimeout(timer);
            clearTimeout(bubbleTimer);
        };
    }, []);

    const whatsappNumber = "34600000000"; // tlf de prueba
    const message = "¡Hola! Me gustaría recibir información sobre un producto.";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-8 right-8 z-[90] flex flex-col items-end">
            {/* Burbuja de mensaje */}
            {showBubble && (
                <div className="mb-4 bg-white px-5 py-3 rounded-2xl shadow-xl border border-gray-100 animate-fade-in-up relative">
                    <button
                        onClick={() => setShowBubble(false)}
                        className="absolute -top-2 -right-2 bg-gray-100 text-gray-500 rounded-full w-5 h-5 flex items-center justify-center text-[10px] hover:bg-gray-200 transition-colors"
                    >
                        ✕
                    </button>
                    <p className="text-sm font-medium text-gray-800">¡Hola! 👋</p>
                    <p className="text-xs text-gray-500">¿Necesitas ayuda con tu pedido?</p>
                </div>
            )}

            {/* Botón flotante */}
            <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-[#25D366] hover:bg-[#20ba5a] text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-90 flex items-center justify-center animate-fade-in-up"
                title="Contactar por WhatsApp"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    className="drop-shadow-sm"
                >
                    <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.06 3.973L0 16l4.104-1.076a7.863 7.863 0 0 0 3.841 1.008h.004c4.367 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
                </svg>

                {/* Pulse effect */} 
                <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20 group-hover:hidden"></span>
            </a>
        </div>
    );
}
