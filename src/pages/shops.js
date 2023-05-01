
import React, { useState, useEffect } from 'react';

function Shops() {

    const [donnees, setDonnees] = useState(null);

    useEffect(() => {
      async function fetchDonnees() {
        const response = await fetch('http://localhost:7005/api/show_shops');
        const donnees = await response.json();

        console.log(donnees)
        setDonnees(donnees);
      }
      fetchDonnees();
    }, []);


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
                {donnees.map((element, index) => (
                            <div class="card" key={index}>

                                <div>

                                <h1>{element.shop_name} - {element.city_name}</h1>

                                <h2>Horaires :</h2>

                                    <ul>
                                        <li>Lundi : 09:00 - 20:00</li>
                                        <li>Mardi : 09:00 - 20:00</li>
                                        <li>Mercredi : 09:00 - 20:00</li>
                                        <li>Jeudi : 09:00 - 20:00</li>
                                        <li>Vendredi : 09:00 - 20:00</li>
                                        <li>Samedi : 09:00 - 20:00</li>
                                        <li>Dimanche : 09:00 - 18:00</li>
                                    </ul>


                                <h2>Coordonnées :</h2>

                                <p>{element.shop_address}</p>

                            </div>

                            </div>
                        ))}
                </div>
            )}        
                

            </div>
           
        </div>
    )
}

export default Shops
