const { Op } = require("sequelize");
const { models } = require("../../db/sequelize");
const auth = require("../../auth/auth");

module.exports = (app) => {
    app.get("/api/role", auth, async (req, res) => {
        try {
            // Recherche d'un rôle par libellé
            if (req.query.label) {
                const label = req.query.label;
                const limit = parseInt(req.query.LIMIT) || 5;

                // Vérifier que le terme de recherche contient au moins 2 caractères
                if (label.length < 2) {
                    const message = "La recherche doit contenir au moins 2 caractères";
                    return res.status(400).json({ message });
                }

                const { count, rows } = await models.role.findAndCountAll({
                    where: {
                        label: {
                            [Op.like]: `%${label}%`,
                        },
                    },
                    order: ["label"],
                    limit: limit,
                });

                const message = `Il y a ${count} rôle(s) qui correspondent au terme de recherche "${label}"`;
                return res.json({ message, data: rows });
            }

            // Récupération de tous les rôles
            const roles = await models.role.findAll({ order: ["id"] });
            const message = `La liste de ${roles.length} rôles a été récupérée avec succès`;
            return res.json({ message, data: roles });
        } catch (error) {
            const message = "Une erreur est survenue lors de la récupération de la liste des rôles";
            return res.status(500).json({ message, data: error });
        }
    });
};
