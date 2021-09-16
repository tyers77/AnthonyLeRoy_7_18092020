const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("../middleware/auth");
const { Op } = require("sequelize");
const sanitize = require("mongo-sanitize"); //nettoyeur permet de sécurisé les requètes

exports.create = (req, res, next) => {
  let newuser;
  let email = sanitize(req.body.mail);
  let pseudo = sanitize(req.body.pseudo);
  let password = sanitize(req.body.password);
  console.log("tentative de creation " + req.body.mail);
  db.User.findOne({
    where: { email: req.body.mail },
  }).then((user) => {
    if (user) {
      return res.status(404).json({ error: "utilisateur existant" });
    }
    bcrypt.hash(password, 10).then((hash) => {
      newuser = db.User.create({
        email,
        pseudo,
        password: hash,
        isAdmin: 0,
      })
        .then((newuser) => {
          res.status(201).json({ message: "Utilisateur " + newuser.pseudo });
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message || "Error created new user.",
          });
        });
    });
  });
};

// Login user
exports.login = async (req, res, next) => {
  let user;
  const pseudo = sanitize(req.body.pseudo);
  const password = sanitize(req.body.password);

  try {
    if (!pseudo || !password) {
      return res.status(400).json({ error: "information manquantes" });
    }
    user = await db.User.findOne({ where: { pseudo: pseudo } });
    if (!user) {
      return res.status(404).json({ error: "utilisateur inconnu" });
    }

    const token = jwt.generateTokenForUser(user);
    return res.status(200).json({ token, message: "Bonjour " + pseudo });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//récupération de l'utilisateur
exports.searchUser = (req, res, next) => {
  let id = jwt.getUserId(req);
  db.User.findOne({
    attributes: ["pseudo", "email", "id"],
    where: {
      id: id,
    },
  })
    .then((user) => res.status(200).json([user]))
    .catch((error) => res.status(400).json({ error: error.message }));
};

//userlist
exports.getAllUser = async (req, res) => {
  let id = jwt.getUserId(req);
  if (!id) {
    return res.redirect("/connexion");
  }
  db.User.findAll({
    order: [["id", "DESC"]],
    attributes: ["pseudo", "email"],
  })
    .then((jsonUsers) => {
      res.status(200).json(jsonUsers);
    })
    .catch((error) => {
      res.status(404).json({ error: error.message });
    });
};

// Deleted user
exports.delete = async (req, res, next) => {
  try {
    let UserId = jwt.getUserId(req);
    let User = await db.User.findOne({ where: { id: UserId } });
    if (!User) {
      return res.status(404).json({ error: "utilisateur inexistant" });
    }
    if (User.id == UserId) {
      await User.destroy();
      return res
        .status(200)
        .json({ message: " Compte supprimé par l'utiisateur" });
    }
    if (User.isAdmin) {
      await User.destroy();
      return res
        .status(200)
        .json({ message: "compte supprimé par l'administarteur" });
    }

    return res
      .status(403)
      .json({ error: "vous n'êtes pas autorisé a supprimé ce compte" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
