const { models } = require("../../db/sequelize");
const auth = require("../../auth/auth");

module.exports = (app) => {
    app.post("/api/role", auth, async (req, res) => {
        try {
            const { label } = req.body;

            if (!label) {
                const message = "Le label du rôle est obligatoire";
                return res.status(400).json({ message });
            }

            const role = await models.role.create({ label });

            const message = `Le rôle ${role.label} a été créé avec succès`;
            return res.status(201).json({ message, data: role });
        } catch (error) {
            const message = "Une erreur est survenue lors de la création du rôle";
            return res.status(500).json({ message, data: error });
        }
    });
};
