import { API } from ".";
import { PlayerDetails, ResponsePayload } from "../utils/types";

export const save =async (values: PlayerDetails) =>{
    try {
        const {data, status} =await API.post('/players', values);
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
        const {data, status} =await API.get('/players');
        return {message: data?.message, status, payload: data?.payload} as ResponsePayload;
    } catch (error: any) {
        let message =null;
        if(error.response) message =error.response.data.message
        else message =error?.message
        return {message, status: error?.status} as ResponsePayload
    }
}