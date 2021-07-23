const express = require("express");
const router = express.Router();
const { authenticate } = require("../../middleware");
const passport = require("passport");

const { auth: ctrl } = require("../../controllers");

router.get("/", ctrl.getAll);
router.post("/signup", express.json(), ctrl.signup);
router.post("/login", express.json(), ctrl.login);
// router.post("/logout", express.json(), ctrl.logout);
router.get("/current", authenticate, ctrl.getCurrent);

module.exports = router;
