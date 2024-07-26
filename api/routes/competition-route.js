const { Router } =require('express');
const { create, list, get } =require('../controllers/competition-controller.js')

const router =Router();

router.post('/', create);
router.get('/list', list);
router.get('/get/:_id', get);

module.exports =router;