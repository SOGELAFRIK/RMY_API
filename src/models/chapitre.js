const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('chapitre', {
    id_chapitre: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_texte: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'texte',
        key: 'id_texte'
      }
    },
    titre_chapitre: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    corps_chapitre: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    id_createur: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'utilisateur',
        key: 'id_utilisateur'
      }
    }
  }, {
    sequelize,
    tableName: 'chapitre',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_chapitre" },
        ]
      },
      {
        name: "id_createur",
        using: "BTREE",
        fields: [
          { name: "id_createur" },
        ]
      },
      {
        name: "id_article",
        using: "BTREE",
        fields: [
          { name: "id_texte" },
        ]
      },
    ]
  });
};
