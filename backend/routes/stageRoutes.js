const express = require('express');
const router = express.Router();
const stageController = require('../controllers/stageController');
const { verifyToken } = require('../middlewares/authMiddleware'); // verifyToken doit être une fonction
const checkRole = require('../middlewares/roleMiddleware'); // checkRole doit être une fonction

router.post('/', verifyToken, checkRole('etudiant'), stageController.submitStage);
router.get('/mes', verifyToken, checkRole('etudiant'), stageController.getMyStages);
router.get('/:id', verifyToken, checkRole('etudiant'), stageController.getStageById);
router.put('/:id', verifyToken, checkRole('etudiant'), stageController.updateStage);
router.delete('/:id', verifyToken, checkRole('etudiant'), stageController.deleteStage);

router.post('/test', (req, res) => {
  res.json({ message: "Route test OK" });
});

module.exports = router;
