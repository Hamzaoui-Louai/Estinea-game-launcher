//import {useState,useEffect} from 'react'
import './Auth.css'
import { useAddressStore } from '../../store/AddressStore';


function Auth(){
    const setAddress = useAddressStore((state)=>state.setAddress)

    return (
        <div className="auth">
            <div className='auth-title'>
                <h1 className='auth-title-text'>welcome to<br/>Estinea</h1>
            </div>
            <div className='w-full flex flex-row justify-center items-center'>
                <button onClick={()=>setAddress('main')} className='auth-login-button cursor-pointer'>
                    continue your journey
                </button>
            </div>
        </div>
    )
}

export default Auth;