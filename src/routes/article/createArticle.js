const { ValidationError } = require("sequelize");
const { models } = require("../../db/sequelize");
const auth = require("../../auth/auth");

module.exports = (app) => {
  app.post("/api/articles", auth, async (req, res) => {
    try {
      const nouvelArticle = await models.article.create(req.body);

      const message = `Le nouvel article avec l'identifiant n°${nouvelArticle.id_article} a été créé avec succès`;
      return res.status(201).json({ message, data: nouvelArticle });
    } catch (error) {
      if (error instanceof ValidationError) {
        return res.status(400).json({ message: error.message, data: error });
      }
      const message =
        "Une erreur est survenue lors de la création de l'article";
      return res.status(500).json({ message, data: error });
    }
  });
};
