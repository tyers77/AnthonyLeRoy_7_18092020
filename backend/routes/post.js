const express = require("express");//pour la création du router
const router = express.Router();//création du router
const postsCtrl = require("../controllers/posts");
const commentsCtrl = require("../controllers/comments");
const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth").isAuth;

router.get("/get", auth, postsCtrl.viewall);
router.get("/:id", auth, postsCtrl.getOne);
router.post("/create", auth, multer, postsCtrl.createPost);
router.delete("/:id", auth, postsCtrl.delete);
router.post("/:id/comment", auth, commentsCtrl.createComment);



module.exports = router;
