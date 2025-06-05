const express = require('express');
const router = express.Router();
const stageController = require('../controllers/stageController');
const verifyToken = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/roleMiddleware');

// Route : POST /api/stages
router.post('/', verifyToken, checkRole('etudiant'), stageController.submitStage);

// Route : GET /api/stages/mes
router.get('/mes', verifyToken, checkRole('etudiant'), stageController.getMyStages);

// Route : GET /api/stages/:id
router.get('/:id', verifyToken, checkRole('etudiant'), stageController.getStageById);

// Route : PUT /api/stages/:id
router.put('/:id', verifyToken, checkRole('etudiant'), stageController.updateStage);

// Route : DELETE /api/stages/:id
router.delete('/:id', verifyToken, checkRole('etudiant'), stageController.deleteStage);

module.exports = router;
