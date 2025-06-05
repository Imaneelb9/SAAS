const express = require('express');
const router = express.Router();
const { Stage } = require('../models');
const verifyToken = require('../middlewares/authMiddleware');

// Liste des demandes reçues par l'entreprise connectée
router.get('/demandes', verifyToken, async (req, res) => {
  try {
    // Pour le test, retourne toutes les demandes de stage
    const demandes = await Stage.findAll();
    res.json(
      demandes.map(d => ({
        id: d.id,
        titre: d.titre,
        description: d.description,
        statut: d.status,
        commentaireEntreprise: d.commentaire,
        etudiantNom: d.etudiantId // à remplacer par le nom réel si jointure
      }))
    );
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la récupération des demandes" });
  }
});

module.exports = router;
