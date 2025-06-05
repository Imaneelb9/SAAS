const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  nom: DataTypes.STRING,
  prenom: DataTypes.STRING,
  email: {
    type: DataTypes.STRING,
    unique: true, // <-- unique ici
    // Supprimez tout index ou unique supplémentaire dans la migration ou ailleurs
  },
  motdepasse: DataTypes.STRING,
  role: DataTypes.ENUM('etudiant', 'entreprise', 'admin', 'tuteur'),
  dateInscription: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  actif: { type: DataTypes.BOOLEAN, defaultValue: true }
});

module.exports = User;
