import React,{useState,useContext,useEffect} from 'react';

import { View,Text,Image } from 'react-native';
import styled from 'styled-components';
import Interrupd from '../../Components/Switch';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
    DrawerContentScrollView,
    DrawerItem,
    DrawerItemList
} from '@react-navigation/drawer';

import {AuthContext} from '../../Context/auth';
import {useStateValue} from '../../Context/ContextProvider';
import firebase from '../../services/firebaseconnection';
import AsyncStorage from '@react-native-community/async-storage';

export default function Drawer(props) {
 
    const {user,signOut} = useContext(AuthContext);
    const [state,dispach] = useStateValue();
    const [nome,setNome] = useState('');
    const uid = user && user.uid;

    useEffect(()=>{
        async function load(){
          await firebase.database().ref('users').child(uid).on('value',(snapshot)=>{
              setNome(snapshot.val().nome);
          });
        }
        load();
      },[]);

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
     <Container>
         <Logo>
             <Image
                source={require('../../img/Logomod.png')}
                style={{width: 95, height: 95}}
                resizeMode="contain"
             />

             <Text1>
                 Bem Vindo
             </Text1>

             <Text2>
                {nome}
             </Text2>
         </Logo>

         <View style={{marginTop: 35}}>
            <DrawerItem
                    icon={(color,size)=> (
                        <Icon
                            name="account"
                            color={state.theme.text1}
                            size={20}
                        />
                    )}
                    label={()=><Txt style={{fontSize: 14}}>Perfil</Txt>}
                    onPress={()=> {props.navigation.navigate('Perfil')}}
             />
            <DrawerItem
                    icon={(color,size)=>(
                        <Icon
                            name="credit-card-outline"
                            color={state.theme.text1}
                            size={20}
                        />
                    )}
                    label={()=><Txt style={{fontSize: 14}}>Contas</Txt>}
                    onPress={()=>{props.navigation.navigate('Contas')}}
            />

            <DrawerItem
                    icon={(color,size)=>(
                        <Icon
                            name="ballot-outline"
                            color={state.theme.text1}
                            size={20}
                        />
                    )}
                    label={()=><Txt style={{fontSize: 14}}>Extrato</Txt>}
                    onPress={()=>{props.navigation.navigate('Extrato')}}
            />
            <DrawerItem
                    icon={(color,size)=>(
                        <Icon
                            name="cog-outline"
                            color={state.theme.text1}
                            size={20}
                        />
                    )}
                    label={()=><Txt style={{fontSize: 14}}>Configurações</Txt>}
                    onPress={()=>{props.navigation.navigate('Configurações')}}
            />

            <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="exit-to-app" 
                                color={state.theme.text1}
                                size={20}
                                />
                            )}
                            label={()=><Text1 style={{fontSize: 14}}>Sair</Text1>}
                            onPress={()=> signOut()}
                />

            <Sair>
            <Text style={{marginLeft: 20, marginTop: 20, color: '#A4A4A4'}}>Preferências</Text>
            <DrawerItem 
                label={()=>
                    <Preference>
                            <Txt>Tema Dark</Txt>
                            <Interrupd/>
                    </Preference>
                }         
                />
            </Sair>       
         </View>
     </Container>
  );
}

const Container = styled.View`
    flex: 1;
    background-color: ${props => props.theme.backgroundDrawer};
`;

const Logo = styled.View`
    align-items: center;
    justify-content: center;
    margin-top: 25px;
`;

const Text1 = styled.Text`
    color: ${props => props.theme.text1};
    font-size: 18px;
    margin-top: 5px;
`;

const Text2 = styled.Text`
    color: ${props => props.theme.text1};
    font-size: 17px;
    font-weight: bold;
    padding-bottom: 25px;
`;

const Txt = styled.Text`
    color: ${props => props.theme.text1};
`;

const Sair = styled.View`
    margin-top: 15px;
    border-top-color: #f4f4f4;
    border-top-width: 1px;
`;

const Preference = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;