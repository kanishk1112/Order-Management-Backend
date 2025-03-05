import UserModel from "../models/UserModel";
import { getHotelProfile } from "./hotelController";

export const getUserProfile = async (req, res, next) => {
  const userId = req.user;
  if (!userId) {
    return res.status(404).json({
      success: false,
      message: "User not found , token is corrupted",
    });
  }
  const user = await UserModel.findById(userId);
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }
  const hotel = getHotelProfile(userId);
  return res.status(200).json({
    success: true,
    message: "User Profile fetched successfully",
    data: {
      user,
      hotel,
    },
  });
};

export const getAllHotelOwners = async (req, res) => {
  try {
    const hotelOwners = await UserModel.find({ role: "hotelOwner" });

    if (hotelOwners.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No hotel owners found" });
    }

    return res.status(200).json({
      success: true,
      message: "Hotel owners fetched successfully",
      data: hotelOwners,
    });
  } catch (error) {
    console.error("Error fetching hotel owners:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const approveOwner = async (req, res) => {
  const { userId } = req.params;
  try {
    const owner = await UserModel.findByIdAndUpdate(
      userId,
      { isApproved: true },
      { new: true, runValidators: true }
    );
    if (!owner) {
      return res
        .status(404)
        .json({ success: false, message: "Hotel owner not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Hotel owner approved successfully",
      data: owner,
    });
  } catch (error) {
    console.error("Error approving hotel owner:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const rejectOwner = async (req, res) => {
  const { userId } = req.params;
  try {
    const owner = await UserModel.findByIdAndUpdate(
      userId,
      { isApproved: false },
      { new: true, runValidators: true }
    );
    if (!owner) {
      return res
        .status(404)
        .json({ success: false, message: "Hotel owner not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Hotel owner rejected successfully",
      data: owner,
    });
  } catch (error) {
    console.error("Error rejecting hotel owner:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const extendMembership = async (req, res) => {
  const { userId } = req.params;
  const { extensionDays } = req.body;
  try {
    const owner = await UserModel.findById(userId);
    if (!owner) {
      return res
        .status(404)
        .json({ success: false, message: "Hotel owner not found" });
    }
    if (owner.userRole !== "Hotel Owner") {
      return res.status(403).json({
        success: false,
        message: "Only hotel owners can have extended memberships",
      });
    }
    const currentExpiry = owner.expiresAt || Date.now(); // If no expiry, set to current time
    const newExpiry = currentExpiry + extensionDays * 24 * 60 * 60 * 1000; // Convert days to milliseconds
    owner.expiresAt = newExpiry;
    await owner.save();

    return res.status(200).json({
      success: true,
      message: `Membership extended by ${extensionDays} days`,
      newExpiry,
    });
  } catch (error) {
    console.error("Error extending membership:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
