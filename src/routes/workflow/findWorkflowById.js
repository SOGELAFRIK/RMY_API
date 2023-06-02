const { models } = require("../../db/sequelize")
const auth = require("../../auth/auth")

module.exports = (app) => {
    app.get('/api/workflow/:id', auth, async (req, res) => {
        const { id } = req.params

        try {
            const workflow = await models.workflow.findByPk(id)
            if (!workflow) {
                const message = "Le workflow demandée n'existe pas"
                return res.status(404).json({ message })
            }
            const message = `Le workflow avec l'id ${id} a été trouvé avec succés`
            return res.status(200).json({ message, data: entite })

        } catch (error) {
            const message = "Une erreur est survenue lors de la recherche du workflow"
            return res.status(500).json({ message, data: error })
        }
    })
}
