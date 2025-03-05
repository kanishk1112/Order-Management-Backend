import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  table: {
    type: mongoose.Types.ObjectId,
    ref: "Table",
    required: true,
  },
  hotel: {
    type: mongoose.Types.ObjectId,
    ref: "Hotel",
    required: true,
  },
});

export default mongoose.model("Customer", customerSchema);
