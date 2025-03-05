import OrderModel from "../models/OrderModel";
import HotelModel from "../models/HotelModel";
import TableModel from "../models/TableModel";
import BillModel from "../models/BillModel";

export const generateBill = async (req, res, next) => {
  const { customerId, hotelId, tableId } = req.body;
  const customer = await CustomerModel.findById(customerId);
  if (!customer) {
    return res
      .status(404)
      .json({ success: false, message: "Customer not found" });
  }
  const allOrders = await OrderModel.find({ customerId });
  if (allOrders.length === 0) {
    return res
      .status(404)
      .json({ message: "No orders found for this customer" });
  }

  let totalAmount = 0;
  let allItems = [];
  let totalItems = 0;
  allOrders.forEach((order) => {
    order.dishId.forEach((dish) => {
      totalAmount += dish.amount * dish.quantity;
      totalItems += dish.quantity;
      allItems.push(dish);
    });
  });
  const hotel = await HotelModel.findById(hotelId);
  const table = await TableModel.findById(tableId);
  if (!hotel || !table) {
    return res
      .status(404)
      .json({ success: false, message: "Hotel or table not found" });
  }
  const billData = {
    tableId,
    amount: totalAmount,
    status: "unpaid",
    hotelId,
    customerName: customer.name,
  };
  const bill = await BillModel.create(billData);
  return res.status(200).json({
    success: true,
    message: "Bill generated Successfully",
    data: {
      bill,
      totalItems,
      totalItems,
      hotelName: hotel.name,
      table,
      customerName: customer.name,
    },
  });
};

export const payBill = async (req, res, next) => {
  const { billId } = req.params;
  const bill = await BillModel.findById(billId);
  if (!bill) {
    return res.status(404).json({ success: false, message: "Bill not found" });
  }
  if (bill.status == "Paid") {
    return res
      .status(200)
      .json({ success: true, message: "Bill already paid" });
  }
  await TableModel.findByIdAndUpdate(bill.tableId, { status: "Free" });
  await CustomerModel.findOneAndDelete({ _id: bill.customerId });

  const paidBill = await BillModel.findByIdAndUpdate(
    billId,
    { status: "paid" },
    { new: true, runValidators: true }
  );
  return res.status(200).json({
    success: true,
    message: "Bill paid successfully",
    data: paidBill,
  });
};

export const getAllBills = async (req, res, next) => {
  const { hotelId } = req.params;
  const allBills = await BillModel.find({ hotelId });
  if (allBills.length == 0) {
    return res
      .status(404)
      .json({ success: false, message: "Bills are not available" });
  }
  return res
    .status(200)
    .json({
      success: true,
      message: "All bills fetched successfully",
      data: allBills,
    });
};
