import styled from 'styled-components';
import LinearGradient from 'react-native-linear-gradient';

export const Container = styled.View`
    flex: 1;
    background-color: ${props => props.theme.background};
`;

export const Header = styled.View`
    flex: 2;
    justify-content: center;
    align-items: center;
`;

export const Logo = styled.Image`
    height: 250px;
    width: 250px;
`;

export const Footer = styled.View`
    flex: 1;
    background-color: ${props => props.theme.Footer};
    border-top-right-radius: 30px;
    border-top-left-radius: 30px;
`;

export const Title = styled.Text`
    font-size: 30px;
    font-weight: bold;
    color: ${props => props.theme.title};
`;

export const Txt = styled.Text`
    margin-top: 5px;
    color: grey;
`;

export const SignIn = styled(LinearGradient)`
    width: 150px;
    height: 40px;
    justify-content: center;
    align-items: center;
    border-radius: 50px;
    flex-direction: row;
`;

export const SignInTxt = styled.Text`
    color: #fff;
    font-weight: bold
`;