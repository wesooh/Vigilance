import User from "../models/User.js";

export const getWorkers = async (req, res) => {
  try {
    const workers = await User.find({ role: "worker" })
      .populate("category")
      .select("-password");

    res.json(workers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const searchWorkers = async (req, res) => {
  try {
    const { q } = req.query;

    const workers = await User.find({
      role: "worker",
      firstName: { $regex: q, $options: "i" },
    })
      .populate("category")
      .select("-password");

    res.json(workers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getNearbyWorkers = async (req, res) => {
  try {
    const { lat, lng, distance = 10 } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({ message: "Location required" });
    }

    const workers = await User.find({
      role: "worker",
      locationCoords: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(lng), parseFloat(lat)],
          },
          $maxDistance: distance * 1000, // km to meters
        },
      },
    })
      .populate("category")
      .select("-password");

    res.json(workers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};