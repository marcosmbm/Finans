import React,{useState, useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../../Context/auth';
import firebase from '../../services/firebaseconnection';

import { View,Text,SafeAreaView,Keyboard,TouchableWithoutFeedback,Alert } from 'react-native';
import {Container,Title,Input,Button} from './style';

export default function New() {

  const {user: usuario} = useContext(AuthContext);
  const navigation = useNavigation();

  //variáveis para cadastrar uma nova conta
  const [nomeConta,setNomeConta] = useState('');
  const [contas,setContas] = useState([]);

  //função para cadastrar nova conta
  async function handleAdd(){
    let uid = usuario.uid;
    let Id_Conta = await(await firebase.database().ref('contas').child(uid).push()).key
    await firebase.database().ref('contas').child(uid).child(Id_Conta).set({
      nomeConta: nomeConta,
      saldoConta: 0,
      totReceitasContas: 0,
      totDespesasContas: 0
    })

    let users = firebase.database().ref('users').child(uid);
    await users.once('value').then((snapshot)=> {
      let quantContas = parseInt(snapshot.val().quantContas);
      let quantContasAtual = quantContas += 1;
      users.child('quantContas').set(quantContasAtual);
    })

    setContas(nomeConta);
    Keyboard.dismiss();
    setNomeConta('');
    navigation.navigate('Contas');
  }

  function handleSubmit(){
    Keyboard.dismiss();
    if (nomeConta === ''){
      alert('Por favor, digite um nome para sua conta');
      return;
    }
    Alert.alert(
      'Confirmando dados',
      `Nome: ${nomeConta}`,
      [
        {text: 'Cancelar',
         style: 'cancel'
        },
        {
          text: 'Continuar',
          onPress: () => handleAdd()
        }
      ]
    )
  }


 return (
   <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
      <Container>
          <Title>Qual o nome da conta?</Title>

          <SafeAreaView style={{alignItems: 'center'}}>
              <Input
                placeholder="Nome da Conta"
                placeholderTextColor='#A4A4A4'
                onSubmitEditing={()=>Keyboard.dismiss()}
                value={nomeConta}
                onChangeText = {(texto)=>setNomeConta(texto)}
              />

              <Button onPress={handleSubmit}>
                <Text style={{fontSize: 20, color: '#fff'}}>Cadastrar</Text>
              </Button>
          </SafeAreaView>
      </Container>
   </TouchableWithoutFeedback>
  );
}