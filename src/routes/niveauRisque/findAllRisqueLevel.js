const { models } = require("../../db/sequelize");
const auth = require("../../auth/auth");

module.exports = (app) => {
    app.get("/api/riqueLevel", auth, async (req, res) => {
        try {
            const riqueLevel = await models.niveau_risque.findAll({ order: ["id_niveau_risque"] });
            const message = `La liste des ${riqueLevel.length} niveaux de riques a été récupérée avec succès`;
            return res.json({ message, data: riqueLevel });
        } catch (error) {
            const message = "Une erreur est survenue lors de la récupération de la liste des niveaux de risque";
            return res.status(500).json({ message, data: error });
        }
    });
};
