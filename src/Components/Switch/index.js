import React,{useState,useEffect} from 'react';
import { View,Switch } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {useStateValue} from '../../Context/ContextProvider';

export default function Interrupd() {

    const [darkMode,setDarkMode] = useState(false);
    const [,dispach] = useStateValue();

    function handleChange(){
        dispach({
          type: !darkMode ? "enableDarkMode" : "disableDarkMode"
        });
        setDarkMode(!darkMode);
    }

  //Deixando o Switch na sua real forma de quando ele reiniciar o App
  useEffect(()=>{
    async function getInitalState(){
      const darkModeKey = await AsyncStorage.getItem('DarkModeKey')
  
      if(darkModeKey === 'true'){
        setDarkMode(true);
        return;
      }
    }
  
    getInitalState();
   },[]);
 return (
   <View>
        <Switch
          value={darkMode}
          onValueChange={handleChange}
          thumbColor="#FFF"
        />
   </View>
  );
}