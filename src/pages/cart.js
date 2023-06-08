import React, { useContext, useEffect } from 'react';
import { CartContext } from './CartContext';

function Cart() {
  const { cart, removeFromCart } = useContext(CartContext);

  useEffect(() => {
    // Ajoutez ici votre logique pour mettre à jour le panier en temps réel
  }, [cart]);

  const calculateTotalPrice = () => {
    if (!Array.isArray(cart)) {
      return 0;
    }

    return cart.reduce((total, item) => {
      return total + item.totalPrice;
    }, 0);
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
                  <div key={index}>
                    <h2>{item.article_name}</h2>
                    <p>
                      Disponible chez : <b>{item.shop_name} (A {item.city_name})</b>
                    </p>
                    <p>Prix unitaire : {item.price}€</p>
                    <button onClick={() => removeFromCart(item.id)}>Retirer du panier</button>
                  </div>
                ))}
              </ul>
            ) : (
              <p>Votre panier est vide.</p>
            )}
          </div>
        </div>
        <div className="col-3">
          <div className="box">
            <p>Prix total : {calculateTotalPrice()}€</p>
            <button className="buy">Passer à la caisse</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;