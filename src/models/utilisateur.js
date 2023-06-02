const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('utilisateur', {
    id_utilisateur: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    reset_token: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    nom: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    prenom: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    fonction: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: "utilisateur_email_unique"
    },
    mot_de_passe: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    id_entite: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'entité',
        key: 'id_entite'
      }
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'role',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'utilisateur',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_utilisateur" },
        ]
      },
      {
        name: "unique_email",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "utilisateur_email_unique",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "id_entite",
        using: "BTREE",
        fields: [
          { name: "id_entite" },
        ]
      },
      {
        name: "fk_role_id",
        using: "BTREE",
        fields: [
          { name: "role_id" },
        ]
      },
    ]
  });
};
