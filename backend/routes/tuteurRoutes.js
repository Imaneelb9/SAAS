const express = require('express');
const router = express.Router();
const { Tuteur, User, Entreprise } = require('../models');
const bcrypt = require('bcryptjs');

// Inscription d'un tuteur (accessible sans token)
router.post('/register', async (req, res) => {
  try {
    const { nom, prenom, email, motdepasse, fonction, entreprise } = req.body;

    // Vérifier si l'utilisateur existe déjà
    let user = await User.findOne({ where: { email } });
    if (user) return res.status(400).json({ error: "Email déjà utilisé" });

    // Hasher le mot de passe
    const hash = await bcrypt.hash(motdepasse, 10);

    // Créer l'utilisateur
    user = await User.create({ nom, prenom, email, motdepasse: hash, role: 'tuteur', actif: true });

    // Trouver ou créer l'entreprise associée
    let entrepriseObj = await Entreprise.findOne({ where: { nom: entreprise } });
    if (!entrepriseObj) {
      entrepriseObj = await Entreprise.create({ nom: entreprise });
    }

    // Créer le tuteur lié à ce user
    await Tuteur.create({
      userId: user.id,
      fonction: fonction || "",
      entrepriseId: entrepriseObj.id,
      actif: true
    });

    res.status(201).json({ message: "Tuteur inscrit avec succès" });
  } catch (err) {
    console.error("Erreur lors de l'inscription du tuteur :", err);
    res.status(500).json({ error: "Erreur lors de l'inscription du tuteur", details: err.message });
  }
});

module.exports = router;
