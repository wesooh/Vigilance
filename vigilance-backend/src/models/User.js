import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["client", "worker", "admin"],
      required: true,
    },

    firstName: String,
    lastName: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: String,

    phone: String,
    otp: String,
    isVerified: {
      type: Boolean,
      default: false,
    },

    // ==========================================
    // WORKER ONLY FIELDS
    // ==========================================
    idNumber: {
      type: String,
      required: function() { return this.role === "worker"; }
    },
    idPhoto: String,
    cvFile: String,
    certifications: [String],
    portfolioFiles: [String],
    about: String,
    skills: [String], 
    experience: String,
    ratings: {
      type: Number,
      default: 0,
    },
    isApproved: {
      type: Boolean,
      default: false, 
    },
    category: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Category",
},

isOnline: {
  type: Boolean,
  default: false,
},

isVerified: {
  type: Boolean,
  default: false,
},

otp: String,
otpExpires: Date,

rateDaily: Number,
rateWeekly: Number,
rateMonthly: Number,

locationCoords: {
  type: {
    type: String,
    enum: ["Point"],
    default: "Point",
  },
  
  coordinates: {
    type: [Number], // [longitude, latitude]  
    default: [0, 0],
  },
},

badges: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Badge",
  },
],
  
    // ==========================================
    // CLIENT ONLY FIELDS
    // ==========================================
    location: {
      type: String,
      required: function() { return this.role === "client"; }
    },
    status: {
      type: String,
      enum: ["active", "inactive", "pending"],
      default: "active"
    },
    kids: {
      type: Number,
      default: 0
    },
    paymentInfo: {
      method: String,     // e.g., "card", "paypal", "mpesa"
      customerId: String  // Gateway reference token
    }
  },
  { timestamps: true }
);
userSchema.index({ locationCoords: "2dsphere" });
//userSchema.index({ location: "2dsphere" });

export default mongoose.model("User", userSchema);
