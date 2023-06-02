const { Op } = require("sequelize");
const { models } = require("../../db/sequelize");
const auth = require("../../auth/auth");

module.exports = (app) => {
    app.get("/api/workflow", auth, async (req, res) => {
        try {
            // Recherche d'un workflow
            if (req.query.etat_validation) {
                const etatValidation = req.query.etat_validation;
                const limit = parseInt(req.query.LIMIT) || 5;

                // Vérifier que le terme de recherche contient au moins 2 caractères
                if (etatValidation.length < 2) {
                    const message = "La recherche doit contenir au moins 2 caractères";
                    return res.status(400).json({ message });
                }

                const { count, rows } = await models.workflow.findAndCountAll({
                    where: {
                        etat_validation: {
                            [Op.like]: `%${etatValidation}%`,
                        },
                    },
                    order: ["etat_validation"],
                    limit: limit,
                });

                const message = `Il y a ${count} workflow(s) qui correspondent au terme de recherche "${etatValidation}"`;
                return res.json({ message, data: rows });
            }

            // Récupération de toutes les entités
            const workflow = await models.workflow.findAll({ order: ["id_workflow"] });
            const message = `La liste de ${workflow.length} worflows a été récupérée avec succès`;
            return res.json({ message, data: workflow });
        } catch (error) {
            const message = "Une erreur est survenue lors de la récupération de la liste des workflows";
            return res.status(500).json({ message, data: error });
        }
    });
};
