const { CompetitionService } =require('../services/competitions-service.js')

const create =async(req, res) =>{
    const {status, message} =await CompetitionService.create(req.body);
    return res.status(status).json({message});
}

const list =async(req, res) =>{
    const {status, message, competitions} =await CompetitionService.listCompetitions()
    return res.status(status).json({message, competitions});
}

module.exports ={
    create, list
}