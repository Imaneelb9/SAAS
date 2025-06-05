const express = require('express');
const router = express.Router();
const { Etudiant } = require('../models');

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

// Ajoutez ici d'autres routes spécifiques à l'étudiant si besoin

module.exports = router;
