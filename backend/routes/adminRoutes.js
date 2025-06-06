const express = require('express');
const router = express.Router();
const { User, Stage, Etudiant, Entreprise, Tuteur } = require('../models');
const verifyToken = require('../middlewares/authMiddleware');

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

// Affecter une entreprise à un étudiant et mettre à jour le statut du stage
router.post('/affecter', verifyToken, async (req, res) => {
  try {
    const { stageId, entrepriseId } = req.body;
    // Met à jour l'entreprise et le statut du stage à "stagiaire"
    const [updated] = await require('../models').Stage.update(
      { entrepriseId, status: 'stagiaire' },
      { where: { id: stageId } }
    );
    if (updated === 0) {
      return res.status(404).json({ error: "Stage non trouvé" });
    }
    res.json({ message: "Entreprise affectée et statut mis à jour" });
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de l'affectation" });
  }
});

// Liste des tuteurs (GET)
router.get('/tuteurs', verifyToken, async (req, res) => {
  try {
    // Vérifiez que l'association existe bien :
    // Tuteur.belongsTo(User, { foreignKey: 'userId' });
    const tuteurs = await Tuteur.findAll({
      include: [{ model: User, attributes: ['email'] }]
    });
    res.json(
      tuteurs.map(t => ({
        id: t.id,
        nom: t.nom || "", // Ajoutez une valeur par défaut pour éviter undefined
        fonction: t.fonction || "",
        entreprise: t.entreprise || "",
        email: t.User ? t.User.email : "",
        actif: t.actif !== false
      }))
    );
  } catch (err) {
    console.error("Erreur admin/tuteurs :", err);
    res.status(500).json({ error: "Erreur lors de la récupération des tuteurs", details: err.message });
  }
});

// Activer/désactiver un tuteur (PUT)
router.put('/tuteurs/:id/toggle', verifyToken, async (req, res) => {
  try {
    const tuteur = await Tuteur.findByPk(req.params.id);
    if (!tuteur) return res.status(404).json({ error: "Tuteur non trouvé" });
    tuteur.actif = req.body.actif;
    await tuteur.save();
    res.json({ message: "Statut du tuteur mis à jour" });
  } catch (err) {
    console.error("Erreur admin/tuteurs toggle :", err);
    res.status(500).json({ error: "Erreur lors de la mise à jour du tuteur", details: err.message });
  }
});

module.exports = router;
