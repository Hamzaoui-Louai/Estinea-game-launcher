
export function unwrapRequestErrors(wrappedResponse:axiosResponseWrapper)
{
    if(wrappedResponse.isError)
    {
        throw wrappedResponse.response
    }
    else{
        console.log(wrappedResponse.response)
        return (wrappedResponse.response as axiosValidResponse).data
    }
}