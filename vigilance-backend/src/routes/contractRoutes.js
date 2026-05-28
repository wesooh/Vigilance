import express from "express";

import {
  createContract,
  payContract,
  getWorkerContracts,
} from "../controllers/contractController.js";

import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/", protect, adminOnly, createContract);

router.put(
  "/pay/:id",
  protect,
  payContract
);

router.get(
  "/worker",
  protect,
  getWorkerContracts
);

export default router;