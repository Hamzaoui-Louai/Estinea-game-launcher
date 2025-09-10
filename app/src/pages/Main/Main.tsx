import { FiSettings } from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
import { unwrapRequestErrors } from "../../utils/mainProcessErrorsHandler";
import { useEffect, useState } from "react";
import { useAddressStore } from "../../store/AddressStore";


function Main(){
    const [gameButtonState,setGameButtonState] = useState<gameButtonState>('checking')
    const [gameButtonUpdatingInfo,setGameButtonUpdatingInfo] = useState<gameButtonUpdatingInfo>({
        progressPercentage:0,
        totalBytes:0,
        downloadedBytes:0,
        bytesPerSecondSpeed:0,
        etaSeconds:0
    })

    const setAddress = useAddressStore((state)=>state.setAddress)

    const userInfo = useQuery({
        queryKey: ["userInfo"],
        queryFn: async () => {
            const response = unwrapRequestErrors(await window.ipcRenderer.invoke('sendRequest','GET','user/getuserdata',{}))
            return response;
    }})

    //checking updates
    useEffect(() => {
        (async () => {
        try {
            const response = await window.ipcRenderer.invoke('needUpdates');
            if(response){
                setGameButtonState('update')
            }
            else
            {
                setGameButtonState('launch')
            }
        } catch (err) {
            console.error("Error in invoke:", err);
        }
        })();
    }, []);

    window.ipcRenderer.on('download-progress', (event, progress) => {
        setGameButtonUpdatingInfo(progress)
    });

    async function handleGameButton(){
        if(gameButtonState === 'update'){
            try{
                setGameButtonState('updating')
                await window.ipcRenderer.invoke('update');     
                setGameButtonState('launch')           
            }
            catch(err){
                console.error("Error in invoke:", err);
            }
        }
        if(gameButtonState === 'launch')
        {
            try{
                await window.ipcRenderer.invoke('launch');
            }
            catch(err){
                console.error("Error in invoke:", err);
            }
        }
    }

    function formattedProgressPercentage():string{
        return `${gameButtonUpdatingInfo.progressPercentage.toFixed(0)}`
    }

    function formattedTotalBytes():string{
        return `${(gameButtonUpdatingInfo.totalBytes<2000)?
        `${gameButtonUpdatingInfo.totalBytes.toFixed(0)} bytes`
        :
        (gameButtonUpdatingInfo.totalBytes<2000*1000)?
        `${(gameButtonUpdatingInfo.totalBytes/1000).toFixed(0)} kb`
        :
        (gameButtonUpdatingInfo.totalBytes<2000*1000*1000)?
        `${(gameButtonUpdatingInfo.totalBytes/(1000*1000)).toFixed(0)} mb`
        :
        `${(gameButtonUpdatingInfo.totalBytes/(1000*1000*1000)).toFixed(0)} gb`
    }`
    }

    function formattedDownloadedBytes():string{
        return `${(gameButtonUpdatingInfo.downloadedBytes<2000)?
        `${gameButtonUpdatingInfo.downloadedBytes.toFixed(0)} bytes`
        :
        (gameButtonUpdatingInfo.downloadedBytes<2000*1000)?
        `${(gameButtonUpdatingInfo.downloadedBytes/1000).toFixed(0)} kb`
        :
        (gameButtonUpdatingInfo.downloadedBytes<2000*1000*1000)?
        `${(gameButtonUpdatingInfo.downloadedBytes/(1000*1000)).toFixed(0)} mb`
        :
        `${(gameButtonUpdatingInfo.downloadedBytes/(1000*1000*1000)).toFixed(0)} gb`
    }`
    }

    function formattedBytesPerSecondSpeed():string{
        return `${(gameButtonUpdatingInfo.bytesPerSecondSpeed<2000)?
        `${gameButtonUpdatingInfo.bytesPerSecondSpeed.toFixed(0)} bytes/s`
        :
        (gameButtonUpdatingInfo.bytesPerSecondSpeed<2000*1000)?
        `${(gameButtonUpdatingInfo.bytesPerSecondSpeed/1000).toFixed(0)} kb/s`
        :
        (gameButtonUpdatingInfo.bytesPerSecondSpeed<2000*1000*1000)?
        `${(gameButtonUpdatingInfo.bytesPerSecondSpeed/(1000*1000)).toFixed(0)} mb/s`
        :
        `${(gameButtonUpdatingInfo.bytesPerSecondSpeed/(1000*1000*1000)).toFixed(0)} gb/s`
    }`
    }

    function formattedEtaSeconds():string
    {
        return `${(gameButtonUpdatingInfo.etaSeconds>60*60)?`${(gameButtonUpdatingInfo.etaSeconds/(60*60)).toFixed(0)}h:`:''}${(gameButtonUpdatingInfo.etaSeconds>60)?`${Math.floor(gameButtonUpdatingInfo.etaSeconds/(60))%60}m:`:''}${Math.floor(gameButtonUpdatingInfo.etaSeconds)%60}s`
    }

    return(
        <div className="w-full h-full relative left-0 top-0 flex flex-col">
            <div className="flex flex-row w-full grow relative">
                <div className="grow bg-[#AAAAAAAA] m-1.5 rounded-[10px] backdrop-blur-md p-[15px] flex flex-col justify-start text-gray-700">
                <h1 className="text-[20px] font-bold flex justify-self-start">version 1.0</h1>
                <p className="text-[20px] font-normal flex justify-self-start">didn't even start lol</p>
                </div>
                <div 
                className={`absolute right-0 top-0 p-[10px] bg-[#102D69] rounded-[50%] m-[15px] ${(gameButtonState !== 'updating')?"cursor-pointer":null} group` }
                onClick={()=>{
                    if(gameButtonState !== 'updating')
                    {
                        setAddress('accountsettings')
                    }
                }}>
                    <FiSettings className={`transition-all duration-500 rotate-0 ${(gameButtonState !== 'updating')?"group-hover:rotate-[-60deg] cursor-pointer text-white":"text-[#AAAAAA]"}`} size={30}/>
                </div>
                {/*
                <div style={{fontFamily:'Audiowide'}} className="w-[25%] bg-[#102D69AA] m-1.5 rounded-[10px] flex flex-col">
                    <section id="user-info" className="p-[10px] m-[10px] rounded-[10px] bg-[#102D69AA] flex flex-row gap-[10px]">
                        <div className="w-[50px] h-[50px] rounded-[50%] bg-amber-50 font-black text-[black] text-[30px] flex justify-center items-center">
                            {
                                (userInfo.isLoading)?
                                '.'
                                :
                                userInfo.data?.nickName?.[0]?.toUpperCase()
                            }
                        </div>
                        <div className="text-[20px] grow h-[50px] flex flex-row items-center justify-between">
                            <h1>{
                                (userInfo.isLoading)?
                                '...'
                                :
                                userInfo.data?.nickName
                            }</h1>
                            <FiSettings className="cursor-pointer transition-all duration-500 rotate-0 hover:rotate-[-60deg]" size={30}/>
                        </div>
                    </section>
                </div>
                */}
            </div>
            <div className="w-full h-[100px] bg-gradient-to-r from-[#081633] to-[#102D69] flex flex-row items-center justify-center">
                <button 
                onClick={async ()=>{await handleGameButton()}}
                style={{fontFamily:'Audiowide'}}
                className={`z-0 relative transition-all duration-200 ${(gameButtonState === 'update' || gameButtonState === 'launch')?
                    "bg-gradient-to-b from-[#FF9701] to-[#FFBB00] px-[50px] w-fit h-[60px] rounded-[14px] text-[30px] text-white cursor-pointer"
                    :
                    (gameButtonState==='checking')?
                    "bg-gradient-to-b from-[#FF9701] to-[#FFBB00] px-[50px] w-fit h-[60px] rounded-[14px] text-[20px] text-black cursor-progress"
                    :
                    (gameButtonState==='updating')?
                    "bg-gray-600 px-[50px] w-[90%] relative h-[60px] rounded-[14px] text-[16px] text-[white] cursor-default"
                    :
                    "bg-gray-600 px-[50px] w-[90%] relative h-[60px] rounded-[14px] text-[20px] text-[white] cursor-default"
                    }
                    
                } `}>
                    {
                        (gameButtonState==='checking')?
                        'checking for updates ...':
                        (gameButtonState==='update')?
                        'UPDATE':
                        (gameButtonState==='launch')?
                        'LAUNCH':
                        <>                            
                            <div className="transition-all duration-1000 z-0 bg-gradient-to-r from-[#FF9701] to-[#FFBB00] absolute left-0 top-0 h-[60px] rounded-[14px]"
                            style={{width:`${
                                Math.floor(gameButtonUpdatingInfo.progressPercentage)
                                }%`}}
                            ></div>
                            <h1 className="z-10 relative">
                            {`download progress : ${formattedProgressPercentage()}% | ${formattedDownloadedBytes()}/${formattedTotalBytes()} | download speed : ${formattedBytesPerSecondSpeed()} | estimated time left : ${formattedEtaSeconds()}`}
                            </h1>
                        </>
                    }
                </button>
            </div>
        </div>
    )
}

export default Main;