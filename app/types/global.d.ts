export {}

declare global {

    //axios
    type axiosResponseWrapper = {
        isError:boolean,
        response:axiosValidResponse | responseError | requestError | configError | unkownError
    }
    //axios valid response
    type axiosValidResponse = {
        data:any
    }

    //axios requests errors
    type responseError = {
        status: number,
        message: string,
        additional?: any
    }

    type requestError = {
        message: string
    }

    type configError = {
        message: string
    }

    //other request errors

    type unkownError = {
        message: string
    }




    //user config
    type modifyUserConfigAction = 'set' | 'get'

    type userConfigWrapper = {
        isError:boolean,
        data:any
    }


    //updates manager related types

    type gameButtonState = 'checking' | 'update' | 'updating' | 'launch'

    type gameButtonUpdatingInfo = {
        progressPercentage:number,
        totalBytes:number,
        downloadedBytes:number,
        bytesPerSecondSpeed:number,
        etaSeconds:number
    }
}
