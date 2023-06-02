const { ValidationError, UniqueConstraintError } = require("sequelize");
const { models } = require("../../db/sequelize");
const bcrypt = require("bcrypt");
const auth = require("../../auth/auth");
const getUserRole = require("../../auth/getUserRole");
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

const createUser = async (req, res) => {
  try {
    // Generate a random password reset token
    const resetToken = jwt.sign(
      { email: req.body.email },
      "your-secret-key",
      { expiresIn: "1h" } // Set the expiration time for the token
    );

    // Create the user without storing the password
    const user = await models.utilisateur.create({
      nom: req.body.nom,
      prenom: req.body.prenom,
      fonction: req.body.fonction,
      email: req.body.email,
      reset_token: resetToken, // Store the reset token in the database
      id_entite: req.body.id_entite,
      role_id: req.body.role_id,
    });

    // Send an email to the user with the password reset link
    const resetLink = `http://localhost:4000/reset-password?token=${resetToken}`;
    const mailOptions = {
      from: "RMY <helitako16@gmail.com>",
      to: req.body.email,
      subject: "Password Reset",
      text: `Click the following link to reset your password: ${resetLink}`,
    };
    await transporter.sendMail(mailOptions);

    const message = `L'utilisateur ${req.body.nom} a été créé avec succès, consulter votre boite mail pour céer votre mot de passe et vous connecté`;
    console.log(user.toJSON());
    res.status(201).json({ message, data: user });
  } catch (error) {
    if (
      error instanceof ValidationError ||
      error instanceof UniqueConstraintError
    ) {
      res.status(400).json({ message: error.message, data: error });
      return;
    }
    const message = `L'utilisateur ${req.body.nom} n'a pas été créé avec succès`;
    res.status(500).json({ message, data: error });
  }
};

/**
 * Creates a new user through an HTTP POST request to the '/api/user' endpoint,
 * using the provided 'app' object and 'auth' middleware.
 *
 * @param {Object} app - The Express app object.
 * @return {void}
 */
module.exports = (app) => {
  app.post("/api/user", auth(1, getUserRole), createUser);
};
