import styled from 'styled-components/native';

export const Container = styled.View`
    margin-bottom: 10px;
    padding: 10px;
    box-shadow: 2px 2px #333;
    background-color: ${props => props.theme.HeaderView};
    margin-right: 10px;
    margin-left: 10px;
    border-radius: 5px;
`;

export const Tipo = styled.View`
    flex-direction: row;
`;


export const TipoText = styled.Text`
    color: ${props => props.theme.txtColor};
    font-size: 20px;
    text-align: center;
    font-weight: bold;
`;

export const Tot = styled.Text`
    font-size: 15px;
    color: ${props => props.theme.txtColor};
    margin-top: 5px;
`;

export const ValorText = styled.Text`
    color: ${props => props.theme.txtColor};
    font-size:17px;
    font-weight: bold;
    margin-top: 5px;
`;