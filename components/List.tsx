
import {  StyleSheet,View,Text,Vibration,Animated,} from 'react-native';
import React,{useState,useEffect,useRef} from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { Checkbox } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useGlobal } from '@/app/context';
import { TaskType } from '@/store/task';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTask } from '@/store/task';
import EmptyData from './data';
import { Image } from 'expo-image';



 const ListContainer=({instance,data}:{instance:"complete" | "incomplete",data:TaskType[]})=>{
 const {setOpenTask,setClosedTask,query}=useTask()
  const {textColor,secondBackground}=useGlobal()
  const [loadingTask,setLoadingTask]=useState<string>('')
const title=instance==='complete'?"Completed":"To Do List"






const handleCheck=async(param:TaskType)=>{


setLoadingTask(param._id)

const storedOpenTask= await AsyncStorage.getItem('uncompleted-task')
param.isCompleted=true
if(storedOpenTask){
  const parsedOpenTask= JSON.parse(storedOpenTask) as TaskType[] || []

  const filteredTask:TaskType[]= parsedOpenTask.filter((item)=>item._id!==param._id)
  setOpenTask(filteredTask)
  await AsyncStorage.setItem('uncompleted-task',JSON.stringify(filteredTask))
}

const storedClosedTask= await AsyncStorage.getItem('completed-task')
if (storedClosedTask){


const parsedClosedTask= JSON.parse(storedClosedTask) as TaskType[] || []

 const closedTaskArray:TaskType[]= [...parsedClosedTask,{...param}]
  setClosedTask(closedTaskArray)
  await AsyncStorage.setItem('completed-task',JSON.stringify(closedTaskArray))

}

else{
  const closedTaskArray:TaskType[]=[{...param}]
  setClosedTask(closedTaskArray)
   await AsyncStorage.setItem('completed-task',JSON.stringify(closedTaskArray))
}
  

Vibration.vibrate(500);

}
















const handleDelete=async(param:TaskType)=>{
  if (!param.isCompleted){


const storedOpenTask= await AsyncStorage.getItem('uncompleted-task')
if(storedOpenTask){
  const parsedOpenTask= JSON.parse(storedOpenTask) as TaskType[] || []

  const filteredTask:TaskType[]= parsedOpenTask.filter((item)=>item._id!==param._id)
  setOpenTask(filteredTask)
  await AsyncStorage.setItem('uncompleted-task',JSON.stringify(filteredTask))
}


  }


  else{

  const storedClosedTask= await AsyncStorage.getItem('completed-task')

  if (storedClosedTask){

      const parsedClosedTask= JSON.parse(storedClosedTask) as TaskType[] || []

  const filteredTask:TaskType[]= parsedClosedTask.filter((item)=>item._id!==param._id)
  setClosedTask(filteredTask)
  await AsyncStorage.setItem('completed-task',JSON.stringify(filteredTask))

  }

}



 

  
}






  return (
    <>






     <View style={[styles.listContainer,{backgroundColor:secondBackground}]}>

        <Text style={[styles.listHeader,{color:textColor,}]}>{title}</Text>

    


    {
      data.map((item)=>{
        return(
          <>


     


 <View style={[styles.listLine,{justifyContent:'space-between'}]}
   key={item._id}
 
 >



   



   <View style={styles.rightLine}> 




       {
        item.isCompleted && (
          <>
           <Checkbox
      status={'checked' }
      
       color={'grey'}
        />
          </>
        )
       }

         {
         !item.isCompleted && (
          <>
           <Checkbox
      status={'unchecked' }
       onPress={()=>handleCheck(item)}
       
       color={textColor}
        />
          </>
        )
       }



        <Text style={{color:!item.isCompleted?textColor:'grey',fontSize:RFValue(13),fontWeight:500}}>
         {item.title}
        </Text>
 
        </View>


    
              <View style={styles.leftLine}>
                <Text style={{color:!item.isCompleted?textColor:'grey',fontWeight:500}}>{item.date.split('-').reverse().join('-')}</Text>
          <Ionicons  color={'red'} size={RFValue(18)} name='trash' onPress={()=>handleDelete(item)}/>
          </View>

            


 </View>
      

          </>
        )
      })
    }





       
       {
        data.length===0 &&  (
          <>
        {
          query==='' ? (
            <>
             <EmptyData text={ instance==='incomplete'? 'No tasks yet. Add your first one!':"No Completed Tasks Yet"}/>
            </>
          ):(
            <>
             <EmptyData text={ 'Search Not Found'}/>
            </>
          )
        }

           
         
          </>
        )
       }
         
      

    
 
      </View>
     
    
    
    </>
  )
}


const styles = StyleSheet.create({
  listContainer:{
    width:"90%",
     padding:12,
    borderRadius:10,
    alignSelf:"center",
    marginBottom:50
  },

 listHeader:{

  fontWeight:700,
  fontSize:RFValue(15),
  marginBottom:10,

 },


  listLine:{
    width:'100%',
   flexDirection:"row",
    alignItems:"center",
    marginBottom:14,
  },
  rightLine:{
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center"

  },

   leftLine:{
   
    justifyContent:"center",
    alignItems:"center"

  },

  
})


export default ListContainer