const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('consolidation', {
    id_consolidation: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nb_obligations: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    nb_obligations_conformes: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    nb_obligations_non_conformes: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    nb_obligations_en_cours: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'consolidation',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_consolidation" },
        ]
      },
    ]
  });
};
