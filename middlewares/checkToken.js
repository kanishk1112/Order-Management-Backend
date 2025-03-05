import jwt from "jsonwebtoken";
import UserModel from "../models/UserModel";

export const authenticateToken = async (req, res, next) => {
  const token = res.cookies.token;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access denied. No token provided.",
    });
  }
  try {
    const decoeded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = await UserModel.findById(decoeded.userId).select("-password");
    next();
  } catch (error) {
    res.status(400).json({ status: "failed", message: "Invalid token." });
  }
};
