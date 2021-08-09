const express = require("express");
const router = express.Router();
const { authenticate } = require("../../middleware");
const { auth: ctrl } = require("../../controllers");
const uploadMiddleware = require("../../config/multer");

router.get("/", ctrl.getAll);
router.post("/signup", express.json(), ctrl.signup);
router.post("/login", express.json(), ctrl.login);
router.get("/current", authenticate, ctrl.getCurrent);
router.post("/logout", authenticate, ctrl.logout);
router.patch(
  "/avatars",
  authenticate,
  uploadMiddleware.single("avatar"),
  ctrl.updateUserAvatar,
);
router.patch("/:id", express.json(), ctrl.updateSubscription);
router.get("/verify/:verifyToken", ctrl.verify);
router.post("/verify", ctrl.repeatEmailVerify);

module.exports = router;
