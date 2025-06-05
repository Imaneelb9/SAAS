const express = require('express');
const router = express.Router();
const { Stage, Entreprise } = require('../models');
const verifyToken = require('../middlewares/authMiddleware');

// Liste des demandes reçues par l'entreprise connectée
router.get('/demandes', verifyToken, async (req, res) => {
  try {
    // Récupérer l'entreprise connectée via le userId du token
    const entreprise = await Entreprise.findOne({ where: { userId: req.user.id } });
    if (!entreprise) {
      return res.status(403).json({ error: "Entreprise non trouvée" });
    }
    // Récupérer les stages liés à cette entreprise
    const demandes = await Stage.findAll({ where: { entrepriseId: entreprise.id } });
    res.json(demandes);
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la récupération des demandes" });
  }
});

module.exports = router;
