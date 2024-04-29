const Conversation = require("../models/conversationModel.js");
const Message = require("../models/messageModel.js");
const { getReceiverSocketId } = require("../socket/socket.js");

exports.sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }
    await conversation.save();

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }
  } catch (err) {
    res.status(500).json({ status: "fail", message: err.message });
  }
};

exports.getMessage = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const { _id: senderId } = req.user;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");

    if (conversation) {
      res.status(200).json({
        messages: conversation.messages,
      });
    } else {
      res.status(200).json([]);
    }
  } catch (err) {
    res.status(500).json({ status: "fail", message: err.message });
  }
};
