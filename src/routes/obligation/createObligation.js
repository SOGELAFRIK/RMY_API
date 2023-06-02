const { ValidationError, UniqueConstraintError } = require("sequelize");
const { models } = require("../../db/sequelize");
const auth = require("../../auth/auth");

module.exports = (app) => {
  app.post("/api/obligation", auth, async (req, res) => {
    try {

      const newObligation = await models.obligation.create(req.body);

      const message = `L'obligation avec l'identifiant n°${newObligation.id_obligation} a été créée avec succès`;
      return res.status(201).json({ message, data: newObligation });
    } catch (error) {
      if (
        error instanceof ValidationError ||
        error instanceof UniqueConstraintError
      ) {
        return res.status(400).json({ message: error.message, data: error });
      }
      const message =
        "Une erreur est survenue lors de la création de l'obligation";
      return res.status(500).json({ message, data: error });
    }
  });
};

/**
 * Creates a new obligation using the provided request body. Requires authentication.
 *
 * @param {Object} app - The Express application instance.
 * @return {Object} The HTTP response object with a JSON payload indicating the result of the operation.
 */