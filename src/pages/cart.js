import React, { useContext, useEffect } from 'react';
import { CartContext } from './CartContext';

function Cart() {
  const { cart, removeFromCart } = useContext(CartContext);

  useEffect(() => {
  }, [cart]);

  const calculateTotalPrice = () => {
    if (!Array.isArray(cart)) {
      return 0;
    }

    return cart.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);

  }

  const renderCalcContent = () => {
    let buttonContent;
    if (calculateTotalPrice() > 0) {
      buttonContent = (
        <>
          <p>Prix total : <b>{calculateTotalPrice()}€</b></p>
          <button className="buy">Passer à la caisse</button>
        </>
      );
    } else {
      buttonContent = (
        <div className="error-calcul">Veuillez ajouter un article au panier.</div>
      );
    }
    return buttonContent;
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-7">
          <div className="box">
            <h1>Panier</h1>
            <hr />
            {Array.isArray(cart) && cart.length > 0 ? (
              <ul className="cart">
                {cart.map((item, index) => (
                  <li key={index}>
                    <h2>{item.article_name}</h2>
                    <p>
                      Disponible chez : <b>{item.shop_name} (A {item.city_name})</b>
                    </p>
                    <p>Prix unitaire : {item.price}€</p>
                    <p>Quantité : {item.quantity}</p>
                    <button onClick={() => removeFromCart(index)}>Retirer du panier</button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Votre panier est vide.</p>
            )}
          </div>
        </div>
        <div className="col-3">
          <div className="box">
            {renderCalcContent()}

          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;