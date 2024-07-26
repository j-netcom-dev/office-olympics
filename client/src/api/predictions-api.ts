
import { API } from ".";
import { PredictionDetails, predictionHistory, ResponsePayload } from "../utils/types";

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
        console.log(id);
        
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
        console.log(payload);
        
        return {message: data?.message, status, payload};
    } catch (error: any) {
        let message =null;
        if(error.response) message =error.response.data.message
        else message =error?.message
        return {message, status: error?.status} as ResponsePayload
    }
}