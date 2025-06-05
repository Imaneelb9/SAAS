const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // <-- chemin corrigé
const Stage = require('./stage');
const Etudiant = require('./etudiant');
const Entreprise = require('./entreprise');

const Candidature = sequelize.define('Candidature', {
  datePostulation: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  status: DataTypes.ENUM('en attente', 'accepte', 'refuse'),
  commentaireEntreprise: DataTypes.STRING
});

Candidature.belongsTo(Stage, { foreignKey: 'stageId' });
Candidature.belongsTo(Etudiant, { foreignKey: 'etudiantId' });
Candidature.belongsTo(Entreprise, { foreignKey: 'entrepriseId' });

module.exports = Candidature;
