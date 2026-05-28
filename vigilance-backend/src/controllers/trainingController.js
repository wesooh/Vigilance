import Training from "../models/Training.js";
import User from "../models/User.js";
import Notification from "../models/Notification.js";

export const applyTraining = async (req, res) => {
  try {
    const { skillType } = req.body;

    const training = await Training.create({
      user: req.user.id,
      skillType,
    });

    await Notification.create({
      user: req.user.id,
      title: "Training Application Received",
      message: "Your training request is under review",
      type: "admin",
    });

    res.status(201).json({
      message: "Training application submitted",
      training,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getMyTraining = async (req, res) => {
  try {
    const training = await Training.find({
      user: req.user.id,
    });

    res.json(training);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const startTraining = async (req, res) => {
  try {
    const training = await Training.findById(req.params.id);

    if (!training) {
      return res.status(404).json({
        message: "Training not found",
      });
    }

    training.status = "in-progress";
    training.startDate = new Date();

    await training.save();

    await Notification.create({
      user: training.user,
      title: "Training Started",
      message: "Your training has officially started",
      type: "admin",
    });

    res.json({
      message: "Training started",
      training,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const completeTraining = async (req, res) => {
  try {
    const training = await Training.findById(req.params.id);

    if (!training) {
      return res.status(404).json({
        message: "Training not found",
      });
    }

    training.status = "completed";
    training.endDate = new Date();
    training.certified = true;

    await training.save();

    await User.findByIdAndUpdate(training.user, {
      isApproved: true,
    });

    await Notification.create({
      user: training.user,
      title: "Training Completed",
      message: "You are now certified and approved",
      type: "approval",
    });

    res.json({
      message: "Training completed and user certified",
      training,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};