const { ValidationError } = require("sequelize")
const { models } = require("../../db/sequelize")
const auth = require("../../auth/auth")

module.exports = (app) => {
    app.put('/api/periodicite/:id', auth, async (req, res) => {
        const { id } = req.params;

        try {
            const periodicite = await models.periodicite.findByPk(id);
            if (!periodicite) {
                const message = "La periodicite demandée n'existe pas";
                return res.status(404).json({ message });
            }

            await models.periodicite.update(req.body, { where: { id_periodicite: id } });

            const updatePeriodicity = await models.periodicite.findByPk(id);
            const message = `La periodicite avec l'identifiant n°${updatePeriodicity.id_periodicite} a été modifiée avec succès`;
            return res.status(200).json({ message, data: updatePeriodicity });

        } catch (error) {
            if (error instanceof ValidationError) {
                return res.status(400).json({ message: error.message, data: error });
            }
            const message = "Une erreur est survenue lors de la modification de La periodicite";
            return res.status(500).json({ message, data: error });
        }
    })
}
