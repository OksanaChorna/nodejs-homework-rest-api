const { user: service } = require("../../services");
const jimp = require("jimp");
const fs = require("fs/promises");
const path = require("path");

const updateUserAvatar = async (req, res, next) => {
  const publicDir = path.join("public", "avatars");
  const tmpDir = path.join(process.cwd(), "tmp");
  const { path: tempName, originalname } = req.file;

  try {
    const tmpDirectory = path.join(tmpDir, req.user.id);

    await fs.mkdir(tmpDirectory);
    const tmpFileName = path.join(tmpDirectory, originalname);
    const publicFileName = path.join(
      publicDir,
      req.user.id + "-" + originalname,
    );
    const img = await jimp.read(tempName);
    await img
      .autocrop()
      .cover(
        250,
        250,
        jimp.HORIZONTAL_ALIGN_CENTER || jimp.VERTICAL_ALIGN_MIDDLE,
      )
      .writeAsync(tmpFileName);
    fs.rename(tmpFileName, path.join(process.cwd(), publicFileName));

    const avatarURL = await service.updateAvatar(
      req.user.id,
      "/avatars/" + req.user.id + "-" + originalname,
    );
    if (avatarURL) {
      return res.status(200).json({
        status: "success",
        code: 200,
        data: {
          avatarURL: avatarURL.avatarURL,
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
