import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  hotelId: {
    type: mongoose.Types.ObjectId,
    ref: "Hotel",
  },
});

export default mongoose.model("Category", categorySchema);
