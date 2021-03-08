import React,{useState,useContext,useEffect} from 'react';
import {TouchableOpacity,View,Text} from 'react-native';
import {Backgroud,List,Title} from './style';
import Icon from 'react-native-vector-icons/Ionicons';

import firebase from '../../services/firebaseconnection';
import {AuthContext} from '../../Context/auth';
import {useStateValue} from '../../Context/ContextProvider';

import DataPicker from '../../Components/DataPicker';
import { format,startOfDay,endOfDay} from 'date-fns';

import HistoricoList from '../../Components/HistoricoList';

export default function Extract() {
    const [historico,setHistorico] = useState([]);
    const {user} = useContext(AuthContext); 
    const [state,dispach] = useStateValue();
    
    const [newDate,setNewDate] = useState(new Date());
    const [show,setShow] = useState(false);
    const uid = user && user.uid;



    useEffect(()=>{
      async function load(){
        await firebase.database().ref('contas')  
        .child(uid)
        .on('value', function(snapshot){
           setHistorico([]);  
           snapshot.forEach(function(childSnapshot){
           let childKey = childSnapshot.key;
           firebase.database().ref('Movimentacoes')
           .child(uid).child(childKey)
           .orderByChild('date')
           .equalTo(format(newDate, `dd/MM/yyyy`))
           .on('value',function(snapshot){ 
             snapshot.forEach(function(childSnapshot){
               let List = {
                 key: childSnapshot.key,
                 valor: childSnapshot.val().valorMovimentacao,
                 data: childSnapshot.val().date,
                 categoria: childSnapshot.val().categoria,
                 tipo: childSnapshot.val().tipoMovimentacao,
                 descricao: childSnapshot.val().descricaoMovimentacao
               };
               setHistorico(oldArray => [...oldArray, List])
             })
           })
         })
       })
      } 
      load();
    },[newDate])

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

    
 return (
   <Backgroud>
     <View style={{flexDirection: 'row', marginTop: 20, marginLeft: 20}}>
        <TouchableOpacity onPress={handleShowPicker}>
          <Icon
              name="ios-calendar-sharp"
              size={30}
              color={state.theme.txtColor}
          />
       </TouchableOpacity>

       <Title>Extrato Diário</Title>
     </View>
      
     
     <List
        data={historico}
        keyExtractor={item => item.key}
        renderItem={({item}) => (<HistoricoList data={item}/>)}
     />

    {show && (
        <DataPicker
          onClose={handleClose}
          date={newDate}
          onChange={onChange}
        />
      )
    }
   </Backgroud>
  );
}