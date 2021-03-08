import React,{useState,useContext,useEffect} from 'react';

import { SafeAreaView,View,Text,Alert,TouchableWithoutFeedback,TouchableOpacity,Modal,Keyboard } from 'react-native';
import {Background, Title, List, InputModal,TitleModal,Button} from './style';
import Ionicons from 'react-native-vector-icons/Ionicons';

import ContasList from '../../Components/ContasList';

import {AuthContext} from '../../Context/auth';
import {useStateValue} from '../../Context/ContextProvider';
import firebase from '../../services/firebaseconnection';

export default function Home() {
  const [contas,setContas] = useState([]);
  const [state,dispach] = useStateValue();
  const {user} = useContext(AuthContext);
  const uid = user && user.uid;

  //---------------Variaveis para edição da conta--------------
    const [open,setOpen] = useState(false);
    const [nomeEdit,setNomeEdit] = useState('');
    const [keyEdit,setKeyEdit] = useState('');
  //-----------------------------------------------------------
  

  //Mostrando todas as contas
  useEffect(()=> {
    async function loadList(){
      await firebase.database().ref('contas')
      .child(uid)
      .limitToLast(10).on('value',(snapshot)=>{
        setContas([]);

        snapshot.forEach((childItem)=>{
          let list = {
            keyConta: childItem.key,
            nomeConta: childItem.val().nomeConta,
            saldoConta: childItem.val().saldoConta,
            totReceitas: childItem.val().totReceitasContas,
            totDespesas: childItem.val().totDespesasContas
          };
          setContas(oldArray => [...oldArray,list].reverse());
        })
      })
    }
    loadList();
  },[]);

  //--------------------Deletando uma conta------------------
    async function handleDelete(data){
      await firebase.database().ref('Movimentacoes')
      .child(uid)
      .child(data.keyConta)
      .remove();
      
      await firebase.database().ref('contas')
      .child(uid)
      .child(data.keyConta)
      .remove();

      let users = firebase.database().ref('users').child(uid);
      await users.once('value').then((snapshot)=>{
        let saldoUser = parseFloat(snapshot.val().saldo);
        saldoUser -= parseFloat(data.saldoConta);
        users.child('saldo').set(saldoUser);
        let quantContas = parseFloat(snapshot.val().quantContas);
        quantContas -= 1;
        users.child('quantContas').set(quantContas);
        let totReceitasUsers = parseFloat(snapshot.val().totReceitas);
        let totDespesasUsers = parseFloat(snapshot.val().totDespesas);
        totReceitasUsers -= parseFloat(data.totReceitas);
        totDespesasUsers -= parseFloat(data.totDespesas);
        users.child('totReceitas').set(totReceitasUsers);
        users.child('totDespesas').set(totDespesasUsers);
      })
      .catch((error)=>{
        console.log(error);
      })
    }

    function handleSubmitDeletar(data){
      Alert.alert(
        'Cuidado Atenção!!',
        `Você desseja excluir a conta: ${data.nomeConta}`,
        [
          {
            text: 'Cancelar',
            style: 'cancel'
          },
          {
            text: 'Continuar',
            onPress: ()=> handleDelete(data)
          }
        ]
      )
    }
  //---------------------------------------------------------

  //-------------------Editando uma Conta--------------------
    function Edit(data){
      setOpen(true);
      setNomeEdit(data.nomeConta);
      setKeyEdit(data.keyConta);
    }

    async function handleEditItem(){
      let uid = user.uid;
      await firebase.database().ref('contas')
      .child(uid)
      .child(keyEdit)
      .update({
        nomeConta: nomeEdit
      });
      Keyboard.dismiss();
      setNomeEdit('');
      setOpen(false);
    }

    function handleEditSubmit(){
      if(nomeEdit === ''){
        alert('Por Favor, digite um nome para essa conta');
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
            onPress: ()=> handleEditItem()
          }
        ]
      )
    }

    function CancelEdit(){
      setOpen(false);
    }
  //---------------------------------------------------------
 return (
   <Background>
     <Title>Contas Cadastradas</Title>

     <List
        showsVerticalScrollIndicator={false}
        data={contas}
        keyExtractor={item => item.key}
        renderItem={({item})=> (<ContasList data={item} deleteItem={handleSubmitDeletar} editItem={Edit}/>)}
     />

     <Modal visible={open} animationType="slide" transparent={false}>
       <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
            <Background>
                 {keyEdit.length > 0 && (
                          <View style={{marginTop: 10,marginLeft:15}}>
                            <Text style={{color:'red',fontSize:20,fontWeight:'bold'}}>Editando</Text>
                          </View>
                 )}

                <TouchableOpacity onPress={CancelEdit}>
                    <Ionicons
                      style={{marginLeft: 5,marginRight: 5, marginTop: 10}}
                      name="md-arrow-back" size={30}
                      color={state.theme.txtColor}
                    />
                </TouchableOpacity>

                <TitleModal>Novo nome da conta: </TitleModal>

                <SafeAreaView style={{alignItems: 'center'}}>
                      <InputModal
                            placeholder="Nome da Conta"
                            placeholderTextColor='#A4A4A4'
                            onSubmitEditing={()=>Keyboard.dismiss()}
                            value={nomeEdit}
                            onChangeText = {(texto)=>setNomeEdit(texto)}
                      />

                      <Button onPress={handleEditSubmit}>
                           <Text style={{fontSize: 20, color: '#fff'}}>Editar</Text>
                      </Button>
                </SafeAreaView>
            </Background>
       </TouchableWithoutFeedback>
     </Modal>
   </Background>
  );
}