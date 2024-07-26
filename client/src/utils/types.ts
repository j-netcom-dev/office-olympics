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

export interface PlayerDetails{
    _id?: string,
    first_name: string,
    last_name: string,
    gender: string,
    nationality: string,
}

export interface PredictionDetails{
    user: string,
    competition: string,
    winner: string,
}

export interface OptionProps {
    value:string,
    label:string,
}