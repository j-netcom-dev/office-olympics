const { PlayerService } =require('../services/player-service.js')

const create =async(req, res) =>{
    const {status, message} =await PlayerService.create(req.body);
    console.log(status, message);
    return res.status(status).json({message});
}

const fetch =async(_, res) =>{
    const {status, message, players} =await PlayerService.fetch()
    return res.status(status).json({message, players});
}

module.exports ={
    create, fetch
}