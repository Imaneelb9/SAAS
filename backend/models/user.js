const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  nom: DataTypes.STRING,
  prenom: DataTypes.STRING,
  idcode: { type: DataTypes.STRING, unique: true }, // <-- Ajoutez ce champ pour l'admin
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  motdepasse: DataTypes.STRING,
  role: DataTypes.ENUM('etudiant', 'entreprise', 'admin', 'tuteur'),
  dateInscription: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  actif: { type: DataTypes.BOOLEAN, defaultValue: true }
});

module.exports = User;
