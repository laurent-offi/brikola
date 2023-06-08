// REQUIRE ET APPELS DE MODULES D'IMPORTATION
const sql = require('mysql2/promise');
const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv')

//CONSTRUCTION DE MON PORT, MON ENVIRONNEMENT
const port = 7005;
dotenv.config();

// Ajouter le middleware cookie-parser à mon application Express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Activer les requêtes CORS
app.use(cors({
  origin: `http://localhost:3000`,
  methods: 'GET, POST, PUT, DELETE, OPTIONS',
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  credentials: true
}));


const config = require('./configuration/configuration.json');
console.log(config);
const pool_connexion = sql.createPool(config);


const connexion_utilisateur_async = async (req, res) => {
  await connexion_utilisateur(req, res);
}

const show_cart_async = async (req, res) => {
  await show_cart(req, res);
};

const show_shops_async = async (req, res) => {
  await show_shops(req, res);
};


const show_articles_async = async (req, res) => {
  await show_articles(req, res);
}


async function connexion_utilisateur(req, res) {
  try {
    const { email, password } = req.body;
    // Contrôle avec un select
    // Ici on suppose que les informations de connexion sont stockées en base de données
    const [utilisateur] = await pool_connexion.query(
      'SELECT * FROM users WHERE email = ? AND password = ?',
      [email, password]
    );

    // Renvoi le rôle ou “invité”
    const role = utilisateur.length === 1 ?
      { role: utilisateur[0].role, username: utilisateur[0].id, id:utilisateur[0].id }
      : { role: 'invité', id: -1, id: -1 };

    res.json(role);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Impossible de se connecter à la base de données' });
  }
}


async function show_shops(req, res) {
  try {
    const [rows] = await pool_connexion.query(`
      SELECT shops.*, city.city_name AS city_name FROM shops
      LEFT JOIN city ON shops.city = city_id
    `);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Impossible de se connecter à la base de données' });
  }
}

async function show_articles(req, res) {
  try {
    const [rows] = await pool_connexion.query(`
    SELECT articles.*, shops.shop_name AS shop_name, city.city_name AS city_name FROM articles
    LEFT JOIN shops ON articles.id_shop = shops.shop_id
    LEFT JOIN city ON shops.city = city.city_id
    `);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Impossible de se connecter à la base de données' });
  }
}

async function show_cart(req, res) {
  try {
    // Return the cart data from localStorage
    const cartData = JSON.parse(localStorage.getItem('cart')) || [];
    res.json(cartData);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'An error occurred while fetching the cart data' });
  }
}

app.post('/api/connexion_utilisateur', connexion_utilisateur_async)
app.get('/api/show_shops', show_shops_async);
app.get('/api/show_articles', show_articles_async);
app.get('/api/show_cart', show_cart_async);

// Lecture du port et du serveur

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})
