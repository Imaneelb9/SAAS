const { User, Etudiant, Tuteur, Entreprise } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { nom, prenom, email, motdepasse, role, cne, filiere, secteur, adresse, siteWeb, description, telephone } = req.body;
  try {
    // Toujours enregistrer l'email en minuscule pour éviter les doublons
    const hash = await bcrypt.hash(motdepasse, 10);
    const user = await User.create({
      nom,
      prenom: prenom || "",
      email: email.toLowerCase(),
      motdepasse: hash,
      role,
      actif: true
    });
    if (role === "etudiant") {
      await Etudiant.create({
        userId: user.id,
        niveau: cne || "",
        filiere: filiere || "",
        cv: "",
        lettreMotivation: ""
      });
    } else if (role === "entreprise") {
      await Entreprise.create({
        userId: user.id,
        nom,
        secteur: secteur || "",
        adresse: adresse || "",
        siteWeb: siteWeb || "",
        description: description || ""
      });
    }
    // Ajoutez ce log pour vérifier l'inscription
    const allUsers = await User.findAll();
    console.log("Après inscription, tous les utilisateurs en base :", allUsers.map(u => ({ email: u.email, role: u.role })));
    res.status(201).json(user);
  } catch (error) {
    console.error("Erreur SQL lors de l'inscription :", error);
    res.status(400).json({ error: 'Erreur lors de l’inscription', details: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, motdepasse, role } = req.body;
  try {
    // Cherche l'utilisateur uniquement par email (insensible à la casse)
    const user = await User.findOne({ where: { email: email.toLowerCase() } });
    // Debug : affichez tous les utilisateurs pour vérifier ce qui est stocké
    const allUsers = await User.findAll();
    console.log("Tous les utilisateurs en base :", allUsers.map(u => ({ email: u.email, role: u.role })));
    if (!user) {
      console.log("Tentative de connexion avec email inexistant :", email, "role:", role);
      return res.status(401).json({ error: 'Utilisateur introuvable' });
    }

    // Debug : affichez le rôle trouvé en base
    if (user.role !== role) {
      console.log("Rôle incorrect :", "attendu:", role, "trouvé:", user.role);
      return res.status(401).json({ error: `Rôle incorrect pour cet utilisateur (${user.role})` });
    }

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
