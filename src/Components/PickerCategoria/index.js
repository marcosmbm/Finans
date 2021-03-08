import React,{useState,useContext,useEffect,useRef} from 'react';
import { Modal, TouchableOpacity, TouchableWithoutFeedback,View,FlatList,Text, Keyboard,Alert } from 'react-native';

import {Picker as RNPickerSelect} from '@react-native-community/picker';
import {PickerView,ButtonAdd,ContainerModal,Input,Add,ViewList,TextList} from './style';
import {useStateValue} from '../../Context/ContextProvider';
import Icon from 'react-native-vector-icons/AntDesign';
import Icons from 'react-native-vector-icons/Entypo';

import firebase from '../../services/firebaseconnection';
import {AuthContext} from '../../Context/auth';



export default function PickerCategoria({onChange, tipoCategoria, keyC,keyM}) {
 const [open,setOpen] = useState(false);
 const [state,dispach] = useStateValue();
 const {user} = useContext(AuthContext);
 const [categorias,setCategorias] = useState([]); 
 const [nomeCategoria,setNomeCategoria] = useState('');
 const [keyEdit, setKeyEdit] = useState('');
 const [keysMov,setKeysMov]=useState([]);

 const inputRef = useRef(null);
 const uid = user && user.uid;

 useEffect(()=> {
    async function loadList(){

      await firebase.database().ref('categorias')
      .child(uid)
      .on('value',(snapshot)=>{
        setCategorias([]);
        snapshot.forEach((childItem)=>{
          let list = {
            keyCategoria: childItem.key,
            nomeCategoria: childItem.val().nomeCategoria,
          };
          setCategorias(oldArray => [...oldArray,list].reverse());
        })
      })
    }
    loadList();
  },[]);

 //Adiconando uma nova Categoria
 async function handleAdd(){
     if(keyEdit !== ''){      
       await firebase.database().ref('categorias').child(uid).child(keyEdit)
       .update({
         nomeCategoria: nomeCategoria
       });

       Keyboard.dismiss();
       setNomeCategoria('');
       setKeyEdit('');
       setOpen(false);
       return;
     }
     let Id_Categoria = await firebase.database().ref('categorias').child(uid).push().key;
     await firebase.database().ref('categorias').child(uid).child(Id_Categoria).set({
         nomeCategoria: nomeCategoria
     });
     useEffect(()=> {
      async function loadList(){
  
        await firebase.database().ref('categorias')
        .child(uid)
        .on('value',(snapshot)=>{
          setCategorias([]);
          snapshot.forEach((childItem)=>{
            let list = {
              keyCategoria: childItem.key,
              nomeCategoria: childItem.val().nomeCategoria,
            };
            setCategorias(oldArray => [...oldArray,list].reverse());
          })
        })
      }
      loadList();
    },[]);
     setCategorias(nomeCategoria);
     setNomeCategoria('');
     setOpen(false);
     Keyboard.dismiss();
 }

 function handleSubmit(){
    Keyboard.dismiss();
    if (nomeCategoria === ''){
      alert('Por favor, digite um nome para sua categoria');
      return;
    }
    Alert.alert(
      'Confirmando dados',
      `Nome da Categoria: ${nomeCategoria}`,
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

  async function handleDelete(data){
    await firebase.database().ref('categorias')
    .child(uid)
    .child(data.keyCategoria)
    .remove()
    .catch((error)=>{
      console.log(error);
    });
  }

  function handleSubmitDelete(data){
    Keyboard.dismiss();
    Alert.alert(
      'Atenção!',
      `Você deseja excluir a categoria ${data.nomeCategoria}`,
      [
        {text: 'Cancelar',
         style: 'cancel'
        },
        {
          text: 'Continuar',
          onPress: () => handleDelete(data)
        }
      ]
    )
  }

  function handleEdit(data){
    setNomeCategoria(data.nomeCategoria);
    setKeyEdit(data.keyCategoria);
    inputRef.current.focus();
  }

  function cancelEdit(){
    setKeyEdit('');
    setNomeCategoria('');
    Keyboard.dismiss();
  }


 function CategoriasList({data, deleteItem, editItem}){
    return(
       <ViewList>
          <TextList>{data.nomeCategoria}</TextList>

          <View style={{flexDirection:'row'}}>
          <TouchableOpacity
              style={{justifyContent: 'center'}}
              onPress={()=>editItem(data)}
          >
              <Icons
                  name='cog' 
                  color={state.theme.textCat} 
                  size={20} 
              />
        </TouchableOpacity>

        <TouchableOpacity
          style={{justifyContent: 'center',marginLeft: 20}}
          onPress={()=>deleteItem(data)}
        >
              <Icons
                  name='trash' 
                  color={state.theme.textCat} 
                  size={20} 
              />
        </TouchableOpacity>
        </View>
       </ViewList>
    );
}


 const CategoriaItem = categorias.map((v,k)=>{
    return ( 
        <RNPickerSelect.Item key={k} value={v.nomeCategoria} label={v.nomeCategoria}/>   
    ) 
 })  

 



  return ( 
     <View style={{flexDirection: 'row'}}>
     <PickerView>
         <RNPickerSelect
            selectedValue={tipoCategoria}
            onValueChange={(valor)=> onChange(valor)}
         >  
             <RNPickerSelect.Item label="Selecione uma categoria" value={null}/>
             <RNPickerSelect.Item label="Trabalho" value="Trabalho"/>
             <RNPickerSelect.Item label="Alimentação" value="Alimentação"/>
             <RNPickerSelect.Item label="Casa" value="Casa"/>
             <RNPickerSelect.Item label="Transporte" value="Transporte"/>
             {CategoriaItem}
         </RNPickerSelect>
     </PickerView>
     <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <ButtonAdd onPress={()=>setOpen(true)}>
                <Icon
                    name={'plus'}
                    size={20}
                    color={'#fff'}
                /> 
        </ButtonAdd>

     </View>

     <Modal visible={open} animationType="slide" transparent={false}>
     <ContainerModal> 
          {keyEdit.length > 0 && (
          <View style={{flexDirection: 'row', marginTop: 10, marginLeft: 10}}>
            <TouchableOpacity onPress={cancelEdit}>
              <Icon name="closecircleo" size={20} color="#FF0000" />
            </TouchableOpacity>
            <Text 
            style={{marginLeft: 5, marginBottom: 8, color: '#FF0000'}}
            >
              Você esta editando uma categoria!
            </Text>
          </View> 
          )}
        
       
            <TouchableOpacity onPress={()=>setOpen(false)} style={{marginLeft: 10, marginTop: 10}}>
                    <Icon
                        name={'arrowleft'}
                        size={20}
                        color={state.theme.text1}
                    />
             </TouchableOpacity>

             <View style={{flexDirection: 'row', marginTop: 10}}>
                <Input
                    placeholder="Nova Categoria"
                    placeholderTextColor="#A4A4A4"
                    onSubmitEditing={()=>Keyboard.dismiss()}
                    value={nomeCategoria}
                    onChangeText={(texto)=>setNomeCategoria(texto)}
                    ref={inputRef}
                />

                <Add onPress={handleSubmit}>
                    <Icon
                        name={'plus'}
                        size={15}
                        color={'#fff'}
                    />
                </Add>
             </View>

             <FlatList
                    data={categorias}
                    keyExtractor={item => item.key}
                    renderItem={({item})=> (
                        <CategoriasList
                            data={item}
                            deleteItem = {handleSubmitDelete}
                            editItem = {handleEdit}
                        />
                    )}
                />
         </ContainerModal>
     </Modal>
     </View>
  );
}