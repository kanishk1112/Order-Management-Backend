import OrderModel from "../models/OrderModel";
import TableModel from "../models/TableModel";

export const createOrder = async (req, res, next) => {
  const { tableId, customerId, dishId } = req.body;
  if (!tableId || !customerId || !dishId || !Array.isArray(dishId)) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  const newOrder = await OrderModel.create({ tableId, customerId, dishes });
  const table = await TableModel.findByIdAndUpdate(
    tableId,
    { status: "Occupied" },
    { new: true, runValidators: true }
  );
  res.status(201).json({
    success: true,
    message: "Order created successfully",
    data: newOrder,
  });
};

export const updateOrder = async (req, res, next) => {
  const orderId = req.params.id;
  const updatedData = req.body;
  const currentOrder = await OrderModel.findOne(orderId);

  const order = await OrderModel.findByIdAndUpdate(orderId, updatedData, {
    new: true,
    runValidators: true,
  });
  if (!order) {
    return res.status(404).json({ success: false, message: "No order found" });
  }
  res.status(200).json({
    success: true,
    message: "Order updated successfully",
    data: order,
  });
};

export const deleteOrder = async (req, res, next) => {
  const orderId = req.params.id;
  const order = await OrderModel.findById(orderId);
  if (!order) {
    return res.status(404).json({ success: false, message: "Order not found" });
  }

  await OrderModel.findByIdAndDelete(orderId);
  const table = await TableModel.findByIdAndUpdate(
    order.tableId,
    { status: "Free" },
    { new: true, runValidators: true }
  );
  if (!table) {
    return res.status(200).json({ success: false, message: "Table not found" });
  }
  res.status(200).json({
    success: true,
    message: "Order deleted successfully",
    data: order,
  });
};

export const getAllOrder = async (req, res, next) => {
  const { hotelId } = req.body;
  const orders = await OrderModel.find({ hotelId });
  if (orders.length == 0) {
    return res.status(404).json({
      success: false,
      message: "No Orders",
    });
  }
  res.status(200).json({
    success: true,
    message: "All orders fetched successfully",
    data: orders,
  });
};
