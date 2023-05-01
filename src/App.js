import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Menu from './pages/menu';
import Connexion from './pages/connexion';
import Accueil from './pages/accueil';
import Shops from './pages/shops';
import Articles from './pages/articles';
import Profils from './pages/profil';
import Cart from './pages/cart';

function App() {

  const [connecter, setConnecter] = useState(localStorage.getItem('est_connecter') === 'true');
  const [prof, setProf] = useState(localStorage.getItem('role_utilisateur') === 'prof');

  return (
   <Router>
    <div>
    <Menu />
      
        <Routes>
        <Route path='/shops' element={<Shops/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/articles' element={<Articles/>} />
            <Route path="/connexion" element={<Connexion/>} />
            {connecter && prof && <Route path='/profils' element={<Profils/>}/>}
            <Route path='/accueil' element={<Accueil/>} />
            <Route path='/' element={<Accueil/>} />
        </Routes> 
       
    </div>
    </Router>
  );
}

export default App;