import styled from 'styled-components';

export const Background = styled.View`
    flex: 1;
    background-color: ${props => props.theme.backgroundProfile};
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
    background-color: #B40404;    
    border-radius: 7px;
`;

export const TextButton = styled.Text`
    font-size: 20px;
    color: #fff;
`;