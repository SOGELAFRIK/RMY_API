const { ValidationError } = require("sequelize")
const { models } = require("../../db/sequelize")
const auth = require("../../auth/auth")

module.exports = (app) => {
    app.put('/api/risqueLevel/:id', auth, async (req, res) => {
        const { id } = req.params;

        try {
            const risqueLevel = await models.niveau_risque.findByPk(id);
            if (!risqueLevel) {
                const message = "Le risqueLevel demandée n'existe pas";
                return res.status(404).json({ message });
            }

            await models.niveau_risque.update(req.body, { where: { id_niveau_risque: id } });

            const updateRisqueLevel = await models.niveau_risque.findByPk(id);
            const message = `La risqueLevel avec l'identifiant n°${updateRisqueLevel.id_niveau_risque} a été modifiée avec succès`;
            return res.status(200).json({ message, data: updateRisqueLevel });

        } catch (error) {
            if (error instanceof ValidationError) {
                return res.status(400).json({ message: error.message, data: error });
            }
            const message = "Une erreur est survenue lors de la modification du risqueLevel";
            return res.status(500).json({ message, data: error });
        }
    })
}
