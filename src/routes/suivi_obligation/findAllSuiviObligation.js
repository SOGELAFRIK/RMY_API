const { Op } = require("sequelize");
const { models } = require("../../db/sequelize");
const auth = require("../../auth/auth");

module.exports = (app) => {
    app.get("/api/suivi_obligation", auth, async (req, res) => {
        try {
            // Récupération de toutes les suivi_obligation
            const suivi_obligation = await models.suivi_obligation.findAll({ order: ["id_suivi"] });
            const message = `La liste de ${suivi_obligation.length} suivi_obligation a été récupérée avec succès`;
            return res.json({ message, data: suivi_obligation });
        } catch (error) {
            const message = "Une erreur est survenue lors de la récupération de la liste des suivi_obligation";
            return res.status(500).json({ message, data: error });
        }
    });
};
