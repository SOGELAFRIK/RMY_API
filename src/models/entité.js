const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('entité', {
    id_entite: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nom: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    adresse: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    ville: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    pays: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    registre_cormmerce: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    rcc: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    id_admin: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'entité',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_entite" },
        ]
      },
      {
        name: "id_admin",
        using: "BTREE",
        fields: [
          { name: "id_admin" },
        ]
      },
    ]
  });
};
