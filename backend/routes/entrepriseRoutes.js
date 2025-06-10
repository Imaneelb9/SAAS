const express = require('express');
const router = express.Router();
const { Stage, Entreprise } = require('../models');
const { verifyToken } = require('../middlewares/authMiddleware'); // Utilisez { verifyToken } si exporté ainsi

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
    // Log pour debug
    console.log("Entreprise connectée:", entreprise.id, entreprise.nom, "| Nombre de demandes:", demandes.length);
    res.json(demandes);
  } catch (err) {
    console.error("Erreur lors de la récupération des demandes :", err);
    res.status(500).json({ error: "Erreur lors de la récupération des demandes" });
  }
});

// Accepter une demande (status => "stagiaire")
router.post('/demandes/:id/accepter', verifyToken, async (req, res) => {
  try {
    const entreprise = await Entreprise.findOne({ where: { userId: req.user.id } });
    if (!entreprise) {
      return res.status(403).json({ error: "Entreprise non trouvée" });
    }
    const [updated] = await Stage.update(
      { status: 'stagiaire', commentaireEntreprise: req.body.commentaire || "" },
      { where: { id: req.params.id, entrepriseId: entreprise.id } }
    );
    if (updated === 0) {
      return res.status(404).json({ error: "Demande non trouvée ou non autorisée" });
    }
    res.json({ message: "Demande acceptée", newStatus: "stagiaire" });
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de l'acceptation" });
  }
});

// Refuser une demande (status => "refusé")
router.post('/demandes/:id/refuser', verifyToken, async (req, res) => {
  try {
    const entreprise = await Entreprise.findOne({ where: { userId: req.user.id } });
    if (!entreprise) {
      return res.status(403).json({ error: "Entreprise non trouvée" });
    }
    const [updated] = await Stage.update(
      { status: 'refusé', commentaireEntreprise: req.body.commentaire || "" },
      { where: { id: req.params.id, entrepriseId: entreprise.id } }
    );
    if (updated === 0) {
      return res.status(404).json({ error: "Demande non trouvée ou non autorisée" });
    }
    res.json({ message: "Demande refusée", newStatus: "refusé" });
  } catch (err) {
    res.status(500).json({ error: "Erreur lors du refus" });
  }
});

module.exports = router;
