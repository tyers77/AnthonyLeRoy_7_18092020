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
