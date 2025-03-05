import mongoose from "mongoose";

const billSchema = new mongoose.Schema({
  tableId: {
    type: mongoose.Types.ObjectId,
    ref: "Table",
    required: true,
  },
  hotelId: {
    type: mongoose.Types.ObjectId,
    ref: "Hotel",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  customerName: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    default: "unpaid",
    enums: ["unpaid", "paid"],
  },
});

export default mongoose.model("Bill", billSchema);
