const multer = require('multer'); 

const storage = multer.memoryStorage();

const singleUpload = multer({storage}).single("profile-pic");

const postUpload = multer({storage}).single("post");

module.exports = { singleUpload, postUpload };