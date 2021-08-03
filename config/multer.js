const multer = require("multer");
const path = require("path");

const tmpDir = path.join(process.cwd(), "tmp");
// const uploadDir = path.join(process.cwd(), "upload");
// const publicDir = path.join(process.cwd(), "public", "avatars");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tmpDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: {
    fileSize: 1048576,
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes("image")) {
      cb(null, true);
      return;
    }
    cb(null, false);
  },
});

const uploadMiddleware = multer({ storage });

module.exports = uploadMiddleware;
