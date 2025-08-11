import {create} from 'zustand'

type AppState = {
    address: string;
    setAddress: (address: string) => void;
};

export const useAddressStore = create<AppState>((set) => ({
    //address: 'auth',
    address: 'accountsettings',
    setAddress: (address) => set({ address: address }),
}));