//import {useState,useEffect} from 'react'
import './Auth.css'
import { useAddressStore } from '../../store/AddressStore';
import { unwrapRequestErrors } from '../../utils/mainProcessErrorsHandler';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';


function Auth(){
    const setAddress = useAddressStore((state)=>state.setAddress)
    const [destination,setDestination] = useState<string>('login')

    const tokenState = useQuery({
        queryKey: ["userInfo"],
        queryFn: async () => {
            try
            {
            const response = unwrapRequestErrors(await window.ipcRenderer.invoke('sendRequest','GET','auth/verifytoken',{}))
            setDestination('main')
            return response;
        }
            catch(error:any)
            {
                if(error.message === 'the token is expired')
                {
                    setDestination('login')
                }
                else if(error.message === 'the token is not valid')
                {
                    setDestination('signup')
                }
                console.error(error)
            }
    }})

    return (
        <div className="auth">
            <div className='auth-title'>
                <h1 className='auth-title-text'>welcome to<br/>Estinea</h1>
            </div>
            <div className='w-full flex flex-row justify-center items-center'>
                <button onClick={()=>{console.log('this is working smh an ur an idiot')
                    setAddress(destination)}} className='auth-login-button cursor-pointer'>
                    continue your journey
                </button>
            </div>
        </div>
    )
}

export default Auth;