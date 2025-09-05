import React, { useState } from 'react';
import { Image } from 'expo-image';
import { StyleSheet,TextInput,ScrollView,View,Text } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import { SubmitBtn } from '@/components/element';
import { RFValue } from 'react-native-responsive-fontsize';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TaskType } from '@/store/task';
import { nanoid } from 'nanoid/non-secure';
import { useTask } from '@/store/task';
import { Calendar } from 'react-native-calendars';
import { useGlobal } from '../context';

export default function TabTwoScreen() {
  const {secondBackground,textColor,mainBackground,isDark}=useGlobal()

  const today = new Date();
const formattedDate = today.toISOString().split('T')[0];

const {setOpenTask,setModalText} =useTask()
 const emptyTask={
  title:"",
  _id:"",
  isCompleted:false,
  date:formattedDate,
 }

  const [task,setTask]=useState<TaskType>(emptyTask) 



const handleSubmit=async()=>{


   if (task.title===''){
  alert('please add a title')
  return 
 }

const uncompletedTask= await  AsyncStorage.getItem('uncompleted-task')

const id = nanoid();
task._id=id

if (!uncompletedTask){

  const StoredTask:TaskType[]=[{...task}]
  await AsyncStorage.setItem('uncompleted-task',JSON.stringify(StoredTask))

  setOpenTask(StoredTask)
}

else{
  const gottenTask:TaskType[]= JSON.parse(uncompletedTask)||[];
  const StoredTask:TaskType[]=[...gottenTask,{...task}]
    await AsyncStorage.setItem('uncompleted-task',JSON.stringify(StoredTask))
   setOpenTask(StoredTask)
}

setModalText('🎉 Task Added!')
setTask(emptyTask)
}







  return (
    <ScrollView
    style={{flex:1, width:'100%',backgroundColor:mainBackground}}
     >

      <Image source={require('@/assets/images/penimages.jpg')}
        style={styles.headerImage} /> 
      


      <View style={styles.contentContainer}>


<ThemedView style={styles.titleContainer}>
    
        <Text style={{fontWeight:700,fontSize:RFValue(25),color:textColor}}>Add New Task</Text>
      </ThemedView>

        <Text style={[styles.title,{color:textColor}]}>Task Title</Text>
   

          <TextInput
  
          value={task.title}
          onChangeText={(value)=>setTask((prev)=>({...prev,title:value}))}
  style={[styles.input,{backgroundColor:secondBackground,color:textColor}]}
  placeholder="Enter title..."
   placeholderTextColor={isDark ? '#999999' : '#666666'} 

/>

 <Text style={[styles.title,{color:textColor}]}>Due Date</Text>
 <View style={styles.calenderContainer}>

  <Calendar
    key={isDark ? 'dark' : 'light'} 
  onDayPress={(day) => {
 
  setTask((prev)=>({...prev,date:day.dateString}))
  }}
  markedDates={{
     [task.date]: { selected: true, marked: true, selectedColor: 'blue' },
  }}

    theme={{
    backgroundColor: isDark?'black':'white', 
    calendarBackground:  isDark?'black':'white', 
    textSectionTitleColor: !isDark?'black':'white', // weekday text color
    dayTextColor: !isDark?'black':'white', // day text color
    todayTextColor: 'yellow', // today text color
    monthTextColor: !isDark?'black':'white', // month title color
    arrowColor: !isDark?'black':'white', // navigation arrows
  }}
/>

 </View>



       <SubmitBtn trigger={handleSubmit} title={'Save Task'}/>

      </View>
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
       height: 350,
    width: '100%',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    marginVertical:20
  },
   input:{
  width:'100%',
  height:60,
  borderRadius:15,
  borderWidth:1,
  marginBottom:20,
    marginTop:10,
   borderColor: '#ccc',
   fontSize:RFValue(15),
   paddingHorizontal:20
 },

 descriptionInput:{
  height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    textAlignVertical: 'top', 
    width:'100%',
     marginBottom:30,
     fontSize:RFValue(15)
 },
 contentContainer:{
  width:'90%',
  alignSelf:"center"

 },

 calenderContainer:{
 marginBottom:40,
    marginTop:10,
 },
title:{
  fontSize:16,
  fontWeight:500
}
});
