const express = require("express");
const router = express.Router();
const { protectRoute } = require("../middleware/protectRoute.js");
const { getUsersForSideBar } = require("../controllers/userController.js");

router.get("/", protectRoute, getUsersForSideBar);
module.exports = router;
