export default function Loading() {
    return (
        <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50">
            {/* Logo o inicial con pulso suave */}
            <div className="relative">
                <div className="w-20 h-20 bg-black rounded-3xl flex items-center justify-center text-white font-bold text-3xl shadow-2xl animate-pulse">
                    A
                </div>
                {/* Spinner circular discreto alrededor */}
                <div className="absolute inset-[-8px] border-2 border-gray-100 border-t-black rounded-full animate-spin"></div>
            </div>

            <div className="mt-8 text-center">
                <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-gray-900 animate-fade-in">
                    Cargando
                </h2>
                <p className="text-[10px] text-gray-400 mt-2 italic font-light tracking-widest">
                    Aicor Ecommerce
                </p>
            </div>
        </div>
    );
}
