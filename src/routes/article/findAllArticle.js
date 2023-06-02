const { Op } = require("sequelize");
const { models } = require("../../db/sequelize");
const auth = require("../../auth/auth");

module.exports = (app) => {
    app.get("/api/articles", auth, async (req, res) => {
        try {
            // Recherche d'un article par titre
            if (req.query.titre) {
                const titre = req.query.titre;
                const limit = parseInt(req.query.LIMIT) || 5;

                // Vérifier que le terme de recherche contient au moins 2 caractères
                if (titre.length < 2) {
                    const message = "La recherche doit contenir au moins 2 caractères";
                    return res.status(400).json({ message });
                }

                const { count, rows } = await models.article.findAndCountAll({
                    where: {
                        titre_article: {
                            [Op.like]: `%${titre}%`,
                        },
                    },
                    order: ["id_article"],
                    limit: limit,
                });

                const message = `Il y a ${count} article(s) qui correspondent au terme de recherche "${titre}"`;
                return res.json({ message, data: rows });
            }

            // Récupération de tous les articles
            const articles = await models.article.findAll({ order: ["id_article"] });
            const message = `La liste de ${articles.length} articles a été récupérée avec succès`;
            return res.json({ message, data: articles });
        } catch (error) {
            const message = "Une erreur est survenue lors de la récupération de la liste des articles";
            return res.status(500).json({ message, data: error });
        }
    });
};
