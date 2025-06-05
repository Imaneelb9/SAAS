const { Stage } = require('../models');

exports.submitStage = async (req, res) => {
  const { titre, entreprise, duree, tuteur, description } = req.body;
  try {
    await Stage.create({
      titre,
      entreprise,
      duree,
      tuteur,
      description,
      status: 'en attente',
      etudiantId: req.user.id
    });
    res.json({ message: "Demande enregistrée" });
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de l'envoi" });
  }
};

exports.getMyStages = async (req, res) => {
  const stages = await Stage.findAll({ where: { etudiantId: req.user.id } });
  res.json(stages);
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
