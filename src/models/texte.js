const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('texte', {
    id_texte: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_createur: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'utilisateur',
        key: 'id_utilisateur'
      }
    },
    entree_vigueur: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    link_fichier_texte: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    statut: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    type: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    titre_texte: {
      type: DataTypes.STRING(250),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'texte',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_texte" },
        ]
      },
      {
        name: "id_createur",
        using: "BTREE",
        fields: [
          { name: "id_createur" },
        ]
      },
    ]
  });
};
