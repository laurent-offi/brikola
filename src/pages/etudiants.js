import React, { useState, useEffect } from 'react';
import Notes from './notes';

function Etudiants () {

    const [donnees, setDonnees] = useState(null);

    const [prof] = useState(localStorage.getItem('role_utilisateur') === 'prof');
    const [Id_Etudiant] = useState(localStorage.getItem('Id_Etudiant'));
  
 
    useEffect(() => {
      async function fetchDonnees() {
        alert(Id_Etudiant)
        let URL = 'http://localhost:7005/api/affiche_etudiants'
        if (!prof) {
                   URL=`http://localhost:7005/api/etudiant/${Id_Etudiant}`
        }
        
            const response = await fetch(URL);

            const donnees = await response.json();

            setDonnees(donnees);

        
                   
      }
      fetchDonnees();
    }, []);

    


  
    return (
        <div> yo


        {donnees === null ? 
        (
        <p>Chargement en cours...</p>
        ) : 
      (
        <table>
          {donnees.map((element, index) => (
                    <tr  key={index}>
                        <td>{element.nom}</td>
                        <td>{element.prenom}</td>
                        <td>{element.age}</td>
                        <td>{element.photo}</td>
                        <td><Notes id={element.Id_Etudiant} /></td>
                    </tr>
                ))}
        </table>
      )}        
          
            
        </div>
    )
}

export default Etudiants