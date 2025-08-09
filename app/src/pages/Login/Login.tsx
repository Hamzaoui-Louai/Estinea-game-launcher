import { useEffect, useState } from "react";
import { LuEye } from "react-icons/lu";
import { LuEyeClosed } from "react-icons/lu";
import { useMutation } from "@tanstack/react-query";
import { unwrapRequestErrors } from "../../utils/mainProcessErrorsHandler";
import { unwrapUserConfigErrors } from "../../utils/mainProcessErrorsHandler";
import { useAddressStore } from "../../store/AddressStore";
import { toast } from "react-toastify";

import './Login.css'

function Login()
{
    const [viewPassword,setViewPassword] = useState<boolean>(false)
    const [animateError,setAnimateError] = useState<boolean>(false)
    const setAddress = useAddressStore((state)=>state.setAddress)
    const login = useMutation({
        mutationFn : async (loginData:any)=>{return unwrapRequestErrors(await window.ipcRenderer.invoke('sendRequest','POST','user/login',loginData))},
        onError: (error)=>{
            console.log(error)
            if(!toast.isActive('error-toast'))
            {
            toast.error(error.message,{
            position: "bottom-center",
            autoClose: 4000,
            hideProgressBar: true,
            closeButton: false,
            closeOnClick: false,
            theme:'colored',
            toastId: 'error-toast'
        })}},
        onSuccess: async (response: any)=>{
            const token = response.token
            try{
                let userConfig = await unwrapUserConfigErrors(await window.ipcRenderer.invoke('modifyUserConfig','get',{}))
                userConfig = {...userConfig,token:token}
                let result = await unwrapUserConfigErrors(await window.ipcRenderer.invoke('modifyUserConfig','set',userConfig))
                if(result.message === 'data setted successfully')
                {
                    setAddress('main')
                }
            }
            catch(error:any)
            {
                toast.error(error.message,{
                    position: "bottom-center",
                    autoClose: 4000,
                    hideProgressBar: true,
                    closeButton: false,
                    closeOnClick: false,
                    theme:'colored',
                    toastId: 'error-toast'
                })
            }
        }
    })

    async function handleLogin(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        const form = e.currentTarget;
        const formData = new FormData(form);

        const data = {            
            mail: formData.get("mail") as string,
            password: formData.get("password") as string,
        };
        
        try{
            login.mutate(data)
        }
        catch(error){console.log(error)}
    }

    useEffect(()=>{
        if (login.error) {
            setAnimateError(false);
            requestAnimationFrame(() => {
                setAnimateError(true);
            });
            const timeout = setTimeout(() => setAnimateError(false), 1000*4)
            return () => clearTimeout(timeout)
        }
    },[login.error])

    return(
        <div className={`h-full w-full bg-[#FFFFFF01] ${(animateError)?"error-animate":""}`}>
            <div style={{fontFamily:"Audiowide"}} className="w-[60%] backdrop-blur-sm mx-auto py-[150px] bg-[#AAAAAA33] h-full">
                <div className={`h-full w-full ${(animateError)?"shake-animation":""}`}>
                    <h3 className="text-[30px] text-[#FFBB00]">
                        ready to continue your adventure ?
                        <br/>login and let us dive in !
                    </h3>
                    <form onSubmit={(e)=>{handleLogin(e)}} className="flex flex-col gap-3.5 items-center mt-[100px] relative">
                        <input name="mail" placeholder="enter your estin email" type="text" className="h-[50px] w-[300px] rounded-[10px] bg-[#FF970188] p-[15px] outline-none"/>
                        <div className="relative">
                            <input name="password" placeholder="enter your password" type={(viewPassword)?"text":"password"} className="h-[50px] w-[300px] rounded-[10px] bg-[#FF970188] p-[15px] outline-none"/>
                            <div className="absolute right-[15px] top-[13px] cursor-pointer" onClick={()=>{setViewPassword(!viewPassword)}}>{
                            (viewPassword)?
                            <LuEye size={25}/>:
                            <LuEyeClosed size={25} />
                            }</div>
                        </div>
                        <button className="h-[50px] w-[300px] rounded-[10px] bg-[#FF9701] hover:bg-[#DF7701] cursor-pointer" >Log in</button> 
                    </form>
                    <p className="flex flex-row justify-center gap-1.5 text-[15px] mt-1">
                        don't have an account yet ? 
                        <h3 
                        onClick={()=>{setAddress('signup')}}
                        className="text-[#FF9701] hover:text-[#DF7701] cursor-pointer underline">
                            Sign up
                        </h3>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login;