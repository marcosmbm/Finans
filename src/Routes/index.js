import React,{useContext} from 'react';
import { View, ActivityIndicator } from 'react-native';

import AuthRoutes from './ath.routes';
import AppRoutes from './app.routes';

import {AuthContext} from '../Context/auth';
import {useStateValue} from '../Context/ContextProvider';

function Routes(){
    const {signed, loading} =  useContext(AuthContext);
    const [state] = useStateValue();

    if(loading){
        return(
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor: state.theme.backgroundProfile}}>
                <ActivityIndicator
                    size="large"
                    color={state.theme.Button}
                />
            </View>

        )
    }
    return(
        signed ? <AppRoutes/> : <AuthRoutes/>
    )
}

export default Routes