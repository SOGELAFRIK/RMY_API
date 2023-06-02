const { ValidationError } = require("sequelize");
const { models } = require("../../db/sequelize");
const auth = require("../../auth/auth");

module.exports = (app) => {
  app.put("/api/texte/:id", auth, async (req, res) => {
    const { id } = req.params;

    try {
      const texte = await models.texte.findByPk(id);
      if (!texte) {
        const message = "Le texte demandé n'existe pas";
        return res.status(404).json({ message });
      }

      await models.texte.update(req.body, { where: { id_texte: id } });

      const updatedTexte = await models.texte.findByPk(id);
      const message = `Le texte avec l'identifiant n°${updatedTexte.id_texte} a été modifié avec succès`;
      return res.status(200).json({ message, data: updatedTexte });
    } catch (error) {
      if (error instanceof ValidationError) {
        return res.status(400).json({ message: error.message, data: error });
      }
      const message =
        "Une erreur est survenue lors de la modification du texte";
      return res.status(500).json({ message, data: error });
    }
  });
};
