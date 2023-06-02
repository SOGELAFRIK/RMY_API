const { models } = require("../db/sequelize");

// Fonction pour récupérer le rôle de l'utilisateur à partir de son userId
const getUserRole = async (userId) => {
  try {
    // Recherche de l'utilisateur dans la base de données en utilisant l'userId
    const user = await models.utilisateur.findByPk(userId);

    // Vérification si l'utilisateur existe
    if (!user) {
      throw new Error("L'utilisateur n'a pas été trouvé.");
    }

    // Récupération du rôle de l'utilisateur
    const userRole = user.role_id;

    return userRole;
  } catch (error) {
    throw new Error(
      `Erreur lors de la récupération du rôle de l'utilisateur : ${error.message}`
    );
  }
};

module.exports = getUserRole;
