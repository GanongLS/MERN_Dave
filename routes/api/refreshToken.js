const express = require("express");
const router = express.Router();

const { handleRefreshToken } = require("../../controllers/refreshTokenController");

// router.post("/", handleNewUser);
router.route("/").get(handleRefreshToken);

module.exports = router;
