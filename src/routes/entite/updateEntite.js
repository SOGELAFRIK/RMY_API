const { ValidationError } = require("sequelize")
const { models } = require("../../db/sequelize")
const auth = require("../../auth/auth")

module.exports = (app) => {
    app.put('/api/entite/:id', auth, async (req, res) => {
        const { id } = req.params

        try {
            const entite = await models.entité.findByPk(id)
            if (!entite) {
                const message = "L'entité demandée n'existe pas"
                return res.status(404).json({ message })
            }

            const {
              nom,
              adresse,
              ville,
              pays,
              registre_cormmerce,
              rcc,
              id_admin,
            } = req.body;

            if (!nom && !adresse && !ville && !pays && !registre_cormmerce && !rcc && !id_admin) {
                const message = "Aucune donnée à mettre à jour"
                return res.status(400).json({ message })
            }

            await models.entité.update(
              { nom, adresse, ville, pays, registre_cormmerce, rcc, id_admin },
              { where: { id_entite: id } }
            );

            const updatedEntite = await models.entité.findByPk(id)
            const message = `L'entité avec l'identifiant n°${updatedEntite.id_entite} a été modifiée avec succès`
            return res.status(200).json({ message, data: updatedEntite })

        } catch (error) {
            if (error instanceof ValidationError) {
                return res.status(400).json({ message: error.message, data: error })
            }
            const message = "Une erreur est survenue lors de la modification de l'entité"
            return res.status(500).json({ message, data: error })
        }
    })
}
