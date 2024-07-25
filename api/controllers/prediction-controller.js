const { PredictionService } =require('../services/prediction-service.js')

const create =async(req, res) =>{
    const {status, message} =await PredictionService.create(req.body);
    return res.status(status).json({message});
}

const list =async(_, res) =>{
    const {status, message, predictions} =await PredictionService.fetch()
    return res.status(status).json({message, predictions});
}

module.exports ={
    create, list
}