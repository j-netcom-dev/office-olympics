const Competition =require('../models/competition-model.js');

const { BAD_REQUEST, CREATED, CONFLICT, OKAY, SERVER_ERROR, NOT_FOUND } =require('../constants.js')

class CompetitionService{

    static create =async data =>{
        const {name} =data;
        try {
            const competitionFound =await Competition.findOne({name})
            if(competitionFound) return {status: CONFLICT, message: `${name} is already registered`}
            const competition =new Competition({name});
            await competition.save()
            return {status: CREATED, payload: competition, message: 'Registered'}
        } catch ({message}) {
            return {status: BAD_REQUEST, message}
        }
    }

    static listCompetitions = async () =>{
        try {
            const payload =await Competition.find();
            return {status: OKAY, payload}
        } catch ({message}) {
            return {status: SERVER_ERROR, message}
        }
    }
    static getCompetitionByID =async ({_id}) =>{
        try {
            const payload =await Competition.findById({_id});
            if(payload) return {status: OKAY, payload}
            return {status: NOT_FOUND, message: 'Competition not found.'}
            
        } catch ({message}) {
            return {status: SERVER_ERROR, message}
        }
    }
}

module.exports ={ CompetitionService };