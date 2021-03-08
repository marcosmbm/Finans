import React,{useState,useEffect,useContext} from 'react';
import {useNavigation} from '@react-navigation/native';

import { SafeAreaView,Alert,Keyboard,TouchableWithoutFeedback } from 'react-native';
import {Background,Valor,Descricao,Button,TextButton} from './style';
import PickerCategoria from '../../Components/PickerCategoria';

import firebase from '../../services/firebaseconnection';
import {AuthContext} from '../../Context/auth';
import { format,isBefore } from 'date-fns';

export default function Despesas({route}) {

  //variáveis para cadastrar uma nova receita
  const [valor,setValor] = useState(0);
  const [descricao,setDescricao] = useState('');
  const [tipoCategoria,setTipoCategoria] = useState(null);

  const {user: usuario} = useContext(AuthContext);
  const navigation = useNavigation();

  //Cadastrando uma nova Receitas
  async function handleAdd(){
    let uid = usuario.uid;
    let id_mov = await firebase.database().ref('Movimentacoes').child(uid).push().key;

    await firebase.database().ref('Movimentacoes')
    .child(uid).child(route.params?.key).child(id_mov)
    .set({
      tipoMovimentacao: 'despesa',
      valorMovimentacao: parseFloat(valor),
      date: format(new Date(), 'dd/MM/yyyy'),
      descricaoMovimentacao: descricao,
      categoria: tipoCategoria
    })

    //cuidando dos valores da tabela contas
    let contas = firebase.database().ref('contas').child(uid).child(route.params?.key)
    await contas.once('value').then((snapshot)=>{
      let saldoConta = parseFloat(snapshot.val().saldoConta);
      let totDespesasContas = parseFloat(snapshot.val().totDespesasContas);
      saldoConta -= parseFloat(valor);
      totDespesasContas += parseFloat(valor);
      contas.child('saldoConta').set(saldoConta);
      contas.child('totDespesasContas').set(totDespesasContas);
    });

    //cuidando dos valores da tabela users
    let users = firebase.database().ref('users').child(uid)
    await users.once('value').then((snapshot)=>{
      let saldoUser = parseFloat(snapshot.val().saldo);
      let totDespesas = parseFloat(snapshot.val().totDespesas);
      saldoUser -= parseFloat(valor);
      totDespesas += parseFloat(valor);
      users.child('saldo').set(saldoUser);
      users.child('totDespesas').set(totDespesas);
    });
    navigation.navigate('Counts');
    setValor('');
    setDescricao('');
  }

  function handleSubmit(){
    Keyboard.dismiss();
    if(isNaN(parseFloat(valor)) || descricao === '' || tipoCategoria === null){
      alert('Preencha todos os campos!');
      return;
    }
  
    Alert.alert(
      'Confirmando dados',
      `Valor: R$ ${parseFloat(valor)}\nTipo: despesa\nCategoria: ${tipoCategoria}\nDescricao: ${descricao}`,
      [
        {
          text: 'Cancelar',
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
    <Background>
      <SafeAreaView style={{alignItems: 'center'}}>
          <Valor
            placeholder="Valor desejado"
            keyboardType="numeric"
            returnKeyType="next"
            value={valor}
            onChangeText={ (text) => setValor(text) }
          />

          <Descricao
            placeholder="Descrição"
            returnKeyType="next"
            style={{textAlignVertical: 'top'}}
            value={descricao}
            onChangeText={ (text) => setDescricao(text) }
          />

<PickerCategoria onChange={setTipoCategoria} tipoCategoria={tipoCategoria}/>

          <Button onPress={handleSubmit}>
            <TextButton>Cadastrar</TextButton>
          </Button>

      </SafeAreaView>
    </Background>
   </TouchableWithoutFeedback>
  );
}