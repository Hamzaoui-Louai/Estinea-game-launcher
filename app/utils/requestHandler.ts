import axios from "axios";
import { getTokenFromUserConfig } from './userConfigHandler.ts'

//api requests

const api = axios.create({
    baseURL: 'http://localhost:3000/', 
})

function wrapAxiosResponse(isError:boolean,response:axiosValidResponse | responseError | requestError | configError | unkownError){
    let wrapper:axiosResponseWrapper
    wrapper = {
        isError:isError,
        response:response
    }
    return wrapper;
}

async function getRequest(url:string){
    const response = await api.get(url, {
        headers: {
            Authorization: `Bearer ${await getTokenFromUserConfig()}`
        }})
    return response;
}

async function postRequest(url:string,payload:any){
    const response = await api.post(url,payload, {
        headers: {
            Authorization: `Bearer ${await getTokenFromUserConfig()}`
        }})
    return response;
}

async function putRequest(url:string,payload:any){
    const response = await api.put(url,payload, {
        headers: {
            Authorization: `Bearer ${await getTokenFromUserConfig()}`
        }})
    return response;
}

async function patchRequest(url:string,payload:any){
    const response = await api.patch(url,payload, {
        headers: {
            Authorization: `Bearer ${await getTokenFromUserConfig()}`
        }})
    return response; 
}

async function deleteRequest(url:string){
    const response = await api.delete(url, {
        headers: {
            Authorization: `Bearer ${await getTokenFromUserConfig()}`
        }})
    return response;
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export async function sendRequest(method:HttpMethod,url:string,payload:any)
{
    let response : any
    let validResponse : axiosValidResponse
    let wrappedResponse : axiosResponseWrapper
    try{
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
        validResponse = {data:response.data}
        wrappedResponse = wrapAxiosResponse(false,validResponse)
    }
    catch (error)
    {
        //console.log(error)
        if(axios.isAxiosError(error))
        {
            if(error.response)
            {
                let responseError:responseError = {status:error.response.status,message:error.response.data?.error || 'an unknown server error occurred'}
                wrappedResponse = wrapAxiosResponse(true,responseError)
            }
            else if(error.request)
            {
                let requestError:requestError = {message:'an unknown network error occurred, try checking your network and try again'}
                wrappedResponse = wrapAxiosResponse(true,requestError)
            }
            else
            {
                let configError:configError = {message:'something unexpected happened . please contact us if this happens again'}
                wrappedResponse = wrapAxiosResponse(true,configError)
            }
        }
        else
        {
            let unkownError:unkownError = {message:"something unexpected happened . please contact us if this happens again"}
            wrappedResponse = wrapAxiosResponse(true,unkownError)
        }
    }
    return wrappedResponse;
}

//google drive requests