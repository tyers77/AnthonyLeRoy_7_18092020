const express = require("express");//pour la création du router
const router = express.Router();//création du router
const commentsCtrl = require("../controllers/comments");//le controller pour associé les fonctions aux différentes routes
const auth = require("../middleware/auth").isAuth;

//router.get("/get/:id", auth, commentsCtrl.getAllComments);

module.exports = router;