import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useGlobal } from '@/app/context';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DarkModeToggle() {
 const {isDark, setIsDark} =useGlobal()
 

  const toggleTheme =async () => {
    setIsDark(!isDark);

    
    
     await AsyncStorage.setItem('isDark',JSON.stringify(!isDark))
   
    
  };

  return (
    <View style={[styles.container, ]}>
      <TouchableOpacity style={styles.toggleButton} onPress={toggleTheme}>
        <Ionicons 
          name={isDark ? 'sunny' : 'moon'}  
          size={15} 
          color={isDark ? 'yellow' : 'black'} 
        />
      </TouchableOpacity>
      <Text style={[styles.text, { color:  '#fff'  }]}>
        {isDark ? 'Dark Mode On' : 'Light Mode On'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleButton: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: '#e0e0e0',
    marginBottom: 5
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
  },
});
