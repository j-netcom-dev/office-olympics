const Player =require('../models/player-model.js');
const { BAD_REQUEST, CREATED, CONFLICT, OKAY, SERVER_ERROR } =require('../constants.js')

class PlayerService{

    static create =async data =>{
        const {first_name, last_name, gender, nationality} =data
        try {
            const playerFound =await Player.findOne({first_name, last_name})
            if(playerFound) return {status: CONFLICT, message: `Player name ${first_name} ${last_name} already taken`}
            const player =new Player({first_name, last_name, gender, nationality});
            await player.save()
            return {status: CREATED, payload: player, message: 'Created'}
        } catch ({message}) {
            return {status: BAD_REQUEST, message}
        }
    }

    static fetch = async () =>{
        try {
            const players =await Player.find();
            return {status: OKAY, payload: players}
        } catch ({message}) {
            return {status: SERVER_ERROR, message}
        }
    }
}

module.exports ={ PlayerService };