const { ValidationError } = require("sequelize");
const { models } = require("../../db/sequelize");
const auth = require("../../auth/auth");

module.exports = (app) => {
    app.get('/api/consolidation/:id', auth, async (req, res) => {
        const { id } = req.params;

        try {
            const consolidation = await models.consolidation.findByPk(id);
            if (!consolidation) {
                const message = "La consolidation demandé n'existe pas";
                return res.status(404).json({ message });
            }
            const message = `La consolidation avec l'identifiant n°${id} a été trouvé avec succès`;
            return res.status(200).json({ message, data: suivi });
        } catch (error) {
            if (error instanceof ValidationError) {
                return res.status(400).json({ message: error.message, data: error });
            }
            const message = "Une erreur est survenue lors de la recherche de la consolidation";
            return res.status(500).json({ message, data: error });
        }
    });
};
