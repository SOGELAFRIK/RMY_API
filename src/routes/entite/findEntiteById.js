const { models } = require("../../db/sequelize")
const auth = require("../../auth/auth")

module.exports = (app) => {
    app.get('/api/entite/:id', auth, async (req, res) => {
        const { id } = req.params

        try {
            const entite = await models.entité.findByPk(id)
            if (!entite) {
                const message = "L'entité demandée n'existe pas"
                return res.status(404).json({ message })
            }
            const message = `L'entite avec lid ${id} a été trouvé avec succés`
            return res.status(200).json({ message, data: entite })

        } catch (error) {
            const message = "Une erreur est survenue lors de la recherche de l'entité"
            return res.status(500).json({ message, data: error })
        }
    })
}
