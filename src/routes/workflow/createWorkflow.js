const { ValidationError, UniqueConstraintError } = require("sequelize")
const { models } = require("../../db/sequelize")
const auth = require("../../auth/auth")

module.exports = (app) => {
    app.post('/api/workflow', auth, async (req, res) => {
        try {
            const newWorkflow = await models.workflow.create(req.body)

            const message = `Le workflow avec l'identifiant n°${newWorkflow.id_workflow} a été créée avec succès`
            return res.status(201).json({ message, data: newWorkflow })
        } catch (error) {
            if (error instanceof ValidationError || error instanceof UniqueConstraintError) {
                return res.status(400).json({ message: error.message, data: error })
            }
            const message = "Une erreur est survenue lors de la création du workflow"
            return res.status(500).json({ message, data: error })
        }
    })
}
