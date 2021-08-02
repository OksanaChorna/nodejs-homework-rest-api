const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
// const shortid = require("shortid");
// const jimp = require("jimp");
// const multer = require("multer");
const path = require("path");
// const fs = require("fs/promises");
require("dotenv").config();
// const passport = require("passport");
require("./config/passport-config");

const api = require("./routes/api");

const app = express();

app.use(cors());

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));

// const tmpDir = path.join(process.cwd(), "tmp");
// const uploadDir = path.join(process.cwd(), "upload");
// const publicDir = path.join(process.cwd(), "public", "avatars");
// console.log(publicDir);

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, tmpDir);
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
//   limits: {
//     fileSize: 1048576,
//   },
//   fileFilter: (req, file, cb) => {
//     if (file.mimetype.includes("image")) {
//       cb(null, true);
//       return;
//     }
//     cb(null, false);
//   },
// });

app.use(express.static(path.join(process.cwd(), "public")));

// const uploadMiddleware = multer({ storage });

// app.post(
//   "/register",
//   uploadMiddleware.single("avatar"),
//   async (req, res, next) => {
//     const { path: tempName, originalname } = req.file;
//     const userId = shortid.generate();
//     const useDirectory = path.join(uploadDir, userId);

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

app.use("/api/contacts", api.contacts);
app.use("/api/users", api.auth);

app.use((_, res) => {
  res.status(404).json({
    status: "error",
    code: 404,
    message: "Not found",
  });
});

app.use((error, _, res, __) => {
  const { code = 500, message = "Server error" } = error;
  res.status(code).json({
    status: "fail",
    code,
    message,
  });
});

const { DB_HOST, PORT } = process.env;

mongoose
  .connect(DB_HOST, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT);
  })
  .catch(error => {
    console.log(`Error in Database connection: ${error.message}`);
    process.exit(1);
  });

module.exports = app;
