const { Op } = require("sequelize");
const { models } = require("../../db/sequelize");
const auth = require("../../auth/auth");

module.exports = (app) => {
    app.get("/api/consolidation", auth, async (req, res) => {
        try {
            // Récupération de toutes les consolidation
            const consolidation = await models.consolidation.findAll({ order: ["id_consolidation"] });
            const message = `La liste de ${consolidation.length}consolidation a été récupérée avec succès`;
            return res.json({ message, data: consolidation });
        } catch (error) {
            const message = "Une erreur est survenue lors de la récupération de la liste des consolidation";
            return res.status(500).json({ message, data: error });
        }
    });
};
