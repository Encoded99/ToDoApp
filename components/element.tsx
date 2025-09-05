import { StyleSheet,Pressable,Text, } from "react-native"
import { useGlobal } from "@/app/context"





export const SubmitBtn=({title,trigger}:{title:string,trigger:()=>void})=>{

 const {textColor,btnColor}=useGlobal()



 return (
  <>
  <Pressable onPress={()=>trigger()}  style={[styles.btn,{backgroundColor:btnColor}]}>
   <Text style={styles.btnText}>{title}</Text>
  </Pressable>
  </>
 )
}


const styles=StyleSheet.create({
 
  btn:{
  width:'100%',
  borderRadius:30,
  marginBottom:200,
  justifyContent:"center",
  alignItems:"center",
  height:50,
 },
 btnText:{
  color:'white',
  fontSize:22,
  fontWeight:500
 }
})