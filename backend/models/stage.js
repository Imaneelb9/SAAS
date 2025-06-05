const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // <-- chemin corrigé

const Stage = sequelize.define('Stage', {
  titre: DataTypes.STRING,
  description: DataTypes.TEXT,
  dateDebut: DataTypes.DATE,
  dateFin: DataTypes.DATE,
  status: DataTypes.ENUM('en attente', 'valide', 'refuse'),
  commentaire: DataTypes.STRING
});

module.exports = Stage;
