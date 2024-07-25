const Prediction =require('../models/prediction-model.js');
const { BAD_REQUEST, CREATED, OKAY, SERVER_ERROR } =require('../constants.js')

class PredictionService{

    static create =async data =>{
        const { user, competition, winner } =data
        try {
            const prediction =new Prediction({user, competition, winner });
            await prediction.save()
            return {status: CREATED, message: 'Saved'}
        } catch ({message}) {
            return {status: BAD_REQUEST, message}
        }
    }

    static fetch = async () =>{
        try {
            const predictions =await Prediction.find();
            return {status: OKAY, predictions}
        } catch ({message}) {
            return {status: SERVER_ERROR, message}
        }
    }
}

module.exports ={ PredictionService };