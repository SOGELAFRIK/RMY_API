const Sequelize = require("sequelize");
const initModels = require("../models/init-models");
const bcrypt = require("bcrypt");
const mysql2 = require("mysql2");
require("dotenv").config();

// Connexion à la base de données
// const sequelize = new Sequelize("gestionobligations", "root", "", {
//   host: "localhost",
//   dialect: "mysql",
//   dialectOptions: {
//     // Options supplémentaires spécifiques au dialecte si nécessaire
//   },
//   logging: false,
// });

//connexion a la base donées
const sequelize = new Sequelize(
  "bgnmjxrclll88sv7ij25",
  "uhprky1i0wzujzpk",
  "RC9e9O9XMlyMCmudnHC9",
  {
    host: "bgnmjxrclll88sv7ij25-mysql.services.clever-cloud.com",
    dialect: "mysql",
    dialectModule: mysql2,
    dialectOptions: {
      // timezone: process.env.DB_TIMEZONE,
    },
    logging: false,
  }
);

// Création des modèles en utilisant la fonction initModels
const models = initModels(sequelize);

// Synchronisation de la base de données
const initDb = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: false });
    console.log("Connexion à la base de données réussie et synchronisée");

    // Création d'un utilisateur par défaut (exemple)
    // const passwordHash = await bcrypt.hash("admin", 10);
    // const user = await models.utilisateur.create({
    //   nom: "kodjo",
    //   prenom: "henoc",
    //   email: "admin2@gmail.com",
    //   mot_de_passe: passwordHash,
    //   id_entite: 1,
    //   role_id: 1,
    // });
    // console.log("Utilisateur par défaut créé :", user.toJSON());
  } catch (error) {
    console.error("Échec de la connexion à la base de données :", error);
  }
};

module.exports = {
  initDb,
  models,
};
