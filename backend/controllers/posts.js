const db = require("../models");
const fs = require('fs');
const jwt = require('../middleware/auth');

function getDatePost() {
  const date = new Date();
  let day = date.getDate().toString();
  if (day.length == 1) {
    day = "0" + day;
  }
  let month = (date.getMonth() + 1).toString();
  if (month.length == 1) {
    month = "0" + month;
  }
  const year = date.getFullYear()
  const today = day + "-" + month + "-" + year;
  return today;
}


exports.createPost = async (req, res, next) => {

  const file = req.file;
  let UserId = jwt.getUserId(req);
  try {
    if (!UserId) {
      return res.status(404).json({ error: "utilisateur inconnu" })
    } else {
      console.log("tentative de creation")
      const post = await db.Post.create({
        dateFr: getDatePost(),
        title: req.body.title,
        text: req.body.text,
        UserId,
        imageUrl: file ? `${req.protocol}://${req.get('host')}/images/${file.filename}` : null //file ? demande si il y a un file et on répond oui l 'url et non : null
      })
      console.log(file, "image")
      res.status(201).json({ message: "Post crée avec succès" });

    }
  }
  catch (error) {
    return res.status(500).json({ error: error.message });
  };
}
  ;

exports.getOne = (req, res, next) => {
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
  let id =  jwt.getUserId(req);
  if (!id) {
    return res.redirect("/connexion")//status(404).json({ error: "utilisateur inconnu" })
  }
  db.Post.findAll({
    order: [['id', 'DESC']], include: [{ model: db.User, attributes: ["pseudo"] }]

  }).then(
    (post) => {
      res.status(200).json(post);
    }
  ).catch(
    (error) => {
      res.status(404).json({ error: error.message });
    }
  );
};


exports.update = (req, res, next) => {
  let userId = req.headers.authorization.split(' ')[1];
  db.Post.findOne({ where: { id: req.params.id } })
    .then(post => {
      if (post.id == userId) {
        let img = post.imageUrl.split('/images/')[1];
        fs.unlink("images/" + img, () => {
          Post.update({ title: req.body.title, text: req.body.text, imageUrl: req.protocol + '://' + req.get('host') + '/images/' + req.file.filename }, { where: { id: req.params.id } })
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
      let userId = req.headers.authorization.split(' ')[1];
      let img = post.imageUrl.split('/images/')[1];
      if (post.id == userId) {
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