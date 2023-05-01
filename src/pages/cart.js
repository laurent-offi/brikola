import React, { useState, useEffect } from 'react';

function Cart()
{

    const [donnees, setDonnees] = useState(null);

    useEffect(() => {
      async function fetchDonnees() {
        const response = await fetch('http://localhost:7005/api/show_cart');
        const donnees = await response.json();

        console.log(donnees)
        setDonnees(donnees);
      }
      fetchDonnees();
    }, []);


    const Cart = () => {
        const [cart, setCart] = useState([]);
      
        useEffect(() => {
          const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
          setCart(savedCart);
        }, []);
      
        const removeFromCart = (articleId) => {
          const updatedCart = cart.filter((article) => article.id !== articleId);
          setCart(updatedCart);
          localStorage.setItem('cart', JSON.stringify(updatedCart));
        };
      
        const calculateTotalPrice = () => {
          return cart.reduce((total, article) => {
            return total + article.totalPrice;
          }, 0);
        };
    }
    
    return(
        <div class="container"> 

        <div class="row">

            <div class="col-7">
            
            <div class="box">

                    <h1>Panier</h1>

                    <hr/>

                    <ul class="cart">
                    {cart.map((item, index) => (
                    <div key={index}>
                        <h2>{item.article_name}</h2>
                        <p>Disponible chez : <b>{item.shop_name} (A {item.city_name})</b></p>
                        <p>Prix unitaire : {item.price}€</p>
                        <button onClick={() => removeFromCart(article.id)}>Retirer du panier</button>
                    </div>
                    ))}
                    </ul>

            </div>

            </div>

            <div class="col-3">

            <div class="box">
            {cart.map((item, index) => (
                <p>Prix total : {calculateTotalPrice()}€</p>
            ))}

                <button class="buy">Passer à la caisse</button>

                </div>

            </div>

            </div>

        </div>

    )
}

export default Cart;