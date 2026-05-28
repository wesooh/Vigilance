import express from "express";
import { getProfile, updateProfile } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import User from "../models/User.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);

router.get("/workers/pending", protect, adminOnly, async (req, res) => {
  try {
    const workers = await User.find({
      role: "worker",
      isApproved: false,
    }).select("-password");

    res.json(workers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/approve/:id", protect, adminOnly, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, {
      isApproved: true,
    });

    res.json({ message: "Worker approved" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/reject/:id", protect, adminOnly, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    res.json({ message: "Worker rejected" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get("/all", protect, async (req, res) => {
  try {
    const users = await User.find({
      _id: { $ne: req.user.id }, // exclude self
    }).select("-password");

    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;