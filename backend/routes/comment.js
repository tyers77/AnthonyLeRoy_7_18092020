const express = require("express"); //pour la création du router
const router = express.Router(); //création du router
const commentsCtrl = require("../controllers/comments"); //le controller pour associé les fonctions aux différentes routes
const auth = require("../middleware/auth").isAuth;

router.delete("/:id", auth, commentsCtrl.delete);

module.exports = router;
