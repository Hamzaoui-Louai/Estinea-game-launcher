
export function unwrapRequestErrors(response:axiosResponseWrapper)
{
    if(response.isError)
    {
        throw response.response
    }
    else{
        return response.response
    }
}