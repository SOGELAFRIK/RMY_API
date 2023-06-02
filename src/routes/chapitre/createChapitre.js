const { ValidationError } = require("sequelize");
const { models } = require("../../db/sequelize");
const auth = require("../../auth/auth");

module.exports = (app) => {
    app.post("/api/chapitres", auth, async (req, res) => {
        const { id_texte, titre_chapitre, corps_chapitre, id_createur } = req.body;

        try {
            const chapitre = await models.chapitre.create({
                id_texte,
                titre_chapitre,
                corps_chapitre,
                id_createur
            });

            const message = `Le chapitre avec l'identifiant n°${chapitre.id_chapitre} a été créé avec succès`;
            return res.status(201).json({ message, data: chapitre });
        } catch (error) {
            if (error instanceof ValidationError) {
                return res.status(400).json({ message: error.message, data: error });
            }
            const message = "Une erreur est survenue lors de la création du chapitre";
            return res.status(500).json({ message, data: error });
        }
    });
};
