const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('article', {
    id_article: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_chapitre: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'chapitre',
        key: 'id_chapitre'
      }
    },
    titre_article: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    corps_article: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'article',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_article" },
        ]
      },
      {
        name: "id_chapitre",
        using: "BTREE",
        fields: [
          { name: "id_chapitre" },
        ]
      },
    ]
  });
};
