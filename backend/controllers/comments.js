const db = require("../models");
const jwt = require('../middleware/auth');

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
  const year = date.getFullYear()
  const today = day + "-" + month + "-" + year;
  return today;
}

exports.createComment = async (req, res) => {
  let UserId = jwt.getUserId(req);
  let postId = req.paramInt("id");
  let content = req.body.content;
  try {
    if (!UserId) {
      return res.status(400).json({ error: "utilisateur inconnu"});
    }else{
      console.log("essai") ;
      console.log(req.body.content,)
      const comment = await db.Comment.create({
        UserId,
        postId,
        content,
        
      })
     
      res.status(201).json({ message: "Commentaire crée avec succès" });
    }
  }
  catch (error) {
    return res.status(500).json({ error: error.message });
  };
}

exports.getAllComments = (req, res, next) => {
  db.Comment.findAll({
    order: [['id', 'DESC']], include: [{ model: db.User, attributes: ["pseudo"] }]
  }).then(
    (comment) => {
      res.status(200).json(comment);
    }
  ).catch(
    (error) => {
      res.status(404).json({ error: error.message });
    }
  );
};
