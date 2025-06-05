const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // chemin corrigé

const User = sequelize.define('User', {
  nom: DataTypes.STRING,
  prenom: DataTypes.STRING,
  email: { type: DataTypes.STRING, unique: true },
  motdepasse: DataTypes.STRING,
  role: DataTypes.ENUM('etudiant', 'entreprise', 'admin', 'tuteur'), // 'tuteur' inclus
  dateInscription: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  actif: { type: DataTypes.BOOLEAN, defaultValue: true }
});

module.exports = User;
