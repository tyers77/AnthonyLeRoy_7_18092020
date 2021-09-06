const express = require("express");//pour la création du router
const router = express.Router();//création du router
const postsCtrl = require("../controllers/posts");//le controller pour associé les foctions aux différentes routes
const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth").isAuth;


router.get("/get",auth, postsCtrl.viewall);
router.get("/get/:id", auth, postsCtrl.getOne);
router.post("/create", auth, multer, postsCtrl.createPost);
router.put("/:id",auth,multer,postsCtrl.update);
router.delete("/:id",auth,postsCtrl.delete);

module.exports = router;
