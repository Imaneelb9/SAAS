const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Stage = sequelize.define('Stage', {
  titre: DataTypes.STRING,
  description: DataTypes.TEXT,
  dateDebut: DataTypes.DATE,
  dateFin: DataTypes.DATE,
  status: DataTypes.ENUM('en attente', 'valide', 'refuse'),
  commentaire: DataTypes.STRING,
  duree: DataTypes.STRING, // Ajoutez ce champ si utilisé dans le frontend
  tuteur: DataTypes.STRING, // Ajoutez ce champ si utilisé dans le frontend
  entreprise: DataTypes.STRING, // Ajoutez ce champ si utilisé dans le frontend
  etudiantId: DataTypes.INTEGER // Ajoutez ce champ pour la liaison avec l'étudiant
});

module.exports = Stage;
