const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Utilisateur
router.post('/login', authController.login);
router.post('/register', authController.register);

// Tuteur
router.post('/tuteur/login', authController.loginTuteur);
router.post('/tuteur/register', authController.registerTuteur);

module.exports = router;
