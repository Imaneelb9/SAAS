const { User, Entreprise, Tuteur } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerTuteur = async (req, res) => {
  const { nom, prenom, email, motdepasse, fonction, entreprise } = req.body;

  try {
    const hash = await bcrypt.hash(motdepasse, 10);

    const user = await User.create({
      nom,
      prenom,
      email: email.toLowerCase(),
      motdepasse: hash,
      role: 'tuteur',
      actif: true
    });

    // Trouver ou créer l'entreprise
    let entrepriseObj = await Entreprise.findOne({ where: { nom: entreprise } });
    if (!entrepriseObj) {
      entrepriseObj = await Entreprise.create({ nom: entreprise });
    }

    // Créer le tuteur
    await Tuteur.create({
      fonction,
      userId: user.id,
      entrepriseId: entrepriseObj.id
    });

    res.status(201).json({ message: "Tuteur inscrit avec succès" });
  } catch (error) {
    console.error("Erreur lors de l'inscription du tuteur :", error);
    res.status(400).json({ error: 'Erreur lors de l’inscription du tuteur', details: error.message });
  }
};
exports.loginTuteur = async (req, res) => {
  const { email, motdepasse } = req.body;

  try {
    const user = await User.findOne({ where: { email: email.toLowerCase(), role: 'tuteur' } });
    if (!user) return res.status(401).json({ error: 'Tuteur introuvable' });

    const isMatch = await bcrypt.compare(motdepasse, user.motdepasse);
    if (!isMatch) return res.status(401).json({ error: 'Mot de passe incorrect' });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || "super_secret_token",
      { expiresIn: '1d' }
    );

    res.json({ token, user: { id: user.id, nom: user.nom, role: user.role } });
  } catch (error) {
    console.error("Erreur serveur lors du login :", error);
    res.status(500).json({ error: 'Erreur serveur', details: error.message });
  }
};