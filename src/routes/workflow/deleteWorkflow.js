const { models } = require("../../db/sequelize");
const auth = require("../../auth/auth");

module.exports = (app) => {
    app.delete("/api/workflow/:id", auth, async (req, res) => {
        const { id } = req.params;

        try {
            const workflow = await models.workflow.findByPk(id);
            if (!workflow) {
                const message = "Le workflow demandée n'existe pas";
                return res.status(404).json({ message });
            }

            await workflow.destroy();

            const message = `Le workflow avec l'identifiant n°${id} a été supprimée avec succès`;
            return res.status(200).json({ message });
        } catch (error) {
            const message = "Une erreur est survenue lors de la suppression du workflow";
            return res.status(500).json({ message, data: error });
        }
    });
};
