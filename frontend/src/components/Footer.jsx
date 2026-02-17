export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-100 pt-16 pb-8 mt-auto">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Columna 1: Info de la marca */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white font-bold text-lg">A</div>
                            <span className="text-xl font-bold tracking-tighter">AICOR.</span>
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed font-light">
                            Elevando tu experiencia tecnológica con hardware premium y soporte experto. Innovación en cada detalle.
                        </p>
                    </div>

                    {/* Columna 2: Tienda */}
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-black mb-6">Explorar</h4>
                        <ul className="space-y-3 text-sm text-gray-500 font-light">
                            <li><a href="/" className="hover:text-black transition-colors">Inicio</a></li>
                            <li><a href="/cart" className="hover:text-black transition-colors">Mi Carrito</a></li>
                            <li><a href="/contact" className="hover:text-black transition-colors">Contacto</a></li>
                        </ul>
                    </div>

                    {/* Columna 3: Ayuda */}
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-black mb-6">Ayuda</h4>
                        <ul className="space-y-3 text-sm text-gray-500 font-light">
                            <li><a href="/contact" className="hover:text-black transition-colors">Soporte Técnico</a></li>
                            <li><a href="#" className="hover:text-black transition-colors">Envíos y Devoluciones</a></li>
                            <li><a href="#" className="hover:text-black transition-colors">Privacidad</a></li>
                            <li><a href="#" className="hover:text-black transition-colors">Términos</a></li>
                        </ul>
                    </div>

                    {/* Columna 4: Conecta */}
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-black mb-6">Conecta</h4>
                        <div className="flex gap-4 mb-8">
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform duration-300">
                                <img src="https://img.icons8.com/?size=100&id=Xy10Jcu1L2Su&format=png&color=000000" alt="Instagram" className="w-8 h-8" />
                            </a>
                            <a href="https://X.com" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform duration-300">
                                <img src="https://img.icons8.com/?size=100&id=phOKFKYpe00C&format=png&color=000000" alt="X" className="w-8 h-8" />
                            </a>
                        </div>
                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-black mb-6">Métodos de pago</h4>
                        <div className="flex gap-4 ">
                            <img src="https://img.icons8.com/color/48/visa.png" alt="Visa" className="h-6" />
                            <img src="https://img.icons8.com/color/48/mastercard.png" alt="Mastercard" className="h-6" />
                            <img src="https://img.icons8.com/color/48/paypal.png" alt="Paypal" className="h-6" />
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-400 text-[10px] uppercase tracking-[0.2em] order-2 md:order-1 ml-20" >
                        © {new Date().getFullYear()} AICOR. TODOS LOS DERECHOS RESERVADOS.
                    </p>
                    <div className=" flex gap-6 order-1 md:order-3">
                        <span className="text-gray-300 text-[10px] uppercase tracking-widest hover:text-black cursor-pointer transition-colors flex gap-6 md:order-2 mr-20">Aviso Legal</span>
                        <span className="text-gray-300 text-[10px] uppercase tracking-widest hover:text-black cursor-pointer transition-colors">Cookies</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
