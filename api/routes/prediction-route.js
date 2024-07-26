const { Router } =require('express');
const { create, list, getUserPredictions } =require('../controllers/prediction-controller.js')

const router =Router();

router.post('/', create);
router.get('/', list);
router.get('/:user', getUserPredictions)

module.exports =router;