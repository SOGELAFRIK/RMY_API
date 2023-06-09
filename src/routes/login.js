const { models } = require("../db/sequelize");
const bcrypt = require("bcrypt");
const privateKey = require("../auth/private_key");
const jwt = require("jsonwebtoken");

module.exports = (app) => {
  app.post("/api/login", async (req, res) => {
    await models.utilisateur
      .findOne({ where: { email: req.body.email } })
      .then(async (user) => {
        if (!user) {
          const message = "L'utilisateur demandé n'existe pas !";
          return res.status(404).json({ message });
        }

        await bcrypt
          .compare(req.body.mot_de_passe, user.mot_de_passe)
          .then((isPasswordValid) => {
            if (!isPasswordValid) {
              const message = `Le mot de passe entré est incorrect`;
              return res.status(401).json({ message });
            }
            // jwt
            const token = jwt.sign(
              { userId: user.id_utilisateur },
              privateKey,
              { expiresIn: "24h" }
            );

            const message = `L'utilisateur a été connecté avec succès`;

            return res.status(200).json({ message, data: user, token });
          });
      })
      .catch((error) => {
        const message =
          "L'utilisateur n'a pas pu être connecté. Réessayez dans quelques instants";
        return res.status(500).json({ message, data: error });
      });
  });
};
