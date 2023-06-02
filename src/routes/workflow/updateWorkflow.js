const { ValidationError } = require("sequelize")
const { models } = require("../../db/sequelize")
const auth = require("../../auth/auth")

module.exports = (app) => {
    app.put('/api/workflow/:id', auth, async (req, res) => {
        const { id } = req.params

        try {
            const workflow = await models.workflow.findByPk(id);
            if (!workflow) {
                const message = "Le workflow demandé n'existe pas";
                return res.status(404).json({ message });
            }

            const { etat_validation, date_debut, date_fin, commentaire_validation, id_obligation } = req.body;

            if (!etat_validation && !date_debut && !date_fin && !commentaire_validation && !id_obligation) {
                const message = "Aucune donnée à mettre à jour";
                return res.status(400).json({ message });
            }

            await models.workflow.update({ etat_validation, date_debut, date_fin, commentaire_validation, id_obligation }, { where: { id_workflow: id } });

            const updatedWorkflow = await models.workflow.findByPk(id);
            const message = `Le workflow avec l'identifiant n°${updatedWorkflow.id_workflow} a été modifiée avec succès`;
            return res.status(200).json({ message, data: updatedWorkflow });

        } catch (error) {
            if (error instanceof ValidationError) {
                return res.status(400).json({ message: error.message, data: error });
            }
            const message = "Une erreur est survenue lors de la modification du workflow";
            return res.status(500).json({ message, data: error });
        }
    })
}
