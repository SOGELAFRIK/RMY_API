const { ValidationError } = require("sequelize");
const { models } = require("../../db/sequelize");
const auth = require("../../auth/auth");
const getUserRole = require("../../auth/getUserRole");

module.exports = (app) => {
  app.put("/api/chapitres/:id", auth(1, getUserRole), async (req, res) => {
    const { id } = req.params;

    try {
      const chapitre = await models.chapitre.findByPk(id);
      if (!chapitre) {
        const message = "Le chapitre demandé n'existe pas";
        return res.status(404).json({ message });
      }

      const { titre_chapitre, corps_chapitre } = req.body;

      if (!titre_chapitre && !corps_chapitre) {
        const message = "Aucune donnée à mettre à jour";
        return res.status(400).json({ message });
      }

      await models.chapitre.update(
        { titre_chapitre, corps_chapitre },
        { where: { id_chapitre: id } }
      );

      const updatedChapitre = await models.chapitre.findByPk(id);
      const message = `Le chapitre avec l'identifiant n°${updatedChapitre.id_chapitre} a été modifié avec succès`;
      return res.status(200).json({ message, data: updatedChapitre });
    } catch (error) {
      if (error instanceof ValidationError) {
        return res.status(400).json({ message: error.message, data: error });
      }
      const message =
        "Une erreur est survenue lors de la modification du chapitre";
      return res.status(500).json({ message, data: error });
    }
  });
};
