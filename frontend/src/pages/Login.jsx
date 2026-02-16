import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { jwtDecode } from 'jwt-decode';

export default function Login() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const handleSuccess = (credentialResponse) => {
        // Decodificamos el token de Google para sacar los datos del usuario
        const userData = jwtDecode(credentialResponse.credential);
        console.log("Datos del usuario:", userData);

        // Guardamos los datos en localStorage para usarlos en el perfil
        localStorage.setItem('user_logged_in', 'true');
        localStorage.setItem('user_data', JSON.stringify({
            name: userData.name,
            email: userData.email,
            picture: userData.picture
        }));

        navigate('/');
    };

    const handleError = () => {
        console.log("Login Failed");
        setError("Hubo un problema al iniciar sesión. Inténtalo de nuevo.");
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-6">
            <div className="w-full max-w-md bg-white p-12 rounded-[2.5rem] border border-gray-100 shadow-2xl animate-fade-in-up">
                <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-6">A</div>
                    <h1 className="text-3xl font-bold tracking-tighter text-gray-900 mb-2">Bienvenido a AICOR</h1>
                    <p className="text-gray-500 font-light italic">Accede a tu cuenta </p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm rounded-2xl border border-red-100 text-center animate-shake">
                        {error}
                    </div>
                )}

                <div className="space-y-6">
                    <div className="flex justify-center">
                        <GoogleLogin
                            onSuccess={handleSuccess}
                            onError={handleError}
                            useOneTap
                            theme="outline"
                            size="large"
                            shape="pill"
                            width="100%"
                            text="continue_with"
                        />
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-100"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase tracking-widest">
                            <span className="bg-white px-4 text-gray-400">O accede como invitado</span>
                        </div>
                    </div>

                    <button
                        onClick={() => navigate('/')}
                        className="w-full py-4 text-sm font-medium text-gray-600 hover:text-black transition-colors border border-gray-100 rounded-full hover:bg-gray-50"
                    >
                        Seguir explorando la tienda
                    </button>
                </div>

                <p className="mt-12 text-center text-[10px] text-gray-400 uppercase tracking-widest leading-relaxed">
                    Al continuar, aceptas nuestros <br />
                    <span className="underline cursor-pointer hover:text-black">Términos de Servicio</span> y <span className="underline cursor-pointer hover:text-black">Privacidad</span>.
                </p>
            </div>
        </div>
    );
}
