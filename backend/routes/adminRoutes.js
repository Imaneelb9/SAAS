const express = require('express');
const router = express.Router();
const { User, Stage, Etudiant, Entreprise } = require('../models');

// Vérification de la route
router.get('/', (req, res) => {
  res.json({ message: "Admin routes OK" });
});

// Liste de tous les utilisateurs
router.get('/utilisateurs', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la récupération des utilisateurs" });
  }
});

// Activation/désactivation d'un utilisateur
router.put('/utilisateurs/:id/activation', async (req, res) => {
  try {
    const { id } = req.params;
    const { actif } = req.body;
    await User.update({ actif }, { where: { id } });
    res.json({ message: "Statut mis à jour" });
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la mise à jour" });
  }
});

// Statistiques des stages
router.get('/statistiques', async (req, res) => {
  try {
    const attente = await Stage.count({ where: { status: 'en attente' } });
    const valide = await Stage.count({ where: { status: 'valide' } });
    const refuse = await Stage.count({ where: { status: 'refuse' } });
    res.json({ attente, valide, refuse });
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la récupération des statistiques" });
  }
});

// Liste de tous les étudiants (pour l'affectation)
router.get('/etudiants', async (req, res) => {
  try {
    const etudiants = await Etudiant.findAll({
      include: [{ model: User, attributes: ['nom', 'prenom'] }]
    });
    res.json(etudiants.map(e => ({
      id: e.id,
      nom: e.User?.nom,
      prenom: e.User?.prenom
    })));
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la récupération des étudiants" });
  }
});

// Liste de toutes les entreprises (pour l'affectation)
router.get('/entreprises', async (req, res) => {
  try {
    const entreprises = await Entreprise.findAll();
    res.json(entreprises.map(e => ({
      id: e.id,
      nom: e.nom
    })));
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la récupération des entreprises" });
  }
});

// Affecter une entreprise à un étudiant
router.post('/affectation', async (req, res) => {
  const { etudiantId, entrepriseId } = req.body;
  try {
    const etudiant = await require('../models').Etudiant.findByPk(etudiantId);
    if (!etudiant) return res.status(404).json({ error: "Étudiant non trouvé" });
    etudiant.entrepriseId = entrepriseId;
    await etudiant.save();
    res.json({ message: "Affectation enregistrée" });
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de l'affectation" });
  }
});

module.exports = router;
