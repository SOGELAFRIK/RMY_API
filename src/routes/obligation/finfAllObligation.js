const { Op } = require("sequelize");
const { models } = require("../../db/sequelize");
const auth = require("../../auth/auth");

module.exports = (app) => {
  app.get("/api/obligation", auth, async (req, res) => {
    try {
      // Recherche d'une obligation par titre
      if (req.query.titre) {
        const titre = req.query.titre;
        const limit = parseInt(req.query.LIMIT) || 5;

        // Vérifier que le terme de recherche contient au moins 2 caractères
        if (titre.length < 2) {
          const message = "La recherche doit contenir au moins 2 caractères";
          return res.status(400).json({ message });
        }

        const { count, rows } = await models.obligation.findAndCountAll({
          where: {
            titre: {
              [Op.like]: `%${titre}%`,
            },
          },
          order: ["titre"],
          limit: limit,
        });

        const message = `Il y a ${count} obligation(s) qui correspondent au terme de recherche "${titre}"`;
        return res.json({ message, data: rows });
      }

      // Récupération de toutes les obligations
      const obligation = await models.obligation.findAll({
        order: ["id_obligation"],
      });
      const message = `La liste de ${obligation.length} obligation(s) a été récupérée avec succès`;
      return res.json({ message, data: obligation });
    } catch (error) {
      const message =
        "Une erreur est survenue lors de la récupération de la liste des obligations";
      return res.status(500).json({ message, data: error });
    }
  });
};
