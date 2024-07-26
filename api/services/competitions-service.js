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
            const payload =await Competition.find()
            .populate('participants') 
            .populate('winner');
            return {status: OKAY, payload}
        } catch ({message}) {
            return {status: SERVER_ERROR, message}
        }
    }
    static getCompetitionByID =async ({_id}) =>{
        try {
            const payload =await Competition.findById(_id)
            .populate('participants') 
            .populate('winner');
            if(payload) return {status: OKAY, payload}
            return {status: NOT_FOUND, message: 'Competition not found.'}
            
        } catch ({message}) {
            return {status: SERVER_ERROR, message}
        }
    }
    static updateParticipants =async ({competition_id, participant_id}) =>{
        try {
            const payload =await Competition.findById(competition_id);
            if(!payload) return {status: NOT_FOUND, message: 'Competition not found.'}
            if (payload.participants.includes(participant_id)) 
                return { status: CONFLICT, message: `Player is already a participant` };

            payload.participants.push(participant_id);
            await payload.save();
            return {status: OKAY, payload}
            
        } catch ({message}) {
            return {status: SERVER_ERROR, message}
        }
    }
    static setWinner =async ({competition_id, participant_id}) =>{
        try {
            const payload =await Competition.findById(competition_id);
            if(!payload) return {status: NOT_FOUND, message: 'Competition not found.'}
            
            payload.winner = participant_id;
            await payload.save();
            return {status: OKAY, payload}
            
        } catch ({message}) {
            return {status: SERVER_ERROR, message}
        }
    }
}

module.exports ={ CompetitionService };