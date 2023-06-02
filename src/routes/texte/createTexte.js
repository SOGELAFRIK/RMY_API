const { models } = require("../../db/sequelize");
const auth = require("../../auth/auth");

module.exports = (app) => {
  app.post("/api/texte", auth, async (req, res) => {
    

    try {
      const texte = await models.texte.create(req.body);
      const message = `Le texte avec l'identifiant n${texte.id_texte} a été créé avec succès`;
      return res.status(201).json({ message, data: texte });
    } catch (error) {
      const message = "Une erreur est survenue lors de la création du texte";
      return res.status(500).json({ message, data: error });
    }
  });
};
