import React, { useState, useEffect, useContext } from 'react';


function Articles() {
  const [donnees, setDonnees] = useState(null);
  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function fetchDonnees() {
      const response = await fetch('http://localhost:7005/api/show_articles');
      const donnees = await response.json();

      console.log(donnees);
      setDonnees(donnees);
    }
    fetchDonnees();
  }, []);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);

  const addToCart = (articleToAdd) => {
    const existingArticle = cart.find((article) => article.id === articleToAdd.id);
  
    if (existingArticle) {
      const updatedCart = cart.map((article) => {
        if (article.id === articleToAdd.id) {
          return { ...article, quantity: article.quantity + 1 };
        }
        return article;
      });
  
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    } else {
      const updatedCart = [...cart, { ...articleToAdd, quantity: 1 }];
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  
    const articleName = articleToAdd.article_name;
    const message = `L'article "${articleName}" a bien été ajouté au panier !`;
    setMessage(message);
  };
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <div className="container ta-center spacement">
      <h1>Retrouvez tous nos magasins</h1>
      <p>Vous cherchez le magasin le plus près de chez vous ? Consultez la liste de tous nos magasins installés en France.</p>
      <div>

        {message && <p class="success">{message}</p>}

        {donnees === null ? (
          <p>Chargement en cours...</p>
        ) : (
          <div className="cards-container">
            {donnees.map((article) => (
              <div className="article-card" key={article.id}>
                <div>
                  <h1>{article.article_name}</h1>
                  <h2>Disponible chez : <b>{article.shop_name} (A {article.city_name})</b></h2>
                  <p className="price">{article.price}€</p>
                  <button onClick={() => addToCart(article)} className="buy">Ajouter au panier</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Articles;