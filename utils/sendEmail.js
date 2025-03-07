import transporter from "../config/emailConfig";
const sendEmail = async (recepientEmail, subject, description) => {
  try {
    let info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: recepientEmail,
      subject: subject,
      html: description,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error occured while sending the mail",
    });
  }
};

export default sendEmail;
