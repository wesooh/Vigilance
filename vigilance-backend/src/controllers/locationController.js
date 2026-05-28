import User from "../models/User.js";

export const updateLocation = async (req, res) => {
  try {
    const { latitude, longitude } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.location = {
      type: "Point",
      coordinates: [longitude, latitude],
    };

    await user.save();

    res.json({
      message: "Location updated",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getNearbyWorkers = async (req, res) => {
  try {
    const { longitude, latitude, distance = 5 } =
      req.query;

    const workers = await User.find({
      role: "worker",
      isApproved: true,
      isOnline: true,
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [
              parseFloat(longitude),
              parseFloat(latitude),
            ],
          },
          $maxDistance: distance * 1000, // km → meters
        },
      },
    }).select("-password");

    res.json(workers);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

