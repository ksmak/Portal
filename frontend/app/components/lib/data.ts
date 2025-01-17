import { ServiceType } from "./definitions"

const api_host = process.env.API_HOST

export async function getServices() {
    const response = await fetch(`${api_host}/api/services/`)
    if (response.ok) {
        if (response.status === 200) {
            return await response.json() as ServiceType[]
        }
    } 

    return []
}