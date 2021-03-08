import React,{useContext} from 'react';
import {useStateValue} from '../../Context/ContextProvider';
import {useNavigation} from '@react-navigation/native';

import { View,TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import {Container, Tipo, TipoText, ValorText, Tot} from './style';
import Icon from 'react-native-vector-icons/FontAwesome';

export let keyC;
export default function ContasList({data,deleteItem,editItem}) {
 
const [state,dispach] = useStateValue();
const navigation = useNavigation();
keyC = data.keyConta;
 return (
   <TouchableWithoutFeedback onPress={()=>navigation.navigate('Counts',{nomeConta: data.nomeConta, keyConta: data.keyConta, saldoConta: data.saldoConta})}>
       <Container>
           <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Tipo>
                    <TipoText>{data.nomeConta}</TipoText>
                </Tipo>
                
                <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity onPress={()=>editItem(data)}>
                            <Icon
                                name="cog"
                                size={20}
                                color={state.theme.txtColor}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity 
                            onPress={()=>deleteItem(data)}
                            style={{marginLeft: 20}}
                        >
                            <Icon
                                name="trash-o"
                                size={20}
                                color={state.theme.txtColor}
                            />
                        </TouchableOpacity>
                </View>
           </View>

            <Tot>
                Receitas: R$ {data.totReceitas}
            </Tot>

            <Tot>
                Despesas: R$ {data.totDespesas}
            </Tot>
           <ValorText>
               Saldo: R$ {data.saldoConta}
           </ValorText>
       </Container>
   </TouchableWithoutFeedback>
  );
}