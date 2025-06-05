const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // <-- chemin corrigé
const User = require('./user');

const Entreprise = sequelize.define('Entreprise', {
  nom: DataTypes.STRING,
  secteur: DataTypes.STRING,
  adresse: DataTypes.STRING,
  siteWeb: DataTypes.STRING,
  description: DataTypes.STRING,
});

Entreprise.belongsTo(User, { foreignKey: 'userId' });

module.exports = Entreprise;
