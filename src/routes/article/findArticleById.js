const { Op } = require("sequelize");
const { models } = require("../../db/sequelize");
const auth = require("../../auth/auth");

module.exports = (app) => {
    app.get("/api/article/:id", auth, async (req, res) => {
        const { id } = req.params;

        try {
            const article = await models.article.findByPk(id);
            if (!article) {
                const message = "L'article demandé n'existe pas";
                return res.status(404).json({ message });
            }
            const message = `L'article avec l'id ${id} a été trouvé avec succès`;
            return res.status(200).json({ message, data: article });
        } catch (error) {
            const message = "Une erreur est survenue lors de la recherche de l'article";
            return res.status(500).json({ message, data: error });
        }
    });
};
