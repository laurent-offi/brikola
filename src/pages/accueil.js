import React, { useState } from 'react';

function Accueil()
{
    const [email, ChangeEmail] = useState('');
    const [password, ChangePassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    async function CheckButton(event) {

        event.preventDefault();

        //donnée a tester par l'api post
        const donnee_a_verifier = { email: email, password: password }

        let response = await fetch("http://localhost:7005/api/connexion_utilisateur",
            {
                method: 'POST',
                headers:
                {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(donnee_a_verifier)
            });

        // analyse si l'api répond
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        // stockage de la réponse
        let result = await response.json();

        if (result.role) {
           
            localStorage.setItem('est_connecter','true')
            localStorage.setItem('role_utilisateur', result.role)
            localStorage.setItem('Id_Etudiant', result.Id_Etudiant)
            localStorage.setItem('Id_Utilisateur', result.Id_Utilisateur)
            window.location.href = "/form1";


        }
        else if (result.role === 'invité') {
            setErrorMessage('Mauvais mot de passe !');
            console.log(result);
        }
    }
    
    return(
        <div class="container"> 
            
            <div class="login-box">

                <div class="box-container">

                <form class="col">
                <label for="email">E-Mail</label>
                <input type="email" id="email" value={email} onChange={(e) => ChangeEmail(e.target.value)}>
                </input>
                <label for="passe">Mot de passe</label>
                {errorMessage && <h2 className="error-message">{errorMessage}</h2>}
                <input type="password" id="passe" value={password} onChange={(e) => ChangePassword(e.target.value)}>
                </input>
                <button onClick={CheckButton}>
                    Connexion
                </button>
                </form>

                </div>

            </div>


        </div>

    )
}

export default Accueil;