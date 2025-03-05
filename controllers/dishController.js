import DishModel from "../models/DishModel";
import HotelModel from "../models/HotelModel";

export const createDish = async (req, res, next) => {
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
    res.status(400).json({
      success: false,
      message: "Hotel not found",
    });
  }

  const dishData = {
    ...req.body,
    hotelId: hotel._id,
  };
  const dish = await DishModel.create(dishData);
  res.status(201).json({
    success: true,
    message: "Dish created successfully",
    data: dish,
  });
};

export const updateDish = async (req, res, next) => {
  const dishId = req.params.dishId;
  if (!dishId) {
    res.status(400).json({ success: false, message: "Dish not found" });
  }
  const updateData = req.body;
  const dish = await DishModel.findByIdAndUpdate(dishId, updateData, {
    new: true,
    runValidators: true,
  });
  res.status(201).json({
    success: true,
    message: "Dish updated successfully",
    data: dish,
  });
};

export const getAllDishes = async (req, res, next) => {
  const userId = req.user._id;
  const hotel = await HotelModel.findOne({ userId });
  if (!hotel) {
    return res.status(404).json({
      success: false,
      message: "Hotel not found",
    });
  }
  const allDishes = await DishModelModel.find({ hotelId: hotel._id });
  res.status(201).json({
    success: true,
    message: "All Tables fetched successfully",
    data: allDishes,
  });
};

export const deleteDish = async (req, res, next) => {
  const dishId = req.params.dishId;
  const deletedDish = await DishModel.findByIdAndDelete(dishId);
  if (!deletedDish) {
    return res.status(404).json({
      success: false,
      message: "Dish not found",
    });
  }
  res.status(201).json({
    success: true,
    message: "Dish delete successfully",
  });
};
