import User from "../models/User.js";

export const toggleAvailability = async (req, res) => {
  try {
    const worker = await User.findById(req.user.id);

    if (!worker) {
      return res.status(404).json({
        message: "Worker not found",
      });
    }

    if (worker.role !== "worker") {
      return res.status(403).json({
        message: "Only workers can change availability",
      });
    }

    worker.isOnline = !worker.isOnline;

    await worker.save();

    res.json({
      message: worker.isOnline
        ? "Worker is now online"
        : "Worker is now offline",

      isOnline: worker.isOnline,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getOnlineWorkers = async (req, res) => {
  try {
    const workers = await User.find({
      role: "worker",
      isOnline: true,
      isApproved: true,
    })
      .populate("category")
      .populate("badges")
      .select("-password");

    res.json(workers);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

