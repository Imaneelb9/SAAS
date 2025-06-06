const express = require('express');
const router = express.Router();
const { Tuteur, User, Etudiant } = require('../models');
const verifyToken = require('../middlewares/authMiddleware');
const bcrypt = require('bcrypt');

// Route d'inscription d’un tuteur (publique)
router.post('/register', async (req, res) => {
  try {
    const { email, password, fonction, entreprise } = req.body;

    // Vérifier si l'utilisateur existe déjà
    let user = await User.findOne({ where: { email } });
    if (user) return res.status(400).json({ error: "Email déjà utilisé" });

    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer l'utilisateur
    user = await User.create({ email, password: hashedPassword, role: 'tuteur' });

    // Créer le tuteur lié à ce user
    await Tuteur.create({
      userId: user.id,
      fonction: fonction || "",
      entreprise: entreprise || "",
      actif: true
    });

    res.status(201).json({ message: "Tuteur inscrit avec succès" });
  } catch (err) {
    console.error("Erreur lors de l'inscription du tuteur :", err);
    res.status(500).json({ error: "Erreur lors de l'inscription du tuteur", details: err.message });
  }
});

// Route pour récupérer le profil du tuteur connecté
router.get('/profil', verifyToken, async (req, res) => {
  try {
    const tuteur = await Tuteur.findOne({ where: { userId: req.user.id } });
    if (!tuteur) return res.status(404).json({ error: "Tuteur non trouvé" });

    res.json({
      nom: tuteur.nom,
      fonction: tuteur.fonction,
      entreprise: tuteur.entreprise
    });
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la récupération du profil" });
  }
});

// Route pour mettre à jour le profil du tuteur connecté
router.put('/profil', verifyToken, async (req, res) => {
  try {
    console.log("PUT /api/tuteur/profil - userId:", req.user.id, "body:", req.body);

    const tuteur = await Tuteur.findOne({ where: { userId: req.user.id } });
    if (!tuteur) {
      console.error("Tuteur non trouvé pour userId:", req.user.id);
      return res.status(404).json({ error: "Tuteur non trouvé" });
    }

    console.log("Champs reçus pour update tuteur :", req.body);

    if ('nom' in req.body) tuteur.nom = req.body.nom;
    if ('fonction' in req.body) tuteur.fonction = req.body.fonction;
    if ('entreprise' in req.body) tuteur.entreprise = req.body.entreprise;

    await tuteur.save();
    console.log("Profil tuteur mis à jour avec succès pour userId:", req.user.id);
    res.json({ message: "Profil mis à jour" });
  } catch (err) {
    console.error("Erreur lors de la mise à jour du tuteur :", err);
    res.status(500).json({ error: "Erreur lors de la mise à jour", details: err.message });
  }
});

// Route pour lister les étudiants encadrés par le tuteur connecté
router.get('/etudiants', verifyToken, async (req, res) => {
  try {
    const tuteur = await Tuteur.findOne({ where: { userId: req.user.id } });
    if (!tuteur) return res.status(404).json({ error: "Tuteur non trouvé" });

    const etudiants = await Etudiant.findAll({ where: { tuteurId: tuteur.id } });
    res.json(etudiants);
  } catch (err) {
    console.error("Erreur lors de la récupération des étudiants :", err);
    res.status(500).json({ error: "Erreur lors de la récupération des étudiants encadrés" });
  }
});

// Middleware global pour les erreurs non capturées
router.use((err, req, res, next) => {
  console.error("Erreur dans tuteurRoutes :", err);
  res.status(500).json({ error: "Erreur serveur", details: err.message });
});

module.exports = router;
