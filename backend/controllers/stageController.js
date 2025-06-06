const { Stage, Entreprise, Candidature } = require('../models');

exports.submitStage = async (req, res) => {
  const { titre, entreprise, duree, tuteur, description, dateDebut, dateFin, type } = req.body;
  try {
    // Cherche l'entreprise par son nom (champ "entreprise" du formulaire)
    const entrepriseObj = await Entreprise.findOne({ where: { nom: entreprise } });
    if (!entrepriseObj) {
      return res.status(400).json({ error: "Entreprise non trouvée. Veuillez saisir un nom d'entreprise existant." });
    }
    // Log pour debug
    console.log("Entreprise trouvée pour la demande :", entrepriseObj.id, entrepriseObj.nom);

    const stage = await Stage.create({
      titre,
      entreprise,
      duree,
      tuteur,
      description,
      dateDebut,
      dateFin,
      type,
      status: 'en attente',
      etudiantId: req.user.id,
      entrepriseId: entrepriseObj.id // <-- Vérifiez que ce champ est bien renseigné
    });

    // Vérifiez que le stage est bien créé avec le bon entrepriseId
    console.log("Stage créé :", stage.id, "entrepriseId:", stage.entrepriseId);

    await Candidature.create({
      stageId: stage.id,
      etudiantId: req.user.id,
      entrepriseId: entrepriseObj.id,
      status: 'en attente',
      commentaireEntreprise: ''
    });

    res.json({ message: "Demande enregistrée" });
  } catch (err) {
    console.error("Erreur lors de la création du stage/candidature :", err);
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

// Lorsqu'une entreprise accepte/refuse ou lorsqu'un admin affecte une entreprise à un étudiant,
// mettez à jour le champ status dans la table Stage (ex: "stagiaire" ou "refus").
