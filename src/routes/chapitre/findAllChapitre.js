const { Op } = require("sequelize");
const { models } = require("../../db/sequelize");
const auth = require("../../auth/auth");
const getUserRole = require("../../auth/getUserRole");

module.exports = (app) => {
  // Obtention de la liste complète des chapitres
  app.get("/api/chapitres", auth(1, getUserRole), async (req, res) => {
    try {
      const chapitres = await models.chapitre.findAll();

      if (chapitres.length === 0) {
        const message = "Aucun chapitre trouvé dans la base de données";
        return res.status(404).json({ message });
      }

      const message = `Liste complète des chapitres`;
      return res.status(200).json({ message, data: chapitres });
    } catch (error) {
      const message =
        "Une erreur est survenue lors de l'obtention de la liste des chapitres";
      return res.status(500).json({ message, data: error });
    }
  });
};
