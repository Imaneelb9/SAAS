const sequelize = require('../config/database');

// Importation des modèles
const User = require('./user');
const Etudiant = require('./etudiant');
const Entreprise = require('./entreprise');
const Stage = require('./stage');
const Candidature = require('./candidature');
const Tuteur = require('./tuteur');

Tuteur.belongsTo(User, { foreignKey: 'userId' });
Tuteur.belongsTo(Entreprise, { foreignKey: 'entrepriseId' });

// === Associations ===

// Tuteur associé à un User
User.hasOne(Tuteur, { foreignKey: 'userId' }); // Recommandé pour cohérence bidirectionnelle

// Etudiant associé à un User
Etudiant.belongsTo(User, { foreignKey: 'userId' });
User.hasOne(Etudiant, { foreignKey: 'userId' });

// Etudiant peut être lié à une entreprise
Etudiant.belongsTo(Entreprise, { foreignKey: 'entrepriseId' });
Entreprise.hasMany(Etudiant, { foreignKey: 'entrepriseId' });

// Stage lié à un étudiant
Stage.belongsTo(Etudiant, { foreignKey: 'etudiantId' });
Etudiant.hasMany(Stage, { foreignKey: 'etudiantId' });

// Stage lié à une entreprise
Stage.belongsTo(Entreprise, { foreignKey: 'entrepriseId' });
Entreprise.hasMany(Stage, { foreignKey: 'entrepriseId' });

// Stage peut avoir une candidature
Candidature.belongsTo(Stage, { foreignKey: 'stageId' });
Stage.hasMany(Candidature, { foreignKey: 'stageId' });

// Etudiant peut envoyer des candidatures
Candidature.belongsTo(Etudiant, { foreignKey: 'etudiantId' });
Etudiant.hasMany(Candidature, { foreignKey: 'etudiantId' });

// === Export des modèles avec sequelize ===
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
// Synchronisation des modèles avec la base de données
// sequelize.sync({ force: false }) // Utilisez force: true pour réinitialiser la base de données