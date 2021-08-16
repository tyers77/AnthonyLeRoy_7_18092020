const jwt = require("jsonwebtoken");
const JWT_SIGN_SECRET = "OPENCLASSROOMS_P7_Antho";
/**
 * Création d'un token
 * @param {OBJECT} user
 * @returns STRING
 */
 exports.generateTokenForUser = (user) => {
     console.log("user jwt"+ user.id + " "+ user.pseudo + " " + user.admin)
    return jwt.sign(
      {
        userId: user.id,
        pseudo: user.pseudo,
        admin: user.admin,
      },
      JWT_SIGN_SECRET,
      { expiresIn: "24h" }
    );
  };
  /**
 * Vérification de la validité du token
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns OBJECT {error: STRING} ou next()
 */
exports.isAuth = (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, JWT_SIGN_SECRET);
      const userId = decodedToken.userId;
      if (req.body.userId && req.body.userId != userId) {
        return res.status(401).json({ error: "Utilisateur non identifié" });
      }
      next();
    } catch (error) {
      return res.status(401).json({ error: "Authentification invalide" });
    }
  };
/*module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]//on récupere dans le header authorization le 2eme élément apres le vide
        const decodedToken = jwt.verify(token,process.env.CLE_TOKEN); //on verifie le token avec la méthode verify et la clé */
        /*const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            throw "user Id non valable";
        } else {
            next()
        }
    } catch {
        console.log("ici ici")
        res.status(401).json({error:"c est la"});
    }
};*/