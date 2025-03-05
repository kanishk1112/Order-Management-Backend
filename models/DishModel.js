import mongoose from "mongoose";

const dishSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  categoryId: {
    type: mongoose.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  logo: {
    type: String, // Assuming it's a URL or image path
    required: true,
  },
  availability: {
    type: Boolean,
    default: true,
  },
  hotelId: {
    type: mongoose.Types.ObjectId,
    ref: "Hotel",
    required: true,
  },
});

export default mongoose.model("Dish", dishSchema);
