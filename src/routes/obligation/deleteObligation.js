const { models } = require("../../db/sequelize");
const auth = require("../../auth/auth");

module.exports = (app) => {
  app.delete("/api/obligation/:id", auth, async (req, res) => {
    const { id } = req.params;

    try {
      const obligation = await models.obligation.findByPk(id);
      if (!obligation) {
        const message = "L'obligation demandée n'existe pas";
        return res.status(404).json({ message });
      }

      await obligation.destroy();

      const message = `L'obligation avec l'identifiant n°${id} a été supprimée avec succès`;
      return res.status(200).json({ message });
    } catch (error) {
      const message =
        "Une erreur est survenue lors de la suppression de l'entité";
      return res.status(500).json({ message, data: error });
    }
  });
};
