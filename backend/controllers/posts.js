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
  const id = req.params.id;
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

//effacer un post
exports.delete = async (req, res, next) => {
  try {
    let img;
    let UserId = jwt.getUserId(req);
    let PostId = req.params.id;
    let User = await db.User.findOne({ where: { id: UserId } });
    console.log(User);
    if (!User) {
      return res.status(404).json({ error: "utilisateur inexistant" });
    }
    let Post = await db.Post.findOne({ where: { id: PostId } });
    if (!Post) {
      return res.status(404).json({ error: "post inexistant" });
    }
    if (Post.imageUrl) {
      img = Post.imageUrl.split("/images/")[1];
    }
    if (User.isAdmin) {
      if (img) {
        fs.unlink("images/" + img, () => {});
      }
      await Post.destroy();
      return res
        .status(200)
        .json({ message: "post supprimé par l'administrateur" });
    }
    if (User.id == Post.UserId) {
      if (img) {
        fs.unlink("images/" + img, () => {});
      }
      await Post.destroy();
      return res.status(200).json({ message: "Post supprimé par l'auteur" });
    }
    return res
      .status(403)
      .json({ error: "vous n'êtes pas autorisé a supprimé ce post" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
