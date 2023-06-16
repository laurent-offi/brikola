import React, { useState, useEffect } from 'react';

function Register() {
    const [username, ChangeUsername] = useState('');
    const [email, ChangeEmail] = useState('');
    const [password, ChangePassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [role, setRole] = useState('');
    const [cities, setCities] = useState([]); // État pour stocker les villes
    const [selectedCity, setSelectedCity] = useState('');
    const [logged, setLogged] = useState(localStorage.getItem('logged_in') === 'true');

    async function CheckButton(event) {

        event.preventDefault();

        //donnée a tester par l'api post
        const data_verify = { username: username, email: email, password: password }

        let response = await fetch("http://localhost:7005/api/user_register",
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

        if (cities.length === 0) {
            console.error("Les données des villes ne sont pas encore disponibles.");
            return;
          }

        if (!selectedCity) {
            console.error("Veuillez sélectionner une ville.");
            return;
        }
        
          const selectedCityId = cities.find(city => city.city_name === selectedCity)?.city_id;
        
    }

    useEffect(() => {
        async function fetchCities() {
            try {
                const response = await fetch('http://localhost:7005/api/show_cities');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const citiesData = await response.json();
                setCities(citiesData);
            } catch (error) {
                console.error(error);
            }
        }

        fetchCities();
    }, []);

    if (!logged) {

        return (
            <div class="container">

                <div class="login-box">

                    <div class="box-container">

                        <form class="col">
                            {errorMessage && <p className="error-message">{errorMessage}</p>}

                            <label for="username">Nom d'utilisateur</label>
                            <input type="username" id="username" value={username} onChange={(e) => ChangeUsername(e.target.value)}></input>
                            <label for="email">E-Mail</label>
                            <input type="email" id="email" value={email} onChange={(e) => ChangeEmail(e.target.value)}></input>
                            <label for="password">Mot de passe</label>
                            <input type="password" id="password" value={password} onChange={(e) => ChangePassword(e.target.value)}></input>

                            <label htmlFor="city">Ville</label>
                            <select id="city" value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
                                <option value="">Sélectionner une ville</option>
                                {cities.map(city => (
                                    <option key={city.city_id} value={city.city_name}>{city.city_name}</option>
                                ))}
                            </select>

                            <button onClick={CheckButton}>S'inscrire</button>
                        </form>

                    </div>

                </div>


            </div>
        )

    } else {

        return (
            <div class="container">

                <h1>Vous êtes déjà connecté.</h1>

            </div>
        )

    }
}

export default Register;