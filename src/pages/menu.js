import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from './CartContext';

function Menu() {
  const { cart } = useContext(CartContext);
  const numItems = cart ? cart.reduce((total, item) => total + item.quantity, 0) : 0;
  const [logged, setLogged] = useState(localStorage.getItem('logged_in') === 'true');
  const [admin, setAdmin] = useState(localStorage.getItem('userRole') === 'Admin');

  const [showDropdown, setShowDropdown] = useState(false);

  function logout(){
    localStorage.removeItem('logged_in')
    setLogged(false)
  }
  
    const toggleDropdown = () => {
      setShowDropdown(!showDropdown);
    };

  if (logged) {

    return (
      <div>
        <nav>
          <div className="container sb">
            <ul>
              <li>
                <Link to="/shops">Magasins</Link>
              </li>
              <li>
                <Link to="/articles">Articles</Link>
              </li>
            </ul>
            <div>
              <ul>
                <li>
                  <Link to="/cart">Panier</Link> (<b>{numItems}</b>)
                </li>
                <li>
                  <div className="dropdown">
                    <button className="dropdown-toggle" onClick={toggleDropdown}>
                      Mon compte
                    </button>
                    {showDropdown && (
                      <div className="dropdown-menu">
                        {admin && (
                          <Link to="/dashboard">Administration</Link>
                          )}
                          {admin && (
                            <hr/>
                          )}
                        <Link to="/" onClick={logout}>
                          Déconnexion
                        </Link>
                      </div>
                    )}
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );

  } else {
    return (
      <div>
        <nav>
          <div className="container sb">
            <ul>
              <li>
                <Link to="/">Se connecter</Link>
              </li>
              <li>
                <Link to="/shops">Magasins</Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );

  }
}

export default Menu;