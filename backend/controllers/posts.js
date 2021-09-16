const db = require("../models");
const fs = require("fs");
const jwt = require("../middleware/auth");
const sanitize = require("mongo-sanitize");

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
  const year = date.getFullYear();
  const today = day + "-" + month + "-" + year;
  return today;
}

exports.createPost = async (req, res, next) => {
  const title = sanitize(req.body.title);
  const text = sanitize(req.body.text);
  const file = sanitize(req.file);
  let UserId = jwt.getUserId(req);
  try {
    if (!UserId) {
      return res.status(404).json({ error: "utilisateur inconnu" });
    } else {
      console.log("tentative de creation");
      const post = await db.Post.create({
        dateFr: getDatePost(),
        title,
        text,
        UserId,
        imageUrl: file
          ? `${req.protocol}://${req.get("host")}/images/${file.filename}`
          : null,
      });
      console.log(file, "image");
      res.status(201).json({ message: "Post crée avec succès" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.getOne = (req, res, next) => {
  const id = sanitize(req.params.id);
  db.Post.findOne({
    where: { id },
    include: [
      { model: db.User, attributes: ["pseudo", "id"] },
      {
        model: db.Comment,
        order: ["id", "DESC"],
        include: [{ model: db.User, attributes: ["pseudo", "id"] }],
      },
    ],
  })
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => {
      res.status(404).json({ error: error.message });
    });
};

exports.viewall = (req, res, next) => {
  let id = jwt.getUserId(req);
  if (!id) {
    return res.redirect("/connexion");
  }
  db.Post.findAll({
    order: [["id", "DESC"]],
    include: [{ model: db.User, attributes: ["pseudo", "id", "isAdmin"] }],
  })
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => {
      res.status(404).json({ error: error.message });
    });
};

/* exports.delete = (req, res, next) => {
  let paramsId = sanitize(req.params.id);
  db.Post.findOne({ where: { id: paramsId } })
    .then((post) => {
      let userId = req.headers.authorization.split(" ")[1];
      let img = post.imageUrl.split("/images/")[1];
      if (post.id == userId) {
        if (!post) {
          return res.status(404).json({ error: "Post not found." });
        }
        fs.unlink("images/" + img, () => {
          Post.destroy({ where: { id: paramsId } });
          res.status(200).json({ message: "Post deleted." });
        });
      } else {
        if (profil_user == 1) {
          fs.unlink("images/" + img, () => {
            Post.destroy({ where: { id: paramsId } });
            res.status(200).json({ message: "Post deleted." });
          });
        } else {
          res.status(403).json({ error: "Is not your post !" });
        }
      }
    })
    .catch((error) => res.status(500).json({ error }));
};
 */
exports.delete = async (req, res, next) => {
  try {
    let UserId = sanitize(req.body.userId);
    let PostId = sanitize(req.body.PostId);
    let file = sanitize(req.body.imageUrl);
    let User = await db.User.findOne({ where: { UserId } });
    if (!User) {
      return res.status(404).json({ error: "utilisateur inexistant" });
    }
    let Post = await db.Post.findOne({ where: { PostId } });
    if (!Post) {
      return res.status(404).json({ error: "post inexistant" });
    }
    if (User.isAdmin) {
      fs.unlink("images/" + img, () => {});
      await Post.destroy();
      return res
        .status(200)
        .json({ message: "compte supprimé par l'administarteur" });
    }
    if (User.id == Post.id) {
      fs.unlink("images/" + img, () => {});
      await Post.destroy();
      return res.status(200).json({ message: "Post supprimé par l'auteur" });
    }
    return res
      .status(403)
      .json({ error: "vous n'êtes pas autorisé a supprimé ce compte" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
