import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Menu from './pages/menu';
import Accueil from './pages/accueil';
import Shops from './pages/shops';
import Articles from './pages/articles';
import Profils from './pages/profil';
import Cart from './pages/cart';
import { CartContext, CartProvider } from './pages/CartContext';

function App() {
  const [logged, setLogged] = useState(localStorage.getItem('logged_in') === 'true');

  return (
    <Router>
      <CartProvider>
        <div>
          <Menu />
          <Routes>
            <Route path="/shops" element={<Shops />} />
            {logged && <Route path="/articles" element={<Articles />} />}
            {logged && <Route path="/cart" element={<Cart />} />}
            <Route path="/accueil" element={<Accueil />} />
            <Route path="/" element={<Accueil />} />
          </Routes>
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;