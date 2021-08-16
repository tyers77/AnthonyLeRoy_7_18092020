const db = require('../models')
const bcrypt = require('bcrypt');
const jwt = require('../middleware/auth');


exports.create = (req, res,next) => {
  console.log("tentative de creation " + req.body.mail)
db.User.findOne({
    where: { email: req.body.mail },
  })
    .then((user) => {
      if (user) {
        return res.status(404).json({ error:"utilisateur existant" });
      }
      bcrypt.hash(req.body.password, 10)
      .then(hash => {
        console.log("req.body.email "+ req.body.mail ) 
        const newuser = db.User.create ({
          email: req.body.mail,
          pseudo: req.body.pseudo,
          password: hash,
          admin: 0
        })
        .then(newuser => {
          res.status(201).json({message: "Utilisateur créé avec l'id " + newuser.userId});
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Error created new user."
          });
        });
      }
    )}
    )};
 
  // Login user
  exports.login = async (req, res, next) => {
    
    try{
      const mail = req.body.mail;
      const password = req.body.password;
      if(!mail || !password){
        return res.status(400).json({error:"information manquantes"})
      }
      const user = await db.User.findOne({ where: { email: mail }})
      if(!user){
        return res.status(404).json({error:"utilisateur inconnu"})
      }
      const token = await jwt.generateTokenForUser(user);
      console.log("token genere")
      res.status(201).json({
      token,
      message:"bonjour vous êtes connecté"
      })
    }
    catch(error){return res.status(500).json({error : "erreur token non generé"})}
    
   /*db.User.findOne({ where: { email: req.body.mail }})
      .then(user => {
        console.log("utilisateur trouvé");
        if (!user) {console.log('mail not find')
          return res.status(404).json({ error: 'Mail or password not found.' });
        }
        bcrypt.compare(req.body.password, user.password)
        .then(valid => { 
          console.log("then valid"+ valid)
          if (!valid) {console.log('password not valid ')
            return res.status(404).json({ error: 'Mail or password wrong.' });
          }
          const token =  jwt.generateTokenForUser(user);
          console.log("token genere")
          res.status(201).json({
          token,
          message:"bonjour vous êtes connecté"
           
          });
        })
          .catch(error => res.status(500).json({ error }));
     })
      .catch(error => res.status(500).json({ error }));*/
  };
  

// Deleted user
exports.delete = (req, res, next) => {
  let userId = req.headers.authorization.split(' ')[3];
  let profil_user = req.headers.authorization.split(' ')[2];
  User.findOne({ where: { id: req.params.id } })
    .then(user => {
      if (user.id == userId) {
        User.destroy({ where: { id: req.params.id } })
        res.status(200).json({
          message: 'User deleted.',
        });
      } else {
        if (profil_user == 1) {
          User.destroy({ where: { id: req.params.id } })
          res.status(200).json({
            message: 'User deleted.',
          });
        }
    }
    })
    .catch(error => res.status(500).json({ error }));
};


/*exports.searchuser = (req, res, next) => {
  User.findAll({})
    .then(user => {
        let list = {id: user.id, firstname: user.firstname, lastname: user.lastname, avatar: user.avatar};
        res.status(200).json(user);
      })
    .catch(error => res.status(500).json({ error }));
};*/
