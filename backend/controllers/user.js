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
      res.status(201).json({
      token,
      message:"Bonjour vous êtes connecté",

      })
      
    }
   
    catch(error){return res.status(500).json({error : "erreur token non gaineré"})}
  }
  /*exports.searchUser = async (req, res, next) => {
    console.log("hello");
   await db.User.findOne({ where: {  id: req.params.id } }) 
    .then (
      (user) => {res.status(200).json(JSON.stringify(user))}
    )
    .catch (
      (error) => {res.status(404).json({error})}
    )
  }
;*/

exports.searchUser =  (req, res, next) => {
  db.User.findOne({ id: req.headers.authorization.split(' ')[1]})
  .then(user => res.status(200).json(user))// code 200 ok, on recupère les données de l'utilisateur en reponse
  .catch(error => res.status(400).json({error:"pas trouvé"}));//mauvaise requête dû a un user qui n'éxiste pas
};

// Deleted user
exports.delete = (req, res, next) => {
  let userId = req.params.id;
  db.User.findOne({ id: userId })
    .then(user => {
      const filename = user.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        db.User.deleteOne({ id: userId })
          .then(() => res.status(200).json({ message: "compte supprimée" }))
          .catch(error => res.status(400).json({ message: "compte non supprimée" }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};




