import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import { CartProvider } from './context/CartContext';
import ProductList from './components/ProductList';
import Cart from './pages/Cart';
import WhatsAppButton from './components/WhatsAppButton'; {/*Boton de whatsapp*/}
import ShopAssistant from './components/ShopAssistant'; {/*Boton de "chatbot" para dudas frecuentes*/}

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50 text-gray-900">
          <Navbar />
          <main className="container mx-auto p-4">
            <Routes>
              <Route path="/" element={<ProductList />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<div className="text-center mt-10"><h1>Login (Próximamente)</h1></div>} />
            </Routes>
          </main>
          <WhatsAppButton />
          <ShopAssistant />
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
