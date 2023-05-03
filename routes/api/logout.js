const express = require("express");
const router = express.Router();

const { handleLogout } = require("../../controllers/logoutController");

// router.post("/", handleNewUser);
router.route("/").get(handleLogout);

module.exports = router;
