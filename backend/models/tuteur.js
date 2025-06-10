const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Tuteur = sequelize.define('Tuteur', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true
  },
  entrepriseId: {  // <--- lien avec la table Entreprise
    type: DataTypes.INTEGER,
    allowNull: true
  },
  fonction: {
    type: DataTypes.STRING,
    allowNull: true
  },
  actif: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'Tuteurs'
});

module.exports = Tuteur;
