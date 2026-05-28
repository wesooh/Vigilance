import express from "express";

import {
  sendMessage,
  getConversation,
} from "../controllers/chatController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, sendMessage);

router.get(
  "/:userId",
  protect,
  getConversation
);

export default router;