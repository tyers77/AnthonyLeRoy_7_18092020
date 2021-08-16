const db = require("../models");
//const Post = db.post;
const Comments = db.comments;

exports.getcomments = (req, res, next) => {
  Comments.findAll({ where: { post_id: req.params.id},
    order: [['id', 'DESC']]})
  .then(
    (comments) => {
      res.status(200).json(comments)
    }
  )
  .catch(
    (error) => {
      res.status(404).json({ error: error });
    }
  );
};

/*exports.commentsnotvalidate = (req, res, next) => {
  let profil_user = req.headers.authorization.split(' ')[2];
  if (profil_user == 1) {
    Comments.findAll({ where: { validate: 0 },
      order: [['id', 'DESC']]})
    .then(
      (comments) => {
        console.log(comments);
        res.status(200).json(comments)
      }
    )
    .catch(
      (error) => {
        res.status(404).json({ error: error });
      }
    );
  } else {
    res.status(403).json({error: "You are not admin !" })
  }
};*/

/*exports.validatecomments = (req, res, next) => {
  Comments.findOne({ where: { id: req.params.id, }})
  .then(
    (comments) => {
      let profil_user = req.headers.authorization.split(' ')[2];
        if (profil_user == 1) {
          Comments.update({ validate: 1 },{ where: { id: req.params.id } })
          .then( () => {
            res.status(201).json({ message: 'Comment validate!' });
          })
          .catch(
          (error) => {
            res.status(404).json({ error: error });
          }
          );
        } else {
          res.status(403).json({error: "You are not admin !" })
        }
      }
  )
  .catch(
    (error) => {
      res.status(404).json({ error: error });
    }
  );
};*/

exports.createcomments = (req, res, next) => {
  let userId = req.headers.authorization.split(' ')[3];
  const newcomments = {
      profil_id: userId,
      comment_text: req.body.comment_text,
      post_id: req.body.post_id,
      comment_date: req.body.date,
      validate: 0
  };
  Comments.create(newcomments)
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({ message: err.message || "Error create a new comment." });
  });
};

exports.updatecomments = (req, res, next) => {
  Comments.findOne({ where: { id: req.params.id } })
  .then(comments => {
    let userId = req.headers.authorization.split(' ')[3];
    if (comments.profil_id == userId) {
    Comments.update({ comment_text: req.body.comment_text, validate: 0 },{ where: { id: req.params.id } })
    .then( () => {
      res.status(201).json({ message: 'Comment updated successfully!' });
    })
    .catch(
      (error) => {
        res.status(404).json({ error: error });
      }
    );
    } else {
			res.status(403).json({error: "Is not your comment !" })
    }
  })
  .catch(error => res.status(500).json({ error }));
};

exports.deletecomments = (req, res, next) => {
  Comments.findOne({ where: { id: req.params.id } })
  .then(comments => {
    let userId = req.headers.authorization.split(' ')[3];
    let profil_user = req.headers.authorization.split(' ')[2];
    if (comments.profil_id == userId) {
      Comments.destroy({ where: { id: req.params.id } })
    .then( () => {
      res.status(201).json({ message: 'Comment deleted successfully!' });
    })
    .catch(
      (error) => {
        res.status(404).json({ error: error });
      }
    );
    } else {
      if (profil_user == 1) {
        Comments.destroy({ where: { id: req.params.id } }) 
        res.status(200).json({ message: 'Comment deleted.', });
      } else {
			res.status(403).json({error: "Is not your comment !" })
      }
    }
  })
  .catch(error => res.status(500).json({ error }));
};
