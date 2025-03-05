import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  tableId: {
    type: mongoose.Types.ObjectId,
    ref: "Table",
    required: true,
  },
  customerId: {
    type: mongoose.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  dishId: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Dish",
      required: true,
    },
  ],
  orderStatus: {
    type: String,
    enum: ["Pending", "Preparing", "Completed"],
    default: "Preparing",
  },
  hotelId: {
    type: mongoose.Types.ObjectId,
    ref: "Hotel",
  },
  billId: {
    type: mongoose.Types.ObjectId,
    ref: "Bill",
  },
});

export default mongoose.model("Order", orderSchema);
