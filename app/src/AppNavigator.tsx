import { useEffect, useState } from "react";
import Auth from "./pages/Auth/Auth";
import { useAddressStore } from "./store/AddressStore";
import { Stats } from "original-fs";


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
    ];

    const globalAddress = useAddressStore((state) => state.address);

    useEffect(()=>{
        if(currentAddress != globalAddress)
        {
            setTimeout(()=>{setCurrentAdress(globalAddress);},1000);           
        }
    },[globalAddress])

    return (
        <>
        {
            pages.map((page) => {
                return(page.address === currentAddress)?  <>{page.component}</>:null
            })
        }
        <div style={{pointerEvents: 'none',}} className={`fixed z-40 transition-opacity duration-1000 ease-in-out  ${(currentAddress === globalAddress)? "opacity-0" : "opacity-100" } bg-black w-full h-full left-0 top-0`}></div>
        </>
    )
}

export default AppNavigator;