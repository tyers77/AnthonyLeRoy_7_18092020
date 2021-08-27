const express = require("express");//pour la création du router
const router = express.Router();//création du router
const userCtrl = require("../controllers/user");//le controller pour associé les foctions aux différentes routes
const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth").isAuth;
//const useAuth = require("../middleware/auth").getUserId

router.post("/signup", userCtrl.create);//route d envoi des infos connexion de l utilisateur pour la creation
router.post("/login", userCtrl.login);// route d envoi des infos connexion de l utilisateur pour la connexion 
router.delete("/delete/:id", auth, userCtrl.delete);//supprime le compte utilisateur
router.get("/get/:id",auth, multer,userCtrl.searchUser);//recupère le compte de l utilisateur

module.exports = router;