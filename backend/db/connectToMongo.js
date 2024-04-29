const mongoose = require("mongoose");

exports.connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log("Connected DB");
  } catch (err) {
    console.log(err);
  }
};
