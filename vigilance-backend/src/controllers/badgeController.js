import Badge from "../models/Badge.js";
import User from "../models/User.js";
import Notification from "../models/Notification.js";

export const createBadge = async (req, res) => {
  try {
    const badge = await Badge.create(req.body);

    res.status(201).json({
      message: "Badge created successfully",
      badge,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const assignBadge = async (req, res) => {
  try {
    const { workerId, badgeId } = req.body;

    const worker = await User.findById(workerId);

    if (!worker) {
      return res.status(404).json({
        message: "Worker not found",
      });
    }

    // Prevent duplicate badges
    if (
      worker.badges.includes(badgeId)
    ) {
      return res.status(400).json({
        message: "Badge already assigned",
      });
    }

    worker.badges.push(badgeId);

    await worker.save();

    const badge = await Badge.findById(badgeId);

    // Notification
    await Notification.create({
      user: workerId,
      title: "New Badge Earned",
      message: `You received the ${badge.name} badge`,
      type: "admin",
    });

    res.json({
      message: "Badge assigned successfully",
      worker,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getBadges = async (req, res) => {
  try {
    const badges = await Badge.find();

    res.json(badges);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getWorkerBadges = async (req, res) => {
  try {
    const worker = await User.findById(
      req.params.workerId
    ).populate("badges");

    res.json(worker.badges);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

