import React,{useState,useContext} from 'react';

import { View,Text,Alert,Modal,SafeAreaView,TouchableWithoutFeedback,TouchableOpacity,Keyboard } from 'react-native';
import {Container, Button,InputModal,TitleModal} from './style';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {AuthContext} from '../../Context/auth';
import firebase from '../../services/firebaseconnection';
import {useStateValue} from '../../Context/ContextProvider';

export default function Configurations() {
  const {user} = useContext(AuthContext);
  const uid = user && user.uid;
  const [state,dispach] = useStateValue();

  //Variaveis para editar um novo nome
  const [open,setOpen] = useState(false);
  const [nomeEdit,setNomeEdit] = useState('');
  const [keyEdit,setKeyEdit] = useState('');

  //Editando um novo nome
  function Edit(){
    setOpen(true);
    setNomeEdit(user && user.nome);
    setKeyEdit(user && user.uid);
  }

  async function handleEdit(){
    let uid = user.uid;
    await firebase.database().ref('users').child(uid)
    .update({
      nome: nomeEdit
    });
    Keyboard.dismiss();
    setNomeEdit('');
    setOpen(false);
  }

  function handleEditSubmit(){
    if(nomeEdit === ''){
      alert('Por Favor, digite um nome');
      return;
    }

    Alert.alert(
      'Confirmando',
      `Nome: ${nomeEdit}`,
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Continuar',
          onPress: ()=> handleEdit()
        }
      ]
    )
  }

  //Limpando as movimentações
  async function deletarMovimentacao(){
    await firebase.database().ref('Movimentacoes').child(uid).remove();
  }

  function handleSubmitDeletar(data){
    Alert.alert(
      'Cuidado Atenção!!',
      `Você deseja excluir todas as movimentações? Essa opção não influenciará nos seus devidos saldos`,
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Continuar',
          onPress: ()=> deletarMovimentacao(data)
        }
      ]
    )
  }

  //Resetando todo o aplicativo
  async function Resetar(){
    await firebase.database().ref('Movimentacoes').child(uid).remove();
    await firebase.database().ref('contas').child(uid).remove();
    await firebase.database().ref('categorias').child(uid).remove();
    let users = firebase.database().ref('users').child(uid);
    await users.once('value').then((snapshhot)=>{
      let saldoUser = parseFloat(0);
      users.child('saldo').set(saldoUser);
      let totDespesas = parseFloat(0);
      users.child('totDespesas').set(totDespesas);
      let totReceitas = parseFloat(0);
      users.child('totReceitas').set(totReceitas);
      let quantContas = parseFloat(0);
      users.child('quantContas').set(quantContas);
    })
  }

  function handleSubmitResetar(data){
    Alert.alert(
      'Cuidado Atenção!!',
      `Você deseja resetar sua Conta? Essa opção irá zerar o seu saldo e excluir suas contas e movimentações`,
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Continuar',
          onPress: ()=> Resetar(data)
        }
      ]
    )
  }
 return (
   <Container>
     <View style={{flex: 1,alignItems: 'center'}}>
       <TitleModal>Tela de Configurações</TitleModal>
       
       <Button onPress={Edit}>
          <Text style={{color: '#fff',fontSize: 21, fontWeight: 'bold'}}>Mudar Nome</Text>
       </Button>

       <Button onPress={handleSubmitDeletar}>
          <Text style={{color: '#fff',fontSize: 21, fontWeight: 'bold'}}>Deletar Movimentos</Text>
       </Button>

       <Button onPress={handleSubmitResetar}>
          <Text style={{color: '#fff',fontSize: 21, fontWeight: 'bold'}}>Resetar</Text>
       </Button>
     </View>

     <Modal visible={open} animationType="slide" transparent={false}>
       <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
            <Container>
                {keyEdit.length > 0 && (
                          <View style={{marginTop: 10,marginLeft:15}}>
                            <Text style={{color:'red',fontSize:20,fontWeight:'bold'}}>Editando</Text>
                          </View>
                 )}

                <TouchableOpacity onPress={()=>setOpen(false)}>
                    <Ionicons
                      style={{marginLeft: 5,marginRight: 5, marginTop: 10}}
                      name="md-arrow-back" size={30}
                      color={state.theme.txtColor}
                    />
                </TouchableOpacity>

                <TitleModal>Novo nome: </TitleModal>

                <SafeAreaView style={{alignItems: 'center'}}>
                      <InputModal
                            placeholder="Seu nome"
                            placeholderTextColor='#A4A4A4'
                            onSubmitEditing={()=>Keyboard.dismiss()}
                            value={nomeEdit}
                            onChangeText = {(texto)=>setNomeEdit(texto)}
                      />

                      <Button onPress={handleEditSubmit}>
                           <Text style={{fontSize: 20, color: '#fff'}}>Editar</Text>
                      </Button>
                </SafeAreaView>
            </Container>
       </TouchableWithoutFeedback>
      </Modal>
   </Container>
  );
}