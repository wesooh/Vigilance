import express from "express";

import {
  updateLocation,
  getNearbyWorkers,
} from "../controllers/locationController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.put("/update", protect, updateLocation);

router.get("/nearby-workers", getNearbyWorkers);

export default router;