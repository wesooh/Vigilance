import express from "express";

import {
  createBooking,
  getClientBookings,
  getWorkerBookings,
  acceptBooking,
  rejectBooking,
} from "../controllers/bookingController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createBooking);

router.get("/client", protect, getClientBookings);

router.get("/worker", protect, getWorkerBookings);

router.put("/accept/:id", protect, acceptBooking);

router.put("/reject/:id", protect, rejectBooking);

export default router;