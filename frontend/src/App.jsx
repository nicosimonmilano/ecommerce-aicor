import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
// Importaremos las páginas conforme las creemos
// import ProductList from './pages/ProductList'; 
// import Cart from './pages/Cart';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <Navbar />
        <main className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<div className="text-center mt-10"><h1>Catálogo de Productos (Próximamente)</h1></div>} />
            <Route path="/cart" element={<div className="text-center mt-10"><h1>Carrito de Compras (Próximamente)</h1></div>} />
            <Route path="/login" element={<div className="text-center mt-10"><h1>Login (Próximamente)</h1></div>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
