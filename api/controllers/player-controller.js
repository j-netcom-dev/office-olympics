const { PlayerService } =require('../services/player-service.js')

const create =async(req, res) =>{
    const {status, message, payload} =await PlayerService.create(req.body);
    return res.status(status).json({message, payload});
}

const fetch =async(_, res) =>{
    const {status, message, payload} =await PlayerService.fetch()
    return res.status(status).json({message, payload});
}

module.exports ={
    create, fetch
}