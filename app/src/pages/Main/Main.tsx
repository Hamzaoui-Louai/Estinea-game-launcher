
function Main(){
    return(
        <div className="w-full h-full relative left-0 top-0 flex flex-col">
            <div className="flex flex-row w-full grow">
                <div className="grow bg-[#AAAAAAAA] m-1.5 rounded-[10px] backdrop-blur-md p-[15px] flex flex-col justify-start text-gray-700">
                <h1 className="text-[20px] font-bold flex justify-self-start">version 1.0</h1>
                <p className="text-[20px] font-normal flex justify-self-start">didn't even start lol</p>
                </div>
                <div className="w-[25%] bg-[#102D69AA] m-1.5 rounded-[10px]">
                    
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