const { models } = require("../../db/sequelize");
const auth = require("../../auth/auth");

module.exports = (app) => {
    app.get("/api/periodicite", auth, async (req, res) => {
        try {
            const periodicite = await models.periodicite.findAll({ order: ["id_periodicite"] });
            const message = `La liste de ${periodicite.length} periodicite(s) a été récupérée avec succès`;
            return res.json({ message, data: periodicite });
        } catch (error) {
            const message = "Une erreur est survenue lors de la récupération de la liste des periodicites";
            return res.status(500).json({ message, data: error });
        }
    });
};
