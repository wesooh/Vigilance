import Message from "../models/Message.js";

export const sendMessage = async (req, res) => {
  try {
    const { receiver, text } = req.body;

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

export const getConversation = async (
  req,
  res
) => {
  try {
    const roomId = [req.user.id, req.params.userId]
      .sort()
      .join("_");

    const messages = await Message.find({
      roomId,
    }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

