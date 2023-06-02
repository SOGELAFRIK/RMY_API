const { models } = require("../../db/sequelize");
const auth = require("../../auth/auth");

module.exports = (app) => {
    app.delete("/api/entite/:id", auth, async (req, res) => {
        const { id } = req.params;

        try {
            const entite = await models.entité.findByPk(id);
            if (!entite) {
                const message = "L'entité demandée n'existe pas";
                return res.status(404).json({ message });
            }

            await entite.destroy();

            const message = `L'entité avec l'identifiant n°${id} a été supprimée avec succès`;
            return res.status(200).json({ message });
        } catch (error) {
            const message = "Une erreur est survenue lors de la suppression de l'entité";
            return res.status(500).json({ message, data: error });
        }
    });
};
