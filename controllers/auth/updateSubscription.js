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
    // const id = req.user.id;
    //    const { subscription = starter } = req.body;
    //    console.log(subscription);
    if (req.body) {
      const user = await service.updateSubscription(req.user._id, req.body);
      const { email, subscription } = user;
    }
    if (user) {
      return res.status(200).consolejson({
        status: "success",
        code: 200,
        data: { email, subscription },
      });
      // eslint-disable-next-line no-unreachable
      return res.json({ status: "error", code: 404, message: "Not found" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = updateSubscription;
