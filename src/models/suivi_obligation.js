const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('suivi_obligation', {
    id_suivi: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_obligation: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'obligation',
        key: 'id_obligation'
      }
    },
    id_controleur: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_utilisateur: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'utilisateur',
        key: 'id_utilisateur'
      }
    },
    id_status_conformite: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'status_conformite',
        key: 'id_status_conformite'
      }
    },
    reponsable_mise_oeuvre: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'utilisateur',
        key: 'id_utilisateur'
      }
    },
    date_suivi: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    commentaire_controleur: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    link_fichier_controle: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    echeance_a_venir: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    echeance_passe: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    recommandation: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    plan_action: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'suivi_obligation',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_suivi" },
        ]
      },
      {
        name: "id_obligation",
        using: "BTREE",
        fields: [
          { name: "id_obligation" },
        ]
      },
      {
        name: "id_utilisateur",
        using: "BTREE",
        fields: [
          { name: "id_utilisateur" },
        ]
      },
      {
        name: "id_status_conformite",
        using: "BTREE",
        fields: [
          { name: "id_status_conformite" },
        ]
      },
      {
        name: "reponsable_mise_oeuvre",
        using: "BTREE",
        fields: [
          { name: "reponsable_mise_oeuvre" },
        ]
      },
      {
        name: "id_controleur",
        using: "BTREE",
        fields: [
          { name: "id_controleur" },
        ]
      },
    ]
  });
};
