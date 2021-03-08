import React from 'react';
import {useStateValue} from '../../Context/ContextProvider';

import { View,Text,TouchableOpacity,TouchableWithoutFeedback } from 'react-native';
import {Container,IconView,Tipo,Valor} from './style';

import Icon from 'react-native-vector-icons/Feather';
import Icons from 'react-native-vector-icons/Entypo';

export let keyMov;
export default function MovimentacoesList({data,deleteItem,editItem,exibItem}) {
    const [state,dispach] = useStateValue();
    keyMov = data.keyMovimentacao;
 return (
   <TouchableWithoutFeedback onLongPress={()=>exibItem(data)}>
   <Container>
       <View>
           <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
               <View style={{flexDirection: 'row'}}>
                    <IconView tipo={data.tipo}>
                        <Icon 
                            name={data.tipo === 'despesa' ? 'arrow-down' : 'arrow-up'} 
                            color="#fff" 
                            size={20} 
                        />
                    </IconView>

                    <View style={{justifyContent: 'center',marginLeft: 10}}>
                            <Tipo>
                                {data.categoria} - {data.date}
                            </Tipo>
                    </View>
                </View>

                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity
                        onPress={()=>editItem(data)} 
                        style={{justifyContent: 'center'}}>
                        <Icons
                            name='cog' 
                            color={state.theme.text1} 
                            size={20} 
                        />
                    </TouchableOpacity>

                    <TouchableOpacity 
                        onPress={()=>deleteItem(data)}
                        style={{justifyContent: 'center',marginLeft: 20}}
                    >
                        <Icons 
                            name='trash' 
                            color={state.theme.text1} 
                            size={20} 
                        />
                    </TouchableOpacity>
                </View>
            </View>
       </View>
       
       <View style={{justifyContent: 'center'}}>
                 <Valor tipo={data.tipo}>R$ {data.valor}</Valor>
       </View>
   </Container>
   </TouchableWithoutFeedback>
  );
}