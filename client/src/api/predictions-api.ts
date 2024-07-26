
import { API } from ".";
import { PredictionDetails, ResponsePayload } from "../utils/types";

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