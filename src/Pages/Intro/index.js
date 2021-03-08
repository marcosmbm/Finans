import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Container,
        Header,
        Logo,
        Footer,
        Title,
        Txt,
        SignIn,
        SignInTxt} from './style';
import Icon from 'react-native-vector-icons/MaterialIcons';


import {useNavigation} from '@react-navigation/native';

export default function Intro({onDarkModeChange, darkModeValue}) {

  const navigation = useNavigation();

 return (
   <Container>
     <Header>
       <Logo
          source={require('../../img/Logomod.png')}
       />
     </Header>

     <Footer style={{paddingVertical: 50,paddingHorizontal: 30}}>
       <Title>Esteja Sempre Conectado!!</Title>
       <Txt>Entre com uma Conta</Txt>
       
       <TouchableOpacity 
          style={{alignItems: 'flex-end',marginTop: 30}}
          onPress={()=>navigation.navigate('SignIn')}
        >
         <SignIn
          colors={['#08d4c4','#01ab9d']}
         >
           <SignInTxt>Entrar</SignInTxt>

           <Icon
               name="navigate-next"
               size={20}
               color="#fff"
           />
         </SignIn>
       </TouchableOpacity>
     </Footer>
   </Container>
  );
}