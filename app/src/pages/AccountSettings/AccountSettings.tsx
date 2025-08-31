import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { unwrapRequestErrors } from "../../utils/mainProcessErrorsHandler";
import { LuEye , LuEyeClosed } from "react-icons/lu"
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

interface accordionInterface{
    title:string,
    component:React.ComponentType<any>
}

function Accordion({title,component: Component}:accordionInterface){
    const [isExtended,setIsExtended] = useState<boolean>(false)

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
    return(<form>
        <input type="text" className="w-full h-[70px]"/>
    </form>)
}

function AccountSettings(){
    const [nickname,setNickname] = useState<string>('')
    const [oldPassword,setOldPassword] = useState<string>('')
    const [newPassword,setNewPassword] = useState<string>('')
    const [viewOldPassword,setViewOldPassword] = useState<boolean>(false)
    const [viewNewPassword,setViewNewPassword] = useState<boolean>(false)
    const userInfo = useQuery({
        queryKey: ["userInfo"],
        queryFn: async () => {
            const response = unwrapRequestErrors(await window.ipcRenderer.invoke('sendRequest','GET','user/getuserdata',{}))
            setNickname(response.nickName)
            return response;
    }})

    return (
        <div style={{fontFamily:'Audiowide'}} className="w-[80%] backdrop-blur-sm mx-auto p-[50px] bg-[#AAAAAA33] h-full">
            <h1 className="text-[30px] mb-[50px]">Account Settings</h1>
            <Accordion title="change nickname" component={ChangeNickname}/>
        </div>
    )
}

export default AccountSettings;