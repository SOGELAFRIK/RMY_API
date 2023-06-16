const { ValidationError } = require("sequelize");
const { models } = require("../../db/sequelize");
const auth = require("../../auth/auth");
const getUserRole = require("../../auth/getUserRole");

module.exports = (app) => {
  app.put("/api/articles/:id", auth(1, getUserRole), async (req, res) => {
    const { id } = req.params;

    try {
      const article = await models.article.findByPk(id);
      if (!article) {
        const message = "L'article demandé n'existe pas";
        return res.status(404).json({ message });
      }

      await models.article.update(req.body, {
        where: { id_article: id },
      });

      const updatedArticle = await models.article.findByPk(id);
      const message = `L'article avec l'identifiant n°${updatedArticle.id_article} a été modifié avec succès`;
      return res.status(200).json({ message, data: updatedArticle });
    } catch (error) {
      if (error instanceof ValidationError) {
        return res.status(400).json({ message: error.message, data: error });
      }
      const message =
        "Une erreur est survenue lors de la modification de l'article";
      return res.status(500).json({ message, data: error });
    }
  });
};
