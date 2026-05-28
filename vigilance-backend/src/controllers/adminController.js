import User from "../models/User.js";
import Notification from "../models/Notification.js";

export const getPendingWorkers = async (req, res) => {
  try {
    const workers = await User.find({
      role: "worker",
      isApproved: false,
    }).select("-password");

    res.json(workers);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const approveWorker = async (req, res) => {
  try {
    const worker = await User.findById(req.params.id);

    if (!worker) {
      return res.status(404).json({
        message: "Worker not found",
      });
    }

    worker.isApproved = true;

    await worker.save();
    await Notification.create({
  user: worker._id,
  title: "Account Approved",
  message: "Your worker account has been approved",
  type: "approval",
});
    res.json({
      message: "Worker approved successfully",
      worker,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const rejectWorker = async (req, res) => {
  try {
    const worker = await User.findById(req.params.id);

    if (!worker) {
      return res.status(404).json({
        message: "Worker not found",
      });
    }

    await worker.deleteOne();

    res.json({
      message: "Worker rejected and removed",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};