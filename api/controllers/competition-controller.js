const { CompetitionService } =require('../services/competitions-service.js')

const create =async(req, res) =>{
    const {status, message, payload} =await CompetitionService.create(req.body);
    return res.status(status).json({message, payload});
}

const list =async(req, res) =>{
    const {status, message, payload} =await CompetitionService.listCompetitions()
    return res.status(status).json({message, payload});
}

const get =async (req, res) => {
    const {status, message, payload} =await CompetitionService.getCompetitionByID(req.params)
    return res.status(status).json({message, payload});
}
module.exports ={
    create, list, get
}