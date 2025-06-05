const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // <-- chemin corrigé
const User = require('./user');
const Entreprise = require('./entreprise');

const Tuteur = sequelize.define('Tuteur', {
  fonction: DataTypes.STRING,
});

Tuteur.belongsTo(User, { foreignKey: 'userId' });
Tuteur.belongsTo(Entreprise, { foreignKey: 'entrepriseId' });

module.exports = Tuteur;
