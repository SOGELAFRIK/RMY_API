const { models } = require("../../db/sequelize")
const auth = require("../../auth/auth");
const getUserRole = require("../../auth/getUserRole");

module.exports = (app) => {
    app.get("/api/user/:id", auth(1, getUserRole), async (req, res) => {
      try {
        const { id } = req.params;
        const user = await models.utilisateur.findByPk(id);
        if (user === null) {
          const message = "L'utilisateur demandé n'existe pas";
          res.status(404).json({ message });
        } else {
          const message = `L'utilisateur avec l'identifiant n°${user.id_utilisateur} a été trouvé avec succès`;
          res.status(200).json({ message, data: user });
        }
      } catch (error) {
        const message =
          "Une erreur est survenue lors de la récupération de l'utilisateur";
        res.status(500).json({ message, data: error });
      }
    });
}
