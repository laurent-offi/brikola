import React, { useState } from 'react';

function Accueil()
{
    const [email, ChangeEmail] = useState('');
    const [password, ChangePassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [role, setRole] = useState('');
    const [logged, setLogged] = useState(localStorage.getItem('logged_in') === 'true');

    async function CheckButton(event) {

        event.preventDefault();

        //donnée a tester par l'api post
        const data_verify = { email: email, password: password }

        let response = await fetch("http://localhost:7005/api/user_login",
            {
                method: 'POST',
                headers:
                {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data_verify)
            });

        // analyse si l'api répond
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        // stockage de la réponse
        let result = await response.json();

        if (result.role != "Invité") {
           
            localStorage.setItem('logged_in','true')
            localStorage.setItem('userRole', result.role)
            localStorage.setItem('username', result.username)
            localStorage.setItem('id', result.id)
            window.location.href = "/shops";
        }
        else {
            setErrorMessage('Mauvaise adresse email ou mauvais mot de passe !');
        }
    }

    if (!logged) {
    
    return(
        <div class="container"> 
            
            <div class="login-box">

                <div class="box-container">

                <form class="col">
                {errorMessage && <p className="error-message">{errorMessage}</p>}

                <label for="email">E-Mail</label>
                <input type="email" id="email" value={email} onChange={(e) => ChangeEmail(e.target.value)}>
                </input>
                <label for="password">Mot de passe</label>
                <input type="password" id="password" value={password} onChange={(e) => ChangePassword(e.target.value)}>
                </input>
                <button onClick={CheckButton}>
                    Se connecter
                </button>
                </form>

                </div>

            </div>


        </div>
    )

    } else {

        return(
            <div class="container"> 
                
                <h1>Vous êtes déjà connecté.</h1>
    
            </div>
        )

    }
}

export default Accueil;