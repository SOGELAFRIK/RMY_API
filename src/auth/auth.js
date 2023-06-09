const jwt = require("jsonwebtoken");
const privateKey = require("../auth/private_key");

module.exports = (requiredRoleId, getUserRole) => {
  return async (req, res, next) => {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      const message = `Vous n'avez pas fourni de jeton d'authentification. Ajoutez-en un dans l'en-tête de la requête.`;
      return res.status(401).json({ message });
    }

    const token = authorizationHeader.split(" ")[1];
    const decodedToken = jwt.verify(
      token,
      privateKey,
      async (error, decodedToken) => {
        if (error) {
          const message = `L'utilisateur n'est pas autorisé à accéder à cette ressource.`;
          return res.status(401).json({ message, data: error });
        }

        const userId = decodedToken.userId;
        const userRole = await getUserRole(userId);

        if (userRole !== requiredRoleId) {
          const message = `L'utilisateur n'est pas autorisé à accéder à ce point de terminaison.`;
          return res.status(403).json({ message });
        }

        next();
      }
    );
  };
};
