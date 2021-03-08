import { database } from 'firebase';
import React from 'react';
import { View,Text } from 'react-native';
import {Container, IconView, Tipo, Valor} from './style';
import Icon from 'react-native-vector-icons/Feather';

export default function HistoricoList({data}) {
 return (
   <Container>
      <View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
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
                                {data.categoria} - {data.data}
                            </Tipo>
                    </View>
              </View>
          </View>
      </View>
      
      <View style={{justifyContent: 'center'}}>
          <Valor tipo={data.tipo}>R$ {data.valor}</Valor>
       </View>
   </Container>
  );
}