const { Op } = require("sequelize");
const { models } = require("../../db/sequelize");
const auth = require("../../auth/auth");

module.exports = (app) => {
  app.get("/api/texte", auth, async (req, res) => {
    try {
      // Recherche d'un texte par titre
      if (req.query.titre_texte) {
        const titre = req.query.titre_texte;
        const limit = parseInt(req.query.LIMIT) || 5;

        // Vérifier que le terme de recherche contient au moins 2 caractères
        if (titre.length < 2) {
          const message = "La recherche doit contenir au moins 2 caractères";
          return res.status(400).json({ message });
        }

        const { count, rows } = await models.texte.findAndCountAll({
          where: {
            titre_texte: {
              [Op.like]: `%${titre}%`,
            },
          },
          order: ["id_texte"],
          limit: limit,
        });

        const message = `Il y a ${count} texte(s) qui correspondent au terme de recherche "${titre}"`;
        return res.json({ message, data: rows });
      }

      // Récupération de tous les textes
      const textes = await models.texte.findAll({ order: ["id_texte"] });
      const message = `La liste de ${textes.length} textes a été récupérée avec succès`;
      return res.json({ message, data: textes });
    } catch (error) {
      const message =
        "Une erreur est survenue lors de la récupération de la liste des textes";
      return res.status(500).json({ message, data: error });
    }
  });
};
