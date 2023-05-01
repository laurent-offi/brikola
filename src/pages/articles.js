import React, { useState, useEffect } from 'react';

function Articles() {

    const [donnees, setDonnees] = useState(null);

    useEffect(() => {
      async function fetchDonnees() {
        const response = await fetch('http://localhost:7005/api/show_articles');
        const donnees = await response.json();

        console.log(donnees)
        setDonnees(donnees);
      }
      fetchDonnees();
    }, []);

    const Articles = ({ data }) => {
      const [cart, setCart] = useState([]);
    
      const addToCart = (articleToAdd) => {
        const existingArticleIndex = cart.findIndex((article) => article.id === articleToAdd.id);
        if (existingArticleIndex !== -1) {
          const updatedCart = [...cart];
          updatedCart[existingArticleIndex].quantity += 1;
          setCart(updatedCart);
        } else {
          setCart([...cart, { ...articleToAdd, quantity: 1 }]);
        }
      };
    }

    return (
        <div class="container ta-center spacement">
            <h1>Retrouvez tous nos magasins</h1>

            <p>Vous cherchez le magasin le plus près de chez vous ? Cosultez la liste de tous nos magasins installés en France.</p>

            <div>

            {donnees === null ? 
                (
                <p>Chargement en cours...</p>
                ) : 
            (
               <div class="cards-container">
                {data.map((article) => (
                            <div class="article-card" key={article.id} >

                                <div>

                                <h1>{article.article_name}</h1>

                                <h2>Disponible chez : <b>{article.shop_name} (A {article.city_name} )</b></h2>

                                <p class="price">{article.price}€</p>

                                <button onClick={() => addToCart(article)} class="buy">Ajouter au panier</button>

                            </div>

                            </div>
                        ))}
                </div>
            )}        
                

            </div>
           
        </div>
    )
}

export default Articles
