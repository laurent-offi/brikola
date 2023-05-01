import React, { useState, useEffect } from 'react';

function Profils () {

    const [donnees, setDonnees] = useState(null);
 
    useEffect(() => {
      async function fetchDonnees() {
        const response = await fetch('http://localhost:7005/api/affiche_utilisateurs');
        const donnees = await response.json();

        console.log(donnees)
        setDonnees(donnees);
      }
      fetchDonnees();
    }, []);

    


  
    return (
        <div>hey


        {donnees === null ? 
        (
        <p>Chargement en cours...</p>
        ) : 
      (
        <table>
          {donnees.map((element, index) => (
                    <tr  key={index}>
                        <td>{element.email}</td>
                        <td>{element.role}</td>
                    </tr>
                ))}
        </table>
      )}        
          
            
        </div>
    )
}

export default Profils