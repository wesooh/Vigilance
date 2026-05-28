import Payment from "../models/Payment.js";
import User from "../models/User.js";
import Notification from "../models/Notification.js";
import Booking from "../models/Booking.js";


export const createPayment = async (req, res) => {
  try {
    const {
      workerId,
      paymentMode,
      totalAmount,
      category,
    } = req.body;

    const worker = await User.findById(workerId);

    if (!worker) {
      return res.status(404).json({
        message: "Worker not found",
      });
    }

    // 25% company commission
    const companyCommission = totalAmount * 0.25;

    // Worker receives 75%
    const workerAmount = totalAmount - companyCommission;

    const payment = await Payment.create({
      client: req.user.id,
      worker: workerId,
      category,
      paymentMode,
      totalAmount,
      companyCommission,
      workerAmount,
    });
    await Notification.create({
  user: workerId,
  title: "Payment Received",
  message: "A payment has been created for your work",
  type: "payment",
});
    res.status(201).json({
      message: "Payment created successfully",
      payment,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getClientPayments = async (req, res) => {
  try {
    const payments = await Payment.find({
      client: req.user.id,
    })
      .populate("worker", "firstName lastName")
      .sort({ createdAt: -1 });

    res.json(payments);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getWorkerPayments = async (req, res) => {
  try {
    const payments = await Payment.find({
      worker: req.user.id,
    })
      .populate("client", "firstName lastName")
      .sort({ createdAt: -1 });

    res.json(payments);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getCompanyRevenue = async (req, res) => {
  try {
    const payments = await Payment.find();

    const totalRevenue = payments.reduce(
      (sum, p) => sum + p.companyCommission,
      0
    );

    res.json({
      totalRevenue,
      payments,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};