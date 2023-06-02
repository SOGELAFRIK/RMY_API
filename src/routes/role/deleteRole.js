const { models } = require("../../db/sequelize");
const auth = require("../../auth/auth");

const deleteRole = async (req, res) => {
    try {
        const role = await models.role.findByPk(req.params.id);
        if (!role) {
            const message = "Le rôle demandé n'existe pas";
            return res.status(404).json({ message });
        }
        const roleDeleted = await models.role.destroy({
            where: { id: role.id },
        });
        const message = `Le rôle avec l'identifiant n°${role.id} a été supprimé avec succès`;
        return res.status(200).json({ message, data: role });
    } catch (error) {
        const message = "Une erreur est survenue lors de la suppression du rôle";
        return res.status(500).json({ message, data: error });
    }
};

module.exports = (app) => {
    app.delete("/api/role/:id", auth, deleteRole);
};
