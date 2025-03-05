import HotelModel from "../models/HotelModel";
import TableModel from "../models/TableModel";

export const createTable = async (req, res, next) => {
  const user = req.user;
  const userId = user._id;
  if (!userId) {
    req.status(404).json({
      success: false,
      message: "User not found",
    });
  }
  const hotel = await HotelModel.findOne({ userId });
  if (!hotel) {
    req.status(404).json({
      success: false,
      message: "Hotel not found",
    });
  }

  const tableData = {
    ...req.body,
    hotelId: hotel._id,
  };
  const table = await TableModel.create(tableData);
  res.status(201).json({
    success: true,
    message: "Table created successfully",
    data: table,
  });
};

export const updateTable = async (req, res, next) => {
  const tableId = req.params.tableId;
  if (!tableId) {
    res.status(400).json({ success: false, message: "Table not found" });
  }
  const updateData = req.body;
  const table = await TableModel.findByIdAndUpdate(tableId, updateData, {
    new: true,
    runValidators: true,
  });
  res.status(201).json({
    success: true,
    message: "Table updated successfully",
    data: table,
  });
};

export const getAllTables = async (req, res, next) => {
  const userId = req.user._id;
  const hotel = await HotelModel.findOne({ userId });
  if (!hotel) {
    return res.status(404).json({
      success: false,
      message: "Hotel not found",
    });
  }
  const allTables = await TableModel.find({ hotelId: hotel._id });
  res.status(201).json({
    success: true,
    message: "All Tables fetched successfully",
    data: allTables,
  });
};

export const deleteTable = async (req, res, next) => {
  const tableId = req.params.tableId;
  const deletedTable = await TableModel.findByIdAndDelete(tableId);
  if (!deletedTable) {
    return res.status(404).json({
      success: false,
      message: "Table not found",
    });
  }

  res.status(201).json({
    success: true,
    message: "Table delete successfully",
  });
};
