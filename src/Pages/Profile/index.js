import React,{useState,useContext,useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';

import { View,Text,TouchableOpacity,FlatList } from 'react-native';
import {
  Container,
  Header,
  Title,
  Saldo,
  TotalView,
  IconReceitas,
  TotView,
  IconDespesas,
  Footer,
  Dicas,
  TitleDicas,
  Passos,
  TxtPassos,
  BtnNew,
  TextList
} from './style';
import Icon from 'react-native-vector-icons/Feather';

import {AuthContext} from '../../Context/auth';
import firebase from '../../services/firebaseconnection';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

export default function Profile() {
  const {user} = useContext(AuthContext);
  const [saldo,setSaldo] = useState(0);
  const [contas,setContas] = useState([]);
  const [totContas,setTotContas] = useState(0);
  const [totReceitas,setTotReceitas] = useState(0);
  const [totDespesas,setTotDespesas] = useState(0);

  const navigation = useNavigation();

  const uid = user && user.uid;

  useEffect(()=>{
    async function load(){
      await firebase.database().ref('users').child(uid).on('value',(snapshot)=>{
        setSaldo(snapshot.val().saldo);
        setTotReceitas(snapshot.val().totReceitas);
        setTotDespesas(snapshot.val().totDespesas);
        setTotContas(snapshot.val().quantContas);
      });

      await firebase.database().ref('contas')
      .child(uid)
      .limitToFirst(3).on('value',(snapshot)=>{
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
    load();
  },[]);

  function ContasList({data}){
    return(
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{marginBottom: 20, marginLeft: 20}}>
              <TextList>{data.nomeConta}</TextList>
          </View>
          
          <View style={{marginBottom: 20, marginRight: 20}}>
              <TextList>R$ {data.saldoConta.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}</TextList>
          </View>
      </View>
    );
  }
 return (
    <Container>
      <Header>
        <Title>Saldo Total</Title>
        <Saldo>R$ {saldo.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}</Saldo>

        <TotalView>
            <View style={{flexDirection: 'column', alignItems: 'center'}}>
                <IconReceitas>
                    <Icon
                      name="arrow-up"
                      size={25}
                      color="#fff"
                    />
                </IconReceitas>

                <TotView>
                  <Text style={{fontWeight: 'bold', color: '#009387'}}>Receitas</Text>
                  <Text style={{fontSize: 15, color: '#009387', fontWeight: 'bold'}}>R$ {totReceitas.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}</Text>
                </TotView>
            </View>

            <View style={{flexDirection: 'column', alignItems: 'center'}}>
                <IconDespesas>
                    <Icon
                      name="arrow-down"
                      size={25}
                      color="#fff"
                    />
                </IconDespesas>

                <TotView>
                  <Text style={{fontWeight: 'bold', color: '#c62c36'}}>Despesas</Text>
                  <Text style={{fontSize: 15, color: '#c62c36', fontWeight: 'bold'}}>R$ {totDespesas.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}</Text>
                </TotView>
            </View>
        </TotalView>
      </Header>

      <Footer>
          <Dicas>
              {
                totContas > 0 ? 
                  <>
                  <TouchableWithoutFeedback onPress={()=> navigation.navigate('Contas')}>
                  <TitleDicas>Contas</TitleDicas>
                  <FlatList
                  showsVerticalScrollIndicator={false}
                  data={contas}
                  keyExtractor={item => item.key}
                  renderItem={({item})=> (<ContasList data={item}/>)}
                  />
                  </TouchableWithoutFeedback>
                  </> 
                  :
                  <>
                  <TitleDicas>Ainda não sabe como começar?</TitleDicas>

                  <Passos>
                      <Icon
                          name="check-circle"
                          size={20}
                          color="#009387"
                      />
                      <TxtPassos>Crie sua primeira conta</TxtPassos>
                  </Passos>
    
                  <Passos>
                      <Icon
                          name="check-circle"
                          size={20}
                          color="#009387"
                      />
                      <TxtPassos>Registre sua primeira movimentação</TxtPassos>
                  </Passos>
                  </>
              }

          </Dicas>

          <Dicas style={{marginBottom: 10}}>
            {
              totContas > 0 ? <TitleDicas>Total de contas cadastradas : {totContas}</TitleDicas> : 
              <TitleDicas>Ops! Você ainda não tem Contas Registradas</TitleDicas>
            }

            <View style={{alignItems: 'center',justifyContent:'center',marginTop: 30}}>
              <BtnNew onPress={()=>navigation.navigate('Nova')}>
                <Text style={{fontSize: 18, color: '#fff'}}>ADICIONAR NOVA CONTA</Text>
              </BtnNew>
            </View>
          </Dicas>
      </Footer>
    </Container>
  );
}