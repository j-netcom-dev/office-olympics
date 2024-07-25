const { Router } =require('express');
const { create, list } =require('../controllers/prediction-controller.js')

const router =Router();

router.post('/', create);
router.get('/', list);

module.exports =router;