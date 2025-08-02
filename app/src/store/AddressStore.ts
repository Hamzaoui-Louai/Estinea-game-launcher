import {create} from 'zustand'

type AppState = {
    address: string;
    setAddress: (address: string) => void;
};

export const useAddressStore = create<AppState>((set) => ({
    address: 'signup',
    setAddress: (address) => set({ address: address }),
}));