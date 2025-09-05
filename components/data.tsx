import { Image,StyleSheet,View,Text } from "react-native";
import { useGlobal } from "@/app/context";
import { RFValue } from "react-native-responsive-fontsize";

const EmptyData=({text}:{text:string})=>{
 const  {textColor}=useGlobal()
 return (
  <>
  <View style={styles.container}>
 <Image  source={require('@/assets/images/no-result-data-document-or-file-not-found-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-etc-vector.jpg')}
   style={styles.image} 
  />

  <Text style={[styles.text,{color:textColor}]}>{text}</Text>

  </View>
 

  
  </>
 )
}


const styles=  StyleSheet.create({

container:{
 width:'100%',


 justifyContent:"center",
 alignItems:"center",

},

 image:{
  width:200,
  height:200,
 },
 text:{
  fontSize:RFValue(18),
  fontWeight:700,
  marginVertical:10,
  textAlign:"center"

 },

})


export default  EmptyData