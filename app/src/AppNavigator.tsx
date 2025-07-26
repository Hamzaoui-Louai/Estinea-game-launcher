import { useEffect, useState } from "react";
import Auth from "./pages/Auth/Auth";
import Main from "./pages/Main/Main";
import { useAddressStore } from "./store/AddressStore";
import Background from "./components/Background/Background";


type Page = {
    address: string;
    component: JSX.Element;
    };

function AppNavigator(){
    const [currentAddress,setCurrentAdress] = useState<string>("auth");
    const pages : Page[] = [
        {
            address: 'auth',
            component: <Auth />
        },
        {
            address: 'main',
            component: <Main />
        },
    ];

    const globalAddress = useAddressStore((state) => state.address);

    useEffect(()=>{
        if(currentAddress != globalAddress)
        {
            setTimeout(()=>{setCurrentAdress(globalAddress);},1000);           
        }
    },[globalAddress])

    function color1() : string{
        let result:string = '#081633';
        switch(currentAddress)
        {
            case 'auth': result='#081633' 
            break;
            case 'main': result='#EEEEEE'
        }
        return result;
    }

    function color2() : string{
        let result:string = '#102D69';
        switch(currentAddress)
        {
            case 'auth': result='#102D69' 
            break;
            case 'main': result='#CCCCCC'
        }
        return result;
    }

    return (
        <>
            <Background color1={color1()} color2={color2()}/>
            <div className='absolute top-0 z-1 w-full h-full'>
            {
                pages.map((page) => {
                    return(page.address === currentAddress)?  <>{page.component}</>:null
                })
            }
            </div>
            <div style={{pointerEvents: 'none',}} className={`fixed z-40 transition-opacity duration-1000 ease-in-out  ${(currentAddress === globalAddress)? "opacity-0" : "opacity-100" } bg-black w-full h-full left-0 top-0`}></div>
        </>
    )
}

export default AppNavigator;