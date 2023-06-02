const { ValidationError, UniqueConstraintError } = require("sequelize")
const { models } = require("../../db/sequelize")
const auth = require("../../auth/auth")

module.exports = (app) => {
    app.post('/api/riqueLevel', auth, async (req, res) => {
        try {
            const newRisqueLevel = await models.niveau_risque.create(req.body);

            const message = `Le niveau de risque avec l'identifiant n°${newRisqueLevel.id_niveau_risque} a été créée avec succès`;
            return res.status(201).json({ message, data: newRisqueLevel });
        } catch (error) {
            if (error instanceof ValidationError || error instanceof UniqueConstraintError) {
                return res.status(400).json({ message: error.message, data: error });
            }
            const message = "Une erreur est survenue lors de la création du niveau de risque";
            return res.status(500).json({ message, data: error });
        }
    })
}
