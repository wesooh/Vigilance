import express from "express";

import {
  createBadge,
  assignBadge,
  getBadges,
  getWorkerBadges,
} from "../controllers/badgeController.js";

import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  adminOnly,
  createBadge
);

router.post(
  "/assign",
  protect,
  adminOnly,
  assignBadge
);

router.get("/", getBadges);

router.get(
  "/worker/:workerId",
  getWorkerBadges
);

export default router;