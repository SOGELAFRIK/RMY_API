const { models } = require("../../db/sequelize");
const auth = require("../../auth/auth");

module.exports = (app) => {
    app.delete("/api/riqueLevel/:id", auth, async (req, res) => {
        const { id } = req.params;

        try {
            const riqueLevel = await models.niveau_risque.findByPk(id);
            if (!riqueLevel) {
                const message = "Le niveau de risque demandée n'existe pas";
                return res.status(404).json({ message });
            }

            await riqueLevel.destroy();

            const message = `Le niveau de risque avec l'identifiant n°${id} a été supprimée avec succès`;
            return res.status(200).json({ message });
        } catch (error) {
            const message = "Une erreur est survenue lors de la suppression du periodicite";
            return res.status(500).json({ message, data: error });
        }
    });
};
