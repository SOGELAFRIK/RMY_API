const { models } = require("../../db/sequelize")
const auth = require("../../auth/auth")

module.exports = (app) => {
    app.get('/api/obligation/:id', auth, async (req, res) => {
        const { id } = req.params

        try {
            const obligation = await models.obligation.findByPk(id)
            if (!obligation) {
                const message = "L'obligation demandée n'existe pas"
                return res.status(404).json({ message })
            }
            const message = `L'obligation avec l'id ${id} a été trouvé avec succés`
            return res.status(200).json({ message, data: entite })

        } catch (error) {
            const message = "Une erreur est survenue lors de la recherche de l'obligation"
            return res.status(500).json({ message, data: error })
        }
    })
}
