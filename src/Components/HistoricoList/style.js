import styled from 'styled-components/native';

export const Container = styled.View`
    margin-bottom: 10px;
    padding: 10px;
    box-shadow: 2px 2px #333;
    margin-right: 10px;
    margin-left: 10px;
    border-radius: 5px;
`;

export const IconView = styled.View`
    background-color: ${props => props.tipo === 'despesa' ? '#C62c36' : '#009387'};
    width: 40px;
    height: 40px;
    align-items: center;
    justify-content: center;
    border-radius: 60px;
`;

export const Tipo = styled.Text`
    color: ${props => props.theme.txtColor};
    font-size: 15px;
    font-weight: bold;
`;

export const Valor = styled.Text`
    color: ${props => props.tipo === 'despesa' ? '#C62c36' : '#009387'};
    font-size: 15px;
    font-weight: bold;
`;
