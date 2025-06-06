const sequelize = require('../config/database');
const User = require('./user');
const Etudiant = require('./etudiant');
const Entreprise = require('./entreprise');
const Stage = require('./stage');
const Candidature = require('./candidature');
const Tuteur = require('./tuteur');

// Association pour la jointure email
Tuteur.belongsTo(User, { foreignKey: 'userId' });

const db = {
  sequelize,
  User,
  Etudiant,
  Entreprise,
  Stage,
  Candidature,
  Tuteur
};
module.exports = db;
