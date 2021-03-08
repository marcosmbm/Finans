import React, {useState} from 'react';
import { View,StyleSheet,Text,TouchableWithoutFeedback,Animated, Button } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useStateValue} from '../../Context/ContextProvider';

export default function FabButton({navigateReceitas,navigateDespesas}){

  const [state,dispach] = useStateValue();
  const [open,setOpen] = useState(1);
  const [animation] = useState(new Animated.Value(0));

  const toggleMenu = () => {
    const toValue = open 
    console.log(toValue);
    Animated.spring(animation,{
        toValue,
        friction: 6
    }).start();
    setOpen(!open);
  }

  const upStyle = {
    transform:[
        {scale: animation},
        {
            translateY: animation.interpolate({
                inputRange: [0,1],
                outputRange: [0,-55]
            })
        }
    ]
  }

  const downStyle = {
    transform:[
        {scale: animation},
        {
            translateY: animation.interpolate({
                inputRange: [0,1],
                outputRange: [0,-110]
            })
        }
    ]
  }

  const rotation = {
      transform: [
          {
              rotate: animation.interpolate({
                  inputRange: [0,1],
                  outputRange: ["0deg","45deg"]
              })
          }
      ]
  }

  return (
        <View style={styles.Container}>
            <TouchableWithoutFeedback onPress={()=>navigateDespesas()}>
                <Animated.View style={[styles.Button,styles.subMenu,downStyle,{backgroundColor:'#DF0101'}]}>
                    <Icon
                        name="arrow-down"
                        size={20}
                        color="#fff"
                    />
                </Animated.View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={()=>navigateReceitas()}>
                <Animated.View style={[styles.Button,styles.subMenu,upStyle,{backgroundColor:'#009387'}]}>
                    <Icon
                        name="arrow-up"
                        size={20}
                        color="#fff"
                    />
                </Animated.View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={toggleMenu}>
                <Animated.View style={[styles.Button,rotation,{backgroundColor:state.theme.Button}]}>
                    <Icon
                        name="add"
                        size={30}
                        color="#fff"
                    />
                </Animated.View>
            </TouchableWithoutFeedback>
        </View>
   );
}

const styles = StyleSheet.create({
    Container:{
        alignItems: 'center',
        position: 'absolute',
        bottom: 80,
        right: 60
    },
    Button:{
        position: 'absolute',
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 60/2,
        shadowRadius: 10,
        shadowColor: '#00213b',
        shadowOpacity: 0.3,
        shadowOffset: {
            height: 10
        }
    },
    subMenu:{
        width: 48,
        height: 48,
        borderRadius: 48/2
    }
})


