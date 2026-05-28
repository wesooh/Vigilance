import Message from "../models/Message.js";

export const sendMessage = async (req, res) => {
  try {
    const { receiver, text } = req.body;

    if (!receiver || !text) {
      return res.status(400).json({
        message: "Missing fields",
      });
    }

    if (receiver === req.user.id) {
      return res.status(400).json({
        message: "Cannot message yourself",
      });
    }

    const roomId = [req.user.id, receiver]
      .sort()
      .join("_");

    const message = await Message.create({
      sender: req.user.id,
      receiver,
      text,
      roomId,
    });

    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getConversation = async (req, res) => {
  try {
    const otherUserId = req.params.userId;

    const roomId = [req.user.id, otherUserId]
      .sort()
      .join("_");

    const messages = await Message.find({
      roomId,
    })
      .sort({ createdAt: 1 })
      .limit(100); // prevent overload

    res.json(messages);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};