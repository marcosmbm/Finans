import styled from 'styled-components';

export const Container = styled.View`
    flex: 1;
    background-color: ${props => props.theme.backgroundProfile};
`;

export const Header = styled.View`
    flex: 1;
    background-color: ${props => props.theme.HeaderView};
    border-bottom-left-radius: 25;
    border-bottom-right-radius: 25;
    padding: 20px;
`;

export const Title = styled.Text`
    text-align: center;
    font-size: 15px;
    margin-top: 10px;
    font-weight: bold;
    color: ${props => props.theme.txtColor};
`;

export const Saldo = styled.Text`
    text-align: center;
    margin-top: 10px;
    font-size: 25px;
    font-weight: bold;
    color: ${props => props.theme.txtColor};
`;

export const TotalView = styled.View`
    flex-direction: row;
    justify-content: space-around;
    margin-top: 30px;
`;

export const IconReceitas = styled.View`
    background-color: #009387;
    height: 50px;
    width: 50px;
    align-items: center;
    justify-content: center;
    border-radius: 60px;
`;

export const TotView = styled.View`
    align-items: center;
    justify-content: center;
    margin-top: 5px;
`;

export const IconDespesas = styled.View`
    background-color: #C62c36;
    height: 50px;
    width: 50px;
    align-items: center;
    justify-content: center;
    border-radius: 60px;
`;

export const Footer = styled.View`
    flex: 2;
    align-items: center;
`;

export const Dicas = styled.View`
    width: 90%;
    flex: 1;
    margin-top: 20px;
    padding: 10px;
    border-radius: 10px;
    background-color: ${props => props.theme.View};
`;

export const TitleDicas = styled.Text`
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 10px;
    color: ${props => props.theme.txtColor};
`;

export const Passos = styled.View`
    flex-direction: row;
    margin-top: 10px;
`;

export const TxtPassos = styled.Text`
    margin-left: 5px;
    font-size: 17px;
    color: ${props => props.theme.txtColor};
`;

export const BtnNew = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    width: 90%;
    height: 45px;
    border-radius: 10px;
    margin-bottom: 10px;
    background-color: ${props => props.theme.Button};
`;

export const TextList = styled.Text`
    color: ${props => props.theme.txtColor};
    font-size: 16px;
    font-weight: bold;
`;


