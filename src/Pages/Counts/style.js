import styled from 'styled-components';

export const Background = styled.View`
    background-color: ${props => props.theme.backgroundProfile};
    flex: 1;
`;

export const Container = styled.View`
    margin-top: 20px;
    margin-bottom: 25px;
    margin-left: 15px;
    flex-direction: row;
`;

export const Name = styled.Text`
    font-size: 20px;
    color: ${props => props.theme.txtColor};
`;

export const Saldo = styled.Text`
    margin-left: 10px;
    font-size: 20px;
    color: ${props => props.theme.txtColor};
    font-weight:bold;
`;

export const Area = styled.View`
    flex-direction: row;
    margin-left: 15px;
    align-items: baseline;
`;

export const Title = styled.Text`
    margin-left: 5px;
    color: ${props => props.theme.txtColor};
    margin-bottom: 10px;
`;

export const List = styled.FlatList`
    background-color: ${props => props.theme.View};
    padding-top: 15px;
    border-top-right-radius: 15px;
    border-top-left-radius: 15px;
    margin-left: 8px;
    margin-right: 8px;
`;


export const ModalBackground = styled.View`
    background-color: ${props => props.theme.backgroundProfile};
    flex: 1;
`;

export const ModalContainer = styled.View`
    margin-top: 20px;
    margin-bottom: 25px;
    margin-left: 15px;
`;

export const Valor = styled.TextInput`
    height: 50px;
    width: 90%;
    background-color: #F2F2F2;
    margin-top: 30px;
    color: ${props => props.theme.colorInput};
    font-size: 17px;
    border-radius: 7px;
`;

export const Descricao = styled.TextInput`
    height: 100;
    width: 90%;
    background-color: #F2F2F2;
    margin-top: 30px;
    font-size: 17px;
    border-radius: 7px;
    color: ${props => props.theme.colorInput};
`;

export const Button = styled.TouchableOpacity`
    margin-top: 20px;
    height: 50px;
    width: 90%;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.theme.Button};   
    border-radius: 7px;
`;

export const TextButton = styled.Text`
    font-size: 20px;
    color: #fff;
`;

