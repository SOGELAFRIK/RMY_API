const { models } = require("../../db/sequelize")
const auth = require("../../auth/auth")

module.exports = (app) => {
    app.get('/api/periodicite/:id', auth, async (req, res) => {
        const { id } = req.params

        try {
            const periodicite = await models.periodicite.findByPk(id)
            if (!periodicite) {
                const message = "La periodicite demandée n'existe pas"
                return res.status(404).json({ message })
            }
            const message = `La periodicite avec l'id ${id} a été trouvé avec succés`
            return res.status(200).json({ message, data: periodicite })

        } catch (error) {
            const message = "Une erreur est survenue lors de la recherche de La periodicite"
            return res.status(500).json({ message, data: error })
        }
    })
}
