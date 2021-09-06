const jwt = require("jsonwebtoken");
const JWT_SIGN_SECRET = "OPENCLASSROOMS_P7_Antho";
/**
 * Création d'un token
 * @param {OBJECT} user
 * @returns STRING
 */
 exports.generateTokenForUser = (user) => {
     console.log("user jwt" + user.id + " " + user.pseudo + " " + user.admin)
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
        console.log("ERREURRRRRRR")
        return res.status(401).json({ error: "Utilisateur non identifié" });
      }
      next();
      
    } catch (error) {
      res.writeHead(404, {'Content-Type': 'text/plain'});                    // <- redirect
res.write("Looked everywhere, but couldn't find that page at all!\n"); // <- content!
res.end();
      //return res.status(401).json({ error: error.message + " Authentification invalide" });
    }
  };
  exports.getUserId = (req)=>{
    const token = req.headers.authorization.split(" ")[1];
    console.log(req.headers.authorization);
      const decodedToken = jwt.verify(token, JWT_SIGN_SECRET);
      const userId = decodedToken.userId;
      return userId;
  } 



 
