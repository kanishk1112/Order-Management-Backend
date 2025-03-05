import CategoryModel from "../models/CategoryModel";
import HotelModel from "../models/HotelModel";

export const createCategory = async (req, res, next) => {
  const userId = req.user._id;
  const hotel = await HotelModel.findOne({ userId });
  if (!hotel) {
    return res.status(404).json({
      success: false,
      message: "Hotel not found",
    });
  }
  const createData = { ...req.body, hotel: hotel._id };
  const newCategory = await CategoryModel.create(createData);
  res.status(200).json({
    success: true,
    message: "Category created successfully",
    data: newCategory,
  });
};

export const getAllCategories = async (req, res, next) => {
  const userId = req.user._id;
  const hotel = await HotelModel.findOne({ userId });
  if (!hotel) {
    return res.status(404).json({
      success: false,
      message: "Hotel not found",
    });
  }
  const categories = await CategoryModel.find({ hotel: hotel._id });
  res.status(200).json({
    success: true,
    message: "Categories fetched successfully",
    data: categories,
  });
};

export const deleteCategory = async (req, res, next) => {
  const categoryId = req.params.categoryId;
  const deletedCategory = await CategoryModel.findByIdAndDelete(categoryId);
  if (!deletedCategory) {
    return res.status(404).json({
      success: false,
      message: "Category not found",
    });
  }
  res.status(200).json({
    success: true,
    message: "Category deleted successfully",
  });
};

export const updateCategory = async (req, res, next) => {
  const categoryId = req.params.categoryId;
  const updateData = req.body;
  const updatedCategory = await CategoryModel.findByIdAndUpdate(
    categoryId,
    updateData,
    { new: true, runValidators: true }
  );
  if (!updatedCategory) {
    return res.status(404).json({
      success: false,
      message: "Category not found",
    });
  }
  res.status(200).json({
    success: true,
    message: "Category updated successfully",
    data: updatedCategory,
  });
};
