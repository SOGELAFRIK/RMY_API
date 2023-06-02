const { ValidationError } = require("sequelize");
const { models } = require("../../db/sequelize");
const auth = require("../../auth/auth");

module.exports = (app) => {
  app.get("/api/texte/:id", async (req, res) => {
    const { id } = req.params;

    try {
      const texte = await models.texte.findByPk(id, {
        include: [{ model: models.utilisateur, as: "createur" }],
      });

      if (!texte) {
        const message = "Le texte demandé n'existe pas";
        return res.status(404).json({ message });
      }

      return res.status(200).json({ data: texte });
    } catch (error) {
      if (error instanceof ValidationError) {
        return res.status(400).json({ message: error.message, data: error });
      }
      const message =
        "Une erreur est survenue lors de la récupération du texte";
      return res.status(500).json({ message, data: error });
    }
  });
};
