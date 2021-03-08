import React,{useContext} from 'react';

import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator}from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {useStateValue} from '../Context/ContextProvider';

import Drawer from '../Components/Drawer/index';
import TabButton from '../Components/TabButton';
import Icon from 'react-native-vector-icons/Ionicons';

import Profile from '../Pages/Profile';
import Home from '../Pages/Home';
import Configurations from '../Pages/Configurations';
import New from '../Pages/New';
import Graphic from '../Pages/Graphic';
import Counts from '../Pages/Counts';
import Receitas from '../Pages/Receitas';
import Despesas from '../Pages/Despesas';
import Extract from '../Pages/Extract';

const AppDrawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const icons={
    Perfil:{
        name: 'md-person'
    },
    Nova:{
        name: 'add-outline'
    },
    Gráfico:{
        name: 'ios-pie-chart-sharp'
    }
};

function Tabs(){
    const [state,dispach] = useStateValue();
    return(
        <Tab.Navigator
            screenOptions={ ({route,navigation}) => ({
                tabBarIcon: ({ color, size, focused}) => {
                if (route.name === 'Nova'){
                    return(
                        <TabButton
                            onPress={()=> navigation.navigate('Nova')}
                            focused={focused}
                        />
                    )
                }
                const { name } = icons[route.name];
                return <Icon name={name} color={color} size={17} />
                } 
            }) }
            tabBarOptions={{
                style:{
                backgroundColor: state.theme.backgroundDrawer,
                height: 40,
                padding: 8
                },
                activeTintColor: state.theme.activeColor,
                inactiveTintColor: state.theme.inactiveColor,
                labelStyle:{
                    fontSize: 15
                }
            }}
        >
            <Tab.Screen
                name="Perfil" component={Profile}
            /> 
            <Tab.Screen
                name="Nova" component={New} options={{title: ''}}
            />   
            <Tab.Screen
                name="Gráfico" component={Graphic}
            />
        </Tab.Navigator>
    )
}

function Stacks(){
    const [state,dispach] = useStateValue();
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={Home}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="Counts"
                component={Counts}
                options={{
                    headerStyle:{
                        backgroundColor: state.theme.backgroundProfile
                    },
                    headerTintColor: state.theme.txtColor,
                    headerBackTitleStyle: false,
                    headerTitle: 'Voltar'
                }}
            />
            <Stack.Screen
                name="Receitas"
                component={Receitas}
                options={{
                    headerStyle:{
                        backgroundColor: state.theme.backgroundProfile
                    },
                    headerTintColor: state.theme.txtColor,
                    headerBackTitleStyle: false,
                    headerTitle: 'Voltar'
                }}
            />
            <Stack.Screen
                name="Despesas"
                component={Despesas}
                options={{
                    headerStyle:{
                        backgroundColor: state.theme.backgroundProfile
                    },
                    headerTintColor: state.theme.txtColor,
                    headerBackTitleStyle: false,
                    headerTitle: 'Voltar'
                }}
            />
        </Stack.Navigator>
    )
}

function AppRoutes(){
    return(
        <AppDrawer.Navigator
            drawerContent={props =>  <Drawer {...props}/>}
        >
            <AppDrawer.Screen
                name="Perfil" component={Tabs}
            />

            <AppDrawer.Screen
                name="Contas" component={Stacks}
            />

            <AppDrawer.Screen
                name="Configurações" component={Configurations}
            />

            <AppDrawer.Screen
                name="Extrato" component={Extract}
            />
        </AppDrawer.Navigator>
    )
}

export default AppRoutes;