import React,{useState,useContext} from 'react';

import {Text,TouchableOpacity,Keyboard,TouchableWithoutFeedback,ActivityIndicator } from 'react-native';
import {Container,
        Footer,
        FooterTxt,
        Action,
        Input,
        SignInButton,
        SignUpButton} from './style';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../../Context/auth';

export default function SignUp() {

  const navigation = useNavigation();
  
  //Variáveis para cadastrar
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {signUp,erroSenha,erroEmail,loadingAuth} = useContext(AuthContext);

  //Variáveis para exbir a senha
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

  //função para cadastrar um novo usuário
  function handleSignUp(){
    signUp(email,password,name);
  }
  

 return (
   <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
   <Container>
     <Footer style={{paddingVertical: 50,paddingHorizontal: 30}}>
     <FooterTxt>Nome </FooterTxt>
       <Action>
         <FontAwesome
            name="user-o"
            color="#05375a"
            size={20}
         />

          <Input
            placeholder="Nome"
            autoCapitalize="none"
            style={{marginTop: Platform.OS === 'ios' ? 0 : -12}}
            value={name}
            onChangeText={ (text) => setName(text) }
            placeholderTextColor='#A4A4A4'
          />

          {name.length > 0 ?
            <Feather
              name="check-circle"
              color="green"
              size={20}
            /> 
            :
            null}
       </Action>

       <FooterTxt style={{marginTop: 35}}>Email </FooterTxt>
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
        
        <TouchableOpacity style={{marginTop: 50}} onPress={handleSignUp}>
          <SignInButton
            colors={['#08d4c4','#01ab9d']}
          >
          {
              loadingAuth ? (
                <ActivityIndicator size={20} color="#FFF"/>
              ) : (
                <Text style={{fontSize: 20, fontWeight: 'bold', color: '#fff'}}>cadastrar</Text>
              )
            }
          </SignInButton>
        </TouchableOpacity>

        <SignUpButton onPress={()=> navigation.navigate('SignIn')}>
          <Text style={{fontSize: 15, fontWeight: 'bold', color: '#009387'}}>Voltar para a tela de Login</Text>
        </SignUpButton>
     </Footer>
   </Container>
   </TouchableWithoutFeedback>
  );
}