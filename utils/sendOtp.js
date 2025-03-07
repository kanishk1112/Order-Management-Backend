import UserModel from "../models/UserModel.js";
import sendEmail from "./sendEmail.js";

export const SendOtp = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required for resending the OTP.",
      });
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }
    user.otpDetails.value = null;
    user.otpDetails.expiry = null;
    const newOtp = Math.floor(100000 + Math.random() * 900000);
    user.otpDetails.value = newOtp;
    user.otpDetails.expiry = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    const subject = "Your OTP Code";
    const description = `<p>Your OTP code is <strong>${newOtp}</strong>. It will expire in 10 minutes.</p>`;
    await sendEmail(user.email, subject, description);

    return res
      .status(200)
      .json({ success: true, message: "OTP has been resent successfully." });
  } catch (error) {
    console.error("Error in reSendOtp:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const verifyOtp = async (req, res, next) => {
  const { otp } = req.body;
  const user = await UserModel.findOne({ _id: req.user._id });
  if (
    !user ||
    !user.otpDetails.value == otp ||
    user.otpDetails.expiry < Date.now()
  ) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }
  user.otpDetails.value = null;
  user.otpDetails.expiry = null;
  await user.save();

  return res
    .status(200)
    .json({ success: true, message: "OTP verified successfully" });
};
