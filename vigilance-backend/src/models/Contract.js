import mongoose from "mongoose";

const contractSchema = new mongoose.Schema(
  {
    worker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    type: {
      type: String,
      enum: ["training_sponsored", "loan_based"],
      required: true,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    paidAmount: {
      type: Number,
      default: 0,
    },

    remainingAmount: {
      type: Number,
      required: true,
    },

    durationYears: {
      type: Number,
      default: 5,
    },

    startDate: {
      type: Date,
      default: Date.now,
    },

    endDate: Date,

    status: {
      type: String,
      enum: ["active", "completed", "breached"],
      default: "active",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Contract", contractSchema);