import express from "express";

import {
  applyTraining,
  getMyTraining,
  startTraining,
  completeTraining,
} from "../controllers/trainingController.js";

import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/", protect, applyTraining);

router.get("/me", protect, getMyTraining);

router.put(
  "/start/:id",
  protect,
  adminOnly,
  startTraining
);

router.put(
  "/complete/:id",
  protect,
  adminOnly,
  completeTraining
);

export default router;