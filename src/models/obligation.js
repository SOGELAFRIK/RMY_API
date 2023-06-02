const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('obligation', {
    id_obligation: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    titre: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    commentaire: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    date_echeance: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    date_creation: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    date_maj: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    conformite: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    link_fichier: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    id_niveau_risque: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'niveau_risque',
        key: 'id_niveau_risque'
      }
    },
    id_article_associe: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'article',
        key: 'id_article'
      }
    },
    id_periodicite: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'periodicite',
        key: 'id_periodicite'
      }
    },
    id_entite: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'entité',
        key: 'id_entite'
      }
    },
    id_commenditaire: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'utilisateur',
        key: 'id_utilisateur'
      }
    },
    id_executeur: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'utilisateur',
        key: 'id_utilisateur'
      }
    },
    id_controleur: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'utilisateur',
        key: 'id_utilisateur'
      }
    }
  }, {
    sequelize,
    tableName: 'obligation',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_obligation" },
        ]
      },
      {
        name: "id_niveau_risque",
        using: "BTREE",
        fields: [
          { name: "id_niveau_risque" },
        ]
      },
      {
        name: "obligation_ibfk_2",
        using: "BTREE",
        fields: [
          { name: "id_article_associe" },
        ]
      },
      {
        name: "obligation_ibfk_5",
        using: "BTREE",
        fields: [
          { name: "id_commenditaire" },
        ]
      },
      {
        name: "id_article",
        using: "BTREE",
        fields: [
          { name: "id_article_associe" },
        ]
      },
      {
        name: "obligation_ibfk_7",
        using: "BTREE",
        fields: [
          { name: "id_controleur" },
        ]
      },
      {
        name: "obligation_ibfk_6",
        using: "BTREE",
        fields: [
          { name: "id_executeur" },
        ]
      },
      {
        name: "obligation_ibfk_3",
        using: "BTREE",
        fields: [
          { name: "id_periodicite" },
        ]
      },
      {
        name: "id_entite",
        using: "BTREE",
        fields: [
          { name: "id_entite" },
        ]
      },
    ]
  });
};
