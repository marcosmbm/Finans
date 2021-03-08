import React,{useContext} from 'react';
import { TouchableWithoutFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {useStateValue} from '../../Context/ContextProvider';

import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';


export default function TabButton({onPress, focused}) {
    const [state,dispach] = useStateValue();
 return (
   <TouchableWithoutFeedback onPress={onPress}>
       <Button
            colors={
                focused ? [state.theme.tabActive,state.theme.tabActive] : [state.theme.tabInactive,state.theme.tabInactive]
            }
            
       >
            <Icon
                name="add-outline"
                size={30}
                color={focused ? state.theme.iconActive : state.theme.iconInactive}
            />
            
       </Button>

   </TouchableWithoutFeedback>
  );
}

const Button = styled(LinearGradient)`
    width: 60px;
    height: 60px;
    border-radius: 30px;
    align-items: center;
    justify-content: center;
`

const Label = styled.Text`
    font-size: 12px;
    color: ${({focused})=> focused ? '#000' : '#fff'};
`