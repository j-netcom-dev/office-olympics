const Competition =require('../models/competition-model.js');

const { BAD_REQUEST, CREATED, CONFLICT, OKAY, SERVER_ERROR } =require('../constants.js')

class CompetitionService{

    static create =async data =>{
        const {name} =data;
        try {
            const competitionFound =await Competition.findOne({name})
            if(competitionFound) return {status: CONFLICT, message: `${name} is already registered`}
            const competition =new Competition({name});
            await competition.save()
            return {status: CREATED, message: 'Registered'}
        } catch ({message}) {
            return {status: BAD_REQUEST, message}
        }
    }

    static listCompetitions = async () =>{
        try {
            const competitions =await Competition.find();
            return {status: OKAY, competitions}
        } catch ({message}) {
            return {status: SERVER_ERROR, message}
        }
    }
}

module.exports ={ CompetitionService };