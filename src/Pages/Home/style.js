import styled from 'styled-components';

export const Background = styled.View`
    flex: 1;
    background-color: ${props => props.theme.backgroundProfile};
`;

export const Title = styled.Text`
    font-size: 23px;
    font-weight: bold;
    margin-top: 5px;
    text-align: center;
    color: ${props => props.theme.txtColor};
`;

export const List = styled.FlatList`
    margin-top: 20px;
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

export const Button = styled.TouchableOpacity`
    margin-top: 30px;
    width: 90%;
    height: 50px;
    border-radius: 7px;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.theme.Button};
`;