import HotelModel from "../models/HotelModel";

export const getHotelProfile = async (userId) => {
  try {
    const hotel = await HotelModel.findOne({ userId });
    return hotel || null;
  } catch (error) {
    console.error("Error fetching hotel profile:", error);
    return null;
  }
};
