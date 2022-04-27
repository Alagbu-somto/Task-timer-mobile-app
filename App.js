import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Focus } from './src/features/focus/focus';
import { FocusHistory } from './src/features/focus/focusHistoryList';
import { Timmer } from './src/features/timer/timer';
import { spacing } from './src/utils/sizes';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const Stat ={
    complete:1,
    canceled:2
  }
  const [focusObject, setFocusObject] = useState(null);
  const [focusHistory,setFocusHistory] = useState([]);
  
const storeFocusHistory =( subject,status)=>{
  const key = String(focusHistory.length + 1)
  setFocusHistory([...focusHistory,{subject,status,key}])
  
}

const onClear = ()=>{
setFocusHistory([]);
}

const saveFocusHistory = async ()=>{
try{
await AsyncStorage.setItem("focusHistory",JSON.stringify(focusHistory))
}catch (e){
console.log(e)
}
}

const loadFocusHistory = async ()=>{
try{
const history = await AsyncStorage.getItem("focusHistory")
if(history && JSON.parse(history).length){
  setFocusHistory(JSON.parse(history))
}
}catch (e){
console.log(e)
}
}

useEffect(()=>{
 loadFocusHistory();
},[])

useEffect(()=>{
  saveFocusHistory();
},[focusHistory])

  return (
    <View style={styles.container}>
      {focusObject ? (
        <Timmer
         focusObject={focusObject} 
        onTimerEnd={()=> {storeFocusHistory(focusObject,Stat.complete),setFocusObject(null)}}
         clearSubject={()=>{storeFocusHistory(focusObject,Stat.canceled),setFocusObject(null)}} 
         />
      ) : (
        <View style={{flex:1}} >
      <Focus addSubject={setFocusObject} />
      <FocusHistory focusHistory ={focusHistory} onClear={onClear} />
      </View>
        
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? spacing.md : spacing.lg,
    backgroundColor: 'purple',
  },
});
