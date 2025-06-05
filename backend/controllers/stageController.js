const { Stage } = require('../models');

exports.submitStage = async (req, res) => {
  const { titre, entreprise, duree, tuteur, description, dateDebut, dateFin } = req.body;
  try {
    await Stage.create({
      titre,
      entreprise,
      duree,
      tuteur,
      description,
      dateDebut,
      dateFin,
      status: 'en attente',
      etudiantId: req.user.id // Assurez-vous que ce champ existe dans le modèle Stage et la table
    });
    res.json({ message: "Demande enregistrée" });
  } catch (err) {
    console.error("Erreur lors de la création du stage :", err);
    res.status(500).json({ error: "Erreur lors de l'envoi", details: err.message });
  }
};

exports.getMyStages = async (req, res) => {
  try {
    const stages = await Stage.findAll({ where: { etudiantId: req.user.id } });
    res.json(stages);
  } catch (err) {
    console.error("Erreur lors de la récupération des stages :", err);
    res.status(500).json({ error: "Erreur lors de la récupération", details: err.message });
  }
};

exports.getStageById = async (req, res) => {
  const { id } = req.params;
  const demande = await Stage.findOne({ where: { id, etudiantId: req.user.id } });
  if (!demande) {
    return res.status(404).json({ error: "Demande non trouvée" });
  }
  res.json(demande);
};

exports.updateStage = async (req, res) => {
  const { id } = req.params;
  const { titre, entreprise, duree, tuteur, description } = req.body;
  try {
    await Stage.update(
      { titre, entreprise, duree, tuteur, description },
      { where: { id, etudiantId: req.user.id } }
    );
    res.json({ message: "Demande mise à jour" });
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la mise à jour" });
  }
};

exports.deleteStage = async (req, res) => {
  const { id } = req.params;
  try {
    await Stage.destroy({ where: { id, etudiantId: req.user.id } });
    res.json({ message: "Demande supprimée" });
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la suppression" });
  }
};
