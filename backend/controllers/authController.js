const User = require("../models/userModel.js");
const bcrypt = require("bcryptjs");
const generateTokendAndSetCookie = require("../utils/generateToken.js");
exports.signUp = async (req, res) => {
  try {
    const { fullName, userName, password, confirmPassword, gender } = req.body;

    // Checks
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ status: "fail", message: "Password incorrect" });
    }
    const user = await User.findOne({ userName });
    if (user) {
      return res
        .status(400)
        .json({ status: "fail", message: "Username already exists" });
    }
    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

    const newUser = await User.create({
      fullName,
      userName,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });
    if (newUser) {
      generateTokendAndSetCookie(newUser._id, res);
      res.status(201).json({
        status: "success",
        data: {
          newUser,
        },
      });
    }
  } catch (err) {
    res.status(500).json({ status: "fail", message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    if (!userName || !password)
      return res.status(500).json({
        status: "fail",
        message: "Username or password does not exist",
      });
    const user = await User.findOne({ userName });
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (user.userName === userName && isPasswordCorrect) {
      generateTokendAndSetCookie(user._id, res);
      res.status(201).json({
        status: "success",
        message: `Login succesfull ${userName}-${password}`,
        data: user,
      });
    } else {
      res.status(404).json({
        status: "fail",
        message: "Invalid password or username",
      });
    }
  } catch (err) {
    res.status(500).json({ status: "fail", message: err.message });
  }
};

exports.logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({
      status: "success",
      message: "Logged out success",
    });
  } catch (err) {
    res.status(500).json({ status: "fail", message: err.message });
  }
};
