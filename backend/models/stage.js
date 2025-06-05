const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Stage = sequelize.define('Stage', {
  titre: DataTypes.STRING,
  description: DataTypes.TEXT,
  dateDebut: DataTypes.DATE,
  dateFin: DataTypes.DATE,
  status: DataTypes.ENUM('en attente', 'valide', 'refuse'),
  commentaire: DataTypes.STRING,
  duree: DataTypes.STRING,
  tuteur: DataTypes.STRING,
  entreprise: DataTypes.STRING,
  etudiantId: DataTypes.INTEGER,
  entrepriseId: DataTypes.INTEGER,
  type: DataTypes.STRING // <-- Ajoutez cette colonne pour le type de stage (Sur Place, À distance, Mixte)
});

module.exports = Stage;
