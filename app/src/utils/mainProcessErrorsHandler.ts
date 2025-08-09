
export function unwrapRequestErrors(wrappedResponse:axiosResponseWrapper)
{
    if(wrappedResponse.isError)
    {
        throw wrappedResponse.response
    }
    else{
        return (wrappedResponse.response as axiosValidResponse).data
    }
}

export function unwrapUserConfigErrors(wrappedData:userConfigWrapper)
{
    if(wrappedData.isError)
    {
        throw wrappedData.data
    }
    else{
        return wrappedData.data
    }
}