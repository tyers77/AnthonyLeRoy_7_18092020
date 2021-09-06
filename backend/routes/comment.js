const express = require("express");//pour la création du router
const router = express.Router();//création du router
const commentsCtrl = require("../controllers/comments");//le controller pour associé les fonctions aux différentes routes
const auth = require("../middleware/auth").isAuth;

router.get("/get/:id", auth, commentsCtrl.getAllComments);
router.post("/post", auth, commentsCtrl.createComment);
//router.put("/post/:id",auth,commentsCtrl.updatecomments);
//router.delete("/post/:id", auth, commentsCtrl.deletecomments);

module.exports = router;