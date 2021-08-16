const express = require("express");//pour la création du router
const router = express.Router();//création du router
const postsCtrl = require("../controllers/posts");//le controller pour associé les foctions aux différentes routes
const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth").isAuth;


router.get("/get",postsCtrl.viewall);
router.get("/:id", auth, postsCtrl.getone);
router.post("/create",auth,multer, postsCtrl.create);
router.put("/:id",auth,multer,postsCtrl.update);
router.delete("/:id",auth,multer,postsCtrl.delete);

module.exports = router;
