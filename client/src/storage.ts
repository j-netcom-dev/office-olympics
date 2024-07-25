export const write_to_storage =(key:string, data:Record<string, any>) =>{
    localStorage.setItem(key, JSON.stringify(data));
}

export const read_from_storage =(key:string) =>{
    return JSON.parse(localStorage.getItem(key) || JSON.stringify(null))
}