import mongoose from "mongoose";

const tableSchema = new mongoose.Schema({
  tableNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  QR: {
    type: String, // Assuming it's a URL or code
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    enum: ["Free", "Occupied"],
    default: "Free",
  },
  hotelId: {
    type: mongoose.Types.ObjectId,
    ref: "Hotel",
  },
});

export default mongoose.model("Table", tableSchema);
