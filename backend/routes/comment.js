const express = require("express");//pour la création du router
const router = express.Router();//création du router
const commentsCtrl = require("../controllers/comments");//le controller pour associé les fonctions aux différentes routes
const auth = require("../middleware/auth").isAuth;

//router.get("/post/commentsnotvalid", auth, commentsCtrl.commentsnotvalid);
router.get("/post/:id", auth, commentsCtrl.getcomments);
router.post("/post", auth, commentsCtrl.createcomments);
//router.post("/post/validate/:id",auth,commentsCtrl.validatecomments)
router.put("/post/:id",auth,commentsCtrl.updatecomments);
router.delete("/post/:id", auth, commentsCtrl.deletecomments);

module.exports = router;