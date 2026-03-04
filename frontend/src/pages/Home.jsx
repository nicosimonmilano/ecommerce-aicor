import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col gap-24">
            {/* Seccion principal con estilo minimalista*/}
            <section className="relative h-[70vh] flex items-center justify-center overflow-hidden rounded-[3rem] bg-black text-white px-6">
                <div className="absolute inset-0 opacity-40">
                    <img
                        src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=2072"
                        alt="Hero background"
                        className="w-full h-full object-cover animate-slow-zoom"
                    />
                </div>

                <div className="relative text-center max-w-3xl animate-fade-in-up">
                    <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-gray-400 mb-6 block">Nueva Colección 2026</span>
                    <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                        Tecnología que fluye.
                    </h1>
                    <p className="text-lg text-gray-300 font-light italic mb-12 max-w-xl mx-auto">
                        Simplicidad en cada línea, potencia en cada detalle. Descubre la selección exclusiva de AICOR.
                    </p>
                    <button
                        onClick={() => navigate('/shop')}
                        className="px-10 py-4 bg-white text-black text-sm font-bold uppercase tracking-widest rounded-full hover:bg-gray-200 transition-all duration-300 active:scale-95 shadow-2xl"
                    >
                        Explorar Tienda
                    </button>
                </div>
            </section>

            {/* Categorias del home para ir directo a lo que buscas sin dar muchas vueltas*/}
            <section className="container mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-8 min-h-[500px]">
                    {/* Tarjeta grande para portatiles*/}
                    <div
                        onClick={() => navigate('/shop?category=Portátiles')}
                        className="group relative rounded-[3rem] bg-white border border-gray-100 overflow-hidden cursor-pointer h-full min-h-[400px]"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=1926"
                            alt="Portátiles"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-12 flex flex-col justify-end">
                            <h3 className="text-3xl font-bold text-white tracking-tighter">Portátiles</h3>
                            <p className="text-gray-300 font-light italic">Pura potencia allá donde vayas.</p>
                        </div>
                    </div>

                    {/* Columna con las otras dos categorias mas populares*/}
                    <div className="grid gap-8">
                        <div
                            onClick={() => navigate('/shop?category=Móviles')}
                            className="group relative rounded-[3rem] bg-white border border-gray-100 overflow-hidden cursor-pointer min-h-[250px]"
                        >
                            <img
                                src="src\assets\smartphone.jpg" //He puesto esta imagen porque en la web donde busqué las otras no encontré ninguna de smartphone que me cuadrara con las demas
                                alt="Smartphone"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-10 flex flex-col justify-end">
                                <h3 className="text-2xl font-bold text-white tracking-tighter">Smartphone</h3>
                            </div>
                        </div>
                        <div
                            onClick={() => navigate('/shop?category=Audio')}
                            className="group relative rounded-[3rem] bg-white border border-gray-100 overflow-hidden cursor-pointer min-h-[250px]"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=2070"
                                alt="Audio"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-10 flex flex-col justify-end">
                                <h3 className="text-2xl font-bold text-white tracking-tighter">Audio</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Texto filosofia AICOR, plantilla para introducir cualquier eslogan*/}
            <section className="py-32 bg-white border-y border-gray-100 -mx-4 md:-mx-12 px-6 text-center">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-4xl font-bold tracking-tighter text-gray-900 mb-8">Nuestra Filosofía</h2>
                    <p className="text-gray-500 font-light leading-relaxed italic">
                        "Texto de ejemplo"
                    </p>
                </div>
            </section>
        </div>
    );
}
