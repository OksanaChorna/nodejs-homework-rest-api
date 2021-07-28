const express = require("express");
const router = express.Router();
const { authenticate } = require("../../middleware");
const { auth: ctrl } = require("../../controllers");

router.get("/", ctrl.getAll);
router.post("/signup", express.json(), ctrl.signup);
router.post("/login", express.json(), ctrl.login);
router.get("/current", authenticate, ctrl.getCurrent);
router.post("/logout", authenticate, ctrl.logout);

router.patch("/:id", express.json(), ctrl.updateSubscription);

module.exports = router;
