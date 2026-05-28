import User from "../models/User.js";
import Booking from "../models/Booking.js";
import Payment from "../models/Payment.js";
import Contract from "../models/Contract.js";
import Training from "../models/Training.js";

export const getStats = async (req, res) => {
  try {
    const totalClients = await User.countDocuments({
      role: "client",
    });

    const totalWorkers = await User.countDocuments({
      role: "worker",
    });

    const pendingWorkers = await User.countDocuments({
      role: "worker",
      isApproved: false,
    });

    const totalBookings =
      await Booking.countDocuments();

    const totalContracts =
      await Contract.countDocuments();

    const totalTraining =
      await Training.countDocuments();

    const payments = await Payment.find();

    const totalRevenue = payments.reduce(
      (sum, p) => sum + p.totalAmount,
      0
    );

    const companyRevenue = payments.reduce(
      (sum, p) => sum + p.companyCommission,
      0
    );

    res.json({
      users: {
        clients: totalClients,
        workers: totalWorkers,
        pendingWorkers,
      },

      bookings: totalBookings,
      contracts: totalContracts,
      training: totalTraining,

      revenue: {
        totalRevenue,
        companyRevenue,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getRecentActivity = async (req, res) => {
  try {
    const recentBookings = await Booking.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("client worker", "firstName lastName");

    const recentPayments = await Payment.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("client worker", "firstName lastName");

    const recentWorkers = await User.find({
      role: "worker",
    })
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      recentBookings,
      recentPayments,
      recentWorkers,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

