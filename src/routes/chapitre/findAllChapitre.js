const { Op } = require("sequelize");
const { models } = require("../../db/sequelize");
const auth = require("../../auth/auth");
const getUserRole = require("../../auth/getUserRole");

module.exports = (app) => {
  // Recherche d'un chapitre par titre_chapitre
  app.get(
    "/api/chapitres/titre/:titre_chapitre",
    auth(1, getUserRole),
    async (req, res) => {
      const { titre_chapitre } = req.params;

      try {
        const chapitre = await models.chapitre.findOne({
          where: { titre_chapitre: { [Op.like]: `%${titre_chapitre}%` } },
        });

        if (!chapitre) {
          const message = "Aucun chapitre trouvé avec ce titre";
          return res.status(404).json({ message });
        }

        const message = `Le chapitre avec le titre "${chapitre.titre_chapitre}" a été trouvé avec succès`;
        return res.status(200).json({ message, data: chapitre });
      } catch (error) {
        const message =
          "Une erreur est survenue lors de la recherche du chapitre";
        return res.status(500).json({ message, data: error });
      }
    }
  );

  // Obtention de la liste complète des chapitres
  app.get("/api/chapitres", auth, async (req, res) => {
    try {
      const chapitres = await models.chapitre.findAll();

      if (chapitres.length === 0) {
        const message = "Aucun chapitre trouvé dans la base de données";
        return res.status(404).json({ message });
      }

      const message = `Liste complète des chapitres`;
      return res.status(200).json({ message, data: chapitres });
    } catch (error) {
      const message = "Une erreur est survenue lors de l'obtention de la liste des chapitres";
      return res.status(500).json({ message, data: error });
    }
  });
};
