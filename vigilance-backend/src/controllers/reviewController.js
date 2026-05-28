import Review from "../models/Review.js";
import User from "../models/User.js";
import Notification from "../models/Notification.js";

export const createReview = async (req, res) => {
  try {
    const {
      workerId,
      rating,
      testimonial,
    } = req.body;

    const review = await Review.create({
      client: req.user.id,
      worker: workerId,
      rating,
      testimonial,
    });

    // Calculate average rating
    const reviews = await Review.find({
      worker: workerId,
    });

    const totalRatings = reviews.reduce(
      (sum, item) => sum + item.rating,
      0
    );

    const averageRating =
      totalRatings / reviews.length;

    // Update worker rating
    await User.findByIdAndUpdate(workerId, {
      ratings: averageRating,
    });

    // Notification
    await Notification.create({
      user: workerId,
      title: "New Review",
      message: "You received a new testimonial",
      type: "admin",
    });

    res.status(201).json({
      message: "Review submitted successfully",
      review,
      averageRating,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getWorkerReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      worker: req.params.workerId,
    })
      .populate("client", "firstName lastName profilePicture")
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

