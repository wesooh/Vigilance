import express from "express";

import {
  toggleAvailability,
  getOnlineWorkers,
} from "../controllers/availabilityController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.put(
  "/toggle",
  protect,
  toggleAvailability
);

router.get(
  "/online-workers",
  getOnlineWorkers
);

export default router;