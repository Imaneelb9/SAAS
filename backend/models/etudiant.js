const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

const Etudiant = sequelize.define('Etudiant', {
  cne: DataTypes.STRING, // <-- Ajoutez ce champ si besoin
  niveau: DataTypes.STRING, // <-- Niveau d'étude (Licence, Master, etc.)
  filiere: DataTypes.STRING,
  cv: DataTypes.STRING,
  lettreMotivation: DataTypes.STRING,
  entrepriseId: DataTypes.INTEGER
});

Etudiant.belongsTo(User, { foreignKey: 'userId' });

module.exports = Etudiant;
