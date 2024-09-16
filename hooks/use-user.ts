import { create } from 'zustand';
import { persist, createJSONStorage } from "zustand/middleware"; 


interface userStore {
 info:{
     firstName:string;
     lastName:string;
  phone:string;
  address:string;}
  addItem: (data:{ firstName:string;
    lastName:string;
    phone:string;
    address:string;}) => void;
  removeAll: () => void;
}

const useUser = create(
  persist<userStore>((set, get) => ({
 info:{ 
    firstName:"",
    lastName:"",
phone:"",
address:"",},
  addItem: (data:{ firstName:string;
    lastName:string;
    phone:string;
    address:string;} ) => {
    const currentFirstName = get().info.firstName;
    const currentLastName = get().info.lastName;
    const currentAddress = get().info.address;
    const currentPhone = get().info.phone;
    set({info:{ firstName:currentFirstName,lastName:currentLastName,phone:currentPhone, address: currentAddress}});
  },
  removeAll: () => set({ info:{firstName:"",lastName:"",phone:"" ,address:""}}),
}), {
  name: 'user-storage',
  storage: createJSONStorage(() => localStorage)
}));

export default useUser;