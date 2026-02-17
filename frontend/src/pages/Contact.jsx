import { useEffect } from 'react';

export default function Contact() { //He hecho el formulario con Visme.co, idea de redes sociales de un formulario dinamico y automatizado. 

    // Cargamos el script de Visme a mano porque React no deja meter <script> directamente
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://static-bundles.visme.co/forms/vismeforms-embed.js";
        script.async = true;
        document.body.appendChild(script);

        // Al salir de la pagina, quitamos el script para que no se duplique
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div className="max-w-6xl -mt-20 mx-auto py-20 px-6 animate-fade-in-up">


            {/* Contenedor donde Visme va a meter el formulario */}
            <div
                className="visme_d -mt-[15px] rounded-3xl overflow-hidden shadow-2xl border border-gray-100"
                data-title="Contact Us Contact Form"
                data-url="meqr08oj-contact-us-contact-form?fullPage=true"
                data-domain="forms"
                data-full-page="false"
                data-min-height="600px"
                data-form-id="166955"
            ></div>

            {/* Datos de contacto extras debajo del formulario*/}
            <div className="-mt-20 -mb-20 grid md:grid-cols-3 gap-10 text-center border-t border-gray-100 pt-16">
                <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-2">Email Directo</h4>
                    <p className="text-gray-500 text-sm font-light italic">hola@aicor.com</p>
                </div>
                <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-2">Ubicación</h4>
                    <p className="text-gray-500 text-sm font-light italic">Polígono del Granadal,<br />C. Turquesa, 9, <br />14014 Córdoba, España</p>
                </div>
                <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-2">Horario</h4>
                    <p className="text-gray-500 text-sm font-light italic">L-V: 09:00 - 18:00</p>
                </div>
            </div>
        </div>
    );
}
