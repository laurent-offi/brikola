import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Récupérer le panier depuis le localStorage (si nécessaire)
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Mettre à jour le panier dans le localStorage et le contexte
  const updateCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Ajouter un article au panier
  const addToCart = (articleToAdd) => {
    const existingArticleIndex = cart.findIndex((article) => article.id === articleToAdd.id);
    if (existingArticleIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingArticleIndex].quantity += 1;
      updateCart(updatedCart);
    } else {
      const updatedCart = [...cart, { ...articleToAdd, quantity: 1 }];
      updateCart(updatedCart);
    }
  };

  // Supprimer un article du panier
  const removeFromCart = (articleId) => {
    const updatedCart = cart.filter((item) => item.id !== articleId);
    updateCart(updatedCart);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};