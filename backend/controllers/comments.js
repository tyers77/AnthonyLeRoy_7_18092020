const db = require("../models");
const jwt = require("../middleware/auth");
const sanitize = require("mongo-sanitize");

//format date FR
function getDateComment() {
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

//creation de commentaire
exports.createComment = async (req, res) => {
  console.log("essai");
  let UserId = jwt.getUserId(req);
  let PostId = req.params.id;
  let content = req.body.content;
  console.log(content);
  try {
    if (!UserId) {
      return res.status(400).json({ error: "utilisateur inconnu" });
    } else {
      console.log(content);
      const comment = await db.Comment.create({
        date: getDateComment(),
        UserId,
        PostId,
        content,
      });
      res.status(201).json({ message: "Commentaire crée avec succès" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
exports.delete = async (req, res) => {
  try {
    const commentId = req.params.id;
    const UserId = jwt.getUserId(req);
    const comment = await db.Comment.findOne({ where: { id: commentId } });
    if (!comment) {
      return res.status(404).json({ error: "commentaire introuvable" });
    }
    if (comment.UserId == UserId) {
      await comment.destroy();
      return res
        .status(200)
        .json({ message: "commentaire supprimé par l'utilisateur" });
    }
    const user = await db.User.findOne({ where: { id: UserId } });
    if (!user) {
      return res.status(404).json({ error: "utilisateur introuvable" });
    }
    if (user.isAdmin) {
      await comment.destroy();
      return res
        .status(200)
        .json({ message: "commentaire supprimé par l'administrateur" });
    }
    return res.status(403).json({ error: "vous n'êtes pas autorisé " });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
