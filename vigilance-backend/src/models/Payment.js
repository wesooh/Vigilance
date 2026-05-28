import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    worker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    category: {
      type: String,
    },

    paymentMode: {
      type: String,
      enum: ["daily", "weekly", "monthly"],
      required: true,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    companyCommission: {
      type: Number,
      required: true,
    },

    workerAmount: {
      type: Number,
      required: true,
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);