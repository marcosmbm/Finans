import styled from 'styled-components';
import LinearGradient from 'react-native-linear-gradient';
import {Platform} from 'react-native';

export const Container = styled.View`
    flex: 1;
    background-color: ${props => props.theme.background};
`;

export const Header = styled.View`
    flex: 1;
    justify-content: flex-end;
`;

export const HeaderTxt = styled.Text`
    color: #fff;
    font-weight: bold;
    font-size: 30px;
`;

export const Footer = styled.View`
    flex: 4;
    background-color: ${props => props.theme.Footer};
    border-top-right-radius: 30px;
    border-top-left-radius: 30px;
`;

export const FooterTxt = styled.Text`
    color: ${props => props.theme.txtColor};
    font-size: 18px;
`;

export const Action = styled.View`
    flex-direction: row;
    margin-top: 10px;
    border-bottom-width: 1px;
    border-bottom-color: #f2f2f2;
    padding-bottom: 5px;
`;

export const Redefinir = styled.Text`
    color: ${props => props.theme.txtColor};
`;

export const Input = styled.TextInput`
    flex: 1;
    padding-left: 10px;
    color: ${props => props.theme.txtColor};
`;

export const SignInButton = styled(LinearGradient)`
  width: 100%;
  height: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

export const SignUpButton = styled.TouchableOpacity`
    border-width: 1px;
    border-color: #009387;
    border-radius: 10px;
    margin-top: 15px;
    width: 100%;
    height: 50px;
    justify-content: center;
    align-items: center;
`;

export const ContainerModal = styled.View`
    flex: 1;
    background-color: ${props => props.theme.Footer};
`;