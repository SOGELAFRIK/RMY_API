const { ValidationError } = require("sequelize");
const { models } = require("../../db/sequelize");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "helitako16@gmail.com",
    pass: "eorqyfllrrmidyxo",
  },
});

const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if the user exists
    const user = await models.utilisateur.findOne({ where: { email } });
    if (!user) {
      res.status(400).json({ message: "User not found" });
      return;
    }

    // Generate a password reset token
    const resetToken = jwt.sign(
      { email },
      "your-secret-key",
      { expiresIn: "1h" } // Set the expiration time for the token
    );

    // Update the user's reset token in the database
    user.reset_token = resetToken;
    await user.save();

    // Send an email to the user with the password reset link
    const resetLink = `http://localhost:4000/reset-password?token=${resetToken}`;
    const mailOptions = {
      from: "RMY <helitako16@gmail.com>",
      to: email,
      subject: "Password Reset Request",
      text: `Click the following link to reset your password: ${resetLink}`,
    };
    await transporter.sendMail(mailOptions);

    const message = "Password reset email sent";
    res.status(200).json({ message });
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(400).json({ message: error.message });
      return;
    }
    res.status(500).json({ message: "An error occurred", error });
  }
};

module.exports = (app) => {
  app.post("/api/forgot-password", requestPasswordReset);
};
