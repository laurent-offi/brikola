import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from './CartContext';

function Menu() {
  const { cart } = useContext(CartContext);
  const numItems = cart ? cart.reduce((total, item) => total + item.quantity, 0) : 0;

  return (
    <div>
      <nav>
        <div className="container sb">
          <ul>
            <li>
              <Link to="/">Accueil</Link>
            </li>
            <li>
              <Link to="/shops">Magasins</Link>
            </li>
            <li>
              <Link to="/articles">Articles</Link>
            </li>
          </ul>
          <div>
            <li><Link to="/cart">Panier</Link> ({numItems})</li>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Menu;