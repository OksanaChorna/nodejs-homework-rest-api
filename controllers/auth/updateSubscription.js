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
  const { id } = req.params;
  console.log(id);
  const { subscription = starter } = req.body;
  console.log(subscription);
  try {
    const result = await service.updateSubscription(id, { subscription });
    console.log(result);
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

module.exports = updateSubscription;
