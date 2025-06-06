const express = require('express');
const router = express.Router();
const { Etudiant } = require('../models');
const verifyToken = require('../middlewares/authMiddleware'); // <-- le dossier doit s'appeler "middlewares" (pluriel)
const multer = require('multer');
const path = require('path');

// Configurez multer pour stocker les fichiers dans le dossier uploads/
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${req.user.id}-${file.fieldname}-${Date.now()}${ext}`);
  }
});
const upload = multer({ storage });

// Liste de tous les étudiants
router.get('/', async (req, res) => {
  try {
    const etudiants = await Etudiant.findAll();
    res.json(etudiants);
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la récupération des étudiants" });
  }
});

// Ajouter un étudiant (à adapter selon votre logique)
router.post('/', async (req, res) => {
  try {
    const etudiant = await Etudiant.create(req.body);
    res.status(201).json(etudiant);
  } catch (err) {
    res.status(400).json({ error: "Erreur lors de la création de l'étudiant" });
  }
});

// Route pour importer le CV
router.post('/upload-cv', verifyToken, upload.single('cv'), async (req, res) => {
  try {
    const etudiant = await Etudiant.findOne({ where: { userId: req.user.id } });
    if (!etudiant) return res.status(404).json({ error: "Étudiant non trouvé" });
    etudiant.cv = req.file.path;
    await etudiant.save();
    res.json({ message: "CV importé avec succès", path: req.file.path });
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de l'import du CV" });
  }
});

// Route pour importer la lettre de motivation
router.post('/upload-lettre', verifyToken, upload.single('lettreMotivation'), async (req, res) => {
  try {
    const etudiant = await Etudiant.findOne({ where: { userId: req.user.id } });
    if (!etudiant) return res.status(404).json({ error: "Étudiant non trouvé" });
    etudiant.lettreMotivation = req.file.path;
    await etudiant.save();
    res.json({ message: "Lettre de motivation importée avec succès", path: req.file.path });
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de l'import de la lettre de motivation" });
  }
});

// Ajoutez ici d'autres routes spécifiques à l'étudiant si besoin



module.exports = router;
