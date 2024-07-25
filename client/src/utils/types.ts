import React from "react"

export interface RegistrationDetails {
    first_name: string,
    last_name: string
}

export interface CompetitionDetails{
    name: string,
    _id?:string
}


export interface ResponsePayload {
    status: number,
    message?: string,
    payload?: []
}

export interface Children{
    children: React.ReactNode
}