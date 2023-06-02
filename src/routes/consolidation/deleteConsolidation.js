const { models } = require("../../db/sequelize")
const auth = require("../../auth/auth")

module.exports = (app) => {
    app.delete('/api/consolidation/:id', auth, async (req, res) => {
        const { id } = req.params

        try {
            const consolidation = await models.consolidation.findByPk(id)
            if (!consolidation) {
                const message = "La consolidation demandée n'existe pas"
                return res.status(404).json({ message })
            }

            await models.consolidation.destroy({ where: { id_consolidation: id } })

            const message = `La consolidation avec l'identifiant n°${id} a été supprimée avec succès`
            return res.status(200).json({ message })

        } catch (error) {
            const message = "Une erreur est survenue lors de la suppression de la consolidation"
            return res.status(500).json({ message, data: error })
        }
    })
}
