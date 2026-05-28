import express from "express";

import {
  createBooking,
  getClientBookings,
  getWorkerBookings,
  acceptBooking,
  rejectBooking,
} from "../controllers/bookingController.js";

import { protect } from "../middleware/authMiddleware.js";

import Booking from "../models/Booking.js";

const router = express.Router();

router.post("/", protect, createBooking);

router.get("/client", protect, getClientBookings);

router.get("/worker", protect, getWorkerBookings);

router.put("/accept/:id", protect, acceptBooking);

router.put("/reject/:id", protect, rejectBooking);

router.get("/worker", protect, async (req, res) => {
  try {
    const bookings = await Booking.find({
      worker: req.user.id,
    }).populate("client");

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/accept/:id", protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking)
      return res.status(404).json({ message: "Not found" });

    booking.status = "accepted";

    await booking.save();

    res.json({ message: "Booking accepted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/reject/:id", protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking)
      return res.status(404).json({ message: "Not found" });

    booking.status = "rejected";

    await booking.save();

    res.json({ message: "Booking rejected" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;