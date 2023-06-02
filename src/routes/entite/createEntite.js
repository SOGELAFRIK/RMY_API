const { ValidationError, UniqueConstraintError } = require("sequelize");
const { models } = require("../../db/sequelize");
const auth = require("../../auth/auth");

module.exports = (app) => {
  app.post("/api/entites", auth, async (req, res) => {
    try {
      const { nom, adresse, ville, pays } = req.body;

      const newEntite = await models.entité.create({
        nom,
        adresse,
        ville,
        pays,
        registre_cormmerce,
        rcc,
        id_admin,
      });

      const message = `L'entité avec l'identifiant n°${newEntite.id_entite} a été créée avec succès`;
      return res.status(201).json({ message, data: newEntite });
    } catch (error) {
      if (
        error instanceof ValidationError ||
        error instanceof UniqueConstraintError
      ) {
        return res.status(400).json({ message: error.message, data: error });
      }
      const message = "Une erreur est survenue lors de la création de l'entité";
      return res.status(500).json({ message, data: error });
    }
  });
};
