import React,{useState,useEffect,useContext} from 'react';
import { View} from 'react-native';

import {PieChart} from 'react-native-svg-charts';
import {Text} from 'react-native-svg';
import {Background,Container,TitleGrafico,Title} from './style';

import {AuthContext} from '../../Context/auth';
import firebase from '../../services/firebaseconnection';


export default function Graphic() {

  const [totReceitas,setotReceitas] = useState(0);
  const [totDespesas,setTotDespesas] = useState(0);

  const {user} = useContext(AuthContext);
  const uid = user && user.uid;

  useEffect(()=>{
    async function loadDados(){
      await firebase.database().ref('users').child(uid).on('value', (snapshot)=>{
        setTotDespesas(snapshot.val().totDespesas);
        setotReceitas(snapshot.val().totReceitas);
      });
    }
    loadDados();
  },[]);

  const data = [
    {
      key: 1,
      value: totDespesas,
      svg: {fill: '#c62c36'}
    },
    {
      key: 2,
      value: totReceitas,
      svg: {fill: '#009387'}
    }
  ]

  const Label = ({slices}) =>{
    return slices.map((slice,index)=>{
      const {pieCentroid, data} = slice;
      return(
        <Text
          key={`label-${index}`}
          x={pieCentroid[0]}
          y={pieCentroid[1]}
          fill="#fff"
          textAnchor={'middle'}
          alignmentBaseline={'middle'}
          fontSize={20}
        >
          {data.value}
        </Text>
      )
    })
  }

 return (
   <Background>
     <View style={{alignItems: 'center', marginTop: 20}}>
       <TitleGrafico>Total de Receitas x Total de Despesas</TitleGrafico>
     </View>

     <Container>
        <PieChart
              style={{height: 300}}
              data={data}
              valueAccessor={({ item }) => item.value}
        >
              <Label/>
        </PieChart>


        <View style={{alignItems: 'flex-end', marginRight: 20, marginTop: 20}}>
          {
            totReceitas > 0 ? 
            <View style={{flexDirection: 'row'}}>
                <View style={{backgroundColor: '#009387',borderRadius:60,width:20,marginRight: 17}}></View>
                <Title>Receitas</Title>
            </View>
            :
            <View></View>
          }

          {
            totDespesas > 0 ?
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <View style={{backgroundColor: '#c62c36',borderRadius:60,width:20,marginRight: 10}}></View>
                <Title>Despesas</Title>
              </View>
            :
            <View></View>
          }
        </View>
      </Container>
   </Background>

   
  );
}