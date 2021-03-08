import React, { useState,useContext } from 'react';
import {Text,TouchableOpacity,TouchableWithoutFeedback,Keyboard,Modal, View, ActivityIndicator } from 'react-native';
import {Container,
        Header,
        HeaderTxt,
        Footer,
        FooterTxt,
        Action,
        Redefinir,
        Input,
        SignInButton,
        SignUpButton,
        ContainerModal} from './style';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Interrupd from '../../Components/Switch';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../../Context/auth';
import {useStateValue} from '../../Context/ContextProvider';

export default function SignIn() {

  const navigation = useNavigation();

  //variaveis para Logar
  const [email,setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);
  const {signIn,erroSenha,erroEmail, redefinir, loadingAuth} = useContext(AuthContext);
  const [state,dispach] = useStateValue();

  //Variaveis para exibição de senha
  const [secure,setSecure] = useState(true);
  const [nameIcon, setNameIcon] = useState('eye-off');

  //funções para exibir a senha
  function Show(){
    setSecure(false);
    setNameIcon('eye');
  }

  function ShowNot(){
    setSecure(true);
    setNameIcon('eye-off');
  }

  //Função para logar um usuário
  function handleLogin(){
      signIn(email,password);
  }

  //Redefinindo uma senha
  function handleRedefinir(){
    setOpen(true);
  }

  function handleRedefinirSubmit(){
    if(email !== ''){
      redefinir(email,password);
      setEmail('');
      setOpen(false);
    }
  }

  function cancelRedefinir(){
    setEmail('');
    setOpen(false);
  }


 return (
  <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
   <Container>
     <Header style={{paddingHorizontal: 20, paddingBottom: 50}}>
       <Interrupd/>
       
       <HeaderTxt>Bem Vindo!!</HeaderTxt>
     </Header>

     <Footer style={{paddingVertical: 50,paddingHorizontal: 30}}>
       <FooterTxt>Email </FooterTxt>
       <Action>
         <FontAwesome
            name="user-o"
            color="#05375a"
            size={20}
         />

          <Input
            placeholder="Email"
            autoCapitalize="none"
            style={{marginTop: Platform.OS === 'ios' ? 0 : -12}}
            value={email}
            onChangeText={ (text) => setEmail(text) }
            placeholderTextColor='#A4A4A4'
          />
          


          {email.length > 0 ?
            <Feather
              name="check-circle"
              color="green"
              size={20}
            /> 
            :
            null}
       </Action>
       <Text style={{color: 'red'}}>{erroEmail}</Text>


       <FooterTxt style={{marginTop: 35}}>Senha </FooterTxt>
       <Action>
         <Feather
            name="lock"
            color="#05375a"
            size={20}
         />

          <Input
            placeholder="Senha"
            autoCapitalize="none"
            style={{marginTop: Platform.OS === 'ios' ? 0 : -12}}
            secureTextEntry={secure}
            value={password}
            onChangeText={ (text) => setPassword(text) }
            placeholderTextColor='#A4A4A4'
          />

          <TouchableOpacity onPress={
            secure === true ? Show : ShowNot
          }>
            <Feather
                name={nameIcon}
                color="grey"
                size={20}
            />
          </TouchableOpacity>
       </Action>
        <Text style={{color: 'red'}}>{erroSenha}</Text>
        
        <TouchableOpacity onPress={handleRedefinir}>
            <Redefinir>Esqueceu a senha?</Redefinir>
        </TouchableOpacity>

        <TouchableOpacity style={{marginTop: 30}} onPress={handleLogin}>
          <SignInButton
            colors={['#08d4c4','#01ab9d']}
          >
            {
              loadingAuth ? (
                <ActivityIndicator size={20} color="#FFF"/>
              ) : (
                <Text style={{fontSize: 20, fontWeight: 'bold', color: '#fff'}}>Entrar</Text>
              )
            }
          </SignInButton>
        </TouchableOpacity>

        <SignUpButton onPress={()=>navigation.navigate('SignUp')}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: '#009387'}}>Cadastre-se</Text>
        </SignUpButton>
     </Footer>

     <Modal animationType="slide" transparent={false} visible={open}>
          <TouchableWithoutFeedback>
              <ContainerModal>
                  <TouchableOpacity onPress={cancelRedefinir}>
                        <Ionicons
                          name="md-arrow-back"
                          size={35}
                          color={state.theme.txtColor}
                        />
                  </TouchableOpacity>
                  
                  <View style={{marginLeft: 20, marginRight: 20, marginTop: 20}}>
                  <FooterTxt>Email </FooterTxt>
                  <Action>
                    <FontAwesome
                        name="user-o"
                        color="#05375a"
                        size={20}
                    />

                    <Input
                        placeholder="Email"
                        autoCapitalize="none"
                        style={{marginTop: Platform.OS === 'ios' ? 0 : -12}}
                        value={email}
                        onChangeText={ (text) => setEmail(text) }
                        placeholderTextColor='#A4A4A4'
                   />

                  {email.length > 0 ?
                    <Feather
                       name="check-circle"
                      color="green"
                       size={20}
                   /> 
                    :
                  null}
                  </Action>
                  <Text style={{color: 'red'}}>{erroEmail}</Text>

                  <TouchableOpacity style={{marginTop: 30}} onPress={handleRedefinirSubmit}>
                      <SignInButton
                          colors={['#08d4c4','#01ab9d']}
                     >
                        <Text style={{fontSize: 20, fontWeight: 'bold', color: '#fff'}}>Redefinir</Text>
                    </SignInButton>
                    </TouchableOpacity>
                  </View>
              </ContainerModal>
          </TouchableWithoutFeedback>
     </Modal>
   </Container>
   </TouchableWithoutFeedback>
  );
}