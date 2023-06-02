const { ValidationError } = require("sequelize")
const { models } = require("../../db/sequelize")
const auth = require("../../auth/auth")

module.exports = (app) => {
    app.post('/api/consolidation', auth, async (req, res) => {
        try {
            const { nb_obligations, nb_obligations_conformes, nb_obligations_non_conformes, nb_obligations_en_cours } = req.body

            const consolidation = await models.consolidation.create({
                nb_obligations,
                nb_obligations_conformes,
                nb_obligations_non_conformes,
                nb_obligations_en_cours
            })

            const message = `La consolidation avec l'identifiant n°${consolidation.id_consolidation} a été créée avec succès`
            return res.status(201).json({ message, data: consolidation })

        } catch (error) {
            if (error instanceof ValidationError) {
                return res.status(400).json({ message: error.message, data: error })
            }
            const message = "Une erreur est survenue lors de la création de la consolidation"
            return res.status(500).json({ message, data: error })
        }
    })
}
