const { models } = require("../../db/sequelize");
const auth = require("../../auth/auth");

module.exports = (app) => {
    app.delete("/api/periodicite/:id", auth, async (req, res) => {
        const { id } = req.params;

        try {
            const periodicity = await models.periodicite.findByPk(id);
            if (!periodicity) {
                const message = "La periodicite demandée n'existe pas";
                return res.status(404).json({ message });
            }

            await periodicity.destroy();

            const message = `La periodicite avec l'identifiant n°${id} a été supprimée avec succès`;
            return res.status(200).json({ message });
        } catch (error) {
            const message = "Une erreur est survenue lors de la suppression de La periodicite";
            return res.status(500).json({ message, data: error });
        }
    });
};
