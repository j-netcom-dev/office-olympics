import React from "react"

export interface RegistrationDetails {
    first_name: string,
    last_name: string
}

export interface ResponsePayload {
    status: number,
    message?: string,
    payload?: [Record<string, any>]
}

export interface Children{
    children: React.ReactNode
}