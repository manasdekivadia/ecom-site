import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { CartProvider } from './context/CartContext.jsx';


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <SnackbarProvider>
      <CartProvider>
      <App />
      </CartProvider>
    </SnackbarProvider>
  </BrowserRouter>,
)
