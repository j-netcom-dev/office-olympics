
import { API } from ".";
import { RegistrationDetails, ResponsePayload } from "../utils/types";

export const register =async (values: RegistrationDetails) =>{
    try {
        const {data, status} =await API.post('/users', values);
        return {message: data?.message, status, payload: data?.payload} as ResponsePayload;
    } catch (error: any) {
        return {message: error?.respose? error.response.data :error?.message, status: error?.status} as ResponsePayload
    }
}