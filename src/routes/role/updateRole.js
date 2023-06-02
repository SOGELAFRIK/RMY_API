const { ValidationError, UniqueConstraintError } = require("sequelize");
const { models } = require("../../db/sequelize");
const auth = require("../../auth/auth");

module.exports = (app) => {
    app.put("/api/role/:id", auth, async (req, res) => {
        const { id } = req.params;

        try {
            const role = await models.role.findByPk(id);
            if (!role) {
                const message = "Le rôle demandé n'existe pas";
                return res.status(404).json({ message });
            }

            const { label } = req.body;

            if (!label) {
                const message = "Aucune donnée à mettre à jour";
                return res.status(400).json({ message });
            }

            await models.role.update({label}, { where: { id: id } });

            const updatedRole = await models.role.findByPk(id);
            const message = `Le rôle avec l'identifiant n°${updatedRole.id} a été modifié avec succès`;
            return res.status(200).json({ message, data: updatedRole });
        } catch (error) {
            if (error instanceof ValidationError || error instanceof UniqueConstraintError) {
                return res.status(400).json({ message: error.message, data: error });
            }
            const message = "Une erreur est survenue lors de la modification du rôle";
            return res.status(500).json({ message, data: error });
        }
    });
};
