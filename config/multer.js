const multer = require("multer");
const path = require("path");

const tmpDir = path.join(process.cwd(), "tmp");
// const uploadDir = path.join(process.cwd(), "upload");
// const publicDir = path.join(process.cwd(), "public", "avatars");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(req, "req multer");
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

// app.use(express.static("public"));
// app.use(express.static(path.join(__dirname, "public")));

const uploadMiddleware = multer({ storage });

// app.post(
//   "/register",
//   uploadMiddleware.single("avatar"),
//   async (req, res, next) => {
//     const { path: tempName, originalname } = req.file;
//     const userId = shortid.generate();
//     const useDirectory = path.join(publicDir, userId);

//     try {
//       await fs.mkdir(useDirectory);
//       const fileName = path.join(useDirectory, originalname);
//       const img = await jimp.read(tempName);
//       await img
//         .autocrop()
//         .cover(
//           250,
//           250,
//           jimp.HORIZONTAL_ALIGN_CENTER || jimp.VERTICAL_ALIGN_MIDDLE,
//         )
//         .writeAsync(tempName);
//       fs.rename(tempName, fileName);
//       const newUser = {
//         _id: userId,
//         avatar: fileName,
//       };
//       res.status(201).json({
//         status: "success",
//         code: 201,
//         data: {
//           result: newUser,
//         },
//       });
//     } catch (error) {
//       fs.unlink(tempName);
//     }
//   },
// );

module.exports = uploadMiddleware;
