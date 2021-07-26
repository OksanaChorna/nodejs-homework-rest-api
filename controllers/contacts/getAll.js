const { contact: service } = require("../../services");

const getAll = async (req, res, next) => {
  try {
    const result = await service.getAll(req.query);
    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
