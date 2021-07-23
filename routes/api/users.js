const express = require("express");
const router = express.Router();
const { authenticate } = require("../../middleware");
const {
  signupUserValidation,
  //   updateUserSubscriptionValidation,
  loginUserValidation,
} = require("./validateUser");

const { auth: ctrl } = require("../../controllers");

router.get("/", ctrl.getAll);
router.post("/signup", signupUserValidation, express.json(), ctrl.signup);
router.post("/login", loginUserValidation, express.json(), ctrl.login);
router.get("/current", authenticate, ctrl.getCurrent);
router.post("/logout", authenticate, ctrl.logout);

router.patch("/:id/subscription", express.json(), ctrl.updateSubscription);

module.exports = router;
