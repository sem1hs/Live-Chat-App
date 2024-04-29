const express = require("express");
const router = express.Router();
const {
  sendMessage,
  getMessage,
} = require("../controllers/messageController.js");
const { protectRoute } = require("../middleware/protectRoute.js");

router.post("/send/:id", protectRoute, sendMessage);
router.get("/:id", protectRoute, getMessage);
module.exports = router;
