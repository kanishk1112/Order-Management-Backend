import CustomerModel from "../models/CustomerModel";

export const onQrScan = async (req, res, next) => {
  const { customerId } = req.body;
  if (!customerId) {
    return res.status(404).json({
      success: false,
      message: "Customer ID not exits maybe first time user",
      data: { showNameInput: true, showMenu: false },
    });
  }
  return res.status(200).json({
    success: true,
    message: "Customer exits",
    data: { showNameInput: false, showMenu: true },
  });
};

export const createCustomer = async (req, res) => {
  const { name, hotelId, tableId } = req.body;
  if (!name || !hotelId || !tableId) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }
  const newCustomer = await CustomerModel.create({
    name,
    hotelId,
    tableId,
  });
  return res.status(201).json({
    success: true,
    message: "Customer created successfully",
    data: newCustomer,
  });
};
