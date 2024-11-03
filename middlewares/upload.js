const multer = require("multer");

const storage = multer.memoryStorage(); // Store the file in memory buffer
const upload = multer({ storage });

module.exports = upload;