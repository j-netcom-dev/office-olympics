import { API } from ".";
import { CompetitionDetails, ResponsePayload } from "../utils/types";

export const add =async (values: CompetitionDetails) =>{
    try {
        const {data, status} =await API.post('/competitions', values);
        return {message: data?.message, status, payload: data?.payload} as ResponsePayload;
    } catch (error: any) {
        let message =null;
        if(error.response) message =error.response.data.message
        else message =error?.message
        return {message, status: error?.status} as ResponsePayload
    }
}

export const fetch =async () =>{
    try {
        const {data, status} =await API.get('/competitions/list');
        return {message: data?.message, status, payload: data?.payload} as ResponsePayload;
    } catch (error: any) {
        let message =null;
        if(error.response) message =error.response.data.message
        else message =error?.message
        return {message, status: error?.status} as ResponsePayload
    }
}