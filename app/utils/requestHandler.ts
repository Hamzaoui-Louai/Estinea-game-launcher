import axios from "axios";
import { AxiosResponse } from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/', 
    validateStatus: () => true,
})

function handleHttpErrors(response: AxiosResponse)
{
    if(response.status<400)
    {
        return response.data
    }
    else
    {
        throw new Error(`HTTP Error ${response.status}: ${response.data?.message || JSON.stringify(response.data)}`);
    }
}

async function getRequest(url:string){
    const response = await api.get(url)
    const processedResponse = handleHttpErrors(response)
    return processedResponse;
}

async function postRequest(url:string,payload:any){
    const response = await api.post(url,payload)
    const processedResponse = handleHttpErrors(response)
    return processedResponse;
}

async function putRequest(url:string,payload:any){
    const response = await api.put(url,payload)
    const processedResponse = handleHttpErrors(response)
    return processedResponse;
}

async function patchRequest(url:string,payload:any){
    const response = await api.patch(url,payload)
    const processedResponse = handleHttpErrors(response)
    return processedResponse;
}

async function deleteRequest(url:string){
    const response = await api.delete(url)
    const processedResponse = handleHttpErrors(response)
    return processedResponse;
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export async function sendRequest(method:HttpMethod,url:string,payload:any)
{
    let response : any
    switch(method)
    {
        case 'GET':
            response = await getRequest(url)
            break;
        case 'POST':
            response = await postRequest(url,payload)
            break;
        case 'PUT':
            response = await putRequest(url,payload)
            break;
        case 'PATCH':
            response = await patchRequest(url,payload)
            break;
        case 'DELETE':
            response = await deleteRequest(url)
            break;
        default:
            throw new Error(`Unsupported HTTP method: ${method}`);
    }
    return response;
}