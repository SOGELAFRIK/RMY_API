const { models } = require("../../db/sequelize");
const auth = require("../../auth/auth");
const getUserRole = require("../../auth/getUserRole");

module.exports = (app) => {
    app.delete("/api/article/:id", auth(1, getUserRole), async (req, res) => {
      const { id } = req.params;

      try {
        const article = await models.article.findByPk(id);
        if (!article) {
          const message = "L'article demandé n'existe pas";
          return res.status(404).json({ message });
        }

        await models.article.destroy({ where: { id_article: id } });

        const message = `L'article avec l'identifiant n°${id} a été supprimé avec succès`;
        return res.status(200).json({ message });
      } catch (error) {
        const message =
          "Une erreur est survenue lors de la suppression de l'article";
        return res.status(500).json({ message, data: error });
      }
    });
};
