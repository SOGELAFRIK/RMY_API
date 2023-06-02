const { ValidationError } = require("sequelize")
const { models } = require("../../db/sequelize")
const auth = require("../../auth/auth")

module.exports = (app) => {
    app.put('/api/consolidation/:id', auth, async (req, res) => {
        const { id } = req.params

        try {
            const consolidation = await models.consolidation.findByPk(id)
            if (!consolidation) {
                const message = "La consolifation demandé n'existe pas"
                return res.status(404).json({ message })
            }

            const { nb_obligations, nb_obligations_conformes, nb_obligations_non_conformes, nb_obligations_en_cours } = req.body

            await models.consolidation.update({ nb_obligations, nb_obligations_conformes, nb_obligations_non_conformes, nb_obligations_en_cours }, { where: { id_consolidation: id } })

            const updatedConsolidation = await models.consolidation.findByPk(id)
            const message = `La consolidation avec l'identifiant n°${updatedConsolidation.id_consolidation} a été modifié avec succès`
            return res.status(200).json({ message, data: updatedConsolidation })

        } catch (error) {
            if (error instanceof ValidationError) {
                return res.status(400).json({ message: error.message, data: error })
            }
            const message = "Une erreur est survenue lors de la modification da la consolidation"
            return res.status(500).json({ message, data: error })
        }
    })
}
