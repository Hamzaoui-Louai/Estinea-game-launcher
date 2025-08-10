import { FiSettings } from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
import { unwrapRequestErrors } from "../../utils/mainProcessErrorsHandler";


function Main(){
    const userInfo = useQuery({
        queryKey: ["userInfo"],
        queryFn: async () => {
            const response = unwrapRequestErrors(await window.ipcRenderer.invoke('sendRequest','GET','user/getuserdata',{}))
            return response;
    }})

    return(
        <div className="w-full h-full relative left-0 top-0 flex flex-col">
            <div className="flex flex-row w-full grow">
                <div className="grow bg-[#AAAAAAAA] m-1.5 rounded-[10px] backdrop-blur-md p-[15px] flex flex-col justify-start text-gray-700">
                <h1 className="text-[20px] font-bold flex justify-self-start">version 1.0</h1>
                <p className="text-[20px] font-normal flex justify-self-start">didn't even start lol</p>
                </div>
                <div style={{fontFamily:'Audiowide'}} className="w-[25%] bg-[#102D69AA] m-1.5 rounded-[10px]">
                    <section id="user-info" className="p-[10px] m-[10px] rounded-[10px] bg-[#102D69AA] flex flex-row gap-[10px]">
                        <div className="w-[50px] h-[50px] rounded-[50%] bg-amber-50 font-black text-[black] text-[30px] flex justify-center items-center">
                            {userInfo.data?.nickName[0].toUpperCase()}
                        </div>
                        <div className="text-[20px] grow h-[50px] flex flex-row items-center justify-between">
                            <h1>{userInfo.data?.nickName}</h1>
                            <FiSettings className="cursor-pointer transition-all duration-500 rotate-0 hover:rotate-[-60deg]" size={30}/>
                        </div>
                    </section>
                    
                </div>
            </div>
            <div className="w-full h-[100px] bg-gradient-to-r from-[#081633] to-[#102D69] flex flex-row items-center justify-center">
                <button 
                style={{fontFamily:'Audiowide'}}
                className="bg-gradient-to-b from-[#FF9701] to-[#FFBB00] w-fit px-2.5 h-[60px] rounded-[14px] text-[30px] text-white cursor-pointer">
                    LAUNCH
                </button>
            </div>
        </div>
    )
}

export default Main;