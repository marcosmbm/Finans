import React from 'react';
import AsyncStorage from '@react-native-community/async-storage'

import {StateProvider} from './Context/ContextProvider';
import App from '../App';

import DarkTheme from './Components/Dark/Dark';
import LightTheme from './Components/Dark/Light';

export default function Index() {
    const initialState = {theme: LightTheme};

    async function updateStorage(state){
      try{
        await AsyncStorage.setItem("DarkModeKey",state.toString()); //consegue gravar o valor
      }catch(error){
        console.log('Error',error);
      }
    }

    const reducer = (state,action)=> {
      switch (action.type){
        case "enableDarkMode" :
          updateStorage(true);
          return {
            ...state,
            theme: DarkTheme
          };
          case "disableDarkMode":
            updateStorage(false)
            return {
              ...state,
              theme: LightTheme
            };
            default: return state;
      }
    }

 return (
     <StateProvider initialState={initialState} reducer={reducer}>
       <App/>
     </StateProvider>
  );
}