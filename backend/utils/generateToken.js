const jwt = require("jsonwebtoken");

const generateTokendAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });
  // res.cookie("jwt", token, {
  //   maxAge: 15 * 24 * 60 * 60 * 1000,
  // });
  res.cookie("jwt", token);
};

module.exports = generateTokendAndSetCookie;
