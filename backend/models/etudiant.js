const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // <-- chemin corrigé
const User = require('./user');

const Etudiant = sequelize.define('Etudiant', {
  niveau: DataTypes.STRING,
  filiere: DataTypes.STRING,
  cv: DataTypes.STRING,
  lettreMotivation: DataTypes.STRING,
  entrepriseId: DataTypes.INTEGER, // <-- Ajoutez ce champ
});

Etudiant.belongsTo(User, { foreignKey: 'userId' });

module.exports = Etudiant;
