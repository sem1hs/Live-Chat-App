// Packets
const express = require("express");

const { app, server } = require("./socket/socket.js");

const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

// No 'Access-Control-Allow-Origin'
const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
// Routes
const authRoutes = require("./routes/authRoutes.js");
const messagesRoutes = require("./routes/messagesRoutes.js");
const userRoutes = require("./routes/userRoutes.js");

// Mongo
const { connectToMongoDB } = require("./db/connectToMongo.js");

app.use(express.json());
app.use(cookieParser());
dotenv.config();

app.use("/api/auth", authRoutes);
app.use("/api/messages", messagesRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;
server.listen(PORT, (err) => {
  connectToMongoDB();
  console.log(`Server listening on port ${PORT}`);
});
