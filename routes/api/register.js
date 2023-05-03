const express = require("express");
const router = express.Router();

const { handleNewUser } = require("../../controllers/registerController");

// router.post("/", handleNewUser);
router.route("/").post(handleNewUser);

module.exports = router;