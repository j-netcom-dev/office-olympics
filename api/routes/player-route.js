const { Router } =require('express');
const { create, fetch } =require('../controllers/player-controller.js')

const router =Router();

router.post('/', create);
router.get('/', fetch);

module.exports =router;