import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true,
    method: "GET",
})

export const getSong = async({mood})=>{
    const response = await api.get("/songs?mood=" + mood )
    console.log(response)
    return response.data
}