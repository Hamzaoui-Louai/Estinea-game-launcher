import { useState , useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { unwrapRequestErrors } from "../../utils/mainProcessErrorsHandler";
import { FaEye , FaEyeSlash } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { IoSave } from "react-icons/io5";
import { toast } from "react-toastify";
import { IoIosArrowBack } from "react-icons/io";
import { useAddressStore } from "../../store/AddressStore";

interface accordionInterface{
    title:string,
    component:React.ComponentType<any>
}

function Accordion({title,component: Component}:accordionInterface){
    const [isExtended,setIsExtended] = useState<boolean>(true)

    return(
    <div className="mx-[50px] h-fit rounded-[10px] bg-[#102D69] flex flex-col">
        <section onClick={()=>setIsExtended(!isExtended)} className="w-full p-[10px] flex flex-row justify-between cursor-pointer">
            <h1 className="text-[20px]">
                {title} 
            </h1>
            {
            (isExtended)?
            <IoIosArrowUp size={30}/>
            :
            <IoIosArrowDown size={30}/>
        }
        </section>
        {
            (isExtended)?
            <Component/>
            :
            null
        }
    </div>
    )
}

function ChangeNickname(){
    const userInfo = useQuery({
        queryKey: ["userInfo"],
        queryFn: async () => {
            const response = unwrapRequestErrors(await window.ipcRenderer.invoke('sendRequest','GET','user/getuserdata',{}))
            console.log('running query')
            setNickname(response.nickName)
            return response;
    }})

    const modifyUserInfo = useMutation({
        mutationFn: async ()=>{
            const response = unwrapRequestErrors(await window.ipcRenderer.invoke('sendRequest','PATCH','user/modifyuserdata',{nickName:nickname}))
            console.log('running mutation')
            setNickname(response?.nickName || nickname)
            return response;
        }
    })

    const [nickname,setNickname] = useState<string>('')

    useEffect(() => {
        return () => {
            //console.log('mutated from use effect')
            //modifyUserInfo.mutate();
        };
    }, []);

    return(<form className="relative">
        <input 
        type="text" 
        value={nickname}
        onChange={(e)=>setNickname(e.target.value)}
        className="w-[calc(100%-20px)] h-[50px] m-[10px] outline-none focus:outline-none border-white border-2 rounded-[5px] p-[10px]"/>
        <IoSave onClick={()=>modifyUserInfo.mutate()} className="transition-all duration-100 absolute right-[25px] top-[23px] cursor-pointer text-white size-[25px] hover:text-[#AAAAAA] hover:size-[30px] hover:top-[20px] hover:right-[22px]"/>
    </form>)
}

function ChangePassword(){

    const modifyUserPassword = useMutation({
        mutationFn: async ()=>{
            try{
            const response = unwrapRequestErrors(await window.ipcRenderer.invoke('sendRequest','PATCH','user/modifyuserpassword',{oldPassword:oldPassword,newPassword:newPassword}))
            console.log(response)
            toast.success('password changed successfully')
            return response;
            }
            catch(error:any)
            {
                console.log(error)
                toast.error(error?.message)
            }
        }
    })

    useEffect(() => {
        return () => {
            //console.log('mutated from use effect')
            //modifyUserPassword.mutate();
        };
    }, []);

    const [oldPassword,setOldPassword] = useState<string>('')
    const [newPassword,setNewPassword] = useState<string>('')
    const [viewPasswords,setViewPasswords] = useState<boolean>(false)

    return (
        <form className="flex flex-row w-full h-[70px] relative">
            <div className="w-[calc(50%-15px)] h-[50px] m-[10px] mr-[5px] relative">
                <input 
                type={(viewPasswords)?"text":"password"}
                placeholder="enter your current password"
                value={oldPassword}
                onChange={(e)=>setOldPassword(e.target.value)}
                className="w-full h-full outline-none focus:outline-none border-white border-2 rounded-[5px] p-[10px]"
                />
                {
                    (viewPasswords)?
                    <FaEye 
                    onClick={()=>setViewPasswords(!viewPasswords)} 
                    className="transition-all duration-100 absolute right-[15px] top-[13px] cursor-pointer text-white size-[25px] "/>
                    :
                    <FaEyeSlash 
                    onClick={()=>setViewPasswords(!viewPasswords)}
                    className="transition-all duration-100 absolute right-[15px] top-[13px] cursor-pointer text-white size-[25px] "/>               
                }
            </div>
            <input 
            type={(viewPasswords)?"text":"password"}
            placeholder="enter your new password"
            value={newPassword}
            onChange={(e)=>setNewPassword(e.target.value)}
            className="w-[calc(50%-15px)] h-[50px] m-[10px] ml-[5px] outline-none focus:outline-none border-white border-2 rounded-[5px] p-[10px]"
            />
            <IoSave onClick={()=>modifyUserPassword.mutate()} className="transition-all duration-100 absolute right-[25px] top-[23px] cursor-pointer text-white size-[25px] hover:text-[#AAAAAA] hover:size-[30px] hover:top-[20px] hover:right-[22px]"/>
        </form>
    )
}

function AccountSettings(){
    const setAddress = useAddressStore((state)=>state.setAddress)

    return (
        <div onClick={()=>setAddress('main')} style={{fontFamily:'Audiowide'}} className="w-[60%] backdrop-blur-sm mx-auto p-[50px] bg-[#AAAAAA33] h-full relative">
            <IoIosArrowBack size={35} className="absolute top-[55px] left-[40px] cursor-pointer"/>
            <h1 className="text-[30px] mb-[50px]">Account Settings</h1>
            <div className="flex flex-col gap-5">
                <Accordion title="change nickname" component={ChangeNickname}/>
                <Accordion title="change password" component={ChangePassword}/>
            </div>
        </div>
    )
}

export default AccountSettings;