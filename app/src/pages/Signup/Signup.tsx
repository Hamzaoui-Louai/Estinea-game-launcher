import { useEffect, useState } from "react";
import { LuEye } from "react-icons/lu";
import { LuEyeClosed } from "react-icons/lu";
import { useMutation } from "@tanstack/react-query";
import { unwrapRequestErrors } from "../../utils/mainProcessErrorsHandler";
import { toast } from "react-toastify";
import './Signup.css'

function Signup()
{
    const [viewPassword,setViewPassword] = useState<boolean>(false)
    const [animateError,setAnimateError] = useState<boolean>(false)
    const signup = useMutation({
        mutationFn : async (singupData:any)=>{unwrapRequestErrors(await window.ipcRenderer.invoke('sendRequest','POST','user/signup',singupData))},
        onError: (error)=>{
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
        })}}
    })

    async function handleSignup(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        const form = e.currentTarget;
        const formData = new FormData(form);

        console.log(formData);

        const data = {            
            mail: formData.get("mail") as string,
            password: formData.get("password") as string,
            nickname: formData.get("nickname") as string,
        };
        
        try{
            signup.mutate(data)
        }
        catch(error){console.log(error)}
    }

    useEffect(()=>{
        if (signup.error) {
            setAnimateError(false);
            requestAnimationFrame(() => {
                setAnimateError(true);
            });
            const timeout = setTimeout(() => setAnimateError(false), 1000*4)
            return () => clearTimeout(timeout)
        }
    },[signup.error])

    return(
        <div className={`h-full w-full bg-[#FFFFFF01] ${(animateError)?"error-animate":""}`}>
            <div style={{fontFamily:"Audiowide"}} className="w-[60%] backdrop-blur-sm mx-auto py-[150px] bg-[#AAAAAA33] h-full">
                <div className={`h-full w-full ${(animateError)?"shake-animation":""}`}>
                    <h3 className="text-[30px] text-[#FFBB00]">
                        you don't have an account yet?
                        <br/>just enter the info below
                        <br/>and we'll set you right up !
                    </h3>
                    <form onSubmit={(e)=>{handleSignup(e)}} className="flex flex-col gap-3.5 items-center mt-[100px] relative">
                        <input name="mail" placeholder="enter your estin email" type="text" className="h-[50px] w-[300px] rounded-[10px] bg-[#FF970188] p-[15px] outline-none"/>
                        <div className="relative">
                        <input name="password" placeholder="enter your password" type={(viewPassword)?"text":"password"} className="h-[50px] w-[300px] rounded-[10px] bg-[#FF970188] p-[15px] outline-none"/>
                        <div className="absolute right-[15px] top-[13px] cursor-pointer" onClick={()=>{setViewPassword(!viewPassword)}}>{
                            (viewPassword)?
                            <LuEye size={25}/>:
                            <LuEyeClosed size={25} />
                            }</div>
                        </div>
                        <input name="nickname" placeholder="enter a nickname" type="text" className="h-[50px] w-[300px] rounded-[10px] bg-[#FF970188] p-[15px] outline-none"/>
                        <button className="h-[50px] w-[300px] rounded-[10px] bg-[#FF9701] hover:bg-[#DF7701] cursor-pointer" >Sign up</button> 
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup;