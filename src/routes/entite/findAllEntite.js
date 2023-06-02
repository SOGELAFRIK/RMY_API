const { Op } = require("sequelize");
const { models } = require("../../db/sequelize");
const auth = require("../../auth/auth");

module.exports = (app) => {
    app.get("/api/entite", auth, async (req, res) => {
        try {
            // Recherche d'une entité par nom
            if (req.query.nom) {
                const nom = req.query.nom;
                const limit = parseInt(req.query.LIMIT) || 5;

                // Vérifier que le terme de recherche contient au moins 2 caractères
                if (nom.length < 2) {
                    const message = "La recherche doit contenir au moins 2 caractères";
                    return res.status(400).json({ message });
                }

                const { count, rows } = await models.entité.findAndCountAll({
                    where: {
                        nom: {
                            [Op.like]: `%${nom}%`,
                        },
                    },
                    order: ["nom"],
                    limit: limit,
                });

                const message = `Il y a ${count} entité(s) qui correspondent au terme de recherche "${nom}"`;
                return res.json({ message, data: rows });
            }

            // Récupération de toutes les entités
            const entite = await models.entité.findAll({ order: ["id_entite"] });
            const message = `La liste de ${entite.length} entités a été récupérée avec succès`;
            return res.json({ message, data: entite });
        } catch (error) {
            const message = "Une erreur est survenue lors de la récupération de la liste des entité";
            return res.status(500).json({ message, data: error });
        }
    });
};
