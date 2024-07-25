const { Router } =require('express');
const { create, list } =require('../controllers/competition-controller.js')

const router =Router();

router.post('/', create);
router.get('/list', list);

module.exports =router;