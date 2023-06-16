const { ValidationError } = require("sequelize");
const { models } = require("../../db/sequelize");
const auth = require("../../auth/auth");
const getUserRole = require("../../auth/getUserRole");

module.exports = (app) => {
  app.put("/api/obligation/:id", auth(1, getUserRole), async (req, res) => {
    const { id } = req.params;

    try {
      const obligation = await models.obligation.findByPk(id);
      if (!obligation) {
        const message = "L'obligation demandée n'existe pas";
        return res.status(404).json({ message });
      }

      await models.obligation.update(req.body, {
        where: { id_obligation: id },
      });

      const updateObligation = await models.obligation.findByPk(id);
      const message = `L'obligation avec l'identifiant n°${updateObligation.id_obligation} a été modifiée avec succès`;
      return res.status(200).json({ message, data: updateObligation });
    } catch (error) {
      if (error instanceof ValidationError) {
        return res.status(400).json({ message: error.message, data: error });
      }
      const message =
        "Une erreur est survenue lors de la modification de l'obligation";
      return res.status(500).json({ message, data: error });
    }
  });
};
