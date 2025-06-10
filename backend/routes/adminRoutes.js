const express = require('express');
const router = express.Router();
const { User, Stage, Etudiant, Entreprise, Tuteur } = require('../models');
const {verifyToken} = require('../middlewares/authMiddleware');

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

// Ajouter un tuteur (accessible uniquement à l'admin)
router.post('/tuteurs', verifyToken, async (req, res) => {
  console.log("POST /api/admin/tuteurs appelée", req.body); // <-- Ajouté
  try {
    const { nom, prenom, email, fonction, entreprise } = req.body;
    // Création de l'utilisateur lié au tuteur
    const user = await User.create({ nom, prenom, email, actif: true });
    // Création du tuteur
    const tuteur = await Tuteur.create({ userId: user.id, nom, fonction, entreprise, actif: true });
    res.status(201).json({ message: "Tuteur ajouté", tuteur });
  } catch (err) {
    console.error("Erreur lors de l'ajout du tuteur :", err); // <-- Ajouté pour loguer l'erreur complète
    res.status(500).json({ error: "Erreur lors de l'ajout du tuteur", details: err.message });
  }
});

// Route temporaire pour insérer un jeu de données de test
router.post('/seed', async (req, res) => {
  try {
    // Création d'utilisateurs
    const user1 = await User.create({ nom: 'Dupont', prenom: 'Jean', email: 'jean.dupont@test.com', actif: true });
    const user2 = await User.create({ nom: 'Martin', prenom: 'Claire', email: 'claire.martin@test.com', actif: true });

    // Création d'étudiants
    const etudiant1 = await Etudiant.create({ userId: user1.id });
    const etudiant2 = await Etudiant.create({ userId: user2.id });

    // Création d'entreprises
    const entreprise1 = await Entreprise.create({ nom: 'TechCorp' });
    const entreprise2 = await Entreprise.create({ nom: 'InnovateX' });

    // Création de stages
    const stage1 = await Stage.create({ etudiantId: etudiant1.id, entrepriseId: entreprise1.id, status: 'en attente' });
    const stage2 = await Stage.create({ etudiantId: etudiant2.id, entrepriseId: entreprise2.id, status: 'valide' });

    // Création de tuteurs
    const tuteurUser = await User.create({ nom: 'Tuteur', prenom: 'Pierre', email: 'pierre.tuteur@test.com', actif: true });
    const tuteur1 = await Tuteur.create({ userId: tuteurUser.id, nom: 'Pierre', fonction: 'Encadrant', entreprise: 'TechCorp', actif: true });

    res.json({ message: "Jeu de données inséré", users: [user1, user2], etudiants: [etudiant1, etudiant2], entreprises: [entreprise1, entreprise2], stages: [stage1, stage2], tuteurs: [tuteur1] });
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de l'insertion du jeu de données", details: err.message });
  }
});

module.exports = router;
