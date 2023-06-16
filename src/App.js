import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Menu from './pages/menu';
import Accueil from './pages/accueil';
import Shops from './pages/shops';
import Articles from './pages/articles';
import Profils from './pages/profil';
import Cart from './pages/cart';
import Dashboard from './pages/dashboard';
import Register from './pages/register';
import { CartContext, CartProvider } from './pages/CartContext';

function App() {
  const [logged, setLogged] = useState(localStorage.getItem('logged_in') === 'true');
  const [admin, setAdmin] = useState(localStorage.getItem('userRole') === 'Admin');

  return (
    <Router>
      <CartProvider>
        <div>
          <Menu />
          <Routes>
            <Route path="/shops" element={<Shops />} />
            {logged && <Route path="/articles" element={<Articles />} />}
            {logged && <Route path="/cart" element={<Cart />} />}
            {logged && admin && <Route path="/dashboard" element={<Dashboard />} />}
            {!logged && <Route path="/accueil" element={<Accueil />} />}
            {!logged && <Route path="/register" element={<Register />} />}
            && <Route path="/" element={<Accueil />} />
          </Routes>
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;