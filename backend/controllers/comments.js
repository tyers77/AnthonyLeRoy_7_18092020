const db = require("../models");
const Comments = db.comments;

exports.createComment = async (req, res) => {
  try {
    const UserId = jwt.getUserId(req);
    const PostId = req.params.id;
    const content = req.body.content;
    if (!PostId || !content || !UserId) {
      return res.status(400).json({ error: "Informations manquantes" });
    }
    const isPost = await db.Post.findOne({ where: { id: PostId } });
    if (!isPost) {
      return res.status(404).json({ error: "Message inexistant !" });
    }
    await db.Comment.create({ UserId, PostId, content });
    return res.status(201).json({ message: "Commentaire enregistré !" });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

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
