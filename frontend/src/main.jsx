import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css' // Importa los estilos de Tailwind y CSS Global
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
