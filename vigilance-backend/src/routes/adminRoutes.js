import express from "express";

import {
  getPendingWorkers,
  approveWorker,
  rejectWorker,
} from "../controllers/adminController.js";

import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get(
  "/pending-workers",
  protect,
  adminOnly,
  getPendingWorkers
);

router.put(
  "/approve-worker/:id",
  protect,
  adminOnly,
  approveWorker
);

router.delete(
  "/reject-worker/:id",
  protect,
  adminOnly,
  rejectWorker
);

export default router;