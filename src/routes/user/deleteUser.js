const { models } = require("../../db/sequelize");
const auth = require("../../auth/auth");

const deleteUser = async (req, res) => {
    try {
        const user = await models.utilisateur.findByPk(req.params.id);
        if (!user) {
            const message = "L'utilisateur demandé n'existe pas";
            return res.status(404).json({ message });
        }
        const userDeleted = await models.utilisateur.destroy({
            where: { id_utilisateur: user.id_utilisateur },
        });
        const message = `L'utilisateur avec l'identifiant n°${user.id_utilisateur} a été supprimé avec succès`;
        return res.status(200).json({ message, data: user });
    } catch (error) {
        const message = "Une erreur est survenue lors de la suppression de l'utilisateur";
        return res.status(500).json({ message, data: error });
    }
};

module.exports = (app) => {
    app.delete("/api/user/:id", auth, deleteUser);
};
