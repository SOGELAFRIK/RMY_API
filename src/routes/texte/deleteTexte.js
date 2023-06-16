const { ValidationError } = require("sequelize");
const { models } = require("../../db/sequelize");
const auth = require("../../auth/auth");
const getUserRole = require("../../auth/getUserRole");

module.exports = (app) => {
  app.delete("/api/texte/:id", auth(1, getUserRole), async (req, res) => {
    const { id } = req.params;

    try {
      const texte = await models.texte.findByPk(id);
      if (!texte) {
        const message = "Le texte demandé n'existe pas";
        return res.status(404).json({ message });
      }

      await models.texte.destroy({ where: { id_texte: id } });

      const message = `Le texte avec l'identifiant n°${id} a été supprimé avec succès`;
      return res.status(200).json({ message });
    } catch (error) {
      const message = "Une erreur est survenue lors de la suppression du texte";
      return res.status(500).json({ message, data: error });
    }
  });
};
