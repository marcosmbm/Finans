import styled from 'styled-components';

export const Container = styled.View`
    flex: 1;
    background-color: ${props => props.theme.backgroundProfile};
`;

export const Title = styled.Text`
    margin-top: 40px;
    font-size: 18px;
    font-weight: bold;
    color: ${props => props.theme.txtColor};
    margin-left: 20px;
`;

export const Input = styled.TextInput`
    height: 50px;
    width: 90%;
    margin-top: 30px;
    font-size: 17px;
    border-bottom-width: 1px;
    border-bottom-color: ${props => props.theme.txtColor};
    color: ${props => props.theme.txtColor};
`;

export const Button = styled.TouchableOpacity`
    margin-top: 30px;
    width: 90%;
    height: 50px;
    border-radius: 7px;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.theme.Button};
`;