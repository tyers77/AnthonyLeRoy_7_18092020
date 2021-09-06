const multer = require('multer');//gestionnaire d images
const MIME_TYPES = {
  'image/jpg':'jpg',
  'image/jpeg':'jpeg',
  'image/png':'png'
};
const storageImage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    console.log(file.originalname)
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];

    callback(null, Date.now() + name+'.'+ extension);
  }
});

module.exports = multer({ storage : storageImage }).single('image');
//exports.articleImg = multer({ storage : storageImage }).single('image');

