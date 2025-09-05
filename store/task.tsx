
import { create } from "zustand";

export  type TaskType={
    title:string,
    date:string,
    isCompleted:boolean,
    _id:string,
    

  }


type UseTaskType={
  openTask:TaskType[],
  setOpenTask:(value:TaskType[])=>void,
    closedTask:TaskType[],
  setClosedTask:(value:TaskType[])=>void,
  query:string,
  setQuery:(value:string)=>void,
  showModal:boolean,
  setShowModal:(value:boolean)=>void,
  modalText:string,
  setModalText:(value:string)=>void,
}


export const useTask=create<UseTaskType>((set)=>(
  {
    openTask:[],
    setOpenTask:(value)=>set({openTask:value}),
      closedTask:[],
    setClosedTask:(value)=>set({closedTask:value}),
    query:'',
    setQuery:(value)=>set({query:value}),
    showModal:true,
    setShowModal:(value)=>set({showModal:value}),
    modalText:"",
    setModalText:(value)=>set({modalText:value})
  }
))