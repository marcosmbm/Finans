import styled from 'styled-components'; 

export const Container = styled.View`
    flex: 1;
    background-color: ${props => props.theme.backgroundProfile};
`;

export const Button = styled.TouchableOpacity`
    height: 50px;
    width: 90%;
    background-color: ${props => props.theme.Button};
    margin-top: 20px;
    align-items: center;
    justify-content: center;
    border-radius: 7px;
`;

export const InputModal = styled.TextInput`
    height: 50px;
    width: 90%;
    margin-top: 30px;
    font-size: 17px;
    border-bottom-width: 1px;
    border-bottom-color: ${props => props.theme.txtColor};
    color: ${props => props.theme.txtColor};
`;

export const TitleModal = styled.Text`
    margin-top: 40px;
    font-size: 18px;
    font-weight: bold;
    color: ${props => props.theme.txtColor};
    margin-left: 20px;
`;



