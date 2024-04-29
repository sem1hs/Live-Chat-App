const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");

exports.protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res
        .status(401)
        .json({ status: "fail", message: "No token provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res
        .status(401)
        .json({ status: "fail", message: "Unauthorized - invalid token" });
    }
    const user = await User.findById(decoded.userId).select("-password");
    req.user = user;

    if (!user) {
      res.status(404).json({ status: "fail", message: "User not found" });
    }
    next();
  } catch (err) {
    res.status(500).json({ status: "fail", message: err.message });
  }
};
