const { user: service } = require("../../services");
const { schemaUpdateUserSubscription } = require("../../routes/validate");

const updateSubscription = async (req, res, next) => {
  const { error } = schemaUpdateUserSubscription.validate(req.body);
  if (error) {
    res.status(404).json({
      status: error,
      code: 400,
      message: "missing required name field",
    });
    return;
  }

  try {
    const user = await service.updateById(req.params.id, req.body);

    const { id, subscription } = user;
    if (user) {
      return res.status(200).json({
        status: "success",
        code: 200,
        data: { id, subscription },
      });
      // eslint-disable-next-line no-unreachable
      return res.json({ status: "error", code: 404, message: "Not found" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = updateSubscription;
