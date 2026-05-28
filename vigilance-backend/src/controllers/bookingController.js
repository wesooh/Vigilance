import Booking from "../models/Booking.js";
import Notification from "../models/Notification.js";

export const createBooking = async (req, res) => {
  try {
    const {
      workerId,
      category,
      bookingDate,
      paymentMode,
      amount,
    } = req.body;

    const booking = await Booking.create({
      client: req.user.id,
      worker: workerId,
      category,
      bookingDate,
      paymentMode,
      amount,
    });

    await Notification.create({
      user: workerId,
      title: "New Booking Request",
      message: "You received a new booking request",
      type: "booking",
    });

    res.status(201).json({
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getClientBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      client: req.user.id,
    })
      .populate("worker", "firstName lastName")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getWorkerBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      worker: req.user.id,
    })
      .populate("client", "firstName lastName")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const acceptBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    booking.status = "accepted";

    await booking.save();

    await Notification.create({
      user: booking.client,
      title: "Booking Accepted",
      message: "Your booking request was accepted",
      type: "booking",
    });

    res.json({
      message: "Booking accepted",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const rejectBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    booking.status = "rejected";

    await booking.save();

    await Notification.create({
      user: booking.client,
      title: "Booking Rejected",
      message: "Your booking request was rejected",
      type: "booking",
    });

    res.json({
      message: "Booking rejected",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

