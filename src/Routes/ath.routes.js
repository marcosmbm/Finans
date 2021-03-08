import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Intro from '../Pages/Intro';
import SignIn from '../Pages/SignIn';
import SignUp from '../Pages/SignUp';

const AuthStack = createStackNavigator();

function AuthRoutes(){
    return(
        <AuthStack.Navigator>
            <AuthStack.Screen
                name="Intro"
                component={Intro}
                options={{headerShown: false}}
            />

            <AuthStack.Screen
                name="SignIn"
                component={SignIn}
                options={{headerShown: false}}
            />

            <AuthStack.Screen
                name="SignUp"
                component={SignUp}
                options={{headerShown: false}}
            />
        </AuthStack.Navigator>
    )
}

export default AuthRoutes;