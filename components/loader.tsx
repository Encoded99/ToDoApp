import React, { useRef,useEffect } from "react";
import { View, Text, Modal, StyleSheet, Animated,Dimensions } from "react-native";
import { useTask } from "@/store/task";
import { useGlobal } from "@/app/context";


const {width,height}=Dimensions.get('window')

export default function AnimatedSuccessModal() {
const {showModal,setShowModal,modalText,setModalText}=useTask()
const {secondBackground}=useGlobal()
  const scaleAnim = useRef(new Animated.Value(0)).current; // 

  const openModal = () => {
    setShowModal(true);
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();

   
    setTimeout(() => {
      Animated.timing(scaleAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }).start(() => {setShowModal(false);setModalText('')});
    }, 1500);
  };

  useEffect(()=>{

  openModal()

  },[])

  return (
   
     <View  style={styles.container}>
 <Modal transparent visible={showModal} animationType="none">
        <View style={styles.overlay}>
          <Animated.View
            style={[styles.modalContent, {backgroundColor:secondBackground, transform: [{ scale: scaleAnim }] }]}
          >
            <Text style={styles.modalText}>{modalText}</Text>
          </Animated.View>
        </View>
      </Modal>
     </View>
          
     
 
  );
}

const styles = StyleSheet.create({

 container:{
  width:'100%',
  height:"100%",
  position:"absolute",
  top:0,
  bottom:0,
  left:0,
  right:0,
  
 },

  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
     backgroundColor: "rgba(0,0,0,0.3)",
  },
  modalContent: {
   
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    minHeight:200,
    minWidth:width*0.7,
    borderWidth:1,
    borderColor:'grey'
  },
  modalText: { fontSize: 18, color: "green", fontWeight: "bold" },
});
