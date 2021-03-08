import React,{useState,useContext,useEffect} from 'react';
import {useStateValue} from '../../Context/ContextProvider';
import {useNavigation} from '@react-navigation/native';

import {View,Text,TouchableOpacity,Alert,Modal,SafeAreaView,TouchableWithoutFeedback,Keyboard } from 'react-native';
import {Background,
        Container,
        Name,
        Saldo,
        Area,
        Title,
        List,
        ModalBackground,
        Valor,
        Descricao,
        Button,
        TextButton} from './style';

import Icon from 'react-native-vector-icons/Ionicons';
import FabButton from '../../Components/FabButton';
import { format,isBefore, parse } from 'date-fns';

import firebase from '../../services/firebaseconnection';
import {AuthContext} from '../../Context/auth';

import MovimentacoesList from '../../Components/MovimentacoesList';
import DataPicker from '../../Components/DataPicker';
import Picker from '../../Components/Picker';
import PickerCategoria from '../../Components/PickerCategoria';

export default function Counts({route}) {

  const [saldoConta,setSaldoConta] = useState(0);
  const [totReceitas,setTotReceitas] = useState(0);
  const [totDespesas, setTotDespesas] = useState(0);
  

  const [state,dispach] = useStateValue();
  const [movimentacoes,setMovimentacoes] = useState([]);
  const [newDate,setNewDate] = useState(new Date());
  const [show,setShow] = useState(false);

  //Variáveis para a edição de uma movimentação
    const [open,setOpen] = useState(false);
    const [tipo,setTipo] = useState(null);
    const [tipoCategoria,setTipoCategoria] = useState(null);
    const [catArmazenada,setCatArmazenada] = useState(null);
    const [valorEditado,setValorEditado]=useState('');
    const [descricaoEditada,setDescricaoEditada]=useState('');
    const [keyEdit,setKeyEdit] = useState('');
    const [valDevolvido,setValDevolvido] = useState('');
    const [tpArmazenado,setTpArmazenado] = useState(null);
  //-------------------------------------------

  const navigation = useNavigation();
  const {user} = useContext(AuthContext);
  const uid = user && user.uid;

  useEffect(()=>{
    async function loadList(){
      await firebase.database().ref('contas').child(uid).child(route.params?.keyConta).on('value',(snapshot)=>{
        setSaldoConta(snapshot.val()?.saldoConta);
        setTotDespesas(snapshot.val()?.totDespesasContas);
        setTotReceitas(snapshot.val()?.totReceitasContas);
      });
      
      await firebase.database().ref('Movimentacoes')
      .child(uid)
      .child(route.params?.keyConta)
      .orderByChild('date').equalTo(format(newDate, 'dd/MM/yyyy'))
      .limitToLast(10).on('value',(snapshot)=>{
        setMovimentacoes([]);
        snapshot.forEach((childItem)=>{
          let list = {
            keyMovimentacao: childItem.key,
            tipo: childItem.val().tipoMovimentacao,
            valor: childItem.val().valorMovimentacao,
            descricao: childItem.val().descricaoMovimentacao,
            date: childItem.val().date,
            categoria: childItem.val().categoria
          };
          setMovimentacoes(oldArray => [...oldArray,list].reverse());
        })
      })

    }
    loadList();
  },[newDate]);
  console.log(movimentacoes);

    //-----------Filtrando as movimentações por datas----------
    function handleShowPicker(){
      setShow(true);
    }
  
    function handleClose(){
      setShow(false);
    }
  
    const onChange = (date) => {
      setShow(Platform.OS === 'ios');
      setNewDate(date);
      console.log(date);
    }
    //----------------------------------------------------------


  function navigationReceitas(){
    navigation.navigate('Receitas',{name: route.params?.nomeConta, key: route.params?.keyConta});
  }

  function navigationDespesas(){
    navigation.navigate('Despesas',{name: route.params?.nomeConta, key: route.params?.keyConta});
  }

 //-------------------Excluindo  uma Movimentação------------------
 async function handleDelete(data){
   await firebase.database().ref('Movimentacoes')
   .child(uid).child(route.params?.keyConta)
   .child(data.keyMovimentacao).remove()
   .then(async ()=> {
     let saldoContaAtual = saldoConta;
     data.tipo === 'despesa' ? saldoContaAtual += parseFloat(data.valor) : saldoContaAtual -= parseFloat(data.valor);
     await firebase.database().ref('contas').child(uid).child(route.params?.keyConta)
     .child('saldoConta').set(saldoContaAtual);
     let totReceitasAtual = totReceitas;
     let totDespesasAtual = totDespesas;
     data.tipo === 'despesa' ? totDespesasAtual -= parseFloat(data.valor) : totReceitasAtual -= parseFloat(data.valor);
     await firebase.database().ref('contas').child(uid).child(route.params?.keyConta)
     .child('totReceitasContas').set(totReceitasAtual);
     await firebase.database().ref('contas').child(uid).child(route.params?.keyConta)
     .child('totDespesasContas').set(totDespesasAtual);
   })
   .catch((error)=>{
     console.log(error);
   })
   //Devolvendo os valores do usuario
   let users = firebase.database().ref('users').child(uid);
   await users.once('value').then((snapshot)=>{
     let saldoUser = parseFloat(snapshot.val().saldo);
     data.tipo === 'despesa' ? saldoUser += parseFloat(data.valor) : saldoUser -= parseFloat(data.valor);
     users.child('saldo').set(saldoUser);
     let totReceitasUser = parseFloat(snapshot.val().totReceitas);
     let totDespesasUser = parseFloat(snapshot.val().totDespesas);
     data.tipo === 'despesa' ? totDespesasUser -= parseFloat(data.valor) : totReceitasUser -= parseFloat(data.valor);
     users.child('totReceitas').set(totReceitasUser);
     users.child('totDespesas').set(totDespesasUser);
   }).catch((error)=>{
     console.log(error);
   });
 } 

 function handleDeleteSucess(data){
  Alert.alert(
    'Cuidado Atenção',
    `Você deseja excluir: ${data.tipo} - Valor R$ ${data.valor} - Data ${data.date}`,
    [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Deletar',
        onPress: ()=> handleDelete(data)
      }
    ]
  )
}
//---------------------------------------------------------------------

//---------------------Editando uma Movimentação-----------------------
  function Edit(data){
    setOpen(true);
    setDescricaoEditada(data.descricao);
    setValorEditado(data.valor);
    setValDevolvido(data.valor);
    setTpArmazenado(data.tipo);
    setTipo(data.tipo)
    setKeyEdit(data.keyMovimentacao);
    setCatArmazenada(data.categoria);
    setTipoCategoria(data.categoria);
  }

  async function handleEdit(){
    await firebase.database().ref('Movimentacoes')
    .child(uid)
    .child(route.params?.keyConta)
    .child(keyEdit)
    .update({
        tipoMovimentacao: tipo,
        valorMovimentacao: parseFloat(valorEditado),
        descricaoMovimentacao: descricaoEditada,
        categoria: tipoCategoria
    })
    .then(async()=>{
      let saldoContaEdit = saldoConta;
      tpArmazenado === 'despesa' ? saldoContaEdit += parseFloat(valDevolvido) : saldoContaEdit -= parseFloat(valDevolvido);
      let saldoContaAtual = saldoContaEdit;
      tipo === 'despesa' ? saldoContaAtual -= parseFloat(valorEditado) : saldoContaAtual += parseFloat(valorEditado);
      await firebase.database().ref('contas').child(uid).child(route.params?.keyConta)
      .child('saldoConta').set(saldoContaAtual);
      let totReceitasEdit = totReceitas;
      let totDespesasEdit = totDespesas;
      tpArmazenado === 'despesa' ? totDespesasEdit -= parseFloat(valDevolvido) : totReceitasEdit -= parseFloat(valDevolvido);
      let totReceitasAtual = totReceitasEdit;
      let totDespesasAtual = totDespesasEdit;
      tipo === 'despesa' ? totDespesasAtual += parseFloat(valorEditado) : totReceitasAtual += parseFloat(valorEditado);
      await firebase.database().ref('contas').child(uid).child(route.params?.keyConta)
      .child('totReceitasContas').set(totReceitasAtual);
      await firebase.database().ref('contas').child(uid).child(route.params?.keyConta)
      .child('totDespesasContas').set(totDespesasAtual);
    }) 
    .catch((error)=>{
      console.log(error);
    })
    let users = firebase.database().ref('users').child(uid);
    await users.once('value').then((snapshot)=>{
      let saldoUserEdit = parseFloat(snapshot.val().saldo);
      tpArmazenado === 'despesa' ? saldoUserEdit += parseFloat(valDevolvido) : saldoUserEdit -= parseFloat(valDevolvido);
      let saldoUserAtual = saldoUserEdit;
      tipo === 'despesa' ? saldoUserAtual -= parseFloat(valorEditado) : saldoUserAtual += parseFloat(valorEditado);
      users.child('saldo').set(saldoUserAtual);
      let totReceitasUsersEdit = parseFloat(snapshot.val().totReceitas);
      let totDespesasUsersEdit = parseFloat(snapshot.val().totDespesas);
      tpArmazenado === 'despesa' ? totDespesasUsersEdit -= parseFloat(valDevolvido) : totReceitasUsersEdit -= parseFloat(valDevolvido);
      let totReceitasUsersAtual = totReceitasUsersEdit;
      let totDespesasUsersAtual = totDespesasUsersEdit;
      tipo === 'despesa' ? totDespesasUsersAtual += parseFloat(valorEditado) : totReceitasUsersAtual += parseFloat(valorEditado);
      users.child('totReceitas').set(totReceitasUsersAtual);
      users.child('totDespesas').set(totDespesasUsersAtual);
    });
    Keyboard.dismiss();
    setValorEditado('');
    setDescricaoEditada('');
    setTipo(null);
    setOpen(false);
  }

  function handleSubmitEdit(){
    Keyboard.dismiss();

    if(isNaN(parseFloat(valorEditado)) || tipo === null || descricaoEditada === '' || tipoCategoria === null){
        alert('Preencha todos os campos!');
        return;
    }

    Alert.alert(
        'Confirmando dados editados',
        `Valor: R$ ${parseFloat(valorEditado)}\nTipo: ${tipo}\nCategoria: ${tipoCategoria}\nDescrição: ${descricaoEditada}`,
        [
          {
            text: 'Cancelar',
            style: 'cancel'
          },
          {
            text: 'Continuar',
            onPress: () => handleEdit()
          }
        ]
      )
}

  function cancelEdit(){
    setOpen(false);
    setTipo(null);
    setValorEditado('');
    setDescricaoEditada('');
  }
//---------------------------------------------------------------------

//--------------------------Exibindo os dados--------------------------
    function exibir(data){
        alert(`Valor: R$ ${data.valor}\nTipo: ${data.tipo}\nData:${data.date}\nCategora: ${data.categoria}\nDescrição: ${data.descricao}`)
    }
//---------------------------------------------------------------------
return (
   <Background>
     <Container>
        <Name>{route.params?.nomeConta}</Name>
        <Saldo>R$ {saldoConta.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}</Saldo>
     </Container>

    <Area>
      <TouchableOpacity onPress={handleShowPicker}>
        <Icon
          name="ios-calendar-sharp"
          size={30}
          color={state.theme.txtColor}
        />
      </TouchableOpacity>

      <Title>Últimas Movimentações</Title>
    </Area>

    <List
      showsVerticalScrollIndicator={false}
      data = {movimentacoes}
      keyExtractor={item => item.key} 
      renderItem={({item})=>(<MovimentacoesList data={item} deleteItem = {handleDeleteSucess} editItem = {Edit} exibItem={exibir}/>)}
    /> 

    {show && (
        <DataPicker
          onClose={handleClose}
          date={newDate}
          onChange={onChange}
        />
      )
    }
    
    <FabButton
      navigateReceitas={navigationReceitas}
      navigateDespesas={navigationDespesas}
    /> 

    <Modal animationType="slide" transparent={false} visible={open}>
        <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
            <ModalBackground>
              {keyEdit.length > 0 && (
                      <View style={{marginTop: 10,marginLeft:15}}>
                        <Text style={{color:'red',fontSize:20,fontWeight:'bold'}}>Editando</Text>
                      </View>
              )}
                <TouchableOpacity onPress={cancelEdit}>
                      <Icon
                        name="md-arrow-back"
                        size={30}
                        color={state.theme.txtColor}
                        style={{marginLeft: 5,marginRight: 5}}
                      />
                </TouchableOpacity>

                <SafeAreaView style={{alignItems: 'center'}}>
                      <Valor
                          placeholder="Valor desejado"
                          keyboardType="numeric"
                          returnKeyType="next"
                          value={valorEditado}
                          onChangeText={ (text) => setValorEditado(text) }
                      />

                      <Picker onChange={setTipo} tipo={tipo}/>

                      <PickerCategoria onChange={setTipoCategoria} tipoCategoria={tipoCategoria}/>

                      <Descricao
                          placeholder="Descrição"
                          returnKeyType="next"
                          style={{textAlignVertical: 'top'}}
                          value={descricaoEditada}
                          onChangeText={ (text) => setDescricaoEditada(text) }
                      />

                      <Button onPress={handleSubmitEdit}>
                        <TextButton>Editar</TextButton>
                      </Button>
                </SafeAreaView>
            </ModalBackground>
        </TouchableWithoutFeedback>
    </Modal>
   </Background>
  );
}