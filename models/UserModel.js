import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  phone: {
    type: Number,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  userRole: {
    type: String,
    required: true,
    enum: ["Super-Admin", "Hotel Owner"],
  },
  expiresAt: {
    type: Number,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  otpDetails: {
    value: { type: Number, default: null },
    expiry: { type: Date, default: null },
  },
});

export default mongoose.model("user", userSchema);
