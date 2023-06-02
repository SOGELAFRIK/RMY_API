const { ValidationError, UniqueConstraintError } = require("sequelize")
const { models } = require("../../db/sequelize")
const auth = require("../../auth/auth")

/**
 * Creates a new periodicity
 * @param {Object} app - The express app object
 */
module.exports = (app) => {
    app.post('/api/periodicite', auth, async (req, res) => {
        try {
            // Create a new periodicity record in the database
            const newPeriodicity = await models.periodicite.create(req.body);
            // Construct success message with the new periodicity's ID
            const message = `La periodicité avec l'identifiant n°${newPeriodicity.id_periodicite} a été créée avec succès`;
            // Return success response with message and new periodicity data
            return res.status(201).json({ message, data: newPeriodicity });
        } catch (error) {
            if (error instanceof ValidationError || error instanceof UniqueConstraintError) {
                // Return validation or unique constraint error response with error message and data
                return res.status(400).json({ message: error.message, data: error });
            }
            // Return generic server error response with error message and data
            const message = "Une erreur est survenue lors de la création de la periodicite";
            return res.status(500).json({ message, data: error });
        }
    })
}
