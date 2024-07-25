
import { API } from ".";
import { RegistrationDetails, ResponsePayload } from "../utils/types";

export const register =async (values: RegistrationDetails) =>{
    try {
        const {data, status} =await API.post('/users', values);
        return {message: data?.message, status, payload: data?.payload} as ResponsePayload;
    } catch (error: any) {
        let message =null;
        if(error.response) message =error.response.data.message
        else message =error?.message
        return {message, status: error?.status} as ResponsePayload
    }
}