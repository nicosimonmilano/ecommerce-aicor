import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Profile() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const data = localStorage.getItem('user_data');
        if (data) {
            setUser(JSON.parse(data));
        } else {
            navigate('/login');
        }
    }, [navigate]);

    if (!user) return null;

    return (
        <div className="max-w-4xl mx-auto py-20 px-6 animate-fade-in-up">
            <h1 className="text-4xl font-bold tracking-tighter mb-12">Mi Perfil</h1>

            <div className="grid md:grid-cols-[200px_1fr] gap-12 items-start">
                

                {/* Datos limpios */}
                <div className="space-y-8">
                    <div>
                        <label className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold block mb-2">Nombre completo</label>
                        <p className="text-xl text-gray-900 font-medium">{user.name}</p>
                    </div>

                    <div>
                        <label className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold block mb-2">Correo electrónico</label>
                        <p className="text-xl text-gray-900 font-medium">{user.email}</p>
                    </div>
                
                    <div className="pt-8 border-t border-gray-100 flex gap-4">
                        <button
                            onClick={() => navigate('/')}
                            className="px-8 py-3 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-all"
                        >
                            Ir a comprar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
