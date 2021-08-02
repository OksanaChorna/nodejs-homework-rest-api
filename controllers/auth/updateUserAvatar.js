const { user: service } = require("../../services");
// const shortid = require("shortid");
const jimp = require("jimp");
const fs = require("fs/promises");
const path = require("path");

const updateUserAvatar = async (req, res, next) => {
  const publicDir = path.join(process.cwd(), "public", "avatars");
  console.log(publicDir, "publicdir");

  const { path: tempName, originalname } = req.file;
  console.log(path, "path upd");
  console.log(originalname, "name upd");
  console.log(req.params.id);
  try {
    // const useDirectory = path.join(publicDir, req.params.id);
    // // const useDirectory = path.join(publicDir, originalname);

    // await fs.mkdir(useDirectory);
    // const fileName = path.join(useDirectory, originalname);
    const fileName = path.join(publicDir, originalname);
    const img = await jimp.read(tempName);
    await img
      .autocrop()
      .cover(
        250,
        250,
        jimp.HORIZONTAL_ALIGN_CENTER || jimp.VERTICAL_ALIGN_MIDDLE,
      )
      .writeAsync(tempName);
    fs.rename(tempName, fileName);
    const avatarURL = await service.updateAvatar(req.params.id, tempName);
    // const userId = user.id;
    console.log(req.params.id);

    // const { id } = user;
    if (avatarURL) {
      return res.status(200).json({
        status: "success",
        code: 200,
        data: {
          avatarURL: avatarURL,
        },
      });
      // eslint-disable-next-line no-unreachable
      return res.json({ status: "error", code: 401, message: "Not found" });
    }
  } catch (error) {
    fs.unlink(tempName);
    next(error);
  }
};

module.exports = updateUserAvatar;
