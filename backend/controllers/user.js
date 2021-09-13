const db = require('../models')
const bcrypt = require('bcrypt');
const jwt = require('../middleware/auth');
const { Op } = require("sequelize");

exports.create = (req, res,next) => {
//const file = req.file;
let newuser;
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
        newuser = db.User.create ({
          email: req.body.mail,
          pseudo: req.body.pseudo,
          password: hash,
         // avatar: file ? `${req.protocol}://${req.get('host')}/images/${file.filename}` : null,
          admin: 0
        })
        .then(newuser => {
          res.status(201).json({message: "Utilisateur " + newuser.pseudo});
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
    let user ;
    try{
      const pseudo = req.body.pseudo;
      const password = req.body.password;
      if(!pseudo || !password){
        return res.status(400).json({error:"information manquantes"})
      }
      user = await db.User.findOne({ where: { pseudo: pseudo }})
      if(!user){
        return res.status(404).json({error:"utilisateur inconnu"})
      }
      const token = jwt.generateTokenForUser(user);
      return res.status(200).json({token, message: "Bonjour " + pseudo });
      
    }
   
    catch(error){return res.status(500).json({error :error.message})}
  }


exports.searchUser =  (req, res, next) => {
  let id =  jwt.getUserId(req);
  db.User.findOne({
    attributes: ["pseudo", "email", "avatar"],
    where: {
      id: id
    }
  })
  .then(user => res.status(200).json([user]))
  .catch(error => res.status(400).json({error :error.message}));
};



// Deleted user
exports.delete = (req, res, next) => {
  let userId =  jwt.getUserId(req);
  db.User.findOne( {where:{id:userId}} )
        db.User.destroy({where:{id:userId}})
          .then(() => res.status(200).json({ message: "compte supprimée" }))
          .catch(error => res.status(400).json({ message: "compte non supprimée" }));
};

