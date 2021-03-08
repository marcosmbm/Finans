import 'react-native-gesture-handler';
import React,{useEffect} from 'react';
import {StatusBar} from 'react-native';
import {ThemeProvider} from 'styled-components';
import AuthProvider from './src/Context/auth';

import {NavigationContainer} from '@react-navigation/native';
import { useStateValue } from './src/Context/ContextProvider';
import Routes from './src/Routes/index';
import AsyncStorage from '@react-native-community/async-storage';

console.disableYellowBox=true;

export default function App() {
 const [state,dispach] = useStateValue();

 useEffect(()=>{
  async function getStorageDarkMode(){
    const darkModeKey = await AsyncStorage.getItem('DarkModeKey')

    if(darkModeKey === 'true'){
      dispach({
        type: "enableDarkMode"
      });
      return
    }

    dispach({
      type: "disableDarkMode"
    });
  }

  getStorageDarkMode();
 },[]);

 return (
   <NavigationContainer>
     <AuthProvider>
     <ThemeProvider theme={state.theme}>
        <StatusBar backgroundColor={state.theme.background} barStyle="light-content"/>
        <Routes/>
      </ThemeProvider>
      </AuthProvider>
   </NavigationContainer>
  );
}