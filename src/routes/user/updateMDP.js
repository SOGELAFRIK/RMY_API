const jwt = require("jsonwebtoken");
const { models } = require("../../db/sequelize");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

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

const updateUserPassword = async (req, res) => {
  try {
    const { token, mot_de_passe } = req.body;

    // Verify the token
    const decodedToken = jwt.verify(token, "your-secret-key");
    const email = decodedToken.email;

    // Find the user by email
    const user = await models.utilisateur.findOne({ where: { email } });

    // If the user doesn't exist or the reset token doesn't match, return an error
    if (!user || user.reset_token !== token) {
      res.status(400).json({ message: "Invalid token" });
      return;
    }

    // Update the user's password
    const hashedPassword = await bcrypt.hash(mot_de_passe, 10);
    user.mot_de_passe = hashedPassword;
    user.reset_token = null; // Clear the reset token
    await user.save();

    // Send password change email
    const mailOptions = {
      from: "RMY <helitako16@gmail.com>",
      to: email,
      subject: "Modification du mot de passe",
      text: `Votre mot de passe a été modifié avec succès. Si vous n'avez pas effectué cette modification, veuillez nous contacter immédiatement.`,
    };
    await transporter.sendMail(mailOptions);

    const message = "Password updated successfully";
    res.status(200).json({ message });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred", data: error });
  }
};

module.exports = (app) => {
  app.put("/api/reset-password", updateUserPassword);
};
