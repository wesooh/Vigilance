import express from "express";

import {
  createPayment,
  getClientPayments,
  getWorkerPayments,
  getCompanyRevenue,
} from "../controllers/paymentController.js";

import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";


const router = express.Router();

router.post("/:bookingId", protect, createPayment);

router.get("/client", protect, getClientPayments);

router.get("/worker", protect, getWorkerPayments);
  
router.get("/admin", protect, adminOnly, getCompanyRevenue);

export default router;