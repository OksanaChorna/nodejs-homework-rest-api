const { user: service } = require("../../services");

const verify = async (req, res, next) => {
  console.log(req.params);
  const { verifyToken } = req.params;
  try {
    const user = await service.getOne(verifyToken);
    if (!user) {
      res.status(404).json({
        status: "error",
        code: 404,
        message: "User not found",
      });
    }
    await service.updateById(user.id, {
      verify: true,
      verifyToken: "",
    });
    res.status(200).json({
      status: "success",
      code: 200,
      message: "Verification successful",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = verify;
