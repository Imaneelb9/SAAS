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
  fonction: {
    type: DataTypes.STRING,
    allowNull: true
  },
  entreprise: {
    type: DataTypes.STRING,
    allowNull: true
  },
  actif: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
  // Ajoutez d'autres champs si besoin
}, {
  tableName: 'Tuteurs'
});

module.exports = Tuteur;
