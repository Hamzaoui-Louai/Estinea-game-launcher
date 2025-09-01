import { useState , useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { unwrapRequestErrors } from "../../utils/mainProcessErrorsHandler";
import { LuEye , LuEyeClosed } from "react-icons/lu"
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { IoSave } from "react-icons/io5";

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
            console.log('mutated from use effect')
            modifyUserInfo.mutate();
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

function AccountSettings(){

    return (
        <div style={{fontFamily:'Audiowide'}} className="w-[60%] backdrop-blur-sm mx-auto p-[50px] bg-[#AAAAAA33] h-full">
            <h1 className="text-[30px] mb-[50px]">Account Settings</h1>
            <Accordion title="change nickname" component={ChangeNickname}/>
        </div>
    )
}

export default AccountSettings;