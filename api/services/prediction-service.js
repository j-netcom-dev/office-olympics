const Prediction =require('../models/prediction-model.js');
const { BAD_REQUEST, CREATED, OKAY, SERVER_ERROR, CONFLICT } =require('../constants.js')

class PredictionService{

    static create =async data =>{
        const { user, competition, winner } =data
        try {
            const competitionFound =await Prediction.findOne({competition});
            if(competitionFound) return {status: CONFLICT, message:  `You already made predictions for this competition`}
            const prediction =new Prediction({user, competition, winner });
            await prediction.save()
            return {status: CREATED, message: 'Saved'}
        } catch ({message}) {
            return {status: BAD_REQUEST, message}
        }
    }

    static fetch = async () =>{
        try {
            const payload =await Prediction.find()
            .populate('user')
            .populate('competition')
            .populate('winner');
            return {status: OKAY, payload}
        } catch ({message}) {
            return {status: SERVER_ERROR, message}
        }
    }

    static getUserPredictions =async ({user}) =>{
        try {
            const payload =await Prediction.find({user})
            .populate('competition')
            .populate('winner');
            return {status: OKAY, payload}
        } catch ({message}) {
            return {status: SERVER_ERROR, message}
        }
    }
}

module.exports ={ PredictionService };