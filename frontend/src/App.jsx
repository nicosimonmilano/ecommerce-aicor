import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import { CartProvider } from './context/CartContext';
import ProductList from './components/ProductList';
import Cart from './pages/Cart';
import WhatsAppButton from './components/WhatsAppButton'; {/*Boton de whatsapp*/ }
import ShopAssistant from './components/ShopAssistant'; {/*Boton de "chatbot" para dudas frecuentes*/ }
import Footer from './components/Footer';

import { GoogleOAuthProvider } from '@react-oauth/google';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Orders from './pages/Orders';

function App() {
  const GOOGLE_CLIENT_ID = "821803811027-sb5hrhophg083mopmenfuc1q12a10c7t.apps.googleusercontent.com"; // Aquí va el ID de Google Cloud que se nos proporciona al crear el cliente

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