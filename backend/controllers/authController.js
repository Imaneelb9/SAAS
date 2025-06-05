const { User, Etudiant, Tuteur, Entreprise } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { nom, prenom, email, motdepasse, role, cne, filiere, telephone } = req.body;
  try {
    const hash = await bcrypt.hash(motdepasse, 10);
    const user = await User.create({ nom, prenom, email, motdepasse: hash, role });
    if (role === "etudiant") {
      await Etudiant.create({
        userId: user.id,
        niveau: cne || "", // ou adaptez selon votre logique
        filiere: filiere || "",
        cv: "",
        lettreMotivation: ""
      });
    }
    res.status(201).json(user);
  } catch (error) {
    // Ajoutez le message SQL pour debug
    res.status(400).json({ error: 'Erreur lors de l’inscription', details: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, motdepasse, role } = req.body; // <-- ajoutez 'role'
  try {
    // Filtrer sur le rôle pour éviter la confusion entre étudiant/entreprise/admin
    const user = await User.findOne({ where: { email, role } });
    if (!user) return res.status(401).json({ error: 'Utilisateur introuvable' });

    const isMatch = await bcrypt.compare(motdepasse, user.motdepasse);
    if (!isMatch) return res.status(401).json({ error: 'Mot de passe incorrect' });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });

    res.json({ token, user: { id: user.id, nom: user.nom, role: user.role } });
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur', details: error });
  }
};

exports.registerTuteur = async (req, res) => {
  const { nom, prenom, email, motdepasse, fonction, entreprise } = req.body;
  try {
    const hash = await bcrypt.hash(motdepasse, 10);
    // Créer le user
    const user = await User.create({ nom, prenom, email, motdepasse: hash, role: 'tuteur' });
    // Trouver ou créer l'entreprise associée
    let entrepriseObj = await Entreprise.findOne({ where: { nom: entreprise } });
    if (!entrepriseObj) {
      entrepriseObj = await Entreprise.create({ nom: entreprise });
    }
    // Créer le tuteur
    await Tuteur.create({ fonction, userId: user.id, entrepriseId: entrepriseObj.id });
    res.status(201).json({ message: "Tuteur inscrit avec succès" });
  } catch (error) {
    res.status(400).json({ error: 'Erreur lors de l’inscription tuteur', details: error });
  }
};

exports.loginTuteur = async (req, res) => {
  const { email, motdepasse } = req.body;
  try {
    const user = await User.findOne({ where: { email, role: 'tuteur' } });
    if (!user) return res.status(401).json({ error: 'Tuteur introuvable' });

    const isMatch = await bcrypt.compare(motdepasse, user.motdepasse);
    if (!isMatch) return res.status(401).json({ error: 'Mot de passe incorrect' });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });

    res.json({ token, user: { id: user.id, nom: user.nom, role: user.role } });
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur', details: error });
  }
};
