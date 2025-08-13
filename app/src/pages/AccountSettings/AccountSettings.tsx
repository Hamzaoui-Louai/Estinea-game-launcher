import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { unwrapRequestErrors } from "../../utils/mainProcessErrorsHandler";
import { LuEye , LuEyeClosed } from "react-icons/lu"

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
            <form className=" flex flex-col gap-[50px]">
                <div className="flex flex-row gap-[25px]">
                    <form className="border-3 flex flex-col justify-start items-start border-white rounded-[15px] p-[10px] bg-[#102D69AA] w-fit">
                        <h3 className="text-[20px]">
                            nickname
                        </h3>
                        <input type="text" value={nickname} onChange={(e)=>{setNickname(e.target.value)}} className="border-3 border-white rounded-[5px] w-[300px] h-[50px] p-[10px] text-[20px]"/>
                        <button type="submit" className="border-3 border-white rounded-[5px] w-[300px] h-[50px] p-[10px] text-[20px] mt-[10px] flex justify-center items-center bg-[#FF9701] hover:bg-[#DF7701]">change nickname</button>
                    </form>
                    <form className="border-3 flex flex-row gap-[20px] border-white rounded-[15px] p-[10px] bg-[#102D69AA] w-fit">
                        <span className="flex flex-col justify-start items-start relative">
                            <h3 className="text-[20px]">
                                old password
                            </h3>
                            <input type={(viewOldPassword)?"text":"password"} value={oldPassword} onChange={(e)=>{setOldPassword(e.target.value)}} className="border-3 border-white rounded-[5px] w-[300px] h-[50px] p-[10px] text-[20px]"/>
                            <div className="absolute right-[15px] top-[42px] cursor-pointer" onClick={()=>{setViewOldPassword(!viewOldPassword)}}>{
                            (viewOldPassword)?
                            <LuEye size={25}/>:
                            <LuEyeClosed size={25} />
                            }</div>
                        </span>
                        <span className="flex flex-col justify-start items-start relative">
                            <h3 className="text-[20px]">
                                new password
                            </h3>
                            <input type={(viewNewPassword)?"text":"password"} value={newPassword} onChange={(e)=>{setNewPassword(e.target.value)}} className="border-3 border-white rounded-[5px] w-[300px] h-[50px] p-[10px] text-[20px]"/>
                            <div className="absolute right-[15px] top-[42px] cursor-pointer" onClick={()=>{setViewNewPassword(!viewNewPassword)}}>{
                            (viewNewPassword)?
                            <LuEye size={25}/>:
                            <LuEyeClosed size={25} />
                            }</div>
                        </span>
                    </form>
                </div>
            </form>
        </div>
    )
}

export default AccountSettings;