import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import { CartProvider } from './context/CartContext';
import ProductList from './components/ProductList';
import Cart from './pages/Cart';
import WhatsAppButton from './components/WhatsAppButton'; {/*Boton de whatsapp*/ }
import ShopAssistant from './components/ShopAssistant'; {/*Boton de "chatbot" para dudas frecuentes*/ }
import Footer from './components/Footer';

import { GoogleOAuthProvider } from '@react-oauth/google'; // Uso este método de autenticación con Google porque así saltamos el paso de tener laravel de intermediario con react, lo hacemos todo a traves del frontend.
import Login from './pages/Login';
import Profile from './pages/Profile';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Orders from './pages/Orders';
import Loading from './pages/Loading';
import { useState, useEffect } from 'react';

function App() {
  const GOOGLE_CLIENT_ID = "821803811027-sb5hrhophg083mopmenfuc1q12a10c7t.apps.googleusercontent.com"; // Esto lo scaamos de google cloud (parte donde creas un proyecto, pantalla de consentimiento...)

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulamos una carga inicial de 2 segundos
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <CartProvider>
        <BrowserRouter>
          <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
            <Navbar />
            <main className="flex-1 container mx-auto p-4 md:p-12 mt-20">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<ProductList />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/orders" element={<Orders />} />

              </Routes>
            </main>
            <Footer />
            <WhatsAppButton />
            <ShopAssistant />
          </div>
        </BrowserRouter>
      </CartProvider>
    </GoogleOAuthProvider>
  );
}

export default App;