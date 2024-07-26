const { Router } =require('express');
const { create, list, get, updateParticipants, setWinner } =require('../controllers/competition-controller.js')

const router =Router();

router.post('/', create);
router.get('/list', list);
router.get('/get/:_id', get);
router.put('/put/:competition_id/:participant_id', updateParticipants)
router.put('/set/winner/:competition_id/:participant_id', setWinner)
module.exports =router;