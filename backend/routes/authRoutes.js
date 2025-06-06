const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Si vous ne souhaitez plus gérer l'upload de fichiers à l'inscription, retirez multer :


// Utilisateur
router.post('/login', authController.login);
router.post('/register', authController.register); // <-- gardez seulement cette ligne pour l'inscription

// Tuteur
router.post('/tuteur/login', authController.loginTuteur);
router.post('/tuteur/register', authController.registerTuteur);

// Admin
router.post('/login-admin', authController.loginAdmin);

module.exports = router;
