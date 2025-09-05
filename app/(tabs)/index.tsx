
import {  StyleSheet,View,Text,ScrollView,ImageBackground, Pressable, TouchableOpacity,TextInput } from 'react-native';
import React,{useEffect,useState} from 'react';
import { HelloWave } from '@/components/HelloWave';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useGlobal } from '@/app/context';
import ListContainer from '@/components/List';
import { useTask,TaskType } from '@/store/task';
import DarkModeToggle from '@/components/mode';



export default function HomeScreen() {

 const {textColor,secondBackground,mainBackground,isDark,setIsDark}=useGlobal()
const  {setOpenTask,setClosedTask,openTask,closedTask,query,setQuery}=useTask()
const [showSelect,setShowSelect]=useState<boolean>(false)



const fetchTask=async()=>{

  const storedOpenTask= await AsyncStorage.getItem('uncompleted-task')
  if (storedOpenTask){
    const parsedOpenTask= JSON.parse(storedOpenTask) as TaskType[] || []
    setOpenTask(parsedOpenTask)

  }

  
  const storedClosedTask= await AsyncStorage.getItem('completed-task')

  if (storedClosedTask){
     const parsedClosedTask= JSON.parse(storedClosedTask) as TaskType[] || []
    setClosedTask(parsedClosedTask)
  }


}



const handleSearch=(param:string)=>{


 setQuery(param.trim());



}

const handleQuery=async()=>{

     
     if (query) {
    const filteredOpen = openTask.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
    setOpenTask(filteredOpen);

     const filteredClose = closedTask.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
    setClosedTask(filteredClose);
  } 

  else{
   
   await fetchTask()
  }



}

const handleSort=(param:'title'|'date')=>{

if (param==='title'){
const sortedOpen = openTask.sort((a, b) => a.title.localeCompare(b.title));
setOpenTask(sortedOpen)
const sortedClosed = closedTask.sort((a, b) => a.title.localeCompare(b.title));
setClosedTask(sortedClosed)
}

else{
  const sortedOpen = openTask.sort((a, b) => a.date.localeCompare(b.date));
setOpenTask(sortedOpen)
const sortedClosed = closedTask.sort((a, b) => a.date.localeCompare(b.date));
setClosedTask(sortedClosed)

}

 

setShowSelect(false)
}



useEffect(()=>{

  handleQuery()

},[query])



const fetchTheme=async()=>{
  const savedTheme=   await AsyncStorage.getItem('isDark') 

  if (savedTheme!==null){
    setIsDark(JSON.parse(savedTheme))

  }

  else{


    setIsDark(false)
 await AsyncStorage.setItem('isDark',JSON.stringify(isDark))
  }

  

}


useEffect(()=>{
   fetchTheme()
  fetchTask()
 
},[])





  return (
    
<ScrollView style={{flex:1, width:'100%',position:'relative',backgroundColor:mainBackground}}>




{
  showSelect && (
    <>
  <Pressable onPress={()=>setShowSelect(false)} style={styles.overlay} ></Pressable>  
    </>
  )
}
  

 
  <View style={styles.toggleContainer}>
<DarkModeToggle/>
</View> 
  <ImageBackground
         source={require('@/assets/images/pexels-photo-1263986.jpeg')}
        style={styles.reactLogo} 
        resizeMode="cover" 
      >



<View style={styles.inputWrapper}>
  {
    query && (
      <>
       <Ionicons color={'white'} onPress={()=>{fetchTask();setQuery('')}} size={35} name='arrow-back' />  
      </>
    )
  }

  <View style={[styles.inputSearchWrapper,{backgroundColor:secondBackground,width:!query?'100%':'90%'}]}>

{
  !query && (
    <>
   <Ionicons color={textColor} onPress={handleQuery} size={30} name='search' style={styles.searchBtn}/> 
    </>
  )
}




<TextInput
  
  style={[
    styles.input,
    {
      backgroundColor: secondBackground,
      color:textColor
    },
  ]}
  placeholder="Search Task..."
  placeholderTextColor={isDark ? '#AAAAAA' : '#555555'}
  value={query}
  onChangeText={handleSearch}
  selectionColor={isDark ? '#FFFFFF' : '#000000'} 
  
 
/>
  </View>
 
</View>

       

      </ImageBackground>

    


  


      <View style={[styles.titleContainer,]}>
       
          <Text style={[styles.title,{color:textColor}]}>What are we doing today</Text>
        <HelloWave />
      </View>

      <View style={styles.sortContainer}>
      <Pressable style={[styles.sortCircle,{backgroundColor:secondBackground}]}  onPress={()=>setShowSelect(true)}>
<Ionicons name="options" size={24} color={textColor} />
      </Pressable>



   {
    showSelect && (
      <>
      <View style={[styles.drawContainer,{backgroundColor:secondBackground}]}>


 <TouchableOpacity style={styles.selectField}
                 onPress={()=>{fetchTask();setShowSelect(false)}}
         >
            <Text style={[styles.sortTitle,{color:textColor}]}>Reset</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.selectField}
        
        onPress={()=>handleSort('title')}
        >
            <Text style={[styles.sortTitle,{color:textColor}]}>Sort by Title</Text>
        </TouchableOpacity>
         <TouchableOpacity style={[styles.selectField,{borderBottomColor:'',borderBottomWidth:0}]}
                 onPress={()=>handleSort('date')}
         >
            <Text style={[styles.sortTitle,{color:textColor}]}>Sort by Date</Text>
        </TouchableOpacity>

      </View> 
      </>
    )
   }
     


      </View>
      
        <ListContainer data={openTask}  instance={'incomplete'}/>
         <ListContainer data={closedTask}  instance={'complete'}/>

</ScrollView>

  
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width:"100%",
   
   justifyContent:"center"
  },
 
  reactLogo: {
    height: 350,
    width: '100%',
    position:"relative"
    
  },
  toggleContainer:{
     top:20, 
    left: 10,
    position: 'absolute',
    zIndex:1,
  },
  title:{
    fontWeight:700,
    fontSize:RFValue(20),
    marginVertical:20,
    textAlign:"center"
  },

  inputWrapper: {
    width: '90%',
    height: 60,
    
    alignSelf: 'center',
    position: 'absolute',
    top: '60%',
    flexDirection:"row",
    alignItems:"center"
  },
  inputSearchWrapper:{
    width:"100%",
    height:"100%",
   borderRadius: 50,
   position:"relative",
   justifyContent:"center",
   alignItems:'center'

  },

  input: {
  
    
    alignSelf:"center",
   
     width:'80%',
     height:60,
     fontSize:18,
     paddingHorizontal:10
  },

  searchBtn:{
 position:"absolute",
     top:'25%',
     bottom:'25%',
     left:'2%',
     zIndex:99
  },
  sortContainer:{
    width:'95%',
    
    flexDirection:'row',
    justifyContent:"flex-end",
    alignItems:"center",
    marginBottom:10,
    position:"relative",

    zIndex:1

  },
  sortCircle:{
    width:40,
    height:40,
    borderRadius:40,
    justifyContent:'center',
    alignItems:'center'
  },
  drawContainer:{
    width:150,
   
    position:"absolute",
    top:0,
    zIndex:2,
    borderColor:"grey",
    borderRadius:6,
    borderWidth:1,
    

  },
  overlay:{
    width:"100%",
    height:"100%",

    position:"absolute",
    top:0,
    left:0,
    right:0,
    bottom:0,
    zIndex:1
  },
  selectField:{
    width:"100%",
    padding:6,
    borderBottomWidth:1,
    borderBottomColor:'grey',
      zIndex:1,
     

  },
  sortTitle:{
    fontSize:RFValue(13),
    fontWeight:500
  }
  
});
