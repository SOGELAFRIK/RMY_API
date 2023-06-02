const { ValidationError } = require("sequelize")
const { models } = require("../../db/sequelize")
const auth = require("../../auth/auth")

module.exports = (app) => {
    app.put('/api/suivi_obligation/:id', auth, async (req, res) => {
        const { id } = req.params

        try {
            const suiviObligation = await models.suivi_obligation.findByPk(id)
            if (!suiviObligation) {
                const message = "Le suivi d'obligation demandé n'existe pas"
                return res.status(404).json({ message })
            }

            const { etat_conformite, date_suivi, commentaire, fichier_joint } = req.body

            await models.suivi_obligation.update(req.body, { where: { id_suivi: id } })

            const updatedSuiviObligation = await models.suivi_obligation.findByPk(id)
            const message = `Le suivi d'obligation avec l'identifiant n°${updatedSuiviObligation.id_suivi} a été modifié avec succès`
            return res.status(200).json({ message, data: updatedSuiviObligation })

        } catch (error) {
            if (error instanceof ValidationError) {
                return res.status(400).json({ message: error.message, data: error })
            }
            const message = "Une erreur est survenue lors de la modification du suivi d'obligation"
            return res.status(500).json({ message, data: error })
        }
    })
}
