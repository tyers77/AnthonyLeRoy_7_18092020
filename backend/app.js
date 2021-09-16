const express = require("express"); //importation de Express
const Sequelize  = require('sequelize');
const helmet = require("helmet");//sécurisation de l'API en définissant des en tête http
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const commentRoutes = require("./routes/comment");
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const sanitize = require("sanitize");
require('dotenv').config();

/**middleware qui intègre les headers pour autorisés les requètes bloquées par CORS */
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.json());//récupération au format JSON
app.use(helmet());
app.use(sanitize.middleware);
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
//app.use("/api/comment", commentRoutes);

module.exports = app;//export la fonction app vers le fichier server.js