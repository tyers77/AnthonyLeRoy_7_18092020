const db = require("../models");
const fs = require('fs');
const jwt = require('../middleware/auth');


exports.create = (req, res, next) => {
  const file = req.body.file;
  let userId = jwt.getUserId;
    if (userId != userId) {
      return res.status(404).json({error:"utilisateur inconnu"})
    }else{
  const newarticle = db.Post.create({
    UserId: req.body.id,
    titre: req.body.title,
    media:`${req.protocol}://${req.get('host')}/images/${file}`,
    description: req.body.content,
    validate: 0
  })
  
    .then(newarticle => {
      res.status(201).json({message:"Post crée avec succès"});
    })
    .catch(err => {
      res.status(500).send({ message: err.message || "Error create a new article." });
    });
  }
};


exports.getone = (req, res, next) => {
  db.Post.findOne({ where: { id: req.params.id } })
    .then(
      (post) => {
        res.status(200).json(post)
      }
    ).catch(
      (error) => {
        res.status(404).json({ error: error });
      }
    );
};



exports.viewall = (req, res, next) => {
 
  db.Post.findAll({
    order: [['id', 'DESC']]
  }).then(
    (post) => {
      res.status(200).json(post);
    }
  ).catch(
    (error) => {
      res.status(404).json({ error: error });
    }
  );
};


exports.update = (req, res, next) => {
  let userId = req.headers.authorization.split(' ')[1];
  db.Post.findOne({ where: { id: req.params.id } })
    .then(post => {
      if (post.id == userId) {
        let img = post.media.split('/images/')[1];
        fs.unlink("images/" + img, () => {
          Post.update({ description: req.body.description, media: req.protocol + '://' + req.get('host') + '/images/' + req.file.filename, validate: 0 }, { where: { id: req.params.id } })
            .then(() => {
              res.status(201).json({ message: 'post modifié avec succès' });
            })
            .catch(
              (error) => {
                res.status(404).json({ error: error });
              }
            );
        });
      } else {
        res.status(403).json({ error: "Is not your post !" })
      }
    })
    .catch(error => res.status(500).json({ error }));
};

exports.delete = (req, res, next) => {
  db.Post.findOne({ where: { id: req.params.id } })
    .then(post => {
      let userId = req.headers.authorization.split(' ')[3];
      let profil_user = req.headers.authorization.split(' ')[2];
      let img = post.media.split('/images/')[1];
      if (post.profil_id == userId) {
        if (!post) {
          return res.status(404).json({ error: 'Post not found.' });
        }
        fs.unlink("images/" + img, () => {
          Post.destroy({ where: { id: req.params.id } })
          res.status(200).json({ message: 'Post deleted.', });
        });
      } else {
        if (profil_user == 1) {
          fs.unlink("images/" + img, () => {
            Post.destroy({ where: { id: req.params.id } })
            res.status(200).json({ message: 'Post deleted.', });
          });
        } else {
          res.status(403).json({ error: "Is not your post !" })
        }
      }
    })
    .catch(error => res.status(500).json({ error }));
};