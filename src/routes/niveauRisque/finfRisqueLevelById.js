const { models } = require("../../db/sequelize")
const auth = require("../../auth/auth")

module.exports = (app) => {
    app.get('/api/riqueLevel/:id', auth, async (req, res) => {
        const { id } = req.params

        try {
            const riqueLevel = await models.niveau_risque.findByPk(id)
            if (!riqueLevel) {
                const message = "La riqueLevel demandée n'existe pas"
                return res.status(404).json({ message })
            }
            const message = `La riqueLevel avec l'id ${id} a été trouvé avec succés`
            return res.status(200).json({ message, data: riqueLevel })

        } catch (error) {
            const message = "Une erreur est survenue lors de la recherche de La periodicite"
            return res.status(500).json({ message, data: error })
        }
    })
}
