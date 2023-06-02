const { Op } = require("sequelize");
const { models } = require("../../db/sequelize");
const auth = require("../../auth/auth");

module.exports = (app) => {
    app.get("/api/role/:id", auth, async (req, res) => {
        try {
            const { id } = req.params;

            const role = await models.role.findByPk(id);

            if (!role) {
                const message = "Le rôle demandé n'existe pas";
                return res.status(404).json({ message });
            }

            const message = `Le rôle avec l'identifiant n°${role.id} a été récupéré avec succès`;
            return res.json({ message, data: role });
        } catch (error) {
            const message = "Une erreur est survenue lors de la récupération du rôle";
            return res.status(500).json({ message, data: error });
        }
    });
};
