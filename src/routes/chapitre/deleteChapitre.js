const { models } = require("../../db/sequelize");
const auth = require("../../auth/auth");

module.exports = (app) => {
  app.delete("/api/chapitres/:id", auth, async (req, res) => {
    const { id } = req.params;

    try {
      const chapitre = await models.chapitre.findByPk(id);
      if (!chapitre) {
        const message = "Le chapitre demandé n'existe pas";
        return res.status(404).json({ message });
      }

      await models.chapitre.destroy({ where: { id_chapitre: id } });

      const message = `Le chapitre avec l'identifiant n°${id} a été supprimé avec succès`;
      return res.status(200).json({ message });
    } catch (error) {
      const message = "Une erreur est survenue lors de la suppression du chapitre";
      return res.status(500).json({ message, data: error });
    }
  });
};
