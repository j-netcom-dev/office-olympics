
import { API } from ".";
import { LeaderDetails, PredictionDetails, predictionHistory, ResponsePayload } from "../utils/types";

export const predict =async (values: PredictionDetails) =>{
    try {
        const {data, status} =await API.post('/predictions', values);
        return {message: data?.message, status, payload: data?.payload} as ResponsePayload;
    } catch (error: any) {
        let message =null;
        if(error.response) message =error.response.data.message
        else message =error?.message
        return {message, status: error?.status} as ResponsePayload
    }
}

export const getUserPredictions =async (id: any) =>{
    try {
        const {data, status} =await API.get(`/predictions/${id}`);
        
        let payload!:predictionHistory[];
        if(data.payload){
            payload =data.payload.map((record: any) =>{
                return {
                    competition: record?.competition?.name,
                    winner: record?.competition?.winner? `${record?.competition?.winner.first_name} ${record?.competition?.winner.last_name}` : null,
                    prediction: `${record?.winner?.first_name || ''} ${record?.winner?.last_name || ''}`.trim()
                }
            })
        }
        
        return {message: data?.message, status, payload};
    } catch (error: any) {
        let message =null;
        if(error.response) message =error.response.data.message
        else message =error?.message
        return {message, status: error?.status} as ResponsePayload
    }
}

export const getLeaderBoard = async() =>{
    
    
    try {
        const {data, status} =await API.get(`/predictions`);
        const users:string[] =[]
        const predictions:LeaderDetails[] =[]
        if(data.payload){
            data.payload.forEach((record: any) =>{!users.includes(record?.user?._id)? users.push(record?.user?._id): null})
            users.forEach((userid:string) =>{
                let points =0;
                let last_name ='';
                let first_name ='';
                const competitions =data.payload.filter((record:any) =>record?.user?._id ==userid);
                competitions.forEach((row:any) =>{
                    if(row?.competition?.winner == row?.winner?._id) points +=3;
                    last_name =row?.user?.last_name || last_name;
                    first_name =row?.user?.first_name || first_name;
                })
                predictions.push({points, last_name, first_name, competitions: competitions.length})
            }
            )
        }
        predictions.sort((a, b) => {
            if (a.points !== b.points) {
                return b.points - a.points;
            }
            if (a.competitions !== b.competitions) {
                return b.competitions - a.competitions;
            }
            if (a.first_name < b.first_name) {
                return -1;
            }
            if (a.first_name > b.first_name) {
                return 1;
            }
            if (a.last_name < b.last_name) {
                return -1;
            }
            if (a.last_name > b.last_name) {
                return 1;
            }
            return 0;
        });
        return {message: data?.message, status, payload: predictions};
    } catch (error: any) {
        let message =null;
        if(error.response) message =error.response.data.message
        else message =error?.message
        console.log(message);
        
        return {message, status: error?.status} as ResponsePayload
        
    }
}