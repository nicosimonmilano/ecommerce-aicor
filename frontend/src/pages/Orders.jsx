export default function Orders() {
    return (
        <div className="max-w-4xl mx-auto py-20 px-6 animate-fade-in-up">
            <h1 className="text-4xl font-bold tracking-tighter mb-12">Mis Pedidos</h1>

            <div className="bg-white border border-gray-100 rounded-[2.5rem] p-12 text-center">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                </div>
                <h2 className="text-xl font-medium text-gray-900 mb-2">Aún no tienes pedidos</h2>
                <p className="text-gray-500 font-light italic mb-8">Tus futuras compras aparecerán aquí de forma organizada.</p>
                <div className="w-full h-32 border-2 border-dashed border-gray-50 rounded-3xl flex items-center justify-center text-gray-300 uppercase tracking-widest text-[10px] font-bold">
                    Próximamente disponible
                </div>
            </div>
        </div>
    );
}
