const { PredictionService } =require('../services/prediction-service.js')

const create =async(req, res) =>{
    const {status, message} =await PredictionService.create(req.body);
    return res.status(status).json({message});
}

const list =async(_, res) =>{
    const {status, message, predictions} =await PredictionService.fetch()
    return res.status(status).json({message, predictions});
}

const getUserPredictions = async (req, res) =>{
    const {status, message, payload} =await PredictionService.getUserPredictions(req.params);
    return res.status(status).json({message, payload});
}

module.exports ={
    create, list, getUserPredictions
}