const { models } = require("../../db/sequelize");
const auth = require("../../auth/auth");

module.exports = (app) => {
    app.delete('/api/suivi_obligation/:id', auth, async (req, res) => {
        const { id } = req.params;

        try {
            const suivi_obligation = await models.suivi_obligation.findByPk(id);
            if (!suivi_obligation) {
                const message = "Le suivi d'obligation demandé n'existe pas";
                return res.status(404).json({ message });
            }

            await suivi_obligation.destroy();

            const message = `Le suivi d'obligation avec l'identifiant n°${id} a été supprimé avec succès`;
            return res.status(200).json({ message });
        } catch (error) {
            const message = "Une erreur est survenue lors de la suppression du suivi d'obligation";
            return res.status(500).json({ message, data: error });
        }
    });
};
