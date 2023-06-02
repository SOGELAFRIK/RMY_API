const { Op } = require("sequelize");
const { models } = require("../../db/sequelize");
const auth = require("../../auth/auth");

module.exports = (app) => {
    app.get("/api/chapitre/:id", auth, async (req, res) => {
        const { id } = req.params;

        try {
            const chapitre = await models.chapitre.findByPk(id);
            if (!chapitre) {
                const message = "Le chapitre demandé n'existe pas";
                return res.status(404).json({ message });
            }
            const message = `Le chapitre avec l'id ${id} a été trouvé avec succès`;
            return res.status(200).json({ message, data: chapitre });
        } catch (error) {
            const message = "Une erreur est survenue lors de la recherche du chapitre";
            return res.status(500).json({ message, data: error });
        }
    });
};
