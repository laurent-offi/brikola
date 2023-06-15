import React, { useState } from 'react';

function Dashboard()
{
    const [role, setRole] = useState('');
    const [logged, setLogged] = useState(localStorage.getItem('logged_in') === 'true');

    async function CheckButton(event) {

        event.preventDefault();

    }

    if (!logged) {


    } else {

        return (
            <div className="container">

                <h1>Bienvenue dans l'administration</h1>

                <div class="row">

                    <div class="col-4">
                        <div className="admin-section">
                            <li>Gestion des utilisateurs</li>
                            <li>Gestion des articles</li>
                            <li>Gestion des boutiques </li>
                        </div>
                    </div>
                    
                    <div class="col-6">

                        Salut

                    </div>

                </div>

            </div>
            
          );

    }
}

export default Dashboard;